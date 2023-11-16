---
title: Pattern Language
lastUpdatedDate: 2023-09-25
---

<!-- markdownlint-disable no-duplicate-header -->

These are various “patterns” that I tend to use and reuse in my thinking. This page is inspired in no small part by Jacky Zhao’s [“A Pattern Language”](https://jzhao.xyz/thoughts/A-Pattern-Language/) and her [list of patterns](https://jzhao.xyz/tags/pattern/). Is this really accurate to Christopher Alexander’s [_A Pattern Language_](https://en.wikipedia.org/wiki/A_Pattern_Language)? No idea, but I find this useful.

## Table of Contents

## Chesterton's Fence

_Before you remove a fence, figure out what it's for._

### References

- ["Chesterton's Fence"](https://matt-rickard.com/chestertons-fence), Matt Rickard
- ["Lens of the week: Chesterton's Fence"](https://read.fluxcollective.org/i/137489936/lens-of-the-week), The FLUX Review

### Details

> In the matter of reforming things, as distinct from deforming them, there is one plain and simple principle; a principle which will probably be called a paradox. There exists in such a case a certain institution or law; let us say, for the sake of simplicity, a fence or gate erected across a road. The more modern type of reformer goes gaily up to it and says, 'I don't see the use of this; let us clear it away.' To which the more intelligent type of reformer will do well to answer: 'If you don't see the use of it, I certainly won't let you clear it away. Go away and think. Then, when you can come back and tell me that you do see the use of it, I may allow you to destroy it. (G.K. Chesterton, _The Drift from Domesticity_)

Thanks to [cultural evolution](https://rwblickhan.org/misc/pattern-language/#cultural-evolution), many perplexing human behaviors are actually highly useful, even if participants can't actively explain themselves. If you suddenly change that behavior, you might find that it was actually load-bearing — it was completely necessary for surrounding systems to function!
So, it's often worthwhile to investigate before changing, especially if a behavior seems confusing.

Because humans occupy the [cultural niche](https://rwblickhan.org/misc/pattern-language/#cultural-niche) and many of our behaviors can be looked at through a cultural lens, Chesterton's Fence can be applied to many different fields. Programming is a particularly fruitful field — whenever dealing with legacy code, it's always useful to ask _why_ the code behaves the way it does, even if it's strange (for instace, being written in COBOL!).

## Cultural Niche

_Humans are uniquely successful due to our social learning ability._

### References

- _The Secret of Our Success: How Culture is Driving Human Evolution, Domesticating Our Species, and Making Us Smarter_, Joseph Henrich
- [“A Rant About ‘Technology’”](https://web.archive.org/web/20230318100241/http://www.ursulakleguinarchive.com/Note-Technology.html), Ursula K. Le Guin
- My own [culture & technology reading list](https://rwblickhan.org/misc/culture-reading-list/)

### Details

Humans are not the only intelligent animal; humans are not the only tool-using animal; humans are not the only social learning animal. However, humans are almost unique in their ability to socially learn _across generations_, slowly accumulating more effective tools, processes, thinking patterns, and organizations of relationships to solve day-to-day challenges, the sum total of which we call “culture.” Our biology is in fact evolved to promote just this ability, which is adaptable to nearly every environment; in a very real sense, our “niche” as a species is “anything we can learn to do from others.”

## Cultural Evolution

_Culture is subject to evolutionary pressures._

### References

- _The Secret of Our Success: How Culture is Driving Human Evolution, Domesticating Our Species, and Making Us Smarter_, Joseph Henrich
- _Giving Up the Gun: Japan’s Reversion to the Sword, 1543-1879_, Noel Perrin

### Details

Culture, as described above, ends up subject to evolutionary pressures. Three important points:

- Many cultural behaviors are (mal)adaptive to some problem in the environment, but the individuals engaging in the culture may have no understanding of _why_ they behave the way they do! Henrich uses the example of manioc, a tuber native to the Americas that contains cyanide, but is happily consumed by native peoples of the Amazon thanks to a convoluted multistep leaching process that nobody understood until the introduction of modern scientific instruments.
- Additionally, different cultures are adapted to different environments in non-obvious ways. Henrich uses the example of the many European explorers who died in the Arctic, in contrast to the Inuit.
- Culture is sensitive to interventions and broken chains of transmission. The Baffin Island Inuit lost kayaks as a technology and didn’t regain it until accidentally contacting other Inuit groups. Japan had a massive influx of firearms in the 16th century, but they were banned and mostly forgot about a century later.

## Deliberate Practice

_Deliberately practicing skills can be the most effective way to improve them._

### References

- ["The Role of Deliberate Practice in the Acquisition of Expert Performance"](https://jsomers.net/blog/deliberate-practice)
- ["Implicit practice: a sight reading parable"](https://andymatuschak.org/sight-reading/), Andy Matuschak
- ["Having a creative practice as a programmer"](https://the.scapegoat.dev/having-a-creative-practice-as-a-programmer/), the scapegoat dev
- [_Range_](https://search.worldcat.org/title/1099594495), David Epstein (for a slightly contrary take)

### Details

Setting aside time (the famous "10,000 hours") to deliberately practice individuals skills can be the most effective way to improve a skillset.
Indeed, as Andy Matuschak explores in "Implicit practice," relying on the "implicit practice" provided by a discipline's usual work can lead to skill gaps we're not even aware of!

We should be careful taking this too far. David Epstein's _Range_ argues that breadth is a depth all its own — in many disciplines, the top performers are actually people that explored a range of topics or disciplines and _didn't_ get 10,000 hours of practice.
In particular, he argues that deliberate practice doesn't work for "wicked problems", where feedback is delayed or hard to interpret.

Still, for many disciplines, from art to writing to programming to atheletics, there are individual skills that are amenable to deliberate practice.

## Digital Garden

_Treat a personal website as a work-in-progress wiki, not a reverse-chronological blog._

### References

- ["Digital Garden"](https://ajy.co/digital-garden/), Aaron Young
- ["Work with the garage door up"](https://notes.andymatuschak.org/Work_with_the_garage_door_up), Andy Matuschak
- ["A Brief History & Ethos of the Digital Garden"](https://maggieappleton.com/garden-history), Maggie Appleton
- ["Digital Gardening for Non-Technical Folks"](https://maggieappleton.com/nontechnical-gardening), Maggie Appleton

### Details

"Digital gardening" is a recent movement to treat personal websites more like always-in-progress personal wikis instead of a traditional reverse-chronological blog.
That might involve publishing unpolished notes, updating pages when you learn more, linking heavily between pages, distinguishing between different classes of recency, and so on.
This site is inspired by the principles of digital gardening, since I intend most pages to be "evergreen" and updated over time, although I don't take the concept as far as many others do.

## Dunbar’s Number

_Stable human social groups are limited to about 150 people._

### References

- [”Neocortex size as a constraint on group size in primates”](https://www.sciencedirect.com/science/article/abs/pii/004724849290081J?via%3Dihub)
- [“Dunbar’s number and how speaking is 2.8x better than picking fleas”](https://interconnected.org/home/2022/04/05/dunbar)
- [“Platoons - a natural unit size for a modern army”](https://youtu.be/a15gihWu1SM)
- _Friends: Understanding the Power of our Most Important Relationships_, Robin Dunbar

### Details

Robin Dunbar is a fairly prominent anthropologist — I highly recommend his books _Friends_ and _Why Religion Evolved_ — but he is most famous for his eponymous number, introduced in “Neocortex size as a constraint on group size in primates”. He studied the average group sizes of other social primates and discovered a striking relationship between group size and neocortex size. If you plug humans into the resulting equation, you get “Dunbar’s number” of about 150, which is the maximum size of a stable social group, or how many “close” interpersonal relationships we can have. This has been borne out by repeated studies of human social groups, from militaries to churches to Discord channels. Social groups that grow much bigger than Dunbar’s number need more complicated organizational structures to make up for the fact that most members will not, and indeed _cannot_, know most other members.

## Eternal September

_Communities struggle to assimilate large numbers of new people arriving at the same time._

### References

- ["September that never ended"](http://www.catb.org/jargon/html/S/September-that-never-ended.html), Jargon File
- ["Killing Community"](https://www.marginalia.nu/log/82_killing_community/), Marginalia.nu

### Details

Before 1993, the proto-web message boards of Usenet saw a yearly influx of new users around September, when new university students got access to Usenet for the first time.
At first, these new arrivals would have poor etiquette, but through a mixture of shaming, mockery, trolling, and simple observation, they would socialize to the standards of Usenet.
Around 1993, service providers began providing much larger numbers of users with access to Usenet, leading the forums to become overwhelmed with badly-behaved users (at least, from the perspective of old-timers). That led some to refer to this period as an "Eternal September."

The broader lesson here is that communities, if they are to remain communities, need time to socialize new arrivals into the culture of the community.
Otherwise, they risk becoming a place where strangers mostly interact with strangers, where there is no sense of shared norms and few repeated interactions that would encourage politeness.

## Illusion of Explanatory Depth

_Humans think they understand familiar systems better than they actually do._

### References

- ["Underrated ideas in psychology: The illusion of explanatory depth"](https://www.experimental-history.com/i/57359087/the-illusion-of-explanatory-depth), Adam Mastroianni
- [What scientific term or concept ought to be more widely known?: The Illusion of Explanatory Depth](https://www.edge.org/response-detail/27117), Adam Waytz

### Details

How does a toilet work? A car? A computer? The economy?

For systems we're familiar with, we tend to rate our understanding highly, but in practice most people can barely explain the basics of how a toilet works.
This isn't necessarily a bad thing — humans are great at compartmentalizing what we need to know and what we don't.
However, it can backfire when we forget that we don't _really_ understand things that we think we do.

## Rubber Duck Problem Solving

_Talking through a problem in as much detail as possible can help solve it, even if you're just talking to a rubber ducky._

### References

- ["Rubber Duck Problem Solving"](https://blog.codinghorror.com/rubber-duck-problem-solving/)

### Details

One of the best problem-solving techniques from software engineering is to explain the problem and attempted solutions in as much detail as possible. It doesn't matter whether you're talking to another software engineer or even another person; you could even use a rubber ducky! The important part is to explain the problem in as much detail as possible, because it helps clarify your assumptions and will often reveal overlooked details.

## Scenius

_”Scenes” are often more inventive than individuals._

### References

- [“Scenius, or Communal Genius”](https://kk.org/thetechnium/scenius-or-comm/), Kevin Kelly
- [“How to Walk and Talk”](https://craigmod.com/ridgeline/043/), Craig Mod
- [“The Scenius Edition”](https://whyisthisinteresting.substack.com/p/the-scenius-edition), _Why is this interesting?_

### Details

Scenius is a concept coined by Brian Eno to describe the fact that groups of creative individuals in the same time and place — a “scene”, if you will — are often much more inventive than the individuals themselves. This is arguably the “micro” version of cultural evolution as described above. There are many examples, from literary groups like the Inklings or the Bloomsbury Group, to the invention of modern climbing at Camp 4 in Yosemite, to the flow of conversation at a really good dinner party.

## Spaced Repetition

_Memorize anything efficiently by reviewing at spaced intervals._

### References

- ["Spaced Repetition for Efficient Learning"](https://gwern.net/spaced-repetition), Gwern
- ["How to make memory systems widespread?"](https://michaelnotebook.com/mmsw/), Michael Nielsen
- ["Effective Spaced Repetition"](https://borretti.me/article/effective-spaced-repetition), Fernando Boretti

### Details

[Ebbinghaus' forgetting curves](https://en.wikipedia.org/wiki/Forgetting_curve) show that the most efficient way to remember something is to test yourself at increasingly-spaced intervals. As a result, with the help of spaced-repetition software and careful choice of flashcards, you can efficiently remember virtually anything you choose to.