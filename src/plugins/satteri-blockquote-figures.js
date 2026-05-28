import { defineHastPlugin } from "satteri";

// All common block-level elements used to detect when the traversal has moved
// past the blockquote and reached its next sibling.
const BLOCK_FILTER = [
  "blockquote", "ul", "ol",
  "p", "h1", "h2", "h3", "h4", "h5", "h6",
  "pre", "table", "hr", "figure",
];

// Count how many elements in the subtree of `node` have tagNames in `filter`.
// Used to skip exactly that many filter-matched visits after seeing a blockquote,
// so we don't mistake the blockquote's own children for its following siblings.
function countFilterDescendants(node, filter) {
  const children = node.children;
  if (!children || children.length === 0) return 0;
  let count = 0;
  for (const child of children) {
    if (child.type === "element" && filter.includes(child.tagName)) {
      count++;
    }
    count += countFilterDescendants(child, filter);
  }
  return count;
}

function buildFigure(blockquote, figcaptionChildren) {
  const bq = {
    type: "element",
    tagName: "blockquote",
    // dataBqfWrapped lets satteriBlockquoteFiguresFallback skip already-processed
    // blockquotes when it sweeps up bare ones at the end.
    properties: { ...blockquote.properties, dataBqfWrapped: true },
    children: blockquote.children,
  };
  return {
    type: "element",
    tagName: "figure",
    properties: {},
    children: figcaptionChildren
      ? [bq, { type: "element", tagName: "figcaption", properties: {}, children: figcaptionChildren }]
      : [bq],
  };
}

// Satteri-compatible port of rehype-blockquote-figures.
//
// Wraps every <blockquote> in a <figure>. If the immediately following sibling
// (skipping whitespace text nodes) is a <ul>, the first <li> becomes a
// <figcaption> and is removed from the list (the list itself is removed if it
// becomes empty).
//
// Exported as a factory so satteri creates fresh per-document state.
//
// Usage: hastPlugins: [satteriBlockquoteFigures, satteriBlockquoteFiguresFallback, ...]
//
// Design notes:
// - Broad filter (all block elements) so intervening paragraphs/headings between
//   a blockquote and an unrelated <ul> correctly clear the pending state.
// - descendantsToSkip: computed via countFilterDescendants when the blockquote is
//   visited; for that many subsequent filter-matched visits we simply decrement and
//   return, so elements *inside* the blockquote are invisible to the logic.
// - Builds figures with ctx.replaceNode in one shot (no wrapNode+insertAfter split
//   which places the figcaption outside the figure).
// - dataBqfWrapped marks processed blockquotes for the fallback plugin.
export const satteriBlockquoteFigures = () => {
  let pendingBlockquote = null;
  let descendantsToSkip = 0;

  return defineHastPlugin({
    name: "blockquote-figures",
    element: {
      filter: BLOCK_FILTER,
      visit(node, ctx) {
        // Skip visits that are descendants of the pending blockquote.
        if (descendantsToSkip > 0) {
          descendantsToSkip--;
          return;
        }

        if (node.tagName === "blockquote") {
          if (pendingBlockquote) {
            ctx.replaceNode(pendingBlockquote, buildFigure(pendingBlockquote, null));
          }
          pendingBlockquote = node;
          descendantsToSkip = countFilterDescendants(node, BLOCK_FILTER);
          return;
        }

        if (!pendingBlockquote) return;

        if (node.tagName === "ul") {
          const firstLi = node.children.find((c) => c.tagName === "li");
          if (firstLi) {
            ctx.replaceNode(pendingBlockquote, buildFigure(pendingBlockquote, firstLi.children));
            const remainingChildren = node.children.filter((c) => c !== firstLi);
            if (!remainingChildren.some((c) => c.tagName === "li")) {
              ctx.removeNode(node);
            } else {
              ctx.replaceNode(node, {
                type: "element",
                tagName: "ul",
                properties: node.properties,
                children: remainingChildren,
              });
            }
          } else {
            ctx.replaceNode(pendingBlockquote, buildFigure(pendingBlockquote, null));
          }
        } else {
          // Any other non-descendant sibling: wrap the blockquote bare.
          ctx.replaceNode(pendingBlockquote, buildFigure(pendingBlockquote, null));
        }

        pendingBlockquote = null;
      },
    },
  });
};

// Fallback plugin: wraps any bare blockquotes that the main plugin didn't handle
// (e.g. a blockquote at the very end of the document with no following sibling).
// Blockquotes processed by the main plugin have dataBqfWrapped on their copy
// inside the figure; the fallback removes that marker and skips them.
export const satteriBlockquoteFiguresFallback = defineHastPlugin({
  name: "blockquote-figures-fallback",
  element: {
    filter: ["blockquote"],
    visit(node, ctx) {
      if (node.properties?.dataBqfWrapped) {
        ctx.setProperty(node, "dataBqfWrapped", null);
        return;
      }
      ctx.wrapNode(node, { type: "element", tagName: "figure", properties: {}, children: [] });
    },
  },
});
