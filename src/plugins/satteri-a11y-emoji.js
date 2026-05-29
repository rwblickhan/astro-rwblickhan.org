import { defineHastPlugin } from "satteri";
import emojiRegex from "emoji-regex";
import { gemoji as gemojiData } from "gemoji";

// Skin-tone modifier codepoints → human-readable label
const SKIN_TONES = {
  "\u{1F3FB}": "skin tone 2",
  "\u{1F3FC}": "skin tone 3",
  "\u{1F3FD}": "skin tone 4",
  "\u{1F3FE}": "skin tone 5",
  "\u{1F3FF}": "skin tone 6",
};

const SKIN_TONE_RE = new RegExp(
  Object.keys(SKIN_TONES)
    .map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|"),
  "g",
);

// Build emoji → description lookup. Also index bare form (without variation
// selector U+FE0F) since text may omit it while gemoji includes it.
const emojiDesc = new Map();
for (const entry of gemojiData) {
  emojiDesc.set(entry.emoji, entry.description);
  if (entry.emoji.endsWith("️")) {
    emojiDesc.set(entry.emoji.slice(0, -1), entry.description);
  }
}

function getDescription(emoji) {
  const toneMatch = emoji.match(SKIN_TONE_RE);
  const tone = toneMatch?.[0];
  const base = emoji.replace(SKIN_TONE_RE, "");
  const desc = emojiDesc.get(base) ?? emojiDesc.get(base + "️") ?? "";
  if (!desc) return "";
  return tone ? `${desc} (${SKIN_TONES[tone]})` : desc;
}

function emojiSpan(emoji) {
  const label = getDescription(emoji);
  return label
    ? {
        type: "element",
        tagName: "span",
        properties: { role: "img", ariaLabel: label },
        children: [{ type: "text", value: emoji }],
      }
    : { type: "text", value: emoji };
}

// Satteri-compatible port of @fec/remark-a11y-emoji.
//
// Wraps each emoji character in <span role="img" aria-label="…"> so that
// screen readers announce the emoji's name rather than its codepoint.
//
// Runs at HAST level using the bare `text` visitor, which fires for every text
// node. Emojis inside code blocks are naturally safe: Shiki replaces those
// pre elements entirely using ctx.textContent (which strips tags), so any span
// wrappers we add to code-block text nodes are overwritten.
//
// Algorithm: split the text value into alternating plain-text/emoji segments
// and use ctx.insertAfter + ctx.setProperty to replace the single text node
// with the full sequence of nodes in-place, without needing parent access.
// Insertions happen in reverse order so that each new node is pushed
// immediately after the original, giving the correct final document order.
//
// Usage: hastPlugins: [satteriA11yEmoji, ...]
export const satteriA11yEmoji = defineHastPlugin({
  name: "a11y-emoji",
  text(node, ctx) {
    const value = node.value;
    const re = emojiRegex();

    // Fast path: skip nodes with no emojis.
    if (!re.test(value)) return;
    re.lastIndex = 0;

    // Build alternating [text?, emoji, text?, emoji, …, text?] segments.
    const segments = [];
    let last = 0;
    let match;
    while ((match = re.exec(value)) !== null) {
      if (match.index > last) {
        segments.push({ kind: "text", value: value.slice(last, match.index) });
      }
      segments.push({ kind: "emoji", value: match[0] });
      last = match.index + match[0].length;
    }
    if (last < value.length) {
      segments.push({ kind: "text", value: value.slice(last) });
    }

    if (segments.length === 0) return;

    // ctx.insertAfter(node, X) appends X to the END of the chain that starts
    // at node, so forward iteration produces the correct final document order.
    // If the first segment is plain text, reuse the original node for it
    // (avoiding an unnecessary extra empty text node).
    const firstIsText = segments[0].kind === "text";
    const insertStart = firstIsText ? 1 : 0;

    for (let i = insertStart; i < segments.length; i++) {
      const seg = segments[i];
      ctx.insertAfter(
        node,
        seg.kind === "text"
          ? { type: "text", value: seg.value }
          : emojiSpan(seg.value),
      );
    }

    // Reuse the original node for the first text segment, or empty it.
    ctx.setProperty(node, "value", firstIsText ? segments[0].value : "");
  },
});
