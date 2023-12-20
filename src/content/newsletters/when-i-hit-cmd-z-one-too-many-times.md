---
title: When I Hit Cmd-Z One Too Many Times (rwblog S6E15)
lastUpdatedDate: 2023-12-15
season: 6
---

![56.niQIHfqP_Z2vNdas.png](https://assets.buttondown.email/images/815938a1-dc08-4262-96e7-41ab824cd830.png?w=960&fit=max)

## Miyazaki and Allowing Artists To Make Bad Art

Earlier this year, Austin Kleon linked to an old BBC interview where an art critic argued that [“artists must be allowed to make bad work”](https://austinkleon.com/2023/05/07/artists-must-be-allowed-to-make-bad-work/). I thought of this again while watching _The Boy and the Heron_, the new Miyazaki film.

I thought _Boy and the Heron_ was decent but didn’t really match up to the heights of his career[^1]. But that doesn’t stop Miyazaki! Despite statements to the contrary, he is reportedly not retiring and [already started work on his next, “last” film](https://www.theverge.com/2023/9/8/23864856/studio-ghibli-hayao-miyazaki-retirement-postponed-yet-again). I find it pretty comforting that Miyazaki just keeps making films; even if his next film isn’t amazing, even if it’s his _last_ last, we still have all the great films he made before. New films don’t (necessarily) detract from the experience of the previous films!

Somewhat related: [It's Not A Bad Restaurant, It's A Bad Dish](https://www.atvbt.com/internal-variance/?ref=atoms-vs-bits-newsletter), which argues that we should think in terms of a bad _dish_ instead of a bad _restaurant_, because maybe other dishes are good, then extends that to artists and their works.

## Region-Based Undos

Here’s a concept I thought of recently that I would love for someone else to build 🙂

Most text editors have an undo/redo functionality based on a stack of text edits _per file_. Make a change at the top followed by a change at the bottom, then undo twice, and both changes get undone.

But what if we had undo/redo based on a stack _per region_? For instance, in programming, we could have an undo/redo stack for each function block, say, or for regions defined by heuristics like “these two edits were very far apart”. Which stack you use could be defined by the current cursor position, so undoing would always undo something “near” you.

I thought of this because in programming we often end up with text files with many lines of code, and we end up changing code in different “regions” of a text file, like say changing the imports at the top of the file and the implementation in the middle of the file. It’s annoying to have to change context when I hit Cmd-Z one too many times 😞

Clearly there would be a lot of tough technical decisions, most obviously what happens when regions end up merged, which is why I don’t want to build this myself 🙂 git can sorta do this by being very carefully about how you stage patches, but that isn’t well supported by most tooling. I wonder if something like this exists anywhere?

## Subscriptions Cleanup

I subscribe to too many newsletters, so for the new year I’m doing a mini subscription purge. I am surprised just how many I actually subscribe to! Anyway, if you, like me, read too much, you may find it a helpful time to start purging.

[^1]: My favorites are _Spirited Away_, _Princess Mononoke_, and _Kiki’s Delivery Service_, although I liked _Castle in the Sky_ too. I’ve never actually seen _Porco Rosso_ or _Nausicaa_, though! As a side note, I have a working theory that people (that like Miyazaki films) can either like _Kiki’s_ or _Howl's_ but not both.