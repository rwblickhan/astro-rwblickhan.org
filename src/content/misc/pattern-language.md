---
title: Pattern Language
description: Patterns I keep coming back to
lastUpdatedDate: 2024-08-11
---

<!-- markdownlint-disable no-duplicate-heading -->

These are various “patterns” that I tend to use and reuse in my thinking. This page is inspired in no small part by Jacky Zhao’s [“A Pattern Language”](https://jzhao.xyz/thoughts/A-Pattern-Language/) and her [list of patterns](https://jzhao.xyz/tags/pattern/). Is this really accurate to Christopher Alexander’s [_A Pattern Language_](https://en.wikipedia.org/wiki/A_Pattern_Language)? No idea, but I find this useful.

## Table of Contents

## Chesterton's Fence

_Before you remove a fence, figure out what it's for._

### References

- ["Chesterton's Fence"](https://matt-rickard.com/chestertons-fence), Matt Rickard
- ["Lens of the week: Chesterton's Fence"](https://read.fluxcollective.org/i/137489936/lens-of-the-week), The FLUX Review

### Details

> In the matter of reforming things, as distinct from deforming them, there is one plain and simple principle; a principle which will probably be called a paradox. There exists in such a case a certain institution or law; let us say, for the sake of simplicity, a fence or gate erected across a road. The more modern type of reformer goes gaily up to it and says, 'I don't see the use of this; let us clear it away.' To which the more intelligent type of reformer will do well to answer: 'If you don't see the use of it, I certainly won't let you clear it away. Go away and think. Then, when you can come back and tell me that you do see the use of it, I may allow you to destroy it. — G.K. Chesterton, _The Drift from Domesticity_

Thanks to [cultural evolution](https://rwblickhan.org/misc/pattern-language/#cultural-evolution), many perplexing human behaviors are actually adaptive, even if participants can't actively explain themselves. If you suddenly change that behavior, you might find that it was load-bearing — it was completely necessary for surrounding systems to function!
So, it's often worthwhile to investigate before changing, especially if a behavior seems confusing.

Because humans occupy the [cultural niche](https://rwblickhan.org/misc/pattern-language/#cultural-niche) and many of our behaviors can be looked at through a cultural lens, Chesterton's Fence can be applied to many different fields. Programming is a particularly fruitful field — whenever dealing with legacy code, it's always useful to ask _why_ the code behaves the way it does, even if it's strange (for instance, being written in COBOL!).

## Cultural Niche

_Humans are uniquely successful due to our social learning ability._

### References

- _The Secret of Our Success: How Culture is Driving Human Evolution, Domesticating Our Species, and Making Us Smarter_, Joseph Henrich
- _Cultural Evolution: How Darwinian Theory Can Explain Human Culture and Synthesize the Social Sciences_, Alex Mesoudi
- [“A Rant About ‘Technology’”](https://web.archive.org/web/20230318100241/http://www.ursulakleguinarchive.com/Note-Technology.html), Ursula K. Le Guin
- My own [culture & technology reading list](https://rwblickhan.org/misc/culture-reading-list/)

### Details

Humans are not the only intelligent animal; humans are not the only tool-using animal; humans are not the only social learning animal. However, humans are almost unique in their ability to socially learn _across generations_, slowly accumulating more effective tools, processes, thinking patterns, and organizations of relationships to solve day-to-day challenges, the sum total of which we call “culture.” Our biology is in fact evolved to promote just this ability, which is adaptable to nearly every environment; in a very real sense, our “niche” as a species is “anything we can learn to do from others.”

## Cultural Evolution

_Culture is subject to evolutionary pressures._

### References

- _The Secret of Our Success: How Culture is Driving Human Evolution, Domesticating Our Species, and Making Us Smarter_, Joseph Henrich
- _Cultural Evolution: How Darwinian Theory Can Explain Human Culture and Synthesize the Social Sciences_, Alex Mesoudi
- _War in Human Civilization_, Azar Gat
- _Giving Up the Gun: Japan’s Reversion to the Sword, 1543-1879_, Noel Perrin
- ["Is Cultural Change a Darwinian Process? No."](https://culture.ghost.io/is-cultural-change-a-darwinian-process-no/), W. David Marx (for a contrary take)

### Details

The logic of Darwin's theory of natural selection only requires three preconditions:

- Variation in traits across a population.
- Inheritance of traits across generations, with modification between generations.
- Differential fitness — some traits are more likely to be inherited across generations than others.

If a trait meets these three preconditions, we should expect to see _evolution_ — a directed change in the proportions of a trait across a population across time.
Notably, as Mesoudi's _Cultural Evolution_ points out, Darwin's logic does not rule out Lamarckian (within-generation) evolution or require particulate inheritance, both of which are parts of biology's modern synthesis.
As a result, human cultural behaviors can also be considered as subject to evolutionary pressures, albeit following a different model than the biological synthesis.

This has all kinds of implications; for instance:

- Many cultural behaviors are adaptive, but individuals in the population may have no understanding of _why_ they follow the behaviors they do! Henrich uses the example of manioc, a tuber native to the Americas that contains cyanide, but is happily consumed by native peoples of the Amazon thanks to a convoluted multistep leaching process that nobody understood until the introduction of modern scientific instruments.
- Culture is sensitive to interventions and broken chains of transmission, causing _cultural drift_, where traits are randomly lost due to small population size. The Baffin Island Inuit lost kayaks as a technology and didn’t regain it until accidentally contacting other Inuit groups. Japan had a massive influx of firearms in the 16th century, but they were banned by the victorious _bakufu_ and mostly forgotten a century later.

## Deliberate Practice

_Deliberately practicing skills can be the most effective way to improve them._

### References

- [“The Role of Deliberate Practice in the Acquisition of Expert Performance”](https://www.researchgate.net/publication/224827585_The_Role_of_Deliberate_Practice_in_the_Acquisition_of_Expert_Performance), Ericsson et. al.
- ["The Role of Deliberate Practice in the Acquisition of Expert Performance"](https://jsomers.net/blog/deliberate-practice), James Somers
- ["Implicit practice: a sight reading parable"](https://andymatuschak.org/sight-reading/), Andy Matuschak
- ["Having a creative practice as a programmer"](https://the.scapegoat.dev/having-a-creative-practice-as-a-programmer/), the scapegoat dev
- ["Some reasons to work on productivity and velocity"](https://danluu.com/productivity-velocity/), Dan Luu
- ["95%-ile isn't that good"](https://danluu.com/p95-skill/), Dan Luu
- [_Range_](https://search.worldcat.org/title/1099594495), David Epstein (for a contrary take)

### Details

Setting aside time (the famous "10,000 hours") to deliberately practice individual skills can be the most effective way to improve a skillset.
Indeed, as Andy Matuschak explores in "Implicit practice," relying on the "implicit practice" provided by a discipline's usual work can lead to skill gaps we're not even aware of!

We should be careful taking this too far. David Epstein's _Range_ argues that breadth is a depth all its own — in many disciplines, the top performers are actually people that explored a range of topics or disciplines and _didn't_ get 10,000 hours of practice.
In particular, he argues that deliberate practice doesn't work for "wicked problems", where feedback is delayed or hard to interpret.

Still, for many disciplines, from art to writing to programming to athletics, there are individual skills that are amenable to deliberate practice.

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

- [”Neocortex size as a constraint on group size in primates”](https://www.sciencedirect.com/science/article/abs/pii/004724849290081J?via%3Dihub), Dunbar et. al.
- [“Dunbar’s number and how speaking is 2.8x better than picking fleas”](https://interconnected.org/home/2022/04/05/dunbar), Matt Webb's Interconnected
- [“Platoons - a natural unit size for a modern army”](https://youtu.be/a15gihWu1SM), Lindybeige
- _Friends: Understanding the Power of our Most Important Relationships_, Robin Dunbar

### Details

Robin Dunbar is a fairly prominent anthropologist — I highly recommend his books _Friends_ and _Why Religion Evolved_ — but he is most famous for his eponymous number, introduced in “Neocortex size as a constraint on group size in primates”. He studied the average group sizes of other social primates and discovered a striking relationship between group size and neocortex size. If you plug humans into the resulting equation, you get “Dunbar’s number” of about 150, which is the maximum size of a stable social group, or how many “close” interpersonal relationships we can have. This has been borne out by repeated studies of human social groups, from militaries to churches to Discord channels. Social groups that grow much bigger than Dunbar’s number need more complicated organizational structures to make up for the fact that most members will not, and indeed _cannot_, know most other members.

## Eternal September

_Communities struggle to assimilate large numbers of new people arriving at the same time._

### References

- ["September that never ended"](http://www.catb.org/jargon/html/S/September-that-never-ended.html), Jargon File
- ["Killing Community"](https://www.marginalia.nu/log/82_killing_community/), Marginalia.nu
- ["No More Eternal Septembers"](https://tedium.co/2020/10/13/eternal-september-modern-impact/), Tedium (for a more negative take on this mindset)

### Details

Before 1993, the proto-web message boards of Usenet saw a yearly influx of new users around September, when new university students got access to Usenet for the first time.
At first, these new arrivals would have poor etiquette, but through a mixture of shaming, mockery, trolling, and simple observation, they would socialize to the standards of Usenet.
Around 1993, service providers began providing much larger numbers of users with access to Usenet, leading the forums to become overwhelmed with badly-behaved users (at least, from the perspective of old-timers). That led some to refer to this period as an "Eternal September."

The broader lesson here is that communities, if they are to remain communities, need time to socialize new arrivals into the culture of the community.
Otherwise, they risk becoming a place where strangers mostly interact with strangers, where there is no sense of shared norms and few repeated interactions that would encourage politeness.

## Eyes on the Street

_A feeling of safety in urban environments is provided by having many “eyes on the street”._

### References

- _The Death and Life of Great American Cities_, Jane Jacobs
- _Seeing Like A State_, James C. Scott

### Details

What makes a neighborhood feel safe or unsafe? Why did so many of the housing projects of the mid-twentieth century fail so spectacularly?

One of the major arguments of Jane Jacobs’ _Death and Life_ is that neighborhoods feel safe when they are more lively — when there are a wide variety of people going about many different activities at all times of day, providing many “eyes on the street” to deter wrongdoing. After all, most humans are naturally cooperative and willing to step in if something untoward is happening.

Good neighborhoods — like, say, San Francisco’s North Beach — support many uses, from children going to school in the morning to workers in the office during the day to diners eating out in the evening to revelers partying at night. Bad neighborhoods — like, say, San Francisco’s Civic Center — are oriented around a single purpose, like civic administration or corporate offices, and remain desolate at “abnormal” times. The mid-twentieth century housing projects of high modernism, like Le Corbusier’s “tower in a park” idea, were ineffective because they segregated different purposes.

When in a new neighborhood, pay attention to how many “eyes on the street” you can notice.

## Illusion of Explanatory Depth

_Humans think they understand familiar systems better than they actually do._

### References

- ["Underrated ideas in psychology: The illusion of explanatory depth"](https://www.experimental-history.com/i/57359087/the-illusion-of-explanatory-depth), Adam Mastroianni
- ["What scientific term or concept ought to be more widely known?: The Illusion of Explanatory Depth"](https://www.edge.org/response-detail/27117), Adam Waytz
- [“A Rant About ‘Technology’”](https://web.archive.org/web/20230318100241/http://www.ursulakleguinarchive.com/Note-Technology.html), Ursula K. Le Guin

### Details

How does a toilet work? A car? A computer? The economy?

For systems we're familiar with, we tend to rate our understanding highly, but in practice most people can barely explain the basics of how a toilet works.
This isn't necessarily a bad thing — humans are great at compartmentalizing what we need to know and what we don't.
However, it can backfire when we forget that we don't _really_ understand things that we think we do.

## Magical Number Seven, Plus or Minus Two

_Human short-term memory is limited to seven (plus or minus two) “chunks”._

### References

- [“The Magical Number Seven, Plus or Minus Two: Some Limits on our Capacity for Processing Information”](http://psychclassics.yorku.ca/Miller/), George A. Miller
- [“The Source of Readability”](https://loup-vaillant.fr/articles/source-of-readability), Loup Vaillant

### Details

Extensive research has shown that human short-term memory is limited to about seven items. Importantly, this doesn’t mean seven _bits_ — experts are able to construct higher-level representations or “chunks” that allow them to remember more.

This principle can be applied widely anywhere human cognition is important. For instance, as Loup Vallaint argues, “readability” in software engineering is simply a function of limited short-term memory. Global variables are hard to understand because they take up precious memory space. Composition is better than inheritance because inheritance inherently requires keeping track of multiple interacting parent and children classes.

## Programming as Theory Building

_Programming is the process of building theory of how a problem is solved, not the production of a program._

### References

- [“Programming as Theory Building”](https://pages.cs.wisc.edu/~remzi/Naur.pdf), Peter Naur

### Details

Why is it difficult for a new team to take over development of a program? Why does documentation sometimes prove useless for understanding a system?

Peter Naur argues in this paper that programming is often misunderstood — it is not the process of producing an artifact that we call a “program”, but rather it is the process of the programmer developing a “theory” of how a particular problem can be solved using a program. In this view, the activity of “programming” _just is_ developing this theory and then applying it, with the corollaries that:

- A new team cannot be productive modifying an existing program until they have developed a theory of the program themselves.
- Documentation may be helpful during the theory-building process, but is no substitute for theory-building itself.

## Rubber Duck Problem Solving

_Talking through a problem in as much detail as possible can help solve it, even if you're just talking to a rubber ducky._

### References

- ["Rubber Duck Problem Solving"](https://blog.codinghorror.com/rubber-duck-problem-solving/), Jeff Atwood

### Details

One of the best problem-solving techniques from software engineering is to explain the problem and attempted solutions in as much detail as possible. It doesn't matter whether you're talking to another software engineer or even another person; you could even use a literal rubber ducky! The important part is to explain the problem in as much detail as possible, because it helps clarify your assumptions and will often reveal overlooked details.

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

- ["Augmenting Long-Term Memory"](https://augmentingcognition.com/ltm.html), Michael Nielsen
- ["How to make memory systems widespread?"](https://michaelnotebook.com/mmsw/), Michael Nielsen
- ["Spaced Repetition for Efficient Learning"](https://gwern.net/spaced-repetition), Gwern
- ["Effective Spaced Repetition"](https://borretti.me/article/effective-spaced-repetition), Fernando Boretti
- ["How to write good prompts: using spaced repetition to create understanding"](https://andymatuschak.org/prompts/), Andy Matuschak

### Details

[Ebbinghaus' forgetting curves](https://en.wikipedia.org/wiki/Forgetting_curve) show that the most efficient way to remember something is to test yourself at increasingly-spaced intervals. As a result, with the help of spaced-repetition software and careful choice of flashcards, you can efficiently remember virtually anything you choose to. Moreover, you can use memorized details as building blocks for more complex thoughts, allowing you to learn arbitrarily-complex topics with greater effectiveness.

## Speed Matters

_Working quickly is important._

### References

- [“Speed matters: Why working quickly is more important than it seems”](https://jsomers.net/blog/speed-matters), James Somers
- ["Being a Fast, Cogent Writer Is Useful "](https://v5.chriskrycho.com/journal/writing-productivity/), Chris Krycho
- ["Some reasons to work on productivity and velocity"](https://danluu.com/productivity-velocity/), Dan Luu
- ["Fast Tools are Wonderful "](https://v5.chriskrycho.com/journal/fast-tools-are-wonderful/), Chris Krycho

### Details

Working fast means you can get more done per unit time. But as James Somers points out in his essay, there’s two other benefits to working fast:

1. You lower the activation energy of starting a new project — you’re more likely to start a project if you think it will be quick and effortless.
2. Because you can get more done in the same time, you get more [deliberate practice](https://rwblickhan.org/misc/pattern-language/#deliberate-practice).
