---
title: Apocalyptic Fervor Gripped The Colonies
lastUpdatedDate: 2026-02-28
publicationDate: 2026-02-28
season: 8
---

![The Four Horsemen of the Apocalypse](../../assets/newsletters/four_horsemen.jpg)
["The Four Horsemen of the Apocalypse", Albrecht Dürer](https://www.artic.edu/artworks/55330/the-four-horsemen-of-the-apocalypse-from-the-apocalypse)

Hello from a San Francisco that has suddenly decided that the end of February is the correct time for summer and has been experiencing a heat wave of high-70s (aka absurdly hot, for San Francisco). Perfect for a picnic, less perfect for getting a good night’s sleep when you live on the 10th floor and hot air rises.

Things are not looking so great out there, eh? But I’m going to Ignore All That and keep writing this newsletter normally.

Back in 1780, with the American Revolutionary War in full swing, the lights went out in the sky (apparently due to forest fires from Canada, so hey, I guess history does rhyme). Apocalyptic fervor gripped the colonies; many people decided to just give up  on work and go home. But one member of the Connecticut Governor’s council [refused to budge](https://www.mavengame.com/p/bring-the-candles):

> I am against adjournment. The day of judgment is either approaching, or it is not. If it is not, there is no cause for an adjournment; if it is, I choose to be found doing my duty. I wish therefore that candles may be brought.

Apparently (apparently), my duty is writing these dumb little weekly updates. Perhaps someday after [our very own Late Bronze Age Collapse](https://acoup.blog/2026/01/30/collections-the-late-bronze-age-collapse-a-very-brief-introduction/), someone will happen to find these newsletters on a dusty out-of-the-way server that miraculously wasn’t wiped and [use them to reconstruct our entire society](https://en.wikipedia.org/wiki/Ugaritic_texts). Who knows. I choose to be found doing my self-appointed duty.

:::aside{.note}
It may not surprise you to find out that this same event is referenced in [the latest Tor’s Cabinet](https://youtube.com/watch?v=zx5TzjRkiFc), which is otherwise a typically fascinating episode about the Universal Public Friend, a nonbinary (?) Quaker mystic who claimed to have died and been possessed by... _something from beyond_. Highly recommended as, frankly, most of Tor’s episodes are.
:::

---

A life pro tip that I suppose I should have included in my [30 pieces of advice for 30](https://rwblickhan.org/newsletters/30-pieces-of-advice-for-30/): put things in “canonical” places, and you’re less likely to misplace them. My wedding ring is usually on the nightstand, my wallet and AirPods are next to my keyboard, and so on. That’s always the first place I look for something, and I try my best to always put it back there (or one of a small number of other “canonical” locations). When I “misplace” something, it’s usually because I didn’t put it back where I expected to find it!

---

[Andrey Karpathy says](https://x.com/karpathy/status/2026731645169185220) “imo coding agents basically didn’t work before December and basically work since”, and, despite my trepidation, I have to agree. Most of last year, Claude Code needed a _lot_ of guidance — it worked pretty well for targeted, well-specified changes in an existing codebase, but it broke down fast for anything larger and often didn’t write code I would have preferred for smaller changes. Not anymore, though; I’ve written maybe _one_ line of “manual” code since I returned from Europe.

I really started to feel the inflection point earlier this week, when I decided I needed a language server for hledger. I use [hledger](https://hledger.org/) for plain-text accounting and budgeting. Sometimes I need to edit entries manually with [Helix](https://helix-editor.com/), and I wanted autocompletion, but hledger’s markup language doesn’t have a (well-maintained) [language server](https://microsoft.github.io/language-server-protocol/). So I set Claude Code up with this prompt:

> Scaffold a new Rust project and implement. I want a language server for the ledger / hledger programming languages, following the LSP protocol. In particular, I want syntax
  highlighting as well as autocompletion for account names. I'll be using this in the helix eventually, if that's important, but make it work across editors (I may use it in VS
  Code as well). Write this as thoroughly and clearly as you can, and include automated tests where relevant. Eventually I want this to run as a single binary a la other language
   servers

I set this to auto-accept edits and left for 20 minutes to make lunch. I came back to a _complete language server implementation for hledger_, including unit tests and instructions for how to install it in Helix! There was one bug:

> helix is not autocompleting quite right if I start from the middle of a world. for instance:
  `expenses:discretionary`
  if I delete "discretionary" and start typing "d", it correctly proposes "expenses:discretionary". however, it doesn't replace the existing "expenses:", so I end up with
  "expenses:expenses:discretionary" when I autocomplete. is this an lsp issue? is it solvable in this codebase?
  
... which Claude Code churned through given another two minutes. I barely looked at the code (so, yes, this is real vibe-coding), but it’s worked perfectly so far.

And now I’m going to see if Claude can build me a fully-complete Helix implementation for CodeMirror, so I can use Helix keybindings in Obsidian.

Would I ship this to production? Probably not. But for my personal use, it works perfectly and saved literally hours (days?) of work.

Am I worried? After all, the very top of my homepage lists my name and identities as a “writer and programmer”, so clearly programming is important to my identity. Is programming about to go the way of elevator attendants? Perhaps, but:

- I still need to be technical enough to _know and care_ what a language server is and why I might want to implement one.
- As mentioned, I don’t _quite_ trust Claude enough to completely vibe-code. When using Claude Code at work, I thoroughly vet (and, often, edit) each line it outputs. Anecdotally, Claude Code feels pretty strong at the areas I tend to focus on (webapps, command line apps), and less strong at, say, mobile apps.
- Perhaps I never put as much emphasis on the “typing keys to output code” part of programming (despite, yes, being a vimmer). I _like_ typing in code, yes, but also, a lot of programming... did feel like not-entirely-necessary boilerplate?
- I am an _unusually_ generalist developer, in that I have worked in a professional capacity on C++ (for embedded), C++ (for computer graphics), iOS, backend, frontend, desktop (via Electron), and  prompt engineering. I perhaps feel a bit less threatened by a tool that “knows everything”

But I also feel a bit of that expressed in, say, Nolan Lawson’s [“We mourn our craft”](https://nolanlawson.com/2026/02/07/we-mourn-our-craft/). Programming _is_ changing, for better or worse, and our careers will change with it — if they even continue at all.

Oh well. The day of judgment is either approaching, or it is not.

In the meantime, I have the words of [_World of Tomorrow_](https://youtube.com/watch?v=4PUIxEWmsvI) to remember:

> Do not lose time on daily trivialities. Do not dwell on petty detail. For all of these things melt away and drift apart within the obscure traffic of time. Live well and live broadly. You are alive and living now. Now is the envy of all of the dead.
