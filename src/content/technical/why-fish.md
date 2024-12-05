---
title: Why I Use Fish Shell
lastUpdatedDate: 2024-12-04
description: Finally, a command line shell for the 90s
---

For a few years now, I’ve primarily used [fish shell](https://fishshell.com/) on the command line, instead of the more standard bash or zsh. Fish cheekily refers to itself as “finally, a command line shell for the 90s”, but I’ve found it quite effective. Here’s a few reasons I use it.

## Smarter Completions

Shell completions (usually trigged with Tab) are basically required to make the command line usage. Out of the box, fish comes with much nicer shell completions than most shells. It prints possible completions in a tidy grid, with descriptions of subcommands, which can be fuzzy-searched with Shift+Tab:

```fish
❯ git st
st  (alias: stash)  stash  (Stash away changes)  status  (Show the working tree status)  stripspace  (Remove unnecessary whitespace
```

Fish parses manpages to generate completions, so any CLI tool with a manpage will automatically have completions. But, if not, fish has a simple command to generate completions — much easier than zsh’s system, which I’ve never managed to understand. For instance, I manually added a few completions for `markdownlint`:

```fish
complete markdownlint -x -s V -l version -d "Print version information"
complete markdownlint -s c -l config -d "Set configuration path"
```

It also has an autosuggestion system, which guesses what command you’re running and prompts you to press Ctrl-F to autocomplete the entire command.

## Better Shell Scripting

Fish’s shell scripting language is much closer to modern programming languages than bash or zsh. As a result, it’s possible to write little shell scripts to automate tasks. For instance, I wrote a script to copy files without clobbering any duplicates, which is much easier to read than the equivalent in bash:

```fish
function copy_no_clobber
    set src $argv[1]
    set dst $argv[2]
    for file in $src/*
        if test -f $file; and not test -e $dst/(basename $file)
            echo "Copying $file"
            cp $file $dst
        end
    end
end
```

Fish’s function system is neat, too. Just put a `function` in a `.config/fish/functions` file and fish will load it immediately.

This all comes at the cost of intentionally breaking compatibility with POSIX. Personally I have not found that a major issue, since most of these little scripts are just for my personal use, but any shared scripts should probably stick with bash.

## Syntax Highlighting

Fish syntax highlights as you type. An unrecognized command is highlighted red, turning blue once you enter a valid command. Strings are highlighted yellow, while arguments recognized as file paths are underlined.

## Abbreviations

Most shells allow aliases, where one command is interpreted as another command. Often this is used to replace, say, `git` with `g`. However, aliases can be problematic in scripts, if for instance a variable is also named `g`.

Fish adds a concept of abbreviations, which are expanded inline as you type and don’t take effect in scripts.

The other nice thing about abbreviations is that, because they literally expand, you can edit the command after expansion. For instance, I have a `bbic` abbreviation that expands to `brew bundle install --cleanup --file=~/.config/Brewfile --no-lock && brew upgrade`. If I want to skip the cleanup flag, I can just remove it after expansion.

Finally, seeing an abbreviation expand while typing is deeply satisfying.

## No Configuration

Fish works pretty well out of the box, unlike zsh, which almost requires that you set up oh-my-zsh to work well. My `config.fish` is only 31 lines, of which 14 are aliases / abbreviations, 8 are environment variables, and 5 are adding various directories to the PATH. The rest set up [zoxide](https://github.com/ajeetdsouza/zoxide) and [starship](https://starship.rs/).

## References

- Julia Evans (of Wizards Zines fame) is [also a fan of fish](https://jvns.ca/blog/2024/09/12/reasons-i--still--love-fish/).