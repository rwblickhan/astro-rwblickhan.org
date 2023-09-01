---
title: "Adjacent Sibling Combinator in CSS"
lastUpdatedDate: 2023-09-01
tags: [frontend, css]
---

Yesterday I was having a browse around MDN to learn a bit more about CSS and I found out about the very useful adjacent sibling combinator!
It combines two selectors and matches the second *only if* it immediately follows the first.
That allows you to pick "the sibling element right after a particular element".

When is this useful?
One example that I actually used today is when you have a tab bar where each tab has a left border, but the active tab shouldn't have borders on either side.
With the adjacent sibling combinator, you can do that pretty easily with something like:

```css
.Tab--active, .Tab--active + .Tab {
    border-left: none;
}
```

The first `.Tab--active` will match the element with class `.Tab--active`, while `.Tab--active + .Tab` will match the element with class `.Tab` immediately following the element with class `.Tab--active`, or in other words, the tab immediately following our active tab.
As a result, the active tab will not have borders on either side!

## References

- ["Adjacent sibling combinator"](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator), MDN