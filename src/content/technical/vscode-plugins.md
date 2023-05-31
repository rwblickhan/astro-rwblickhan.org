---
title: "Visual Studio Code Plugins"
lastUpdatedDate: 2023-07-31
description: "An evergreen list of VS Code plugins I use."
---

A few months back, I moved from a mobile engineering team to a fullstack web team.
As a result, I also moved from Xcode to Visual Studio Code, which has quickly become my general editor of choice.

One of the nicest parts of VS Code is how extensible it is, especially compared to the locked-down-to-a-fault Xcode.
I use a number of plugins, which I've documented here.

## Table of Contents

## VSCode Neovim

I've used vim keybindings in pretty much everything - including Xcode and VS Code - for close to a decade now.

In VS Code, I used to use the (very popular and very polished) [VSCodeVim](https://github.com/VSCodeVim/Vim) plugin to emulate vim's modal editing in VS Code. However, I've recently fallen in love with [text objects](/technical/til/20230415-vim-text-objects) and in particular I wanted to use [targets.vim](https://github.com/wellle/targets.vim) to add more. Unfortunately, since VSCodeVim emulates vim directly in VS Code, it only has partial support for a few plugins.

[VSCode Neovim](https://github.com/vscode-neovim/vscode-neovim) takes a different approach, connecting VS Code to a normal Neovim instance, complete with .vimrc support.
Notably, that means I can use the exact same vim plugins between Neovim and VS Code, including [targets.vim](https://github.com/wellle/targets.vim), [commentary.vim](https://github.com/tpope/vim-commentary), and [surround.vim](https://github.com/tpope/vim-surround), without relying on support from VSCodeVim!

The only disadvantage to VSCode Neovim is that it doesn't translate VS Code selections into Neovim visual mode and vice versa.
That can be a minor inconvenience on the rare occasion I do want to use a mouse for selection.

## Markdown All in One

[Markdown All in One](https://markdown-all-in-one.github.io/docs/guide/#features) adds a lot of handy Markdown editing features, like auto list continuation and standard hotkeys like Cmd-B for bold.
It makes VS Code almost as efficient as a real Markdown editor, though I still prefer [Ulysses](https://ulysses.app) for heavy-duty editing and writing.

Fair warning: this plugin does clobber a few standard VS Code hotkeys, like Cmd-B to open the side panel. I had to move around a few hotkeys as a result.

## Bookmarks

[Bookmarks](https://marketplace.visualstudio.com/items/alefragnani.Bookmarks) adds line-based bookmarks, similar to vim's [marks](https://vimhelp.org/motion.txt.html#mark), which make it easy to jump between locations in a codebase. They're even cached to a file and able to survive formatting a file, which is not true of, say, VSCodeVim's marks emulation. Typically, I show the bookmarks panel in the (otherwise-unused) right panel.
I set up the Cmd-k/m chord to mark the current line as a bookmark and the Cmd-k/o chord to open the bookmarks fuzzy-finder.

## Auto Rename Tag

[This extension](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) does exactly what it says on the tin - if you edit one half of an HTML or XML tag, it will automatically rename the paired tag. I think VS Code actually has this built-in now, but *only* for files with the HTML extension - Auto Rename Tag is perfectly happy operating on `.astro` or `.tsx` files as well.

## Copy File Name

Sometimes it's useful to copy the name of the current file, like if I want to search for references to that file with `rg`. Confoundingly, VS Code doesn't seem to have a built-in hotkey hook for copying the file name.
[Copy File Name](https://marketplace.visualstudio.com/items?itemName=nemesv.copy-file-name) remedies that.

## Error Lens / Pretty TypeScript Errors

[Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) is a massively popular extension that makes error highlighting and lint messages stand out more prominently. [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors) improves the readability of long TypeScript errors. Neither is strictly necessary, but both are small quality-of-life improvements.