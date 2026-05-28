import { defineHastPlugin } from "satteri";

// Satteri-compatible sidenote plugin. Exported as a factory so that satteri
// creates fresh per-document state for each document it processes.
//
// Usage in markdownToHtml options:
//   hastPlugins: [satteriSidenotes]
//
// The deferred-replacement approach: <sup> refs appear before the
// <section data-footnotes> in document order, so we collect sup nodes on the
// way down and retroactively call ctx.replaceNode once the section is visited
// and the footnote content is available.
export const satteriSidenotes = () => {
  const footnotes = new Map();
  // { node, ctx, slug, displayNum } — populated during sup visits
  const pendingSups = [];

  return defineHastPlugin({
    name: "sidenotes",
    element: {
      filter: ["sup", "section"],
      visit(node, ctx) {
        if (node.tagName === "sup") {
          const link = node.children?.find(
            (c) => c.tagName === "a" && c.properties?.dataFootnoteRef !== undefined,
          );
          if (!link) return;

          const href = link.properties?.href ?? "";
          const slugMatch =
            href.match(/^#user-content-fn-(.+)$/) ?? href.match(/^#fn-(.+)$/);
          if (!slugMatch) return;

          const slug = slugMatch[1];
          const displayNum =
            link.children?.find((c) => c.type === "text")?.value?.trim() ?? slug;

          pendingSups.push({ node, ctx, slug, displayNum });
          return;
        }

        if (node.tagName !== "section" || node.properties?.dataFootnotes === undefined) return;

        // Collect footnote definitions
        const ol = node.children?.find((c) => c.tagName === "ol");
        if (ol) {
          for (const li of ol.children.filter((c) => c.tagName === "li")) {
            const id = li.properties?.id;
            if (!id) continue;
            const match =
              id.match(/^user-content-fn-(.+)$/) ?? id.match(/^fn-(.+)$/);
            if (!match) continue;
            const slug = match[1];

            const content = li.children.flatMap((child) => {
              if (child.tagName === "p") {
                const filtered = child.children.filter(
                  (c) =>
                    !(c.tagName === "a" && c.properties?.dataFootnoteBackref !== undefined),
                );
                while (
                  filtered.length > 0 &&
                  filtered[filtered.length - 1].type === "text" &&
                  filtered[filtered.length - 1].value.trim() === ""
                ) {
                  filtered.pop();
                }
                return filtered;
              }
              return [child];
            });

            footnotes.set(slug, structuredClone(content));
          }
        }

        // Retroactively replace all deferred <sup> nodes now that we have content
        for (const { node: supNode, ctx: supCtx, slug, displayNum } of pendingSups) {
          const content = footnotes.get(slug);
          if (!content) continue;

          const sidenoteId = `sn-${slug}`;
          supCtx.replaceNode(supNode, {
            type: "element",
            tagName: "span",
            properties: { className: ["sidenote-wrapper"] },
            children: [
              {
                type: "element",
                tagName: "label",
                properties: {
                  htmlFor: sidenoteId,
                  className: ["sidenote-toggle", "sidenote-number"],
                },
                children: [{ type: "text", value: displayNum }],
              },
              {
                type: "element",
                tagName: "input",
                properties: {
                  type: "checkbox",
                  id: sidenoteId,
                  className: ["sidenote-toggle-checkbox"],
                },
                children: [],
              },
              {
                type: "element",
                tagName: "span",
                properties: { className: ["sidenote"] },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["sidenote-number"] },
                    children: [{ type: "text", value: displayNum }],
                  },
                  { type: "text", value: " " },
                  ...content,
                ],
              },
            ],
          });
        }
        pendingSups.length = 0;

        ctx.removeNode(node);
      },
    },
  });
};
