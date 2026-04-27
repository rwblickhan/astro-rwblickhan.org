import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";
import sitemap from "@astrojs/sitemap";
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import rehypeBlockquoteFigures from "rehype-blockquote-figures";
import rehypeFigcaption from "rehype-figcaption";
import rehypeSidenotes from "./src/plugins/rehype-sidenotes.js";

export default defineConfig({
  site: "https://rwblickhan.org",
  integrations: [pagefind(), sitemap()],
  cacheDir: process.env.ASTRO_CACHE_DIR ?? "../cache",
  image: {
    responsiveStyles: true,
    layout: "constrained",
    breakpoints: [640, 1080, 1280, 1920],
  },
  markdown: {
    remarkPlugins: [remarkA11yEmoji],
    rehypePlugins: [rehypeBlockquoteFigures, rehypeFigcaption, rehypeSidenotes],
  },
});
