---
title: "Vim Text Objects"
lastUpdatedDate: 2023-04-15
tags: [command-line, vim]
---

Most vim commands take text objects. For instance, we can do `diw` for **d**elete **i**n **w**ord or `daw` for **d**elete **a**round **w**ord, which includes the delimiters as well. I use `w` pretty heavily, but there's actually a lot of other useful options:

- `s`: sentence
- `p`: paragraph
- `"`: contents within double quotes
- `'`: contents within single quotes
- `\``: contents within backticks
- `(` or `)`: contents within parentheses
- `[` or `]`: contents within square brackets
- `{` or `}`: contents within curly brackets/braces
- `t`: contents within HTML tags like `<a></a>`

With the [CamelCaseMotion.vim](https://github.com/bkad/CamelCaseMotion) plugin, supported by VS Code's vim implementation, we also get `\w` for camel-case and snake-case words. With the [surround.vim](https://github.com/tpope/vim-surround) plugin, also supported by VS Code's vim implementation, we can change the surrounding delimiters in addition to the contents inside.

## Sources

- ["Vim Text Objects: The Definitive Guide"](https://blog.carbonfive.com/vim-text-objects-the-definitive-guide/)