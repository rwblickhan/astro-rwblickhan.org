---
title: Tools for 2022
date: 2022-01-16
description: "Tools I'm using in early 2022."
---

Hey folks, in the spirit of “what’s in your bag,” I wanted to do a quick (and by quick I apparently mean 2,600+ word) overview of the tools I use every day outside of work. Most of these are (surprise, surprise) iOS apps.

![A monk being annoyed by his lacking tools... and also a mouse!](/tools/2022/C4773199-F12A-4B38-8859-7AD487D3A9FA.jpeg)

## Table of Contents

## Notes

I have become a full-on member of the [**Obsidian**](https://obsidian.md/) cult. (Shout out to Rob and Susie!) I switched to it late last year when I learned they had introduced a fast mobile app, which moreover has good offline support and syncs via iCloud, the lack of which made me fairly lukewarm on Notion, Zettlr, and other popular note-taking apps. I’ve since also discovered the wonderful world of Obsidian plugins; although I only use a few of them, I use them fairly heavily (see below), which prevents me from adopting the mobile-native Craft, which I would otherwise be very interested in.

![An example of a tagged note with a source](/tools/2022/D507AB2C-1AAA-4B56-BD84-B6E564C20C0A.png)

I primarily use a core Notes vault, where I throw almost anything I want to remember; typically, that includes notes on articles or books I’ve read, links to resources or tools that look useful, or stray thoughts I want to remember. I don’t bother with folders and I only use backlinking very sparingly, usually when one note directly reminds me of another note or I want to make a “series” of notes; however, I do use tags fairly heavily, with various categories like story ideas or iOS engineering, which I just append to the bottom of a note. I also often import images, particularly diagrams or pictures that are important to the note, which is particularly easy on iPad, since Obsidian integrates with photo library. A very few notes also use the built-in MathJax support for mathematical notation, too.

For notes related to a website, article, or book, I like to keep a “sources” section at the bottom with a link or other reference. For websites specifically, which make up the bulk of these notes, I wrote an [iOS Shortcut](https://support.apple.com/guide/shortcuts/welcome/ios) that uses the [Obsidian URI scheme](https://help.obsidian.md/Obsidian/Index) to generate a note pre-formatted with a link, which I can run from the share sheet basically anywhere in iOS.

I also installed the [Excalidraw plugin](https://github.com/zsviczian/obsidian-excalidraw-plugin) that lets you use Excalidraw to draw diagrams. I haven’t used this much yet, but it seems useful for programming and worldbuilding diagrams.

![One line of dataview code…](/tools/2022/E78C1A6D-E13D-4389-9A70-DFDDC4D8EF85.png)
![… becomes a nicely-formatted table!](/tools/2022/16650094-31BD-4347-9FAF-68A02A1F12E6.png)

I also set up a Yearly Goals vault, where I ported the yearly goals I had previously kept in Notion. In this vault, I use [Dataview](https://blacksmithgu.github.io/obsidian-dataview/) to generate tables out of metadata-annotated notes, in much the same way as Notion’s tables work. I give each goal its own note, with “type” and “status” tags as metadata; then I have a “goal table” note that merely presents a dataview over that year’s notes, as well as providing a list of “other notables” that weren’t part of the goals.

Obsidian notes are just Markdown and Obsidian’s configuration is just JSON, so they work very nicely with git. Even better, when they sync with iCloud, they still show up as regular files in the iCloud filesystem, so it’s possible to save them with git while also syncing with iCloud; on iPad, I tend to manage them with [**Working Copy**](https://workingcopyapp.com/), a _very_ nice git client for iOS.

I’m also toying with making other vaults using Dataview, like a list of restaurants to try in San Francisco, but I’ll see how those go.

For all of these vaults I use the [Minimal Theme](https://github.com/kepano/obsidian-minimal), which should honestly be the default on Apple platforms. For the Notes vault, I have a little CSS description that formats links and quote blocks to look more like [rwblickhan.org](https://rwblickhan.org); for the Yearly Goals vault, I adapted a CSS description I found that colorizes tags, including in Dataview tables, which makes it easy to see at-a-glance how many goals were achieved.

I very occasionally throw notes into the bog-standard Notes app on iOS, just because it’s marginally quicker to launch than Obsidian.

## Task Management

![Look at all the stuff I have to take notes on 😱](/tools/2022/25C75B95-23A1-46D2-B073-E2124FD62F11.png)

I use [**Things**](https://culturedcode.com/things/) as my task manager. It’s somewhat pricey at $10 (and much more, if you want the iPad or Mac apps), but given how heavily I rely on it, it’s a price I would happily pay again. Things is produced with such care and refinement that I can’t imagine switching to a competing system; it is possibly the only software where I have encountered _zero_ bugs, and I have only wanted one minor quality-of-life improvement, which was soon after addressed in an update.

Philosophically, I don’t subscribe to [GTD](https://en.wikipedia.org/wiki/Getting_Things_Done) or any other methodology, most of which take themselves far too seriously and mostly just seem like a recipe for undue stress — perhaps why task lists have their critics. Instead, I essentially use Things as a glorified reminders app. I do keep it as a widget on my home screen, but I happily reschedule tasks or even just let them roll over to the next day; I care more about seeing and remembering the task than necessarily getting it done right away, since I do tend to get all my tasks done eventually.

I generally follow the rule “if it’s not in Things[^1], it doesn’t get done”, so anything vaguely task-like or that I want to remember at a later date goes straight into Things. Typically I assign a due date immediately, often just “today”; as mentioned above, those due dates are very often bumped, sometimes repeatedly. Certain tasks, like grocery shopping or gift shopping, get a checklist as well.

I do have a few projects set up in Things, which I use to “tag” certain categories of tasks, e.g. newsletter ideas for `rwblog` or articles I want to take notes on. Many of these tasks don’t get due dates; instead, I revisit them when I have some spare time or when I’m working in that area. I also have a list of “learning resources” (tutorials, textbooks, etc) which I’ll likely move into Obsidian at some point.

## Writing

![This very article being written!](/tools/2022/351C5D92-3010-409A-8703-A0048F4A95CB.png)

Most of my “heavier” writing, like this newsletter or novels, is done in [**Ulysses**](https://ulysses.app/). Ulysses feels very your-mileage-may-vary; there are certainly other tools, like iA Writer or Scrivener, playing in the same space — hypothetically even Obsidian could work for this purpose — and Ulysses (in)famously has a subscription fee.

That said, for some reason, Ulysses just clicked with me; it mostly just gets out of the way, yet always seems to be able to do whatever I throw at it. It sticks to a tasteful implementation of Markdown, with the ability to export to beautiful PDFs or .docx, without complicating things with a WYSIWIG editor. Its group-of-group-of-sheets format has all the flexibility of a traditional filesystem structure without requiring me to actually manage a filesystem. It has a built-in word goal counter that lights up a happy green when I’ve done my writing for the day. It has an interface that Just Works™️, on all of its available platforms, in that pleasantly Apple-platform-native way, including lots of ways to search and navigate your text and an iCloud sync that has never failed me. I happily pay the subscription fee — which I also see as a “this product will never go away” insurance fee — given I easily spend at least an hour a day in Ulysses.

## Email and Calendar

Look, I’m a simple man. On iOS, I use the default **Calendar** (synced to iCloud) and the default **Mail** (synced to Gmail), neither of which I find particularly inspiring, but neither of which I have any particular issue with either. I don’t really have a “workflow” for them, either; maybe I’m not much of an adult, but I just don’t spend much time managing my calendar or my mail! My calendar is essentially “social events I will forget otherwise” and my email is, honestly, mostly newsletters (so... many... newsletters) these days. I do keep widgets for both on my homescreen, though.

That said, on Mac specifically, I do like to use the newly-launched [**Mimestream**](https://mimestream.com/), which is basically a turbo-charged Mail.app specifically for Gmail. I don’t use most of the Gmail-specific features — because I don’t use them in Gmail — but the app does have that next-level-polish feel that Mail.app lacks.

## RSS

![Yes, I still read Marginal Revolution; yes, I still feel weird about their posts sometimes.](/tools/2022/4C4B8297-E481-4D84-B8E4-0B94C84739F9.png)

Yep, I’m that nerd that never let go of Google Reader. I switched to Feedly, but I never really _loved_ it. Last year, I finally switched over to the free-and-open-source [**NetNewsWire**](https://netnewswire.com/) and never looked back. It is, yep, yet another Apple-platform-native, Just Works™️ solution that syncs over iCloud (are you noticing a theme yet?).

I mostly follow various tech and tech-adjacent blogs, as well as a few academics like [Bret Devereaux](https://acoup.blog/) and [Tom Pepinsky](https://tompepinsky.com/blog/). NetNewsWire also has support for following Twitter feeds via the API, so I also follow various folks there, so that I never have to open the Hell Website again. I also keep this as a widget on my homescreen.

## Link Saving/Read-It-Later

![An article in the process of being read, supposedly.](/tools/2022/D0FA504A-5CD4-4CC1-AE50-B5F353A9144D.png)

I was a hardcore Instapaper user back in the day — so hardcore, in fact, that I switched back to iOS after a stint on Android specifically because Android did not have an Instapaper client, which is in fact why I am an iOS user and thus iOS developer today. Unfortunately, Instapaper development stagnated after Marco Arment sold it, and I eventually switched to Pocket, where I was apparently in the top 0.1% of readers. I was never really happy with Pocket, though, especially after the iOS app started crashing regularly.

“If only somebody would make an Apple-platform-native, Just Works™️ solution that syncs via iCloud,” I thought, and lo and behold, someone did! [**GoodLinks**](https://goodlinks.app/) is sold for a nominal price (like, $2 for all platforms) but does, in fact, Just Work™️.

That said, I use GoodLinks a bit differently that I used to use Instapaper/Pocket. Before, I would throw practically everything into the read-it-later service, even if I was in the process of reading it, and I didn’t bother tagging or otherwise triaging anything., meaning I ended up with a giant pile of 2,000 unread articles with no organization. (I don’t have a problem, I swear!)

Now, however, I only put things that I eventually want to give my full, undivided attention to and hopefully take notes on, which I am trying (and failing) to keep below 100 articles; everything else is either short enough I can throw directly into Obsidian as a note, or wasn’t worth keeping around anyway. I also tag _everything_ now, and I’m treating the “starred” section a bit more seriously as a long-term bookmarks service, somewhat akin to how I used to use Pinboard.

## Spaced Repetition

![Whee, let’s learn Chinese!](/tools/2022/CF05F888-5D0B-4B04-92CB-B11D20A17D8D.png)

I use [**Anki**](https://apps.ankiweb.net/) for spaced-repetition memorization, mostly to force-feed myself Chinese audio as a cheaper alternative to the (ridiculously overpriced) [Glossika](https://ai.glossika.com/).

I... don’t _love_ Anki, so much so I started hacking on [a nicer alternative](https://github.com/rwblickhan/Spreppy), but honestly it does the job well enough and there’s so many Anki decks out there that it’s the de facto standard for language learning 🤷‍♀️

I also adore **Tsurukame**, a native iOS client for the paid WaniKani kanji-learning service.

## Podcasts

![I swear I don’t have a problem!](/tools/2022/C7D874A8-4825-4520-A820-CE4B1A3292A3.png)

I listen to a _lot_ of podcasts, mostly while walking the dog. If you have read this far you will probably not be surprised to learn I use [**Overcast**](https://overcast.fm/), which to me is pretty obviously the best podcast client on iOS. It will probably also not surprise you that I listen to virtually everything at 2x speed with Smart Speed turned on... because I have something like 200 podcast subscriptions. (I don’t have a problem, I swear!)

I’ve recently taken to adding everything that looks interesting directly to the queue, so I don’t have to stop during the middle of dog walks to find something else to listen to. Curiously, Overcast is also basically the only Apple Watch app I use, since it’s pretty nice to be able to skip ahead when an ad plays without taking out my phone.

## Messaging

The thing about network effects is that you have to use what other people want you to use. My parents are full-on inductees to the Cult of Apple, so I use iMessage with them; most everyone else my age in America uses Facebook Messenger or Instagram Messages, so I use those too; those who don’t have Discord communities, so I’m in a couple of those; and of course at work I use Slack.

## Web Browsing

I use Safari and I’m not sorry.

## Programming

I am an iOS developer, so I use [**Xcode**](https://developer.apple.com/xcode/), with the surprisingly polished Vim mode turned on. For everyday text editing, I turn to [**Neovim**](https://neovim.io/), which is a modern implementation of vim. I only have some minor customizations and plugins, though.

On the rare occasions I’m not using Xcode but need something heavier than Neovim, I usually turn to [**Visual Studio Code**](https://code.visualstudio.com/), since that seems to be the de facto standard these days. I also use the Vim plugin there.

For terminal, I use zsh, with the oh-my-zsh plugin, in iTerm 2, but again, that’s mostly because those seem like the standards these days. I have a few minor customizations but none that are particularly interesting.

## Publishing

I publish all of my newsletters with [**Buttondown**](https://buttondown.email/). I don’t have a particularly interesting workflow there; I write the newsletter in Ulysses and then laboriously copy/paste them into the Buttondown web interface.

I generate [rwblickhan.org](https://rwblickhan.org) using the [**Publish**](https://github.com/JohnSundell/Publish) static site generator. It’s fairly “heavyweight” for what I have it do, not least because the site is implemented as a Swift package that has to be compiled, but I do like Swift and I think Publish is fairly well-implemented 🤷‍♀️

Every time I commit and push, a Github Action runs on [the repo](https://github.com/rwblickhan/rwblickhan.org) that builds the site and pushes it to an S3 bucket. I’ve got it served behind Cloudflare’s CDN because Cloudflare is free and also offers at-cost domain name registration.

## Hardware

These days I’m leaning heavily on the M1-powered iPad Pro I bought myself for Christmas. It’s _really_ nice and works surprisingly well for my purposes, given how limiting iPadOS is — though that may be because I tend towards platform-optimized apps. I got the keyboard case — though notably not the one with the trackpad — which makes it feel like a little super-portable laptop. I used to have an old Apple Pencil but haven’t used it since leaving university, so I didn’t bother with one for the new iPad.

I still have my beloved 2015-era MacBook Pro — not actually bought in 2015 — which does everything I need it to. It’s definitely feeling a bit hefty compared to the iPad Pro and all the talk of fanless M1 Pro MacBooks does make it feel a bit loud, but I don’t really have any complaints. I back it up via Time Machine every so often with a massive 2 TB external hard drive I picked up on sale at some point.

When my beloved iPhone 8 died two years ago, I got an iPhone 11 Pro, which is now also very beloved! It stopped charging via Lightning a few months ago, to my frustration, but repeated attempts to clean out its port finally paid off and I hope it’ll live many more long years.

I also have an Apple Watch Series.... 5?... that I won in a hackathon (long story). I wouldn’t perhaps recommend it to someone that did not already wear watches regularly, but as somebody that has worn a watch every day since I was about 13, it’s extremely nice.

I use a pair of Bose noise-cancelling headphones I got from work, and I also have a pair of random true-wireless Skullcandy headphones that work just as well as Airpods, thankyouverymuch.

And that’s just about everything I use day-to-day, here at the start of 2022!

[^1]: Or Asana, if it’s work-related.
