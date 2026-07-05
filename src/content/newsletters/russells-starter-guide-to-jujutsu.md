---
title: Russell’s Starter Guide to Jujutsu
lastUpdatedDate: 2026-07-05
publicationDate: 2026-07-05
season: 8
---

Jujutusu (or `jj`) is an exciting new version control system that has a real chance of supplanting git. You may recall my [breathless excitement](https://rwblickhan.org/newsletters/really-truly-breathless-with-excitement/) a few months ago.

This is a brief starter guide to jujutsu, intended for practicing programmers with some experience with git.[^model] I’ve been using jujutsu daily for six months now, and thanks to its simplicity, I’m _more_ comfortable with it than I am with git after almost a decade of daily use.

## Why You Should Use Jujutsu

- It’s fully interoperable with git (especially if you’re using a [colocated workspace](https://docs.jj-vcs.dev/latest/git-compatibility/#colocated-jujutsugit-repos)). You can freely switch between jujutsu and git as necessary; if you need to work with a git repo remote, you can use jujutsu locally without anybody else knowing.
- It’s conceptually simpler than git and as a result provides much greater flexibility and ease of use. You don’t need to worry about staging area versus commits versus stash; everything is just a “change,” and changes are extremely flexible to be split and duplicated and rearranged.
- Because of the flexibility of jujutsu’s mental model, there’s weird tricks that are impossible to replicate in git, like [megamerges via `jj absorb`](https://v5.chriskrycho.com/journal/jujutsu-megamerges-and-jj-absorb/).
- Because jujutsu snapshots every time you run a `jj` command, instead of requiring a separate “staging” step, it’s almost impossible to lose changes (if you’re running `jj` commands frequently).
- Because jujutsu version-controls its own metadata, _almost_ any operation can be undone with a simple `jj undo`.
- git’s CLI is (infamously) a rat’s nest of confusing options and inconsistent names. Jujutsu is a model of good CLI practices.

## Why You Shouldn’t Use Jujutsu

- It doesn’t yet support _all_ the [features of git](https://docs.jj-vcs.dev/latest/git-compatibility/). Pre-commit hooks,[^hooks] submodules,[^submodules] and LFS are some of the major omissions.
- It’s relatively new, as in less than five years old (as of 2026). It’s already stable and used internally by Google, but git is two decades old by comparison.
- External tools don’t really know what to do with jujutsu. Depending on your workflow, you can get decent results out of some tools, but in practice `jj` is a command-line-only tool for now.

## The Mental Model

Almost every time you run a `jj` command, jujutsu takes a snapshot of your files and a snapshot of its own metadata.[^operation] The files snapshot is called a [**revision**](https://docs.jj-vcs.dev/latest/glossary/#commit) or a **commit**.[^commit] The metadata snapshot is called an [**operation**](https://docs.jj-vcs.dev/latest/glossary/#operation), since it represents a jujutsu operation that’s been performed.

In practice, it would be a hassle to work with revisions that are created _every_ time you run a `jj` command. Instead, you typically work at the level of [**changes**](https://docs.jj-vcs.dev/latest/glossary/#change), which represent a single “diff” over time, even as the actual snapshotted revisions change underneath it. Changes really are just a pointer to a “most recent revision” as that revision is [rewritten](https://docs.jj-vcs.dev/latest/glossary/#rewrite) by snapshots, so in practice changes and revisions almost interchangeable, with the distinction that revisions are immutable while changes are updated on every snapshot. Below I use the terms interchangeably, unless the distinction really matters.

Revisions and thus changes are organized in a tree structure, with the “diff” being a diff to the parent change and edits to the change being propagated to child changes; revisions can have an arbitrary number of parents, so a “merge” in jujutsu is just a change with at least two parents.

Changes can be thought of as jujutsu’s version of git commits, but they “feel” more lightweight than a commit; they’re automatically assigned a [unique ID](https://docs.jj-vcs.dev/latest/glossary/#change-id), they don’t require a description, and they can be freely edited, split, squashed, and moved around. The only exception is when they’re pushed to shared history, at which point they become [**immutable**](https://docs.jj-vcs.dev/latest/config/#set-of-immutable-commits), though that can be overridden.

If a change is moved around or merged in such a way that it makes inconsistent edits with another change in the tree, that change will be marked as having a [**conflict**](https://docs.jj-vcs.dev/latest/glossary/#conflict). Conflicts are [first-class](https://docs.jj-vcs.dev/latest/conflicts/ ), so they don’t block any jujutsu operations; when you want to fix them, just run `jj resolve` to open a helpful CLI tool for merges and let the resolution propagate to the child changes.

Changes can be given a user-friendly name, called a [**bookmark**](https://docs.jj-vcs.dev/latest/glossary/#bookmark), although in practice that’s usually only done to interoperate with git remotes that expect branch names.

The current “open” change is called the [**working copy**](https://docs.jj-vcs.dev/latest/glossary/#working-copy), usually represented by the `@` symbol. The [**repository**](https://docs.jj-vcs.dev/latest/glossary/#repository) in the `.jj/`  folder holds all the revisions, changes, and operations. Jujutsu allows you to have multiple working copies open at a time, each of which is called a [**workspace**](https://docs.jj-vcs.dev/latest/glossary/#workspace). Remote copies of your repository are called [**remotes**](https://docs.jj-vcs.dev/latest/glossary/#remote), just like in git.

Finally, Jujutsu has a neat functional language for selecting [**revsets**](https://docs.jj-vcs.dev/latest/revsets/), or “sets of revisions” (or, equivalently, sets of changes). For instance, you can query for the “closest pushable” change with `heads(::@ & mutable() & ~description(exact:"") & (~empty() | merges()))`, which searches for “a revision that is an ancestor of the working copy revision, is mutable, has a non-empty description, and is either non-empty or a merge”. Setting up aliases to particular revset queries is extremely useful, because almost every jujutsu command can take a revset expression.

And that’s it! That description might feel long, but this is a complete mental model of _everything_ in jujutsu, save a few nitty-gritty distinctions like “divergent changes” and “visible commits” that aren’t too important in day-to-day use.

## Jujutsu in Practice

First up, let’s clone a git repository and set it up as a [colocated](https://docs.jj-vcs.dev/latest/git-compatibility/#colocated-jujutsugit-repos) repo:

```sh
> git clone https://github.com/rwblickhan/fzf-jj.sh.git
> cd fzf-jj.sh
> jj git init --colocate
Done importing changes from the underlying Git repo.
Setting the revset alias `trunk()` to `main@origin`
Hint: The following remote bookmarks aren't associated with the existing local bookmarks:
  main@origin
Hint: Run the following command to keep local bookmarks updated on future pulls:
  jj bookmark track main --remote=origin
Initialized repo in "."
> jj bookmark track main --remote=origin
Started tracking 1 remote bookmarks.
```

Yes, it’s a little annoying to manually track the `main` bookmark, which is why I set up [an `init` alias](https://github.com/rwblickhan/dotfiles/blob/main/dot_config/private_jj/config.toml#L52) in my jujutsu config.

Now we can run `jj log` to see what the tree of changes looks like right now:

```sh
> jj log
@  uszykspk rwb@rwblickhan.org 2026-07-05 11:00:54 9c83fa67
│  (empty) (no description set)
◆  snmvppzu rwb@rwblickhan.org 2026-06-08 11:12:24 main 19bbcbf7
│  Fix fzf_jj_files_rev reference in README
~
```

The `@` symbol represents the working copy — which change is currently open in the repository. `uszykspk` and `snmvppzu` are change IDs, which stay stable even as jujutsu takes snapshots every time a `jj` command is run. `9c83fa67` and `19bbcbf7` are the backing revisions (file snapshots) for each change. Notice that revision IDs have “forward-alphabetical” hex names (like git commits), while change IDs are “backwards-alphabetical”, so they can’t overlap. `main` is a bookmark, which points to the `snmvppzu` change.

Jujutsu doesn’t require you to type the entire ID, only the minimal unique prefix, and it’ll helpfully highlight what that is. So, for instance, we can use `jj show s` to see what’s in `snmvppzu`:

```sh
> jj show s
Commit ID: 19bbcbf7db659d070807fb724a9748b89e095255
Change ID: snmvppzuksmpqxqtxrxvytwuomnkrypw
Bookmarks: main main@git main@origin
Author   : Russell Blickhan <rwb@rwblickhan.org> (2026-06-08 11:12:22)
Committer: Russell Blickhan <rwb@rwblickhan.org> (2026-06-08 11:12:24)

    Fix fzf_jj_files_rev reference in README

... snip, the diff would show up here ...
```

Importantly, the change ID is stable, while the revision ID updates every time a snapshot is taken. So if I go make a change to some file and run `jj log` again:

```sh
> jj log
@  uszykspk rwb@rwblickhan.org 2026-07-05 14:50:49 dcabec42
│  (no description set)
◆  snmvppzu rwb@rwblickhan.org 2026-06-08 11:12:24 main 19bbcbf7
│  Fix fzf_jj_files_rev reference in README
~
```

We still have the two changes, `snmvppzu` and `uszykspk`, but now `uszykspk` is backed by the revision `dcabec42`. You _can_ see all the revisions that have been part of `uszykspk` by using the evolog...

```sh
> jj evolog -r u
@  uszykspk rwb@rwblickhan.org 2026-07-05 14:50:49 dcabec42
│  (no description set)
│  -- operation 18dffc1dff01 snapshot working copy
○  uszykspk/1 rwb@rwblickhan.org 2026-07-05 11:00:54 9c83fa67 (hidden)
   (empty) (no description set)
   -- operation 396c816215cd import git head
```

... but in practice, you’ll almost always end up working at the level of changes, not individual revisions, unless you want to restore changes that were accidentally snapshot.

We can manually move the working copy to a particular change with `jj edit`, in which case the current directory will be updated to the contents of that change (or, specifically, the revision that change is pointing at). Any file updates we make will then be snapshotted as part of _that_ change. However, we _can’t_ move the working copy to a change that’s already been pushed to a remote, which are marked as immutable:

```sh
Error: Commit 19bbcbf7db65 is immutable
Hint: Could not modify commit: snmvppzu 19bbcbf7 main | Fix fzf_jj_files_rev reference in README
Hint: Immutable commits are used to protect shared history.
Hint: For more information, see:
      - https://docs.jj-vcs.dev/latest/config/#set-of-immutable-commits
      - `jj help -k config`, "Set of immutable commits"
Hint: This operation would rewrite 1 immutable commits.
```

Changes are much more lightweight than git commits. You may have already noticed above that changes can be completely empty and don’t require a description.[^desc] If we want a new change, then we can run `jj new` to create one at _any_ point in the tree:

```sh
> jj new s
Working copy  (@) now at: qprmsknx 95c65082 (empty) (no description set)
Parent commit (@-)      : snmvppzu 19bbcbf7 main | Fix fzf_jj_files_rev reference in README
Added 0 files, modified 1 files, removed 0 files
```

```sh
> jj log
@  qprmsknx rwb@rwblickhan.org 2026-07-05 14:58:24 95c65082
│  (empty) (no description set)
│ ○  uszykspk rwb@rwblickhan.org 2026-07-05 14:50:49 dcabec42
├─╯  (no description set)
◆  snmvppzu rwb@rwblickhan.org 2026-06-08 11:12:24 main 19bbcbf7
│  Fix fzf_jj_files_rev reference in README
~
```

So, unlike git, “branches” are extremely cheap, as is rebasing:

```sh
> jj rebase --source q --onto u
Rebased 1 commits to destination
Working copy  (@) now at: qprmsknx ee4fee30 (empty) (no description set)
Parent commit (@-)      : uszykspk dcabec42 (no description set)
Added 0 files, modified 1 files, removed 0 files
```

```sh
> jj log
@  qprmsknx rwb@rwblickhan.org 2026-07-05 14:59:58 ee4fee30
│  (empty) (no description set)
○  uszykspk rwb@rwblickhan.org 2026-07-05 14:50:49 dcabec42
│  (no description set)
◆  snmvppzu rwb@rwblickhan.org 2026-06-08 11:12:24 main 19bbcbf7
│  Fix fzf_jj_files_rev reference in README
~
```

You can also pretty freely split, squash, rearrange, duplicate, and abandon changes, so “tree surgery” is much more straightforward than in git. And if you ever mess something up, undo and redo work for pretty much any operation:

```sh
> jj undo
Undid operation: d52874bd4174 (2026-07-05 14:59:58) rebase commit 95c650825a8e4430f06ce785e92a2d81cd030029 and descendants
Restored to operation: 83eceeccb0a7 (2026-07-05 14:58:24) new empty commit
Working copy  (@) now at: qprmsknx 95c65082 (empty) (no description set)
Parent commit (@-)      : snmvppzu 19bbcbf7 main | Fix fzf_jj_files_rev reference in README
Added 0 files, modified 1 files, removed 0 files
```

```sh
> jj log
@  qprmsknx rwb@rwblickhan.org 2026-07-05 14:58:24 95c65082
│  (empty) (no description set)
│ ○  uszykspk rwb@rwblickhan.org 2026-07-05 14:50:49 dcabec42
├─╯  (no description set)
◆  snmvppzu rwb@rwblickhan.org 2026-06-08 11:12:24 main 19bbcbf7
│  Fix fzf_jj_files_rev reference in README
~
```

Finally, conflicts are first-class. Let’s say we’ve set up a tree like this, where both `ptltuttu` and `uszykspk` edited a line of our README:

```sh
> jj log
@  ptltuttu rwb@rwblickhan.org 2026-07-05 15:03:54 bef01eef
│  (no description set)
│ ○  tsykwmxy rwb@rwblickhan.org 2026-07-05 15:03:42 69ff5a9c
│ │  (no description set)
│ ○  uszykspk rwb@rwblickhan.org 2026-07-05 14:50:49 dcabec42
├─╯  (no description set)
◆  snmvppzu rwb@rwblickhan.org 2026-06-08 11:12:24 main 19bbcbf7
│  Fix fzf_jj_files_rev reference in README
~
```

If we try to rebase `uszykspk` and its descendants on top of `ptltuttu`, we don’t receive an error, but those changes are marked as being in conflict:

```sh
> jj rebase -b u --onto p
Rebased 2 commits to destination
New conflicts appeared in 2 commits:
  tsykwmxy c375bce2 (conflict) (no description set)
  uszykspk a7ca9330 (conflict) (no description set)
Hint: To resolve the conflicts, start by creating a commit on top of
the first conflicted commit:
  jj new uszykspk
Then use `jj resolve`, or edit the conflict markers in the file directly.
Once the conflicts are resolved, you can inspect the result with `jj diff`.
Then run `jj squash` to move the resolution into the conflicted commit.
```

```sh
> jj log
×  tsykwmxy rwb@rwblickhan.org 2026-07-05 15:06:27 c375bce2 (conflict)
│  (no description set)
×  uszykspk rwb@rwblickhan.org 2026-07-05 15:06:27 a7ca9330 (conflict)
│  (no description set)
@  ptltuttu rwb@rwblickhan.org 2026-07-05 15:03:54 bef01eef
│  (no description set)
◆  snmvppzu rwb@rwblickhan.org 2026-06-08 11:12:24 main 19bbcbf7
│  Fix fzf_jj_files_rev reference in README
~
```

Unlike git, this doesn’t prevent us from doing anything else; we can leave this for later and freely move around our tree. But when we _do_ want to fix this, we can do as it suggests:

```sh
> jj new u
Working copy  (@) now at: zzvxnzux d2b41fb6 (conflict) (empty) (no description set)
Parent commit (@-)      : uszykspk a7ca9330 (conflict) (no description set)
Added 0 files, modified 1 files, removed 0 files
Warning: There are unresolved conflicts at these paths:
README.md    2-sided conflict
```

```sh
> jj resolve
... snip, this opens a neat terminal UI for resolving the conflict ...
Hint: Using default editor ':builtin'; run `jj config set --user ui.merge-editor :builtin` to disable this message.
Working copy  (@) now at: zzvxnzux 1bf5845a (no description set)
Parent commit (@-)      : uszykspk a7ca9330 (conflict) (no description set)
Added 0 files, modified 1 files, removed 0 files
```

```sh
> jj log
@  zzvxnzux rwb@rwblickhan.org 2026-07-05 15:09:15 1bf5845a
│  (no description set)
│ ×  tsykwmxy rwb@rwblickhan.org 2026-07-05 15:06:27 c375bce2 (conflict)
├─╯  (no description set)
×  uszykspk rwb@rwblickhan.org 2026-07-05 15:06:27 a7ca9330 (conflict)
│  (no description set)
○  ptltuttu rwb@rwblickhan.org 2026-07-05 15:03:54 bef01eef
│  (no description set)
◆  snmvppzu rwb@rwblickhan.org 2026-06-08 11:12:24 main 19bbcbf7
│  Fix fzf_jj_files_rev reference in README
~
```

```sh
> jj squash
Rebased 1 descendant commits
Working copy  (@) now at: noqkrytn e1cfa730 (empty) (no description set)
Parent commit (@-)      : uszykspk 70b0d2a0 (no description set)
Existing conflicts were resolved or abandoned from 2 commits.
```

```sh
> jj log
@  noqkrytn rwb@rwblickhan.org 2026-07-05 15:09:46 e1cfa730
│  (empty) (no description set)
│ ○  tsykwmxy rwb@rwblickhan.org 2026-07-05 15:09:46 d2a7aa4a
├─╯  (no description set)
○  uszykspk rwb@rwblickhan.org 2026-07-05 15:09:46 70b0d2a0
│  (no description set)
○  ptltuttu rwb@rwblickhan.org 2026-07-05 15:03:54 bef01eef
│  (no description set)
◆  snmvppzu rwb@rwblickhan.org 2026-06-08 11:12:24 main 19bbcbf7
│  Fix fzf_jj_files_rev reference in README
~
```

Notice that squashing our resolution into `uszykspk` _also_ propagated that resolution into its child `tsykwmxy`, so we only had to resolve it once.

Finally, if we want a git-style merge, we just create a new change that has multiple parents:

```sh
> jj log
@  qlqkrtyk rwb@rwblickhan.org 2026-07-05 15:21:37 002b4f2c
│  (no description set)
│ ○  ptltuttu rwb@rwblickhan.org 2026-07-05 15:03:54 bef01eef
├─╯  (no description set)
◆  snmvppzu rwb@rwblickhan.org 2026-06-08 11:12:24 main 19bbcbf7
│  Fix fzf_jj_files_rev reference in README
~
```

```sh
> jj new q p
Working copy  (@) now at: owosluxp b390557c (empty) (no description set)
Parent commit (@-)      : qlqkrtyk 002b4f2c (no description set)
Parent commit (@-)      : ptltuttu bef01eef (no description set)
Added 0 files, modified 1 files, removed 0 files
```

```sh
> jj log
@    owosluxp rwb@rwblickhan.org 2026-07-05 15:22:29 b390557c
├─╮  (empty) (no description set)
│ ○  ptltuttu rwb@rwblickhan.org 2026-07-05 15:03:54 bef01eef
│ │  (no description set)
○ │  qlqkrtyk rwb@rwblickhan.org 2026-07-05 15:21:37 002b4f2c
├─╯  (no description set)
◆  snmvppzu rwb@rwblickhan.org 2026-06-08 11:12:24 main 19bbcbf7
│  Fix fzf_jj_files_rev reference in README
~
```

Unlike git, however, jujutsu changes can have an _arbitrary_ number of parents, which allows for some neat tricks.

As for day-to-day use, there’s two major workflows you’ll hear talked about: squash-based and edit-based. In a squash-based workflow,[^squash] if you want to edit a change, you first make a new change on top of it, make your changes, then squash that change into the change you originally wanted to edit. In an edit-based workflow, you instead use `jj edit` to “open” a change and edit it directly, using the evolog if you need to revert. Keep in mind, however, that jujutsu is flexible enough that you can mix-and-match both approaches or even make up your own.

Finally, there are bookmarks, which are just pointers to particular changes in the tree; these are mapped to git branches under the hood, so they’re useful for interacting with git remotes, but they do _not_ move around implicitly like git branches. The other commands to know for remotes are `jj git fetch` and `jj git push`, which pull and push changes, respectively.

And that’s about everything you need to know to start playing around! I highly recommend setting up a colocated repo and messing around; jujutsu is pretty forgiving, and some of the benefits of its simplicity and flexibility aren’t obvious until you’re using it day-to-day and realize how many git concepts you _aren’t_ thinking about.

## References

- [_Steve's Jujutsu Tutorial_](https://steveklabnik.github.io/jujutsu-tutorial/introduction/introduction.html) from Steve Klabnik of [_Rust Book_](https://doc.rust-lang.org/book/) fame; the de facto standard tutorial, albeit unfinished.
- [“Jujutsu For Busy Devs”](https://maddie.wtf/posts/2025-07-21-jujutsu-for-busy-devs) by Madeleine Mortensen, where I personally learned most of the basics.
- [André Arko’s tutorial series](https://andre.arko.net/2025/09/28/jj-part-1-what-is-it/); the later entries on [configuration](https://andre.arko.net/2025/10/15/jj-part-4-configuration/) and [“stupid jj tricks”](https://andre.arko.net/2025/09/28/stupid-jj-tricks/) are particularly recommended for more advanced configuration.
- [Chris Krycho’s writings on jujutsu](https://v5.chriskrycho.com/topics/jujutsu), which includes a number of mind-bending tricks that you can’t get from git.
- [Justin Pombrio’s cheat sheet](https://justinpombrio.net/src/jj-cheat-sheet.pdf), which is a _little_ out of date,[^backout] but has some nice diagrams.
- [`fzf-jj.sh`](https://github.com/rwblickhan/fzf-jj.sh), a little command-line utility to integrate fzf and jj.
- [`jj-hooks`](https://github.com/mattwilkinsonn/zireael/tree/main/tools/jj-hooks), a tool I personally use to interact with git hooks from jujutsu.

[^hooks]: Although there are some [workarounds](https://github.com/jj-vcs/jj/issues/405) and a pair of commands, `jj fix` and `jj run`, that provide some of the same functionality. But jujutsu doesn’t have a “commit” phase like git, so it’s not entirely clear what a “pre-commit hook” would look like, anyway.
[^operation]: You’ll notice this is very different from git, which doesn’t snapshot the actual state of the repository, just the files within the repository. Arguably, that decision to version-control the repository state is the [key design difference between git and jj](https://www.felesatra.moe/blog/2024/12/23/jj-is-great-for-the-wrong-reason).
[^commit]: I’ll use the term “revision” to avoid confusion with git commits.
[^submodules]: Though, due to the aforementioned interoperability with git, you _can_ use submodules in a jujutsu repository; there just isn’t native support.
[^squash]: According to [Steve Klabnik’s tutorial](https://steveklabnik.github.io/jujutsu-tutorial/real-world-workflows/the-squash-workflow.html), this is the workflow preferred by Martin von Zweigbergk, the creator of jujutsu.
[^model]: Though I highly recommend throwing away your mental model of git when learning jujutsu.
[^backout]: In particular, `jj backout`  has been replaced by `jj revert`.
[^desc]: Though if you _do_ want to add a description, it’s as simple as `jj desc`.