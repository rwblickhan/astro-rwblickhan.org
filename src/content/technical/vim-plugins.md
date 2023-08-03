---
title: "Vim Plugins"
lastUpdatedDate: 2023-08-02
description: "An evergreen list of vim plugins I use."
---

I use quite a few vim plugins, but most of them are relatively simple editing plugins that introduce new text objects or commands.
I shy away from more complicated plugins that try to turn vim into a fully-featured IDE.
vim should be focused on text editing! If I want an IDE, I'll use an IDE... with the vim mode enabled 😉

## Table of Contents

## vim-plug

I use [vim-plug](https://github.com/junegunn/vim-plug) for plugin installation and management.
Arguably, I don't even need a plugin manager, but vim-plug is about as simple as can be.

## sensible.vim

[sensible.vim](https://github.com/tpope/vim-sensible) sets a bunch of options that "everyone can agree on."
It's less useful for neovim, where many of these are actually the defaults, but it doesn't hurt to include it.

## Visual Line Remap

I almost always want to navigate up and down visual lines, respecting line wrapping, instead of logical lines.
Hence, I remap the default `j` and `k` to their visual line equivalents:

```vimscript
nmap j gj
nmap k gk
```

## Send Yanks to Clipboard

I've always found vim's register system a hassle; I use [Raycast](https://www.raycast.com) for my clipboard history needs, but that only works if vim is yanking to the clipboard.
Luckily, putting all yanks into the clipboard is easy:

```vimscript
set clipboard+=unnamedplus
```

## Highlighted Yanks

When yanking, especially with [text objects](/technical/til/20230415-vim-text-objects), I want the yanked text to be highlighted briefly to make sure I actually yanked the right thing.
In neovim, that can be done with this function:

```vimscript
augroup highlight_yank
    autocmd!
    autocmd TextYankPost * silent! lua vim.highlight.on_yank { higroup="IncSearch", timeout=250 }
augroup END
```

## commentary.vim

[commentary.vim](https://github.com/tpope/vim-commentary) provides the `gc` action to comment or uncomment a line, supporting most common programming languages.

## surround.vim

[surround.vim](https://github.com/tpope/vim-surround) provides actions for working with "surroundings" like parentheses and quotation marks.
`ys` adds a surrounding pair, `cs` changes a surrounding pair, and `ds` deletes a surrounding pair.

This is useful when, for instance, I want to change a bare JavaScript string, surrounded by quotation marks, into an interpolated string, surrounded by backticks.
It can also be useful to delete nested HTML tags with `dst`.

## targets.vim

I'm a big fan of [text objects](/technical/til/20230415-vim-text-objects), and [targets.vim](https://github.com/wellle/targets.vim) adds a whole bunch more.
Notably, I like being able to use pairs of `*`s as a text object, particularly when [editing Markdown](/technical/vscode-plugins#markdown-all-in-one).

## CamelCaseMotion

Curiously, neither vim itself nor targets.vim provides a text object or text motion for camel-case or snake-case words, which are omnipresent in most programming languages.
[CamelCaseMotion](https://github.com/bkad/CamelCaseMotion) fixes that with the introduction of `\w` for camel-case and snake-case words.

## vim-swap

[vim-swap](https://github.com/machakann/vim-swap) provides new commands, `g<` and `g>`, for moving around arguments to C-style functions,
which doesn't often come up but is a nice quality-of-life improvement when it does.

## speeddating.vim

vim has `<C-a>` and `<C-x>` for [numeric increment and decrement](/technical/til/20230527-numeric-increment-decrement-in-vim), but they don't play well with dates formatted like YYYY-MM-DD;
they interpret the months and days as negative numbers. [speeddating.vim](https://github.com/tpope/vim-speeddating) fixes them to respect date formatting.

## repeat.vim

[repeat.vim](https://github.com/tpope/vim-repeat) fixes the `.` repeat command for some of the previous plugins, notably surround.vim and speeddating.vim.

## supertab

[supertab](https://github.com/ervandew/supertab) is a simple plugin that enables `<Tab>` for vim's built-in autocomplete instead of the default keybinding, which I never remember anyway.

## vim-tmux-navigator

I'm a heavy tmux user on the command line, and [vim-tmux-navigator](https://github.com/christoomey/vim-tmux-navigator) makes vim behave better with tmux.
In particular, it adds `<C-h>`, `<C-j>`, `<C-k>`, and `<C-l>` bindings to navigate between tmux panes and vim splits without getting trapped.