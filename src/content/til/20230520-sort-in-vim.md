---
title: ":sort in vim"
lastUpdatedDate: 2023-05-20
tags: [command-line, vim]
---

vim has a built-in sorting function. Specify a range or a visual selection and run `:sort` in command mode to sort the given lines. You can also do things like:

- `:sort!` to invert the order.
- `:sort i` to ignore case.
- `:sort u` to deduplicate the lines.
- `:sort n` or `:sort f` for integer or float numeric sorting; in particular, these will sort by the first number on each line.
- `:sort /pattern/` to ignore a pattern and `:sort /pattern/ r` to sort based on pattern.

## References

- ["Sorting text"](https://neo.vimhelp.org/change.txt.html#sorting)
- ["A Vim Guide for Advanced Users", "Sorting Text"](https://thevaluable.dev/vim-advanced/#sorting-text)