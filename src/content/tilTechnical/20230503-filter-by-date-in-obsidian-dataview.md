---
title: "Filter by Date in Obsidian Dataview"
lastUpdatedDate: 2023-05-03
tags: [obsidian]
---

For my newsletter, I was curious what notes I had added to Obsidian in the last month.
I could have jury-rigged a solution on the command line, but this felt like a great use case for the [Dataview plugin](https://blacksmithgu.github.io/obsidian-dataview/).
Figuring out the appropriate query took a little effort, but it's fairly concise in the end:

```dataview
LIST
WHERE file.ctime >= date(today) - dur(30 d)
SORT file.ctime DESC
```

`LIST` outputs a bullet-point list of matching files.
`ctime` is the creation time of the file, which gets filtered to `today` minus 30 days to output everything created in the last month.
It's all sorted `DESC` so that the newest files end up on top.

## References

- ["Dates" in Obsidian Dataview Docs](https://blacksmithgu.github.io/obsidian-dataview/reference/literals/#dates)
