---
title: Find URLs in iTerm2
lastUpdatedDate: 2025-02-05
---

I always wanted to open URLs in the terminal from the command line.
To that end, I used to use tmux with a few plugins, which enabled searching for URLs and opening them.

It turns out this is built in natively to iTerm2!
Edit -> Find -> Find URLs (⌥⌘U) runs a regex over the scrollback buffer and finds "URLish things",
giving each a hotkey to open.

The only downside is that it only seems to find URLs on a single page of the scrollback buffer — it's not super consistent about what it finds.