---
title: Dotfiles
lastUpdatedDate: 2023-03-15
description: "An overview of command line tools I like."
---

## Table of Contents

I like to use the command line, perhaps because I ["always bet on text"](https://graydon2.dreamwidth.org/193447.html).
Here are a few of the command line tools I use the most heavily.

## Essentials

There are a few command-line tools I use so heavily that I'm genuinely not sure how I would be productive without them.

### git

Well, duh. Where would we even be as software engineers without `git`?

That said, I like to set a lot of aliases in my `.gitconfig`, like:

- `git bd`: *b*ranch *d*elete, searching for branches with `fzf`
- `git c`: *c*heckout branch, searching for branches with `fzf`
- `git cam`: *c*ommit *a*ll with *m*essage
- `git camp`: *c*ommit *a*ll with *m*essage and *p*ush
- `git ci`: *c*heckout *i*nteractively; pick-and-choose files to `git checkout` with `fzf -m`
- `git d`: *d*iff with better behavior (showing staged and unstaged changes)
- `git df`: *d*iff with another branch by *f*inding with `fzf`
- `git dfn`: *d*iff with another branch by *f*inding with `fzf`, showing *n*ame-only
- `git l`: show the *l*og with one-line format
- `git lf`: show the *l*og and *f*ind a commit with `fzf`
- `git lfc`: show the *l*og, *f*ind a commit with `fzf`, and *c*opy to keyboard
- `git m`: *m*erge branch, searching for branches with `fzf`
- `git p`: *p*ush
- `git s`: show *s*tatus
- `git unstage`: unstage the listed files
- `git oops`: squash changes with the last commit, because I committed too early

### fzf

`fzf` is up there with `git` as one of the miracles of command-line productivity. You throw it lines of text - usually piped in from somewhere else - and it presents a fancy, and highly customizable, fuzzy-find interface. As you can see above, that's extremely useful when writing little shell scripts.

However, what I use it for most often is actually its Ctrl-R / Ctrl-T functionality. By default, Ctrl-R replaces the shell's built-in search, using `fzf` to fuzzy-find previous commands, even from days or weeks ago. Ctrl-T, meanwhile, performs a recursive fuzzy-find of filenames in the current directory and subdirectories, which is perfect to quickly pull up files by name regardless of the exact path.

### rg

`rg` is my all-purpose, cross-repo search tool. Throw a regex at `rg` and it'll chew through files looking for it, even respecting `.gitignore` files!
I end up using it instead of my IDE's search tool almost always - it's just much more effective at actually finding what I'm looking for, and even works in plaintext situations, like if I need to search an Obsidian vault.

### tmux

One of these days I'll get around to writing up why I adopted tmux, but suffice to say I found my ~week of investment in learning tmux worthwhile, not least because I can operate a terminal without lifting my hands from the keyboard at all. When I'm running a terminal these days, I'm almost always running tmux.
Among the benefits it offers:

- tmux can split the window with a simple hotkey, regardless of where it's being run.
- Since tmux works on a client-server model, the shell keeps running even if you close the window.
- There's a lot of utility just in having a pretty large scrollback buffer that you can save and search.

I also use a few plugins:

- `tmux-resurrect`/`tmux-continuum`: Together, these plugins will automatically save the state of the tmux session and automatically restore it when you restart.
- `tmux-open`: Just press "o" while a file or URL is highlighted in tmux to open it. That combines particular well with...
- `tmux-yank`: This makes the copying behavior work a little better, notably while opening tmux via a VS Code terminal.
- `vim-tmux-navigator`: This lets me use Ctrl-h/Ctrl-j/Ctrl-k/Ctrl-l to navigate around tmux splits and Neovim sessions.

## Preferred

These are command-line tools I've been using a lot later that I would find inconvenient to switch away from.

- `fish`: I'm not convinced that fish, the "friendly interactive shell", is radically better than, say, zsh with oh-my-zsh, but it does start up much faster, has nicer autocompletions by default, and has a much less confusing shell scripting language.
- `neovim`: These days I use VS Code for most code editing - making Neovim work like an IDE is just too painful - but when I just need to quickly open and edit a file, I still fall back on it. I use a handful of plugins - notably `vim-tmux-navigator` to make it play nicer with tmux - but otherwise I try to keep its configuration pretty minimal.
- `delta`: This little utility makes git diff output *much* prettier, with word-level highlighting, line numbers, and an optional side-by-side mode. It can even be used outside a git context as a replacement for `diff` in general!
`zoxide`: This is one of a couple different tools that remembers which directories you've previously visited, so you can `cd` to them without typing out the full path. For instance, I can just go `z dot` and I'll jump to `~/Developer/dotfiles`. I actually have this aliased directly to `cd` - going back to `cd` would be really annoying.
- `just`: I used to write little Makefiles encapsulating various useful commands for a project. Unfortunately, thanks to its history as a build tool, `make` has many well-known rough edges, like the requirement for `.PHONY` rules. `just` is a tool that basically provides Makefiles without the build system. That may not sound useful, and Hacker News types mock it every time it's posted, but I still like to make one for almost every repo. A great example where it's useful is with `hledger`, a plain-text accounting system with a, uh, *convoluted* CLI - I can turn a command like `hledger is -D -p "from 7 days ago"  -f 2023.journal` into `just daily`, and it's helpfully documented directly in the `justfile`.
- `cheat`/`tldr`: These are similar tools for sharing command-line cheatsheets. `cheat` allows you to manage your own cheatsheets, while I've found `tldr`'s community-contributed cheatsheets to be high quality. I use both.

## Modernized Unix Tools

I use a few standard Unix utilies that I've aliased to more modern versions.

- `bat` (for `cat`): A few of the other tools like to send output through `cat`, and every so often it's useful to splat a file to the command line. In those instances I use `bat` instead of `cat`, because its output is a bit nicer and it automatically pipes to a pager like `less` if the output is too long.
- `exa` (for `ls`): It's `ls` with pretty colors and icons! Frankly I don't have a strong reason to prefer this over bog-standard `ls`, but the colors are nice.
- `sd` (for `sed`): I often do search-and-replace through an IDE, but sometimes it's nice to do it from the command line and just check `git diff` for changes. Unfortunately `sed` makes absolutely no sense to me. `sd` is a simple alternative with a better interface for the common case.
- `fd` (for `find`): `fd` works almost identically to `find`, but it's a bit faster and, like `rg`, respects `.gitignore` files by default. In particular, I have `fzf`'s Ctrl-T hotkey set up to use `fd` by default.
- HTTPie: This is a straightforward replacement for good ol' curl or wget for making basic HTTP requests, but I prefer it to curl because the command-line interface makes a lot more sense.
- `dust` (for `du`): Every so often I need to check why a directory is so big, and in those instances I turn to `dust`, a modern replacement for `du` with prettier output.

## Situationally Useful

I don't use this often, but they're helpful when I do need them.

- `gh`: Did you know GitHub has a fully-featured CLI that can access basically any GitHub API? That said, in practice, I rarely need many of the features `gh` provides, but it does do a couple cool things:
  - `gh repo create --source .` will create a new repo on GitHub from the current directory, assuming it's a git repository. That's especially useful if I create a new project locally and then decide I want to push it to GitHub.
  - `gh pr view -w` opens the PR for the current branch, if any, in the web browser.
- `tig:` This is a pretty git viewer, but I mainly use it for `tig stash`, which lets me interactively explore my git stash.
- `jq`: I know a lot of folks love `jq` for working with JSON, but frankly I find it a pain to work with - its filter syntax is so idiosyncratic that I feel lost every time I pull it up. That said, when I *do* need to work with JSON, `jq` is the obvious place to go; even just piping JSON output through `jq` for pretty printing is useful.
- `terminal-notifier`: I don't often need to trigger desktop push notifications from a shell script, but when I do, `terminal-notifier` is the place to go.
- `watchexec`: This is a cute little Rust tool that watches a file and reruns a command any time the watched file changes. I don't realistically have a use for that, but if I ever do, `watchexec` is where I'll turn first.