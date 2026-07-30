import { execFileSync } from "node:child_process";
import path from "node:path";
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import pagefind from "astro-pagefind";
import sitemap from "@astrojs/sitemap";
import {
  satteriBlockquoteFigures,
  satteriBlockquoteFiguresFallback,
} from "./src/plugins/satteri-blockquote-figures.js";
import { satteriFigcaption } from "./src/plugins/satteri-figcaption.js";
import { satteriSidenotes } from "./src/plugins/satteri-sidenotes.js";
import { satteriA11yEmoji } from "./src/plugins/satteri-a11y-emoji.js";

function workspaceRoot() {
  try {
    return execFileSync("jj", ["workspace", "root", "--name", "default", "--ignore-working-copy"], {
      encoding: "utf8",
    }).trim();
  } catch {
    return execFileSync("git", ["rev-parse", "--show-toplevel"], {
      encoding: "utf8",
    }).trim();
  }
}

export default defineConfig({
  site: "https://rwblickhan.org",
  integrations: [pagefind(), sitemap()],
  cacheDir: process.env.ASTRO_CACHE_DIR ?? path.join(workspaceRoot(), "cache"),
  image: {
    responsiveStyles: true,
    layout: "constrained",
    breakpoints: [640, 1080, 1280, 1920],
  },
  markdown: {
    processor: satteri({
      features: { math: false },
      hastPlugins: [
        satteriA11yEmoji,
        satteriBlockquoteFigures,
        satteriBlockquoteFiguresFallback,
        satteriFigcaption,
        satteriSidenotes,
      ],
    }),
  },
});
