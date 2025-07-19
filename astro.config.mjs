import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import rehypeBlockquoteFigures from "rehype-blockquote-figures";
import remarkDirective from "remark-directive";
import mdx from "@astrojs/mdx";
import { visit } from "unist-util-visit";
import { h } from "hastscript";

function remarkAsideDirective() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (node.name !== "aside") return;

        const data = node.data || (node.data = {});
        const tagName = "aside";

        data.hName = tagName;
        data.hProperties = h(tagName, node.attributes || {}).properties;
      }
    });
  };
}

function remarkHrDirective() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (node.name !== "hr") return;

        const data = node.data || (node.data = {});
        const tagName = "hr";

        data.hName = tagName;
        data.hProperties = h(tagName, node.attributes || {}).properties;
      }
    });
  };
}

export default defineConfig({
  site: "https://rwblickhan.org",
  integrations: [pagefind(), sitemap(), mdx()],
  cacheDir: "./cache",
  experimental: {
    contentIntellisense: true,
  },
  markdown: {
    remarkPlugins: [
      // Generate a table of contents if we see a "Table of Contents" header
      [remarkToc, { maxDepth: 3, skip: "See Also|Details" }],
      [
        // Collapse the generated table of contents into a <details> tag
        remarkCollapse,
        {
          test: "Table of Contents",
        },
      ],
      remarkA11yEmoji,
      remarkDirective,
      remarkAsideDirective,
      remarkHrDirective,
    ],
    rehypePlugins: [rehypeBlockquoteFigures],
  },
});
