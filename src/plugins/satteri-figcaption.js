import { defineHastPlugin } from "satteri";

// All common block-level elements. Used to detect when the traversal has moved
// past the image paragraph and reached its next sibling.
const BLOCK_FILTER = [
  "p", "ul", "ol", "figure", "blockquote",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "pre", "table", "hr", "details",
];

// Satteri-compatible port of rehype-figcaption.
//
// Finds <p> elements that contain exactly one <img> (and only whitespace text
// alongside it). If the immediately following sibling is a <ul> or <ol>, the
// first <li> becomes a <figcaption> and the <p><img> is replaced by:
//   <figure><img><figcaption>…</figcaption></figure>
// The list item is removed from the list (the list itself is removed if empty).
// If no following list exists the <p><img> is left unchanged.
//
// Exported as a factory so satteri creates fresh per-document state.
//
// Usage: hastPlugins: [satteriFigcaption]
//
// Design note: the list is replaced atomically (ctx.replaceNode on the whole
// ul/ol) rather than with chained ctx.removeNode calls on individual children.
// Chained removes cause Rust to error when a child is removed after its parent
// is already scheduled for removal in the same command batch.
export const satteriFigcaption = () => {
  // { pNode, imgNode } for the most recently visited single-image paragraph,
  // awaiting a potential list caption sibling. Null when none is pending.
  let pending = null;

  return defineHastPlugin({
    name: "figcaption",
    element: {
      filter: BLOCK_FILTER,
      visit(node, ctx) {
        if (node.tagName === "p") {
          const elementChildren = node.children.filter((c) => c.type === "element");
          if (
            elementChildren.length === 1 &&
            elementChildren[0].tagName === "img" &&
            !node.children.some((c) => c.type === "text" && c.value.trim() !== "")
          ) {
            pending = { pNode: node, imgNode: elementChildren[0] };
          } else {
            pending = null;
          }
          return;
        }

        if (!pending) return;

        // The <p><img> only has an img child — no block-level descendants —
        // so no isDescendant guard is needed here.

        if (node.tagName === "ul" || node.tagName === "ol") {
          const firstLi = node.children.find((c) => c.tagName === "li");
          if (firstLi) {
            ctx.replaceNode(pending.pNode, {
              type: "element",
              tagName: "figure",
              properties: {},
              children: [
                pending.imgNode,
                {
                  type: "element",
                  tagName: "figcaption",
                  properties: {},
                  children: firstLi.children,
                },
              ],
            });

            // Replace or remove the list atomically — avoids a chained
            // removeNode(firstLi) + removeNode(list) which can error when Rust
            // processes the parent removal before the child removal.
            const remainingChildren = node.children.filter((c) => c !== firstLi);
            if (!remainingChildren.some((c) => c.tagName === "li")) {
              ctx.removeNode(node);
            } else {
              ctx.replaceNode(node, {
                type: "element",
                tagName: node.tagName,
                properties: node.properties,
                children: remainingChildren,
              });
            }
          }
        }

        // Any non-list sibling ends the pending window (image stays as-is).
        pending = null;
      },
    },
  });
};
