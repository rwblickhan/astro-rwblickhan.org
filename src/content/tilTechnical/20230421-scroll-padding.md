---
title: "scroll-padding"
lastUpdatedDate: 2025-02-05
---

[Yesterday I said](20230420-position-sticky-scrolling) that, when using a sticky header, there's no way to scroll to the correct position using only CSS. I should have known better than to trust ChatGPT or my Googling abilities!

You can in fact specify [`scroll-padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding), which adds padding to the scrollable area and allows anchor links to respect the header offset, just like I wanted. I've removed the extra JavaScript and added a `scroll-padding-top` instead.

Huge hat-tip to [Tiger Oakes](https://tigeroakes.com) for pointing this out to me!

## Sources

- [Fixed navigations and sections - here is scroll-padding](https://dev.to/einlinuus/fixed-navigations-and-sections-here-is-scroll-padding-25nb)