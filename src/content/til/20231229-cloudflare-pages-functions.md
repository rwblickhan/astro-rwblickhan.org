---
title: "Cloudflare Pages Functions"
lastUpdatedDate: 2023-12-29
tags: [infrastructure]
---

Cloudflare has an easy way to build simple APIs for otherwise-static sites running on [Cloudflare Pages](https://pages.cloudflare.com), which is what I use to host most of my sites.

Just add a `functions/` directory and Cloudflare will set up endpoints with a file-system-based routing structure, e.g. `functions/api/leaderboard.ts` will end up at `/api/leaderboard`.
Add a couple exports for the HTTP verbs you want to support and you're golden:

```typescript
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const scores = await getScores();
  return new Response(JSON.stringify(scores));
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
    await updateScores(context);
    return new Response();
};
```

The nice part is that Pages Functions has [bindings](https://developers.cloudflare.com/pages/functions/bindings/) for various other Cloudflare services, like Workers KV, which lets you set up a "backend" by just adding a couple calls to the appropriate API.
[TypeScript](https://developers.cloudflare.com/pages/functions/typescript/) is easy to set up as well.

## References

- ["Functions"](https://developers.cloudflare.com/pages/functions/)