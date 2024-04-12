---
title: "Abbreviations in Vim"
lastUpdatedDate: 2024-04-11
tags: [command-line, vim]
---

vim has an abbreviation system:

```vimscript
:iabbrev calc calculate
```

Then, any time you type `calc` followed by a non-word character in insert mode, it'll expand to `calculate`.
You can even abbreviate multiple words like `:iabbrev JB Jack Benny`!

Alternatively, I might use [Raycast's snippets with a keyword](https://manual.raycast.com/snippets) to get the same behavior,
which has the benefit of also working outside vim.

## References

- ["abbreviations", vimhelp](https://vimhelp.org/map.txt.html#abbreviations)
- ["Abbreviations", Neovim Manual](https://neovim.io/doc/user/usr_24.html#24.7)