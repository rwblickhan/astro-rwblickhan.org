---
title: TypeScript `using` Keyword
lastUpdatedDate: 2024-04-11
tags: [frontend, javascript]
---

Yesterday I was working with a Sqlite database and I wanted to call `db.close()` every time a particular class went out of scope. This is a pretty common pattern across programming languages - [RAII via destructors](https://en.cppreference.com/w/cpp/language/raii) in C++, [`with` statements](https://docs.python.org/3/reference/compound_stmts.html#with) in Python, the [`Drop` trait](https://doc.rust-lang.org/std/ops/trait.Drop.html) in Rust – so I was slightly surprised that JavaScript doesn’t have a similar pattern.

Except! Apparently there is an [Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management) proposal, and TypeScript went ahead and [implemented it already](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management)!

So we can now add a special `[Symbol.dispose]` function to a TypeScript class inheriting from `Disposable`, which will then be run *whenever* an instance of that class leaves scope, as long as its declared with `using`. So for example, we can now do this:

```typescript
export class Cache implements Disposable {
  db: DB;

  constructor(path: string) {
    this.db = new DB(path);
  }
  
  [Symbol.dispose]() {
    this.db.close();
  }
}

// `db.close()` is called when this leaves scope
using cache = Cache("cache.db");
```

## References

- [`using`
Declarations and Explicit Resource Management](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management), TypeScript 5.2 Release Notes
- [“TypeScript 5.2's New Keyword: 'using’”](https://www.totaltypescript.com/typescript-5-2-new-keyword-using), Total TypeScript