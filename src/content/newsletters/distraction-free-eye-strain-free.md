---
title: Distraction-Free Eye-Strain-Free
lastUpdatedDate: 2026-05-31
publicationDate: 2026-05-31
season: 8
---

![An elephant doll at Soma Animal Hospital](../../assets/newsletters/elephant_doll.jpg)

So last week I saw an Amazon flash sale and (being slightly tipsy at the time) decided to pull the trigger on a new toy I’d been eyeing for a while: the [Xteink X4](https://www.xteink.com/products/xteink-x4).

It’s an approximately-wallet-sized EInk ereader that has no touchscreen and no backlight and as a result retails for just $70 USD normally. The main benefit really is that wallet sizing — it’s about 4.5” x 2.75” and thus _certainly_ fits in a pocket, even a tiny chest pocket that’s not made to accommodate a phone. So, I can have a cute little distraction-free eye-strain-free EInk screen on me at all times,[^1] e.g. to read on transit.

![The Xteink X4 in my hand](../../assets/newsletters/xteink.jpg)

But it’s _also_ very hackable, and in particular you can replace[^2] the (iffy) default firmware with the open-source [Crosspoint Reader](https://crosspointreader.com/), which has seen a flurry of activity as Xteink’s devices have become popular. That gives you more control over the typography _and_ provides for transfer-over-WiFi.

Which then gave me an idea. I use [GoodLinks](https://goodlinks.app/)[^3] to save articles to read later, but I don’t _love_ reading them on my phone. Luckily, GoodLinks and Crosspoint both expose a (local) HTTP API. So I simply asked Claude to write me a shell function that loads all articles from GoodLinks tagged with “ereader”, converts them to epubs with good ol’ [pandoc](https://pandoc.org/), and uploads them to Crosspoint on the Xteink (when it’s in file-transfer mode).

---

The example above is, I think, one of the best use cases for so-called “agentic programming”. I certainly _could_ have written that script myself — it wouldn’t have taken _that_ long, maybe an hour or two at most — but realistically I wouldn’t have found it worthwhile to bother and instead just uploaded things manually. It was so much easier to just ask the [clanker](https://lucumr.pocoo.org/2026/5/26/clankers/) to build it to my specification while I cooked dinner.[^4]

---

Good week for ambient music: we got the [first new Boards of Canada release](https://record.club/releases/albums/boards-of-canada-inferno) in 13 years _and_ Instupendo’s [“Live from the Backrooms”](https://www.youtube.com/live/jGnhVhBuu74) DJ set, both fantastic.[^5]

A24 really does have some marketing geniuses — I was vaguely aware of the _Backrooms_ film and had seen the trailer at some point, but despite my well-known penchant for “spooky rooms”[^6] I didn’t consciously think about seeing it. _But_, now that I’ve had “Live from the Backrooms” on repeat all week, seeing this movie is all I can think about!!

---

I also spent a lot of time this week listening to Macintosh Plus’ _Floral Shoppe_, aka “the album you think of when you think of vaporwave” (and specifically the [second song off the album](https://www.youtube.com/watch?v=bAgmGZ9iQ2Y)). It somewhat randomly appeared on streaming services sometime in the past few months, after years of being available only on Bandcamp (and, iirc, not even being available there for some amount of time).

It’s a controversial album — Anthony Fantano somewhat famously [gave it a 4/10](https://youtube.com/watch?v=f0D9IyyeEEU) — but despite its simplicity, I’ve really been enjoying it. Despite the meme-ification of that second track, the rest of the album has much more variety, including some downright spooky ambient pieces towards the end.

---

Up there I included a couple links to [Record Club](https://record.club/), which The Verge (where I first heard about it) [described](https://www.theverge.com/entertainment/936829/record-club-letterboxd-for-music-nerds) as “Letterboxd for music nerds”, which of course led me to sign up immediately. It’s very album-focused, but that’s totally fine for my own album-focused listening habits. So if you want to see what I’ve been listening to... [follow here](https://record.club/rwblickhan) 😉

---

Since this newsletter is just a [Tor’s Cabinet](https://www.youtube.com/@torscabinetofcuriosities) fanblog now, I would be remiss to point to the [latest banger of an episode](https://youtube.com/watch?v=qNifKLp79Ks), in which Tor investigates Le Loyon, a mysterious gas-mask-clad individual that haunted the forests outside a small Swiss town throughout the late 2000s — until he was caught on camera! (And yes, as a Midwestern, I was waiting for the [Mad Gasser of Mattoon](https://en.wikipedia.org/wiki/Mad_Gasser_of_Mattoon) to come up.)

---

One of the first things I read on that Xteink was [“Do Elephants Have Souls?”](https://www.thenewatlantis.com/publications/do-elephants-have-souls),[^7] which had been languishing in GoodLinks for probably over a year now. It’s a lovely, if lengthy, exploration of what it means to share the planet with elephants, creatures that sure do seem almost as intelligent as ourselves. For some reason I always think of octopi or corvids as the “obvious” intelligent animals and forget that elephants not only exist but are _strikingly_ emotional.

---

Colin Dickey[^8] has a [new essay](https://www.poetryfoundation.org/articles/1800148/this-is-a-true-story) — for the Poetry Foundation, of all places! — analyzing the work of Gray Barker, who was apparently one of the most important sources of ufology lore (most notably introducing the idea of the Men in Black) and also, not uncoincidentally, a somewhat-closeted gay man in West Virginia. And also a poet! (Hence the Poetry Foundation.)

[^1]: I love my Kobo, but it's just _too big_ to bring with me most of the time.
[^2]: And by "replace the firmware" I mean "plug it in with USB-C and click a button on Crosspoint's website".
[^3]: Which is basically a modern-day, iOS-native Instapaper or Pocket, made by (as far as I can tell) one solo developer. It's _really_ well-implemented.
[^4]: If something _is_ broken with the script, well, worst case it'll delete a few throwaway files. And the total token cost was something like $0.50, so _hopefully_ it is not boiling the ocean any more than say using a kettle regularly.
[^5]: Though I have _some_ issues with _Inferno_ — I don't love it as much as _Tomorrow's Harvest_, unfortunately — some of the not-quite-spoken-word and Indian-influenced sections, though fitting for their apocalyptic-70s theme, feel clumsy.
[^6]: See my love of _House of Leaves_ or [some of the stories](https://rwblickhan.org/creativewriting/doorbell/) I've put up here!
[^7]: Which, sadly, seems to now be paywalled...
[^8]: Of [_The Unidentified_](https://app.thestorygraph.com/books/ce6c3757-e049-4438-a2e2-dc5c854fbcd8), which I read way back when it came out in 2020; apparently I never wrote about it, but it's a fantastic cultural history of America's postwar obsession with "unexplainable" phenomena.
