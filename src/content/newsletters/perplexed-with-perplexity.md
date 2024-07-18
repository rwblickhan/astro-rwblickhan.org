---
title: Perplexed with Perplexity
lastUpdatedDate: 2024-07-17 01:40:42.620904+00:00
publicationDate: 2024-06-30 01:40:42.620904+00:00
season: 7
---

Hello frens,

I no longer feel comfortable using [Perplexity](https://www.perplexity.ai).

You may remember I was [trialing it a few months ago](https://rwblickhan.org/newsletters/the-old-cyberpunk-vision-of-a-world-of-neoliberal-corporations-run-amok/#other-stuff). In many ways, it’s an impressive product, combining an LLM-powered chatbot with a search index — ask a question, and it’ll come back with a specific answer and citations to websites that it’s pulling from. In the example above, I asked for the San Francisco city budget, and it immediately spat out both the correct answer and the PDF from the city that included it.

Recently, however, they’ve made a number of decisions that leave me feeling... queasy.

The Verge has a [fantastic summary](https://www.theverge.com/2024/6/27/24187405/perplexity-ai-twitter-lie-plagiarism) of the situation, but the short version is:

- Perplexity [rolled out Pages](https://www.perplexity.ai/hub/blog/perplexity-pages), a *curious* feature that generates a shareable page of “research” about a topic based on a user prompt. In other words, Perplexity can now write shoddy Medium articles. I’m just as perplexed [as the Verge was](https://www.theverge.com/2024/5/30/24167986/perplexity-ai-research-pages-school-report) when they reviewed it; their judgement that it’s only useful for “students rushing to put out an assignment” seems downright charitable.
- Forbes realized that Perplexity was [able to circumvent their paywall](https://www.forbes.com/sites/sarahemerson/2024/06/07/buzzy-ai-search-engine-perplexity-is-directly-ripping-off-content-from-news-outlets/) to summarize articles for Pages, accusing the company of copyright infringement.
- Wired discovered that Perplexity was [accessing their site via an unlisted IP address](https://www.wired.com/story/perplexity-is-a-bullshit-machine/), even though Wired had set up `robots.txt` to block Perplexity’s crawler per their instructions.
- In response, Perplexity’s CEO claimed [they were relying on a third-party web crawler](https://www.fastcompany.com/91144894/perplexity-ai-ceo-aravind-srinivas-on-plagiarism-accusations) that wasn’t respecting `robots.txt`, but refused to name the third party or commit to asking them to stop crawling Wired’s content.
- 404 Media published that [Perplexity’s origin story](https://www.404media.co/perplexitys-origin-story-scraping-twitter-with-fake-academic-accounts/) involved a demo of a research tool powered by the somewhat dubious process of scraping Twitter with fake, AI-generated academic accounts.

So, cards on the table: I generally disagree that LLM *training* is a form of plagiarism, even when performed on unlicensed copyrighted material, as virtually all production language models are. Mashing up “the entire contents of the Internet and several sizable libraries” into a set of vectors and then asking for a probabilistic continuation feels meaningfully different than, say, uploading a copyrighted text to Anna’s Archive — even if a clever choice of prompt causes that probabilistic continuation to align very closely with “actual” writing out there in the world.

Aside: Some writers compare LLM training to human education — if a human can read and be influenced by their favorite authors, why not an LLM? I’m intentionally not doing so here since, as [Robin Sloan has pointed out](https://www.robinsloan.com/lab/at-home-in-high-dimensional-space/#training), we shouldn’t take the “learning” analogy too far. Humans across their lifetimes can barely read a few drops of water in the ocean of content that LLMs swim in; it’s simply not comparable. Also, invoking “education” brings us dangerously close to the territory of consciousness, and we’ll soon be barraged with stochastic parrots and Chinese rooms, which I as an [illusionist about consciousness](https://keithfrankish.github.io/articles/Frankish_Illusionism%20as%20a%20theory%20of%20consciousness_eprint.pdf) simply disagree with 🙂

In any case, I’m confident enough in the probabilistic take on LLMs — that they generate “average”, but net new, sentences — that I have no particular qualms about using LLMs, nor am I rushing to defend my website from scraping. I could probably talk more about this another time, but the point I’m getting at is that I’m reasonably comfortable with LLMs *as a technology*.

What Perplexity is doing, however, feels different. It feels *sketchy*.

There is a reasonable argument that Perplexity “should” be allowed to ignore `robots.txt`, if the user explicitly asked for it to retrieve a webpage. It’s not entirely clear that that’s what’s happening here, but even if it is, Nick Heer [ably demonstrates](https://pxlnv.com/blog/on-robots-and-text/) why that isn’t valid: “A webpage being rendered through Perplexity is actually being reinterpreted and modified. The original text of the page is transformed through automated means about which neither the reader or the publisher has any understanding,” which a reasonable publisher may very well object to. Heer concludes that “\[t\]he absolute least Perplexity can do is respecting those objections by clearly and consistently identifying itself, and excluding websites which have indicated they do not want to be accessed by these means.”[^quotes]

That Perplexity’s automated access skips the publisher’s paywall or ads in return for a paltry number of pageviews is really just the cherry on the pie. As a non-journalist, my paycheck doesn’t depend on Perplexity’s actions, but I understand why they’re burning with rage at Perplexity and Arc Search and Google’s AI foibles — they’re an automated version of the worst of the worst of the old link aggregators.

I liked Perplexity as a genuine research tool, cutting through the sea of Google links to find the site that can actually answer my question. That was always tenuous — after all, Perplexity has always provided answers directly, and I suspect very few people clicked the inline citations like I did — but if Perplexity was previously tenuous, Pages seems like an outright [slop](https://simonwillison.net/2024/May/8/slop/) factory based entirely on plagiarism. The CEO’s cagey response to Wired’s accusations certainly doesn’t inspire confidence.

I suppose I land [somewhat close to Ernie Smith](https://tedium.co/2024/06/20/perplexity-forbes-ai-aggregation-risks/): cautiously optimistic that LLMs will still be useful, but only if we choose to hold them to higher standards.

Talk again soon,\
Russell

P.S. I know I said this would come in two weeks, but I’m bored and this seemed topical. I suspect newsletters will come more often for the next few weeks.

P.P.S. I wrote up [what apps I’ve been using recently](https://rwblickhan.org/technical/2024-apps/). I’m not sure if anybody gets value out of lists like these, but I like reading them when other people post 🤷‍♀️

[^quotes]: I note the irony that I’m quoting Heer at length with a link for context, not all that different than Perplexity is doing. The difference, of course, is that I’m a regular reader that sees every sponsored post and I currently have the site open to copy-paste quotes.