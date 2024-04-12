---
title: "Fish Shell Directory History"
lastUpdatedDate: 2024-04-11
tags: [command-line, shell, fish]
---

[fish shell](https://fishshell.com) has two built-in functions, [`nextd`](https://fishshell.com/docs/current/cmds/nextd.html) and [`prevd`](https://fishshell.com/docs/current/cmds/prevd.html), that let you jump between recently visited directories in a stack-like manner.

```sh
cd ~/Developer
cd ~/Documents
nextd # Working directory is now ~/Developer
prevd # Working directory is now ~/Documents
```

You can also use [`dirh`](https://fishshell.com/docs/current/cmds/dirh.html) to print the directory stack and [`cdh`](https://fishshell.com/docs/current/cmds/cdh.html) for an interactive navigator (which doesn't work _that_ well, in my experience).

However, an extra neat fact is that `nextd` and `prevd` have [default keybindings](https://fishshell.com/docs/current/interactive.html#id13)! With an empty command line, press `Alt+←` (`Option+←` on Macs) for `prevd` and `Alt+→` (`Option+→` on Macs) for `nextd`.

## References

- ["Directory history"](https://fishshell.com/docs/current/interactive.html#id13), fish documentation