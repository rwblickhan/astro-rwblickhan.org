---
title: "position: sticky and Scrolling"
lastUpdatedDate: 2024-04-11
tags: [frontend, css, javascript]
---

For larger devices, I wanted the header of this website to be sticky - it should follow you as you scroll down the page.
I used to handle that manually, but it turns out that all you need is [`position: sticky`](https://developer.mozilla.org/en-US/docs/Web/CSS/position#values) in your CSS to get that behavior for free!

Unfortunately, that messes with scrolling - if you click an anchor link on the page, it will scroll that header to the very top of the page, underneath the sticky header.
I couldn't find a way around this using just CSS, so I asked ChatGPT how to fix it. (**Update**: I have since learned about [`scroll-padding`](20230421-scroll-padding), which solves this nicely!) After a bit of back and forth with the LLM, this is what I ended up with:

```javascript
// Scroll to anchor links, taking into account header
const header = document.querySelector("#header") as HTMLElement;
const headerHeight = header?.offsetHeight ?? 0;
const anchorLinks = document.querySelectorAll("a[href^='#']");

for (const anchorLink of anchorLinks) {
  anchorLink.addEventListener("click", function (event) {
    if (
      window.getComputedStyle(header).getPropertyValue("position") !==
      "sticky"
    ) {
      return;
    }

    event.preventDefault();

    const targetId = anchorLink.getAttribute("href") ?? "";
    const targetPosition = (document.querySelector(targetId) as HTMLElement)
      ?.offsetTop;

    window.scrollTo({
      top: targetPosition - headerHeight,
      behavior: "smooth",
    });
    window.history.pushState(null, "", targetId);
  });
}

function scrollToAnchor() {
  if (
    window.getComputedStyle(header).getPropertyValue("position") !== "sticky"
  ) {
    return;
  }

  var targetId = location.hash.slice(1);
  if (targetId) {
    var targetElement = document.getElementById(targetId);
    if (targetElement) {
      var targetOffset = targetElement.offsetTop - headerHeight;
      window.scrollTo({
        top: targetOffset,
        behavior: "smooth",
      });
    }
  }
}
window.addEventListener("hashchange", scrollToAnchor);
window.addEventListener("load", scrollToAnchor);
```

Whenever I click an anchor link or load the page (which might load directly to an anchor link), I need to manually scroll to the header, taking into account the height of the `#header` div, but only if that div's computed styles actually include `position: sticky`. I'm not actually sure if the `hashchange` event is also necessary - it's called every time the anchor link component of the URL changes, but I think the `load` event already handles that case as well.