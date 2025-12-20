---
title: The Impossible Standard Of Sins Of Omission-Not-Commission
lastUpdatedDate: 2025-12-20
publicationDate: 2025-12-20
season: 8
---

![An art work at San Francisco Conservatory of Flowers Lightscape](../../assets/newsletters/lightscape.png)

Two notes on automation this week:

---

Perhaps my most contrarian take currently: self-driving cars are good, actually.

I understand and agree with many of the criticisms. Should we really be centralizing our transportation system under a single for-profit company? Couldn’t we invest in public transit and road safety improvements? How far can we trust a machine with life-or-death matters? Isn’t it just an accountability sink that will someday kill someone?

But all that ignores the fact that humans are really _really_ bad at driving — even if they’re attempting to drive carefully, which many drivers don’t. Self-driving cars like Waymo would be a massive public health intervention even if the data was ten times worse — [four thousand people](https://www.ots.ca.gov/ots-and-traffic-safety/score-card/) died on roadways in California alone in 2023! And that’s not even counting the mental relief I as a pedestrian feel when crossing the street in front of a Waymo, knowing it won’t attempt to plow through a turn and “accidentally” run me down.

It just feels that at some point a fatal accident is going to occur and Waymo will be held to the impossible standard of sins of omission-not-commission. There was already a dustup around a [beloved bodega cat](https://www.nytimes.com/2025/12/05/us/waymo-kit-kat-san-francisco.html) run over by a Waymo — but what would have people said if a human driver had done the same? “Thank God it was only a cat”?

Anyway, I’m usually not one to write this passionately, but as a pedestrian that’s nearly hit at least once a week, I look at the lack of progress towards [Vision Zero](https://www.visionzerosf.org/) and I think... maybe Waymo is good enough?

---

I think it’s fair to say that LLM-powered agents have been a big flop this year. ([The Vergecast](https://www.theverge.com/podcast/840661/tech-stories-2025-ai-vergecast) agrees!) Very few quote-unquote “agentic” systems work in any meaningful way — even if you’re sticking to the [limited definition](https://simonwillison.net/2025/Sep/18/agents/) of “agents as tool use in a loop.” A neat tech demo, perhaps, but how many people are actually using them regularly for useful work?

The exception, of course, is agentic coding tools like Cursor or Claude Code. Even as someone that’s [somewhat cautious](https://rwblickhan.org/newsletters/lets-think-step-by-step/) about LLM use, I’ve found Claude Code an essential tool to have in the toolbox, alongside my text editor — it’s just too efficient to ask Claude to make a convoluted-but-strictly-specified code change and then lightly edit it myself to even consider writing every change by hand myself.

Why this exception? I suspect it’s because code _just is_ text as an artifact, which LLMs are natively trained on, and moreover highly structured, verifiably-correct text. Obviously that ignores the operational burden of code, but the _actual_ code, especially in frontend development, really is just text. I don’t believe Claude has too many tools — it’s largely just “regex search”, “read file”, “write file”, and “write shell command” for anything more complicated. Compare that, say, the dozens of tools needed for an agentic video editor, or the translation layer from video-to-text and back, or the fuzziness of defining whether the agent got things “right”.

Needless to say, that makes me rather pessimistic about the further development of “agentic” tools, but rather more optimistic about Claude Code et. al. growing as a programming-specific tool.
