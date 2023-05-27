---
title: "Numeric Increment and Decrement in Vim"
lastUpdatedDate: 2023-05-27
tags: [command-line, vim]
---

You can use `<C-a>` and `<C-x>` (Ctrl-a and Ctrl-x) to increment or decrement a number under the cursor.
You can also specify a count, so for instance `10<C-a>` increments by 10.
This even respects hex digits, if the number starts with `0x`!

If you use these in visual mode, it will increment or decrement the first number of each selected line.
Even neater, if you use `g<C-a>` or `g<C-x>` in visual mode, it will bump the increment or decrement on each line, so you can quickly change this:

```markdown
1.
1.
1.
```

into:

```markdown
1.
2.
3.
```

These also accept a count, which changes the increment or decrement on each line, so for instance `2g<C-a>` will change this:


```markdown
1.
1.
1.
```

into:

```markdown
1.
3.
5.
```

## References

- ["Adding and subtracting"](https://vimhelp.org/change.txt.html#CTRL-A)
- ["At least one vim trick you might not know"](https://www.hillelwayne.com/post/intermediate-vim/)