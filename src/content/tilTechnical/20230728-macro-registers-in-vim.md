---
title: "Macro Registers in Vim"
lastUpdatedDate: 2024-04-11
tags: [command-line, vim]
---

The registers used for recording macros in vim are actually just the normal registers!
That means that you can record a macro, then print it to the buffer, fix issues, and yank it back to the register.

For instance, if I record a simple macro, like `qa2dw`, I can print it back out with `"ap` and get `2dw`.
If I then edit that text to read `3dw` and yank it to register `a` with `"ay`, the macro will perform `3dw` instead!

## References

- ["Using registers", Neovim Manual](https://neovim.io/doc/user/usr_10.html#_using-registers)