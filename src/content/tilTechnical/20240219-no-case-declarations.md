---
title: "no-case-declarations in ESLint"
lastUpdatedDate: 2025-02-05
---

Yesterday I ran into the [`no-case-declarations` ESLint rule](https://eslint.org/docs/latest/rules/no-case-declarations), which was very surprising to me!
This rule bans lexical declarations like `let` and `const` in `switch` statements without wrapping them in blocks.
In other words, this rule bans code like this:

```javascript
switch (foo) {
    case 1:
        let x = 1;
        break;
    default:
        const y = 2;
        break;
}
```

in favor of code like this:

```javascript
switch (foo) {
    case 1: {
        let x = 1;
        break;
    }
    default: {
        const y = 2;
        break;
    }
}
```

Why are the extra blocks necessary? Because apparently in JavaScript `switch` statements, declarations like `let` and `const` are visible in *all* switch cases, even though they're not initialized until that case is reached! 😱

This does break code that relies on `switch` case fallthrough, but... you probably shouldn't be using that anyway?

## References

- ["no-case-declarations"](https://eslint.org/docs/latest/rules/no-case-declarations), ESLint Docs