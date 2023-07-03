---
title: "Relative Line Number in Vim"
lastUpdatedDate: 2023-06-15
tags: [command-line, vim]
---

Most vim actions allow a count. However, if you use absolute line numbers, you're left to calculate offsets by yourself;
if you want to jump to the end of the current function, how many lines do you need to jump?

Luckily, vim provides a better way. You can use relative line numbers to display a count of how far each line is from the current line.
In particular, if you enable the "hybrid" mode, by setting both `number` and `relativenumber` at the same time,
the current line will still show the absolute line number, which can be useful.
This makes it trivial to jump wherever you want on screen.

```vimscript
:set number relativenumber
```

However, this assumes the cursor is close to the center of the screen.
If the cursor is at the bottom, it's not as useful.
Luckily, vim also provides the `zz` command the recenter the screen on the current line.
You can also use `zt` and `zb` to put the current line at the top or bottom of the screen, respectively.

VS Code also provides a "hybrid" line number, which is useful [if using VSCodeVim or VSCode Neovim](/technical/vscode-plugins#vscode-neovim).

## References

- [Vim’s absolute, relative and hybrid line numbers](https://jeffkreeftmeijer.com/vim-number/)