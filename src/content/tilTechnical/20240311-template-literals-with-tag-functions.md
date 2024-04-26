---
title: "Template Literals with Tag Functions in JavaScript"
lastUpdatedDate: 2024-03-11
tags: [frontend, javascript]
---

If you've used JavaScript for more than about a week, you're probably familiar with template literals, as used for string interpolation:

```javascript
const now = Date.now();
console.log(`It is currently ${now}.`)
```

It turns out this is actually part of a [broader API in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).
You can provide a "tag function", specified at the start of the interpolated string, which operates on the components of the templated string and its injected values.
A tag function can return any value, not just a string!
From the MDN docs:

```javascript
const output = myTag`That ${person} is a ${age}.`;
// Basically, this is the same as calling myTag(["That ", " is a ", "."], person, age)
```

One place this is used "in the wild" is the [Lit](https://lit.dev) framework, which provides an [`html` tag function for reactive templating](https://lit.dev/docs/templates/overview/):

```javascript
const name = 'world';
const sayHi = html`<h1>Hello ${name}</h1>`;
render(sayHi, document.body);
```

## References

- ["Template literals (Template strings)"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), MDN