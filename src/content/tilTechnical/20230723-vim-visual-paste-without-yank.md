---
title: "Visual Paste without Yank in Vim"
lastUpdatedDate: 2025-02-05
---

A common pattern I follow in vim is yanking some text, then making a visual selection
(with `v`, for single characters, or `V`, for lines) and pasting with `p` to replace the visual selection.
That's as close as vim gets to a standard Cmd-c/Cmd-v flow that most text editing has.

One annoyance I've always had, however, is that a visual paste with `p` will put whatever was replaced in the unnamed register,
which is what `p` defaults to. So you can't make the same replacement multiple times - you have to re-yank before pasting again or specify the "yank register" with `"0p`.
However, it turns out that more recent versions of vim fix that - if you use `P` instead of `p`,
your visual paste will *not* overwrite the unnamed register.

## References

- [put-Visual-mode v_p v_P](https://vimhelp.org/change.txt.html#v_P)
