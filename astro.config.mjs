import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkA11yEmoji from "@fec/remark-a11y-emoji";

export default defineConfig({
  site: "https://rwblickhan.org",
  integrations: [mdx(), pagefind(), sitemap()],
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
    ],
  },
});
