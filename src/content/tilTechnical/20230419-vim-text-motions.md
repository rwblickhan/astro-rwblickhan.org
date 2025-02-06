---
title: "Vim Text Motions"
lastUpdatedDate: 2025-02-05
---

In vim, in addition to basic directional commands like `h`,`j`,`k`,`l` and word motions like `w`, there's a number of other useful text motions:

- `(`: Jump backward by sentences.
- `)`: Jump forward by sentences.
- `{`: Jump backward by paragraphs.
- `}`: Jump forward by paragraphs.
- `[(`: Jump backward by unmatched parentheses.
- `[)`: Jump forward by unmatched parentheses.
- `[{`: Jump backward by unmatched curly brackets.
- `[}`: Jump forward by unmatched curly brackets.

Each of these also take a count, so for instance you can do `2{` to jump backwards by 2 paragraphs.

## References

- ["Text object motions"](https://vimhelp.org/motion.txt.html#object-motions)