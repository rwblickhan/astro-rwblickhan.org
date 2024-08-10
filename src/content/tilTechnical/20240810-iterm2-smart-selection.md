---
title: Smart Selection in iTerm2
lastUpdatedDate: 2024-08-10
tags: [command-line]
---

iTerm2 has a smart-selection feature
Quadruple-click in the scrollback buffer and iTerm will try to "smart select" an item, like a filesystem path or a quoted string.
You can also configure this to happen on double-click instead.
This is pretty handy for copy/pasting text from the terminal, especially if you also enable the "copy to clipboard on selection" option.

Unfortunately, by default the quoted-strings smart selection only recognizes double quotes, not single quotes.
Luckily, you can update this or even add completely new smart selections by editing the regexes in settings!
I updated the quotes smart selection to also respect single quotes, which is perfect for those messages like "command not found; did you mean 'pnpm run test'?".

## References

* [Smart Selection](https://iterm2.com/documentation-smart-selection.html)
