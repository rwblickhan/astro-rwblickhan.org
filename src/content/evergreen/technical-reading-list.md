---
title: Technical Reading List
lastUpdatedDate: 2024-01-21
description: "An evergreen list of technical books, papers, and talks I love."
---

## Table of Contents

## Books

- [*Crafting Interpreters*](https://www.craftinginterpreters.com), Robert Nystrom
  - The best introductory work on programming language design and implementation, covering a basic treewalk interpreter and a more complicated, but realistic, bytecode interpreter. Notably, it covers language features like closures and object-oriented classes in depth, both of which are usually brushed aside. Also, it's extremely readable and has cute illustrations!
- [*Butterick's Practical Typography*](https://practicaltypography.com), Matthew Butterick
  - The best introductory text on typography and the basics of graphic design I've found. If you're time-strapped, you can check out its introductory chapters, ["Typography in ten minutes"](https://practicaltypography.com/typography-in-ten-minutes.html) and ["Summary of key rules"](https://practicaltypography.com/summary-of-key-rules.html), for the highlights. I try to follow its principles for any site or app I build.
- *Designing Data-Intensive Applications*, Martin Kleppmann

## Papers

- ["Programming as Theory Building"](https://pages.cs.wisc.edu/~remzi/Naur.pdf), Peter Naur
  - A ten-page paper that changed how I think about programming. Naur argues that programming is exactly "theory building", in the sense of "figuring out how to solve a problem", with the implication that a "program" is not just the literal text but also the representation in the programmer's mind. As a result, it is difficult, if not impossible, to "revive" a program with a new team, without first doing the work of theory building themselves!

## Sites

- [*Simon Willison’s Weblog*](https://simonwillison.net), Simon Willison
  - The best voice to listen to on LLMs right now. Simon coined the term "prompt injection" and has been an early explorer of what LLMs can do; as of late 2023, ["Making Large Language Models work for you"](https://simonwillison.net/2023/Aug/27/wordcamp-llms/) is my favorite introduction. His [TILs](https://til.simonwillison.net) are also often interesting and inspired [my own TILs](https://rwblickhan.org/technical/).
- [*Computer Things*](https://buttondown.email/hillelwayne), Hillel Wayne
  - Hillel's newsletter is always interesting, often covering esoteric programming languages or obscure software engineering techniques. His ["Advice for new software devs who've read all those other advice essays"](https://buttondown.email/hillelwayne/archive/advice-for-new-software-devs-whove-read-all-those/) is useful even for those with an intermediate level of experience.
- [jvns.ca](https://jvns.ca) and [Wizard Zines](https://wizardzines.com), Julia Evans
  - Julia has an iconic "I'm just as confused as you are" style of writing about complex technical topics like networking, operating systems, and version control. Her printable zines are a handy reference for all kinds of technical topics.
- [*Hacking with Swift*](https://www.hackingwithswift.com), Paul Hudson
  - The single best resource for iOS development (yes, even better than Apple's own docs). The free ["100 Days of SwiftUI"](https://www.hackingwithswift.com/100/swiftui) course in particular is a great place to start if you're completely new to iOS development.
- [*Bits About Money*](https://www.bitsaboutmoney.com/archive/buy-now-pay-later/), Patrick McKenzie
  - Explores finance and fintech from a technologist's perspective, albeit with a unique (read: sometimes hard-to-follow) style. His post about [buy-now-pay-later services](https://www.bitsaboutmoney.com/archive/buy-now-pay-later/) like Affirm and Afterpay was the first explanation of BNPL that I finally understood.

## Talks

- ["Is Software Engineering Real Engineering"](https://www.hillelwayne.com/talks/crossover-project/), Hillel Wayne
  - Hint: the answer is yes. Hillel actually went and talked to "traditional" engineers who crossed over to software, or vice versa. The insights are fascinating — apparently the biggest thing missing from "traditional" engineering is version control!
- ["Inventing on Principle"](https://www.youtube.com/watch?v=EGqwXt90ZqA), Bret Victor
  - A classic talk about deciding what to work on. The first half is a little slow, but serves as an important example for the principles Bret explores in the second half.
- ["Email vs Capitalism, or, Why We Can't Have Nice Things"](https://youtu.be/mrGfahzt-4Q?si=sOjj_k4eGy3k2_sc), Dylan Beattie
  - Email development is notoriously complex and painful. This wide-ranging talk discusses why that is historically and some of the best practices for email development today.