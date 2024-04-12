---
title: "Computed Property Names in JavaScript"
lastUpdatedDate: 2024-04-11
tags: [javascript]
---

Sometimes you want to specify an object literal in JavaScript that uses the value of a variable as a property name.
Unfortunately, JavaScript expects property names to be literal strings, literal numbers, or a symbol (I think?),
so you'll get frustrating syntax errors if you try to use variable references.

This won't work:

```typescript
const itemId: string = ...;
const dict = {
    itemId: "1" 
}
```

Instead, you have to use the computed property name syntax, by surrounding the variable reference with square brackets:

```typescript
const itemId: string = ...;
const dict = {
    [itemId]: "1" 
}
```

## References

- ["Computed property names", MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names)