---
title: Search in git log
lastUpdatedDate: 2024-04-11
tags: [command-line, git]
---

Yesterday I wanted to look for a block of code in [my dotfiles](https://github.com/rwblickhan/dotfiles) that I deleted a while ago. Turns out there’s an easy way to do that!

```bash
git log --oneline -p -S"$TMUX" .config/fish/config.fish
```

That’ll output a list of all commits that changed the number of occurrences of the string `TMUX`, alongside the code that commit changed. `--oneline` cleans up the commit message output, `-p` generates the patch (basically, the code diff in that commit), and `-S` does the actual search. It can even filter to a particular file since, in this case, I knew exactly which file I was looking for.

With that command above, I was able to quickly find the last commit where I had deleted all references to the `$TMUX` environment variable in a script and edit that code for a new use!

Looking at the [`git-log` documentation](https://git-scm.com/docs/git-log), there’s also a `-G` option. The two main differences seem to be:

* `-G` always operates on regexes; `-S` only operates on strings, unless you also provide the `--pickaxe-regex` flag.
* `-S` only triggers if the commit changed the number of occurrences of the search string; `-G` triggers any time an addition/deletion line in the patch matches the search regex.

I’m not sure which is generally better to use — the `git-log` documentation suggests `-S` is “intended for the scripter’s use”, whatever that means, and all of OpenAI, Anthropic, and Perplexity suggested `-S` over `-G` 🤷‍♀️

## References

* [git-log Documentation](https://git-scm.com/docs/git-log)
