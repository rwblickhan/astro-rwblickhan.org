---
title: Hooked Up To A Probabilistic Text Generation Engine
lastUpdatedDate: 2025-10-26
publicationDate: 2025-10-26
season: 8
---

I ran a half-marathon (self-scheduled) for the first time since I started getting arch pain last year. I’m hoping to run the SF Marathon next year... wish me luck 🤞

Otherwise, this issue is just a couple LLM thoughts I’ve had floating around. Sorry 😞 I planned to do more reflections but it’s been a busy weekend.

---

Here’s a case where Claude Code is unambiguously pretty useful.

I knew exactly the logic I wanted — if a feature flag is off, run the existing logic (blocking on an asynchronous task with a return value), and if the feature flag is off, run two different asynchronous tasks with return values at the same time, with a timeout for the new task.

The problem is that our codebase uses the rather idiosyncratic [Redux Saga](https://redux-saga.js.org/) library, which is based on JavaScript coroutines instead of promises. I knew this was possible — I’ve seen it in the codebase, and probably written it before! — but I didn’t recall the syntax offhand and looking for an example would have been a hassle (after all, I didn’t recall the syntax!).

Luckily Claude Code could just one-shot it! Given my description above and a pointer to the right location to edit, Claude happily threw together a correct implementation in a minute or two while I replied to some Slack messages. I could have done this on my own, but it demonstrably saved me time!

---

Let’s imagine a counterfactual world. Let’s say OpenAI never came out with ChatGPT, nor did Google start pushing Gemini. Anthropic didn’t come out with Claude-the-chatbot, either; after years of work, they went straight to Claude Code. “Oh, sure, you can ask general questions and get natural-language answers,” they say, “but really this is just for programming.” In this counterfactual, Claude still works the same way — hoovering up an internet’s worth of text content and training a transformer model on it.

Would everyone still have such conflicting feelings about LLMs? Would authors jump to sue Anthropic for copyright infringement? Would programmers resist the use of LLMs in programming? Would educators worry about its pernicious effect on learning? (Obviously this counterfactual world wouldn’t have an LLM hype bubble.)

LLM critics would probably say yes, but I’m not so sure. In that case I suspect Claude Code would quietly become a popular tool in software engineering without much fuss, especially for use-cases like the one I described above, and its eventual expansion into other domains would stir much less controversy.

I wonder if the _generality_ of LLMs is part of the problem — a text box that can supposedly do anything, but in practice is just hooked up to a probabilistic text generation engine that does a pretty good impression of English prose — and its immediate application to every problem under the sun, many of which it is [manifestly unsuited towards today](https://www.argmin.net/p/lore-laundering-machines).

In short: Anil Dash’s [“Majority AI View”](https://www.anildash.com/2025/10/17/the-majority-ai-view/) is right on the money. Just let it be normal technology!

---

On a related note: I’ve wondered for a while how much the LLM backlash is merely a continuation of the so-called techlash. If Google had started pushing LLM summaries back in, say, 2011 (in a counterfactual where that was possible), would anyone have minded? Or would it have been _celebrated_?

One thinks of Robin Sloan’s 2012 debut, [_Mr Penumbra’s_](https://app.thestorygraph.com/books/23635540-3e55-4435-bcd6-d6a89513fec5), which (from a 2025 perspective) is frankly shocking in its cheerleading of Google as a bunch of super-geniuses organizing the world.