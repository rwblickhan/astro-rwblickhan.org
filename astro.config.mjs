import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: "https://rwblickhan.org",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    image({ serviceEntryPoint: "@astrojs/image/sharp" }),
  ],
  markdown: {
    remarkPlugins: [
      // Generate a table of contents if we see a "Table of Contents" header
      remarkToc,
      [
        // Collapse the generated table of contents into a <details> tag
        remarkCollapse,
        {
          test: "Table of Contents",
        },
      ],
    ],
  },
});
