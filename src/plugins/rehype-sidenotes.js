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

    // Helper: build the label/input/aside nodes for one footnote reference.
    function buildSidenoteNodes(slug, displayNum) {
      const content = footnotes.get(slug);
      if (!content) return null;
      const sidenoteId = `sn-${slug}`;
      return {
        label: {
          type: "element",
          tagName: "label",
          properties: { htmlFor: sidenoteId, className: ["sidenote-toggle", "sidenote-number"] },
          children: [{ type: "text", value: displayNum }],
        },
        input: {
          type: "element",
          tagName: "input",
          properties: { type: "checkbox", id: sidenoteId, className: ["sidenote-toggle-checkbox"] },
          children: [],
        },
        aside: {
          type: "element",
          tagName: "aside",
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
      };
    }

    // Helper: replace <sup> refs within a children array with inline <label>s,
    // collecting the corresponding input+aside pairs into toInsert.
    // skipTags: set of tagNames not to recurse into (used to avoid double-processing).
    function replaceSupsIn(children, toInsert, skipTags) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "sup") {
          const link = child.children?.find(
            (c) => c.tagName === "a" && c.properties?.dataFootnoteRef !== undefined,
          );
          if (!link) continue;
          const href = link.properties?.href ?? "";
          const slugMatch = href.match(/^#user-content-fn-(.+)$/) ?? href.match(/^#fn-(.+)$/);
          if (!slugMatch) continue;
          const slug = slugMatch[1];
          const displayNum = link.children?.find((c) => c.type === "text")?.value?.trim() ?? slug;
          const nodes = buildSidenoteNodes(slug, displayNum);
          if (!nodes) continue;
          children[i] = nodes.label;
          toInsert.push(nodes.input, nodes.aside);
        } else if (child.children && !skipTags.has(child.tagName)) {
          replaceSupsIn(child.children, toInsert, skipTags);
        }
      }
    }

    // Second pass: replace <sup> refs with sidenote markup.
    //
    // For <p>: insert input+aside as siblings after the <p> in its parent.
    //   (valid HTML; checkbox trick works since input and aside are siblings)
    //
    // For <li> (tight lists, where <sup> is a direct child of <li> with no <p>
    //   wrapper): append input+aside inside the <li>.
    //   Don't recurse into child <p> elements — the <p> visitor handles those.
    visit(tree, "element", (node, index, parent) => {
      if (!parent) return;

      if (node.tagName === "p") {
        const toInsert = [];
        replaceSupsIn(node.children, toInsert, new Set());
        if (toInsert.length > 0) {
          parent.children.splice(index + 1, 0, ...toInsert);
        }
      } else if (node.tagName === "li") {
        const toInsert = [];
        replaceSupsIn(node.children, toInsert, new Set(["p"]));
        if (toInsert.length > 0) {
          node.children.push(...toInsert);
        }
      }
    });

    // Third pass: remove the footnotes section
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "section" && node.properties?.dataFootnotes !== undefined) {
        parent.children.splice(index, 1);
      }
    });
  };
}
