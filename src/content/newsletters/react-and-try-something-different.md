---
title: React and Try Something Different (rwblog S6E13)
lastUpdatedDate: 2024-07-17
publicationDate: 2023-11-15
season: 6
---

![A Magic: The Gathering card stuck in a Muni station](../../assets/newsletters/magic_card.webp)

## A REPL for Writing

A possibly-productive metaphor between software engineering and writing: is there a benefit to a faster “REPL loop” in fiction writing?

To explain for the non-programmers in the audience (are there any?): some programming languages come with a "read-eval-print loop”, or REPL, which lets you write a line of code at a time and immediately see what it does. If you’ve ever run `python3` on the command line or typed JavaScript in the browser console, that’s a REPL!

The benefit is that you get immediate feedback about what does and doesn’t work while programming, which is great, because [speed matters](https://jsomers.net/blog/speed-matters).[^1] If something doesn’t work, you can immediately react and try something different. This is also why programmers tend to care so much about fast compile times (even if slow compile times are a [great excuse for slacking](https://xkcd.com/303/)).

(Digression: This is why ChatGPT’s [Code Interpreter](https://openai.com/blog/chatgpt-plugins#code-interpreter) is so exciting, as [Simon Willison has shown](https://simonwillison.net/2023/Apr/12/code-interpreter/). It basically puts ChatGPT and a Python interpreter into one giant REPL loop that you can interact with.)

So, the metaphor: I recently finished a 65k-word novel draft, and, per Matt Bell’s [_Refuse to Be Done_](https://search.worldcat.org/title/1258217677) (highly, highly recommended for anybody planning to write a novel), I’m now about to throw the whole thing out and rewrite it from scratch. Now, that’s a great exercise — I already see so many things I want to change — but it does make me wonder if there’s an opportunity to [deliberately practice](https://andymatuschak.org/sight-reading/) improving the feedback time.

Now, a novel is maybe not the best example, since so many of those 65k words were generative, “writing is rewriting,” etc. But on a smaller scale, were all of those 65k words actually useful? Similarly, in the past I’ve certainly dropped a few thousands words into a short story only to realize it was just fundamentally flawed. Was there a way I could have noticed that earlier and pivoted to a different idea?

Some ideas:

- Could outlining help here? That has not helped me in the past, but I am certainly a pantser, not a plotter.
- Should I literally learn to type faster? I type pretty fast, but sometimes my thoughts are still faster than my fingers.
- Maybe this is why “writer’s rooms” are a thing — by bouncing ideas off each other, writers are using each other as REPLs! But I think this is only a common practice in TV writing and much rarer in e.g. fiction.
- Perhaps this is where an LLM as ["writing compiler”](https://rwblickhan.org/newsletters/in-which-i-wax-nostalgic-for-my-lost-youth/#writing-compiler) could come in. Is there a way to get ChatGPT to help me explore more ideas faster? Could I have it write “glue prose” in early drafts to get me to the more interesting scenes? ChatGPT is pretty bad at coming up with ideas, but how about critiquing ideas?

[^1]: Although Hillel Wayne has a [contrary take](https://buttondown.email/hillelwayne/archive/in-defense-of-slow-feedback-loops/) — thanks to [Goodhart’s law](https://en.wikipedia.org/wiki/Goodhart%27s_law) (“when a measure becomes a target, it ceases to be a measure”), slow feedback loops can sometimes be a very good thing!