import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import pagefind from "astro-pagefind";
import sitemap from "@astrojs/sitemap";
import { satteriBlockquoteFigures, satteriBlockquoteFiguresFallback } from "./src/plugins/satteri-blockquote-figures.js";
import { satteriFigcaption } from "./src/plugins/satteri-figcaption.js";
import { satteriSidenotes } from "./src/plugins/satteri-sidenotes.js";
import { satteriA11yEmoji } from "./src/plugins/satteri-a11y-emoji.js";

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
    processor: satteri({
      features: { math: false },
      hastPlugins: [satteriA11yEmoji, satteriBlockquoteFigures, satteriBlockquoteFiguresFallback, satteriFigcaption, satteriSidenotes],
    }),
  },
});
