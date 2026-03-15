---
title: Really, Truly Breathless With Excitement
lastUpdatedDate: 2026-03-14
publicationDate: 2026-03-14
season: 8
---

![A medieval man and woman in a duel](../../assets/newsletters/fighting.webp)
An illustration from a 1467 manuscript of Hans Talhoffer's fight book, from the always-wonderful [Public Domain Review](https://publicdomainreview.org/collection/fechtbucher/)

[Jujutsu](https://docs.jj-vcs.dev/latest/): the future of version control is here! I’m really, truly breathless with excitement now that I’ve spent a week messing around with it.

If you don’t know what version control or git are, you can probably skip this issue 🙂 Perhaps in the near future I’ll talk about Jujutsu for non-software engineers. P.S. yes I will soon discuss my mysterious reasons for being busy mentioned [last week](https://rwblickhan.org/newsletters/an-old-boys-club-of-dad-rock/).

I’ve always had an alarming level of comfort with git, perhaps because I invested the time to understand its mental model and primarily use it on the command line. I’m not sure I can recommend either; git’s mental model is famously convoluted and counterintuitive, and the git command-line interface is famously clunky (just see the long-standing reuse of “checkout” to mean both “move to a different branch” and “delete an untracked change”!).

Jujutsu — or rather jj, per its command-line interface, which I’ll use from here on out — is beautiful because it’s simple, in a [Rich Hickey “Simple Made Easy”](https://youtube.com/watch?v=SxdOUGdseq4) way. jj throws out the distinction between commits, the staging area, and the stash, and also tosses most of the branch logic.

:::aside{.note}
By the way, [“Simple Made Easy”](https://youtube.com/watch?v=SxdOUGdseq4) is one of my favorite tech talks of all time, thanks to its clear delineation of “simple”, “complex”, “complicated”, and “easy” — even if I don’t agree with _all_ of the design decisions Rich Hickey made in Clojure.
:::

Instead, practically the only concept in jj is a _revision_. jj is always pointing at a “current revision”, represented by the @ symbol. Any changes you make are automatically added to the current revision. Revisions live in a tree, similar to git commits, though revisions can have an arbitrary number of parents and children. At any time, you can create a new, empty revision on top of any other revision, anywhere in the tree, and start adding changes to that commit.

And that’s... about it.

:::aside{.note}
That’s not _quite_ all. There’s also a concept of “bookmarks”, which are roughly a mix of git branches and tags (and, indeed, are mapped to git branches behind the scenes). They point to some particular revision with a unique name, which is useful for jumping around revisions or for interacting with git-backed remote repos. But, unlike branches, they _don’t_ move around automatically; you have to move them manually, which means they behavior more consistently.
:::

You’ll probably have to unlearn some git habits, but getting used to jj took me about an hour, because it’s _just that simple_. What does that simplicity buy you? Well...

- You can undo pretty much _any_ jj operation with a simple `jj undo` and redo with `jj redo`.
- You can _never_ lose untracked changes, because everything is tracked automatically, though you do have to get in the habit of aggressively creating new revisions to make changes, to avoid overwriting the current revision.
- You _never_ get stuck with a “working copy unclean” when you try to move around the revision tree. You simply don’t have to think about the stash, ever!
- You never have to stop to come up with a branch name, because jj strongly encourages “anonymous” revisions. You typically refer to revisions by a revision ID that jj generates; helpfully, jj’s command-line tool highlights the revision ID’s unique prefix, so usually you only need to type a character or two. Once you’ve decided what a revision is for, just use `jj describe` to give it a description.
- You have much more freedom to squash and move around revisions. Merges are just revisions with multiple parents and some conflict markers, which you can deal with whenever you want (because, again, you _never_ get stuck moving around).

jj follows all the best practices for CLI design in 2026 — the options are all consistent, and the designers have been thoughtful about naming (for instance, “branches” were renamed “bookmarks” to avoid confusing with git’s branches). It’s one of the nicer command-line tools to use regularly.

:::aside{.note}
It _also_ has Google’s backing at this point, since it originally came out of a Google 20% project, but apparently it’s powering at least a few of Google’s repos now. So you don’t have to worry about it disappearing tomorrow.
:::

The best part is that you can start using jj _today_. It’s fully compatible with git, so you can use it on your local copy of a GitHub-hosted repo, and if you ever need to switch back to git, you can start using normal git commands at any time (you’ll just have to switch back to a branch, because jj tends to put the repo into a [detached HEAD state](https://wizardzines.com/comics/detached-head-state/)).

I really can’t recommend jj highly enough!
