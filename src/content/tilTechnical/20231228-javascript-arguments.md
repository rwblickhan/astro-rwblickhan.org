---
title: "JavaScript Arguments Object"
lastUpdatedDate: 2023-12-28
tags: [frontend, javascript]
---

JavaScript has a built-in `arguments` object in *every* function that lets you access the arguments passed to a function, even if the function doesn't have any listed parameters! (What. *What*.)

```javascript
function foo() {
  // This is fine, apparently?
  console.log(arguments[0]);
  // Expected output: 1
}

foo(1);
```

Interestingly, it's an "array-like" object, so you can use a `for-of` loop on it, but it *isn't* an array, so you can't use e.g. `forEach`; to get an array, you have to use `Array.from()` or the spread operator.

## References

- ["The arguments object"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)