import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import rehypeBlockquoteFigures from "rehype-blockquote-figures";
import rehypeFigcaption from "rehype-figcaption";
import rehypeSidenotes from "./src/plugins/rehype-sidenotes.js";
import remarkDirective from "remark-directive";
import mdx from "@astrojs/mdx";
import { visit } from "unist-util-visit";
import { h } from "hastscript";

function remarkHtmlDirectives() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        const data = node.data || (node.data = {});
        data.hName = node.name;
        data.hProperties = h(node.name, node.attributes || {}).properties;
      }
    });
  };
}

export default defineConfig({
  site: "https://rwblickhan.org",
  integrations: [pagefind(), sitemap(), mdx()],
  cacheDir: process.env.ASTRO_CACHE_DIR ?? "../cache",
  image: {
    responsiveStyles: true,
    layout: "constrained",
    breakpoints: [640, 1080, 1280, 1920],
  },
  markdown: {
    remarkPlugins: [
      // Generate a table of contents if we see a "Table of Contents" header
      [remarkToc, { maxDepth: 2 }],
      [
        // Collapse the generated table of contents into a <details> tag
        remarkCollapse,
        {
          test: "Table of Contents",
        },
      ],
      remarkA11yEmoji,
      remarkDirective,
      remarkHtmlDirectives,
    ],
    rehypePlugins: [rehypeBlockquoteFigures, rehypeFigcaption, rehypeSidenotes],
  },
});
