---
title: "Smartcase in Vim"
lastUpdatedDate: 2024-04-11
tags: [command-line, vim]
---

Vim's search function when you press `/` defaults to case-sensitive, which I've always found pretty annoying.
It turns out you can enable "smartcase", where search is case-insensitive unless you use uppercase characters in the search, pretty easily:

```vimscript
:set ignorecase smartcase
```

Do note that you have to enable *both* `ignorecase` and `smartcase`, or else the `smartcase` option does nothing.