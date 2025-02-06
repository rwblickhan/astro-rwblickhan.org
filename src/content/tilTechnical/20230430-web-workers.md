---
title: "Web Workers"
lastUpdatedDate: 2025-02-05
---

I've got a [search page](/search), using [Fuse.js](https://fusejs.io) to do searching on the client-side.
I wanted to move it to a background thread to improve performance, since searches are sometimes slow enough to block interaction on the main thread.
The [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) seems to be the standard way to do that.

Luckily, that was pretty straightforward!
I implemented [`search-worker.ts`](https://github.com/rwblickhan/astro-rwblickhan.org/blob/main/src/search-worker.ts), which listens for messages via `onmessage`, calls the Fuse API to retrieve results given a query, and returns those results to the main page via `postMessage`.
The [main search component](https://github.com/rwblickhan/astro-rwblickhan.org/blob/main/src/components/Search.tsx) sends the current query via `postMessage`.
And... that's about it! Search still works, now without blocking the main thread.

The one tricky part was getting this to build in Astro, which uses Vite for compilation.
That required a quick trip to the [Vite docs](https://vitejs.dev/guide/features.html#web-workers), which explains that I have to create a `Worker` like so:

```javascript
new Worker(new URL("../search-worker", import.meta.url), {
    type: "module",
});
```

As long as `search-worker.ts` is in the `src/` directory and *not* the `public/` directory, Vite will compile and bundle this correctly.

## References

- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Playing with React Hooks and Web Workers](https://blog.axlight.com/posts/playing-with-react-hooks-and-web-workers/)