---
title: As Promised, A Very Dumb Frog (rwblog S6E6)
lastUpdatedDate: 2024-07-17 05:38:11.411719+00:00
publicationDate: 2023-06-11 05:38:11.411719+00:00
season: 6
---

> Currently listening to: Orbvm Terrarvm, The Orb[^1]

This issue is an old-school linkblog. Not a whole lot of thoughts on my end, just a lot of web [bricolage](https://en.wikipedia.org/wiki/Bricolage). Share and Enjoy![^2]

![Electrical lighting in Mission Bay](../../assets/newsletters/mission_bay.jpg)

## The Web Is A Great Platform, Actually

So I’ve been enjoying my time as a full-stack engineer, even as Apple platforms once again draw my attention with [“spatial computing”](https://www.apple.com/apple-vision-pro/). That’s in no small part because I’ve learned that the web is a great platform, actually![^3]

[Last month](https://buttondown.email/rwblickhan/archive/did-you-know-stone-fruit-like-peaches-and-plums/) I talked about how cool WebGPU is, but that’s not all. Here’s an attempt to [build a signal analyzer on the web](https://cprimozic.net/blog/building-a-signal-analyzer-with-modern-web-tech/), with the takeaway that the web is very much ready to be a “real” platform now.

Also neat from a frontend perspective is the upcoming [scroll-driven animations](https://developer.chrome.com/articles/scroll-driven-animations/), which let you drive an animation from, well, how far a user has scrolled. That’s really nice! Sometimes I wish iOS had stuff like this, instead of forcing me to get a [border with corner radius](https://rwblickhan.org/technical/til/20230610-border-in-swiftui/). Similarly, I just learned about [Open UI](https://open-ui.org), a W3C community group trying to specify as many common components as possible. They even have a [neat chart](https://open-ui.org/research/component-matrix/) of every component in every web framework!

Honestly, I didn’t really have a point with this section, other than to point out that web technologies are really cool?

![A tree in Lafayette Park](../../assets/newsletters/lafayette_park.jpg)

## Russell’s LLM Corner

Welcome back to the corner where we talk about LLMs (sorry). If you have a functioning scroll wheel, you can skip the next section, where we talk about a very dumb frog.

So my favorite thing I read about LLMs this month was [”Why Chatbots Are Not the Future”](https://wattenberger.com/thoughts/boo-chatbots) by Amelia Wattenberger. Provocative title etc etc but it is a very interesting take from a Design Thinker™️ that I wholly agree with! I’ve linked before to Simon Willison’s take that LLMs will be more like [“calculators for words”](https://simonwillison.net/2023/Apr/2/calculator-for-words/) and this article goes along with it. I suspect most people actually _won't_ use LLMs via a chat interface for much longer, or at least not a ChatGPT-like interface; instead, we’ll see them baked in as infrastructure for “fuzzy problems”, like parsing text that is difficult to specify or providing tools for writers from a more traditional writing interface.

For instance, here’s [react-llm](https://github.com/r2d4/react-llm?utm_source=substack&utm_medium=email), which provides React hooks for working with an LLM running natively in the browser via WebGPU (which I talked about last week). I could imagine building a mini version of [Sudowrite](https://www.sudowrite.com) in a weekend with this…

Or not! Here’s [”All the Hard Stuff Nobody Talks About when Building Products with LLMs”](https://www.honeycomb.io/blog/hard-stuff-nobody-talks-about-llm) from Honeycomb, who built a Query Assistant™️ for their product. tl;dr building products with LLMs is hard and requires a lot of tough product engineering. I guess product engineers don’t need to worry about their jobs after all? /s

Finally, here’s [“Numbers Every LLM Developer Should Know”](https://github.com/ray-project/llm-numbers), modeled off the famous Jeff Dean paper “Numbers Every Software Engineer Should Know”. Even as a non-LLM developer, there’s some interesting rules of thumb in here, like how each word is about 1.3 tokens.

## The Very Dumb Pumpkin Toadlet

As promised, a very dumb frog:

![A pumpkin toadlet frog jumping and landing on its head](../../assets/newsletters/very_dumb_frog.gif)

It’s so small that the fluid in its ears doesn’t work right, so it has no sense of balance and just kind of falls on its head, which would seem like a problem vis a vis predation, but apparently it’s so poisonous nothing eats it.

I learned about this from [The Whippet](https://thewhippet.org/170-best-thing-know-about-bones/?ref=the-whippet-newsletter#the-pumpkin-toadlet-is-terrible-at-jumping), a newsletter you should absolutely subscribe to immediately if you would like to feel joy in your life.

## You Should Read _The Magic Fish_

You should read _The Magic Fish_ by Trung Le Nguyen! Drop everything and read it! It’s a very charming coming-of-age comic about a gay Vietnamese teenager trying to come out to his parents via the medium of fairy tales! But it’s not one of those sad Ocean Vuong stories! It’s slightly bittersweet but mostly optimistic! And you get to read a bunch of fairy tales drawn with a meticulous hand and an eye of telling anachronism! In summary: you should read it!

## And A Whole Bunch of Other Links

- A friend recently mentioned that they had tried huitlacoche, so I of course immediately looked up an [Eater article](https://www.eater.com/22688579/what-is-huitlacoche-corn-usa-mexican-food-bias) explaining what it was. tl;dr it’s a fungus that grows on corn that’s considered a delicacy in most of Mexico and a pest in most of the United States (something something cultural evolution). I would like to try it now.
- Don’t tell anybody that looks suspiciously legal, but here’s [Anna’s Archive](https://annas-archive.org), a search engine for “shadow libraries” like Sci-Hub and Library Genesis. I… may have set up an iOS Shortcut to search for things on it. And [here’s a surprisingly interesting article](https://annas-blog.org/how-to-run-a-shadow-library.html) on their software architecture!
- UX designer Erica Heinz introduces the [“Craigslist test”](https://ericaheinz.com/notes/give-it-the-craigslist-test/#.ZFp8MKTMLVa). You can make a product beautiful, but what’s the point if it’s not useful? Folks use Craigslist, even though it’s… Craigslist. So perhaps it makes sense to make a barely-functional prototype to try to find product-market fit first.
- [Eyecandy](https://eycndy.co) is a “visual thesaurus” of filmmaking techniques. Just… go stare at the gifs for a bit. It’s hypnotic.

![Light-up fire escape stairs along Market St](../../assets/newsletters/50_jones.jpg)

## Today I Learned I Know Nothing

I’m still writing irregular technical [TIL posts](https://rwblickhan.org/technical/) inspired by [Simon Willison](https://til.simonwillison.net) — I definitely recommend checking them out 😉 I also wrote up a [list of VS Code plugins](https://rwblickhan.org/technical/vscode-plugins/) that I’ve been using. Also, in case you missed it (and want even more links), I have reading lists for some of the major theme areas I list on my site, which I update every so often:

- [Tools for Thought](https://rwblickhan.org/misc/tools-for-thought-reading-list/)
- [Consciousness, Identity, & Neurodiversity](https://rwblickhan.org/misc/consciousness-neurodiversity-reading-list/)
- [Culture & Technology](https://rwblickhan.org/misc/culture-reading-list/)

I’ve also been working on a personal library [a la Borges](https://whyisthisinteresting.substack.com/p/the-biblioteca-personal-edition?utm_source=post-email-title&publication_id=7000&post_id=126916949&isFreemail=true&utm_medium=email), but that’s not ready for prime time yet.

Until next time!

[^1]: This is what I’m literally listening to right now. If you want a listening recommendation, you should listen to Janelle Monae’s new album _The Age of Pleasure_. It’s good!!! Thank God it’s good!!!

[^2]: I’ve finally gotten around to reading the radio scripts for the later series of _Hitchhiker’s Guide to the Galaxy_, which are a lot happier than the frankly bitter _Mostly Harmless_. They do, unfortunately, cut the long Douglas Adams rant about people with the name “Russell.”

[^3]: Despite the insistence of [_Resilient Web Design_](https://resilientwebdesign.com) that the web should properly be _cross_-platform.