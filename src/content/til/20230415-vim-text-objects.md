---
title: "Vim Text Objects"
lastUpdatedDate: 2023-04-15
tags: [command-line, vim]
---

Most vim commands take text objects. For instance, we can do `diw` for **d**elete **i**n **w**ord or `daw` for **d**elete **a**round **w**ord, which includes the delimiters as well. I use `w` pretty heavily to select alphanumeric words, but there's actually a lot of other useful options:

- `W`: whitespace-delimited word
- `s`: sentence
- `p`: paragraph
- `"`: contents within double quotes
- `'`: contents within single quotes
- `\``: contents within backticks
- `(` or `)`: contents within parentheses
- `[` or `]`: contents within square brackets
- `{` or `}`: contents within curly brackets/braces
- `<` or `>`: contents within angle brackets
- `t`: contents within HTML tags like `<a></a>`

Two plugins supported by [`VSCodeVim`](https://github.com/VSCodeVim/Vim) implementation make this even more powerful:

- [CamelCaseMotion.vim](https://github.com/bkad/CamelCaseMotion): Adds `\w` for camel-case and snake-case words.
- [surround.vim](https://github.com/tpope/vim-surround): Adds options for changing surrounding delimiters in addition to the contents inside.
- [targets.vim](https://github.com/wellle/targets.vim): Adds smarter quote selection and separators like `*` (only partially supported by `VSCodeVim`).

## References

- ["Vim Text Objects: The Definitive Guide"](https://blog.carbonfive.com/vim-text-objects-the-definitive-guide/)
- ["Text object selection"](https://vimhelp.org/motion.txt.html#object-select)