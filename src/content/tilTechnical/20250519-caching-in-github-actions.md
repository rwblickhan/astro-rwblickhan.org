---
title: Caching in GitHub Actions
lastUpdatedDate: 2025-05-19
---

Recently, I moved this site (yes, this very one!) from [Cloudflare Pages](https://pages.cloudflare.com) to [Cloudflare Workers](https://workers.cloudflare.com) (on which more below).
So I no longer benefit from Cloudflare Page's built-in one-click deploys — I have to deploy myself via a GitHub Action.

That was _mostly_ very easy — run an `npm run build` followed by the official `cloudflare/wrangler-action`.[^wrangler]
But one complication came from Astro.

Astro optimizes images by default, which can take quite long (on the order of 5 websites for a site of my size).
Luckily, it has [image caching](https://docs.astro.build/en/guides/images/#asset-caching) in between builds.
Unluckily, GitHub Actions does not support this by default, as Cloudflare Pages did — I had to set it up manually.
Neither luckily nor unluckily, there's an official [`actions/cache`](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows) action that can support this workflow.

However, `actions/cache` was a bit of a hassle to get working, since we want to invalidate the cache when new images are added.
I read [one post](https://danielwulff.dev/blog/cache-astro-images-across-github-action-runs/) that recommended using the GitHub CLI within the workflow to delete the cache each time,
but I couldn't get that working — the GitHub CLI returned a permission error every time I tried.

I was stuck on this a bit, but eventually learned there's a `hashFiles` function in GitHub Actions.
That allows using the cache "correctly" — builds share a cache key (with the same hash value) only if no files have been added.
Astro optimizes any image files in `src/assets` by default, so I just hash all of those.

One last thing: for whatever reason, I couldn't get the default `/dist/.astro` cache directory to work.
Inspired by the blog post above, I configured Astro to use `cache/` instead, and it worked fine 🤷‍♀️

Here's the final workflow:

```yaml
name: Deploy
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Restore cached images
        uses: actions/cache@v4
        with:
          path: cache
          key: _astro-${{ hashFiles('src/assets/**/*.jpg', 'src/assets/**/*.jpeg', 'src/assets/**/*.webp', 'src/assets/**/*.webp') }}
      - run: npm ci
      - run: npm run build
      - name: Build & Deploy Site
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          wranglerVersion: "4.14.4"
```

### Aside: Porting to Workers

Workers has support for fully-static websites now via [Static Assets](https://developers.cloudflare.com/workers/static-assets/),
with the exact same limits as Pages, and Cloudflare is quietly pushing folks to switch.
So I figured I'd get it out of the way. Luckily, with the latest version of Workers, it was extremely easy.

You just have to add a `wrangler.jsonc` that defines where to find the Static Assets and any custom routes you want to serve the site at.
Here's mine:

```jsonc
{
  "name": "rwblickhanorg",
  "compatibility_date": "2025-05-14",
  "assets": {
    "directory": "./dist",
  },
  "routes": [
    {
      "pattern": "rwblickhan.org",
      "custom_domain": true,
    },
  ],
}
```

Then just run `npx wrangler@latest deploy` to deploy! (Or use the GitHub Action above.)

[^wrangler]: Do note the specified `wranglerVersion`. Static Assets is pretty new — deploys failed with the older default version of Wrangler.