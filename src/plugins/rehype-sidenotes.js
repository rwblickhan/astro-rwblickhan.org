import { visit } from "unist-util-visit";

export default function rehypeSidenotes() {
  return (tree) => {
    const footnotes = new Map();

    // First pass: collect footnote definitions, keyed by slug
    // e.g. "user-content-fn-1" → key "1", "user-content-fn-adams" → key "adams"
    visit(tree, "element", (node) => {
      if (node.tagName === "section" && node.properties?.dataFootnotes !== undefined) {
        const ol = node.children?.find((child) => child.tagName === "ol");
        if (!ol) return;

        for (const li of ol.children.filter((child) => child.tagName === "li")) {
          const id = li.properties?.id;
          if (!id) continue;

          const match = id.match(/^user-content-fn-(.+)$/) ?? id.match(/^fn-(.+)$/);
          if (!match) continue;
          const slug = match[1];

          // Extract content, stripping back-reference links
          const content = li.children.flatMap((child) => {
            if (child.tagName === "p") {
              const filtered = child.children.filter(
                (c) => !(c.tagName === "a" && c.properties?.dataFootnoteBackref !== undefined),
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
    });

    // Build a self-contained <span class="sidenote-wrapper"> for one footnote reference:
    //
    //   <span class="sidenote-wrapper">
    //     <label for="sn-{slug}" class="sidenote-toggle sidenote-number">{num}</label>
    //     <input type="checkbox" id="sn-{slug}" class="sidenote-toggle-checkbox">
    //     <span class="sidenote">
    //       <span class="sidenote-number">{num}</span>
    //       {content}
    //     </span>
    //   </span>
    function buildSidenoteWrapper(slug, displayNum) {
      const content = footnotes.get(slug);
      if (!content) return null;
      const sidenoteId = `sn-${slug}`;
      return {
        type: "element",
        tagName: "span",
        properties: { className: ["sidenote-wrapper"] },
        children: [
          {
            type: "element",
            tagName: "label",
            properties: { htmlFor: sidenoteId, className: ["sidenote-toggle", "sidenote-number"] },
            children: [{ type: "text", value: displayNum }],
          },
          {
            type: "element",
            tagName: "input",
            properties: { type: "checkbox", id: sidenoteId, className: ["sidenote-toggle-checkbox"] },
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
      };
    }

    // Second pass: replace every footnote <sup> with a self-contained sidenote wrapper.
    // Because the wrapper is inline, this works anywhere a <sup> can appear —
    // inside <p>, <li>, or any other element — without special-casing insertion logic.
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "sup" || !parent) return;

      const link = node.children?.find(
        (c) => c.tagName === "a" && c.properties?.dataFootnoteRef !== undefined,
      );
      if (!link) return;

      const href = link.properties?.href ?? "";
      const slugMatch = href.match(/^#user-content-fn-(.+)$/) ?? href.match(/^#fn-(.+)$/);
      if (!slugMatch) return;

      const slug = slugMatch[1];
      const displayNum = link.children?.find((c) => c.type === "text")?.value?.trim() ?? slug;
      const wrapper = buildSidenoteWrapper(slug, displayNum);
      if (!wrapper) return;

      parent.children[index] = wrapper;
    });

    // Third pass: remove the footnotes section
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "section" && node.properties?.dataFootnotes !== undefined) {
        parent.children.splice(index, 1);
      }
    });
  };
}
