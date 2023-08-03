---
title: "Visual Studio Code Plugins"
lastUpdatedDate: 2023-08-02
description: "An evergreen list of VS Code plugins I use."
---

A few months back, I moved from a mobile engineering team to a fullstack web team.
As a result, I also moved from Xcode to Visual Studio Code, which has quickly become my general editor of choice.

One of the nicest parts of VS Code is how extensible it is, especially compared to the locked-down-to-a-fault Xcode.
I use a number of plugins, which I've documented here.

## Table of Contents

## VSCodeVim

I've used vim keybindings in pretty much everything - including Xcode and VS Code - for close to a decade now.

In VS Code, I use the (very popular and polish) [VSCodeVim](https://github.com/VSCodeVim/Vim) plugin, which emulates vim's modal editing in VS Code.
VSCodeVim has implemented a surprisingly large portion of vim's default functionality, including [smartcase](https://rwblickhan.org/technical/til/20230717-smartcase-in-vim/), [relative line numbers](https://rwblickhan.org/technical/til/20230615-relative-line-numbers-in-vim/), and highlighted yanks,
as well as a number of plugins I rely on,
including [commentary.vim](https://rwblickhan.org/technical/vim-plugins/#commentaryvim), [surround.vim](https://rwblickhan.org/technical/vim-plugins/#surroundvim), [CamelCaseMotion](https://rwblickhan.org/technical/vim-plugins/#camelcasemotion), and sending yanks to the clipboard.
I've also started trying its [sneak.vim](https://github.com/justinmk/vim-sneak) mode, too!
In fact, just about the only plugin I (very occasionally) miss is [vim-swap](https://rwblickhan.org/technical/vim-plugins/#vim-swap).

I previously used [VSCode Neovim](https://github.com/vscode-neovim/vscode-neovim), which connects VS Code to a real Neovim instance with full plugin support.
However, there have always been a few annoying edge cases, like how Neovim visual selections aren't mapped to VS Code selections, and a recent VS Code update started causing wild issues,
so I've switched back to the "safer" plugin for now.

## Codeium

I've been playing with [Codeium](https://codeium.com) recently, which is a free alternative to [GitHub Copilot](https://github.com/features/copilot/) - a useful service,
but not one I was eager to pay $10 a month for, especially when Codeium is fairly competitive.
I like to think of these plugins as "advanced autocomplete" - type a comment or start writing some code and you'll see an LLM-generated sugggestion, which are surprisingly useful,
like filling out the rest of a complicated JSON object or taking a first pass at a minor algorithm.

Am I concerned about the legal and ethical status of LLM-based code generation?
A bit, but I'm exclusively using this for my own open-source projects and mostly focused on small-scale edits,
which are either "obvious" but require some toil or would be a simple StackOverflow search away.

There's also [Sourcegraph Cody](https://about.sourcegraph.com/cody), which is likewise free, but I found its suggestions slow and less useful than Codeium or GitHub Copilot.

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