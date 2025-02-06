---
title: "Walking Directories with Globs in Rust"
lastUpdatedDate: 2025-02-05
---

I'm working on a simple, language-agnostic linter called [linty](https://github.com/rwblickhan/linty) written in Rust.
The main idea is to provide a set of "rules", where each rule is a regex that should be checked against some set of files.
In particular, each rule has a list of "include" globs and "exclude" globs, so for each rule we want to lint all files included in one of the include globs but not included in any excluded globs.

Luckily, this turns out to be pretty easy in Rust with the [`globset`](https://docs.rs/globset/latest/globset/) and [`ignore`](https://docs.rs/ignore/latest/ignore/) crates.

First up, after parsing the config file into a `RuleConfig` struct, I create `GlobSet`s for the include and exclude globs.
I also take the chance to compile the provided regex for the [`regex`](https://docs.rs/regex/latest/regex/) crate.

```rust
for rule_config in config.rules {
    let mut include_globs = GlobSetBuilder::new();
    let mut exclude_globs = GlobSetBuilder::new();

    for include in rule_config.includes.unwrap_or(Vec::new()) {
        include_globs.add(Glob::new(include.as_str())?);
    }

    for exclude in rule_config.excludes.unwrap_or(Vec::new()) {
        exclude_globs.add(Glob::new(exclude.as_str())?);
    }

    let regex = RegexBuilder::new(&rule_config.regex);

    rules.push(Rule {
        id: rule_config.id,
        message: rule_config.message,
        regex: regex.build()?,
        severity: rule_config.severity,
        includes: include_globs.build()?,
        excludes: exclude_globs.build()?,
    });
}
```

Then, I use the `Walk` struct from the `ignore` crate to recursively walk all paths in the current directory, respecting `.gitignore` files for free.

```rust
for result in Walk::new("./") {
    match result {
        Err(err) => eprintln!("Error: {}", err),
        Result::Ok(entry) => {
            if entry.metadata()?.is_dir() {
                continue;
            }

            for rule in &rules {
                if (!rule.includes.is_empty() && !rule.includes.is_match(entry.path()))
                    || rule.excludes.is_match(entry.path())
                {
                    continue;
                }
                
                // Apply the regex to the file
            }
        }
    }
} 
```

Is this idiomatic Rust? No idea 🤷‍♀️

Is this efficient? I was considering walking each globset independently, but I suspect simply recursively visiting every file path and filtering anything that doesn't match the globs is faster. Most of the work is in the regex matching once we've identified a file anyway. That said, there is a `WalkParallel` option provided by `ignore`, which I should probably use instead.

## References

I pulled heavily from ["Writing Modern Command-Line Applications in Rust"](https://shark.fish/rustlab2019/#/), a 2019 workshop by David Peter, aka [sharkdp](https://github.com/sharkdp), of `fd` and `bat` fame.