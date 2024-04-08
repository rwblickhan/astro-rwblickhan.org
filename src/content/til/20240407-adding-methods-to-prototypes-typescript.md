---
title: Adding Methods to Prototypes in TypeScript
lastUpdatedDate: 2024-04-07
tags: [frontend, javascript]
---

Recently for a Secret Project 🤫 I had a need to shuffle an array. Luckily I found the [Fisher–Yates Shuffle](https://bost.ocks.org/mike/shuffle/), but I still needed to actually *implement* it in TypeScript. In particular, I was hoping for an immutable method on `Array`, similar to existing methods like [`toSorted()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted). In that case, I would be able to get an array of shuffled questions by calling `questions.toShuffled()`.

Thanks to the wild world of JavaScript, this is very possible! First, we have to declare this so TypeScript’s type checker doesn’t get sad:

```typescript
declare interface Array<T> {
    toShuffled(): T[];
}
```

I just stuffed this in a convenient `.d.ts` declarations file I already had lying around.

Then, we need to implement it; I chose to put it in a `helpers.ts` file. The important part is to make this a function on the `Array.prototype`, so that it’s inherited by all other arrays:

```typescript
Array.prototype.toShuffled = function <T>() {
   // Implement the sorting using `this`...
 };
```

Then, finally, I need to `import` that whole file to make sure it gets bundled (I think?):

```typescript
import "./helpers";
```

And that’s it! Seems kinda dangerous but that’s JavaScript for you 🤷‍♀️ It did let me write very concise code to shuffle a list of questions, each with a shuffled list of answers:

```typescript
const questions = QUESTIONS.map((question) => ({
	...question,
	answers: question.answers.toShuffled()
})).toShuffled();
```

## References

- [“How to extend String Prototype and use it next, in Typescript?”](https://stackoverflow.com/questions/39877156/how-to-extend-string-prototype-and-use-it-next-in-typescript), StackOverflow