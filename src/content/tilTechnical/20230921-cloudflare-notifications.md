---
title: "Cloudflare Notifications"
lastUpdatedDate: 2025-02-05
---

I use [Cloudflare Pages](https://pages.cloudflare.com) to build this site, and in particular I use the built-in GitHub integration because the build process is pretty simple (just run `pnpm run build` and you're golden).
Until recently, I was annoyed that I never got an email when a build failed and there didn't seem to be a way to enable it from the Pages console.

However! I recently learned about [Cloudflare Notifications](https://developers.cloudflare.com/notifications/), which allow you to get email notifications (or, if you pay, a PagerDuty integration) for all kinds of events in your Cloudflare account - including failed Pages builds.
So, following the instructions, I went into my account and enabled the Pages -> Project updates -> Build failed notification, and it just worked!