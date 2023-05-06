---
title: "* and # in vim"
lastUpdatedDate: 2023-05-03
tags: [command-line, vim]
---

When in normal mode in vim, you can use `*` to start searching forwards for the word underneath the cursor and `#` to search backwards.
You can then use `n` and `N` to jump forward and backward, like a regular search.
You can also use `g*` and `g#` to find matches that aren't a whole word themselves, e.g. find `line` by searching on `in`.

## References

- ["Search commands"](https://vimhelp.org/pattern.txt.html#search-commands)