---
title: "Yearly Goals"
lastUpdatedDate: 2023-08-23
description: "How I set yearly goals"
---

Since 2020, I’ve been setting personal goals at the start of every year and tracking my progress against them throughout the year.

## Motivation

My main motivation for setting goals is to encourage the formation of habits. Being a writer involves a lot of writing, so I set a goal to write a certain number of pieces; training my eye as a photographer involves a lot of photography, so I set a goal to shoot and edit a certain number of photographs; and so on.

By treating these as explicit goals, I can delimit what I’m focused on for the year and gently remind myself to focus my time on the goals. The goals also provide a sense of progress; as December approaches, I can take pride in all I’ve accomplished over the past year.

Over time, my goals serve as a guide to my interests. If I repeatedly set and fail a goal, perhaps I’m not as interested in one of my hobbies as I thought, or I underestimated how difficult it would be. Across the years, I can intentionally reprioritize where I’m spending my free time.

Is this a very technical approach to planning one’s life? Perhaps, but I also like to think of it as a very _intentional_ approach. The goal is not to achieve goals; the goal is to achieve the meta-goals listed above, and if my goal-setting process stops serving them, then I’ll change the goal-setting process!

Unintentionally, I’ve implemented a system not too dissimilar to the system described in [this recent Vox article](https://www.vox.com/even-better/23835758/divide-life-semesters-not-in-school-motivation-goals) arguing that we should divide our life into “semesters” and track our progress against some skill, although I divide my time into yearly “semesters” instead of a few months.

## Approach

I set goals somewhat similar to how [some companies set OKRs](https://asana.com/resources/okr-meaning). In particular, each has some overall “spirit”, like “become a better writer by practicing short stories”, and a (preferably measurable) target, like “number of short stories written”. I split goals two ways:

- Each target has both an “Achieved” state and a “Partial” state; the latter is  a smaller or otherwise easier target. I don’t have a good reason for this split — it just feels nice to give myself credit for achieving _part_ of the goal 🙂
- I split goals themselves into “Core” and “Bonus” goals. Generally speaking, Core goals are goals that I care about more or that I have more control over. In practice, I set 9 Core goals and 3 Bonus goals per year; that’s just what I happened to do the first time and it worked well.

As with many companies’ OKR processes, I aim to achieve about 70% of my goals — that means I’m stretching my time and abilities, but not being completely unrealistic.

I set goals the first week of January, then check in on how I’m doing at the start of every month. The last week of December, between Christmas and New Years, I give myself a grade for each goal, as well as writing up a small reflection on each one. In addition, I write up “other achievements”, since a lot of other things can happen in the year outside my goals!

## Technical Details

As with many other aspects of my life, all of my goals live in Obsidian. Each goal is a note in a particular directory, with a single “Goal Table” note that links to all of them, using the [Dataview plugin](https://blacksmithgu.github.io/obsidian-dataview/) to build a table out of note metadata. In particular, each goal note gets a “status” field with an emoji representing the current status, which is eventually updated with a final grade.

Here’s the Dataview query I use to build a goal table:

```dataview
TABLE type AS "Type", status AS "Status"
FROM "Goals/2023"
WHERE type
SORT type DESC, choice(status = "❌", 1, choice(status = "⚠️", 2, choice(status = "✅", 3, choice(status = "🔴", 4, choice(status = "🟡", 5, choice(status = "🟢", 6, 7)))))) DESC

```

And here’s an example of a goal note:

```md
# Spirit
Become a better photographer by capturing and editing photos.

# Achieved
Edited 52 photos.

# Partial
Edited 26 photos

# Notes

type:: #core
status:: 🟢 
```