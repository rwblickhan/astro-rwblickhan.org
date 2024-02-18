---
title: "fzf Preview Options"
lastUpdatedDate: 2024-02-18
tags: [command-line, fzf]
---

[fzf](https://github.com/junegunn/fzf) is one of my all-time favourite pieces of software;
it allows you to fuzzy-find entries in a list, which I use [all over my dotfiles](https://rwblickhan.org/technical/dotfiles/).
It has an absurd amount of additional functionality, however, some of which I'll explore now.

One of my favorite little command-line utilities, based off [an example](https://github.com/junegunn/fzf/blob/master/ADVANCED.md#ripgrep-integration) in the fzf docs, combines fzf and [ripgrep](https://github.com/BurntSushi/ripgrep) to do fancy searching:

```fish
function rfv --description 'rg tui built with fzf and bat'
    # https://github.com/junegunn/fzf/blob/master/ADVANCED.md#using-fzf-as-the-secondary-filter
    rg --smart-case --color=always --line-number --no-heading "$argv" |
        fzf -m --ansi \
            --color 'hl:-1:underline,hl+:-1:underline:reverse' \
            --delimiter ':' \
            --preview "bat --color=always {1} --theme='Solarized (light)' --highlight-line {2}" \
            --preview-window 'up,60%,border-bottom,+{2}+3/3,~3' \
            --bind "enter:become(code_demux {+1..2})"
end
```

There's a lot going on here, but basically it runs a regex with `rg` and pipes the results into `fzf` to multiselect.
Then it [binds `enter:become`](https://github.com/junegunn/fzf?tab=readme-ov-file#turning-into-a-different-process) to open the selected files in VS Code at the right line.

The part to focus on here is the bit inside `enter:become(...)`.
fzf has a number of [preview options](https://www.mankier.com/1/fzf#Options-Preview) that can also be used with bindings.
In particular, `{}` contains the string representation of a single selection and `{+}` contains a space-separated list of strings for multiselection.
You can also use `{q}` for the query string and `{n}` or `{+n}` for the index numbers of selections.

You can go a step farther and parse the selection with [field index expressions](https://www.mankier.com/1/fzf#Field_Index_Expression).
In particular, within this `rfv` utility, `fzf` will output the file name and the line number of the match, separated by a colon, along with further colon-separated metadata.
`1..2` grabs the first two fields and leaves the rest, so `{+1..2}` will provide a space-separated list of filename/line number pairs to open.

The last weird part here is `code_demux`.
That's necessary because, though VS Code's command-line interface does have a flag to open a particular file at a particular line number (`code -g file:line`), it only works for one file at a time.
So `code_demux` is a fish function that just takes the space-separated list and makes a bunch of calls to `code -g`:

```fish
function code_demux
    for arg in $argv
        code -g $arg
    end
end
```

## References

- ["Preview"](https://www.mankier.com/1/fzf#Options-Preview), fzf manpage