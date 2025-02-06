---
title: Using Shoelace with Preact + Vite
lastUpdatedDate: 2025-02-05
---

I recently wanted to spruce up [my spicy questions site](https://spicy-questions.rwblickhan.org) with the addition of [Shoelace](https://shoelace.style) components. That was surprisingly difficult using Vite + Preact.

First up: install Shoelace directly with npm, instead of loading it from a CDN.

```sh
npm install @shoelace-style/shoelace
```

Shoelace depends on a bunch of SVG assets, which are also normally loaded from a CDN. If you want to bundle them, you have to make sure they’re copied from Shoelace into some public directory. So, in `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@shoelace-style/shoelace/dist/assets/**/*",
          dest: "./shoelace_assets"
        }
      ]
    })
  ]
});
```

Which requires installing `vite-plugin-static-copy`:

```sh
pnpm install -D vite-plugin-static-copy
```

Then you have to make sure that the Shoelace components know where to get assets, so somewhere at the top level of your app, you have to set the base path:

```typescript
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
setBasePath("./shoelace_assets");
```

It is **vitally** important that you “cherry-pick” from the specific `dist/utilitie/base-path.js` file, or else the **entirety** of Shoelace will be bundled, and the output JavaScript will be hundreds of kilobytes, even gzip’d.

You also have to make sure to import Shoelace’s CSS:

```typescript
import "@shoelace-style/shoelace/dist/themes/light.css";
```

Then, in your actual Preact, you can import the React wrapper for the appropriate Shoelace component:

```typescript
import SlButton from "@shoelace-style/shoelace/dist/react/button/index.js";

export function App() {
    return <SlButton>Click me!</SlButton>
}
```

Again, it is **vitally** important that you cherry-pick directly from the appropriate `index.js` file.

Finally, Shoelace recommends turning on Preact’s React-compat mode, if you haven’t already, so over in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "react": ["./node_modules/preact/compat/"],
      "react-dom": ["./node_modules/preact/compat/"]
    },
    // ... and other stuff
  },
}
```

And then, finally, you should have working components. Annoyingly, the bundle size is still on the high side, but 🤷‍♀️