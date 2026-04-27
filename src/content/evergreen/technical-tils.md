---
title: "Technical TILs"
description: Small technical things I've learned over the years
lastUpdatedDate: 2026-04-27
---

<!-- markdownlint-disable no-duplicate-heading -->

This is my list of TIL (Today I Learned) posts, inspired by [Simon Willison's TIL](https://til.simonwillison.net) page.

## Vim Text Objects

Most vim commands take text objects. For instance, we can do `diw` for **d**elete **i**n **w**ord or `daw` for **d**elete **a**round **w**ord, which includes the delimiters as well. I use `w` pretty heavily to select alphanumeric words, but there's actually a lot of other useful options:

- `W`: whitespace-delimited word
- `s`: sentence
- `p`: paragraph
- `"`: contents within double quotes
- `'`: contents within single quotes
- `` ` ``: contents within backticks
- `(` or `)`: contents within parentheses
- `[` or `]`: contents within square brackets
- `{` or `}`: contents within curly brackets/braces
- `<` or `>`: contents within angle brackets
- `t`: contents within HTML tags like `<a></a>`

Two plugins supported by [`VSCodeVim`](https://github.com/VSCodeVim/Vim) implementation make this even more powerful:

- [CamelCaseMotion.vim](https://github.com/bkad/CamelCaseMotion): Adds `\w` for camel-case and snake-case words.
- [surround.vim](https://github.com/tpope/vim-surround): Adds options for changing surrounding delimiters in addition to the contents inside.
- [targets.vim](https://github.com/wellle/targets.vim): Adds smarter quote selection and separators like `*` (only partially supported by `VSCodeVim`).

### References

- ["Vim Text Objects: The Definitive Guide"](https://blog.carbonfive.com/vim-text-objects-the-definitive-guide/)
- ["Text object selection"](https://vimhelp.org/motion.txt.html#object-select)

## Vim Text Motions

In vim, in addition to basic directional commands like `h`,`j`,`k`,`l` and word motions like `w`, there's a number of other useful text motions:

- `(`: Jump backward by sentences.
- `)`: Jump forward by sentences.
- `{`: Jump backward by paragraphs.
- `}`: Jump forward by paragraphs.
- `[(`: Jump backward by unmatched parentheses.
- `[)`: Jump forward by unmatched parentheses.
- `[{`: Jump backward by unmatched curly brackets.
- `[}`: Jump forward by unmatched curly brackets.

Each of these also take a count, so for instance you can do `2{` to jump backwards by 2 paragraphs.

### References

- ["Text object motions"](https://vimhelp.org/motion.txt.html#object-motions)

## position: sticky and Scrolling

For larger devices, I wanted the header of this website to be sticky - it should follow you as you scroll down the page.
I used to handle that manually, but it turns out that all you need is [`position: sticky`](https://developer.mozilla.org/en-US/docs/Web/CSS/position#values) in your CSS to get that behavior for free!

Unfortunately, that messes with scrolling - if you click an anchor link on the page, it will scroll that header to the very top of the page, underneath the sticky header.
I couldn't find a way around this using just CSS, so I asked ChatGPT how to fix it. (**Update**: I have since learned about [`scroll-padding`](#scroll-padding), which solves this nicely!) After a bit of back and forth with the LLM, this is what I ended up with:

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

## scroll-padding

[Yesterday I said](#position-sticky-and-scrolling) that, when using a sticky header, there's no way to scroll to the correct position using only CSS. I should have known better than to trust ChatGPT or my Googling abilities!

You can in fact specify [`scroll-padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding), which adds padding to the scrollable area and allows anchor links to respect the header offset, just like I wanted. I've removed the extra JavaScript and added a `scroll-padding-top` instead.

Huge hat-tip to [Tiger Oakes](https://tigeroakes.com) for pointing this out to me!

### Sources

- [Fixed navigations and sections - here is scroll-padding](https://dev.to/einlinuus/fixed-navigations-and-sections-here-is-scroll-padding-25nb)

## Web Workers

I've got a [search page](/search), using [Fuse.js](https://fusejs.io) to do searching on the client-side.
I wanted to move it to a background thread to improve performance, since searches are sometimes slow enough to block interaction on the main thread.
The [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) seems to be the standard way to do that.

Luckily, that was pretty straightforward!
I implemented [`search-worker.ts`](https://github.com/rwblickhan/astro-rwblickhan.org/blob/main/src/search-worker.ts), which listens for messages via `onmessage`, calls the Fuse API to retrieve results given a query, and returns those results to the main page via `postMessage`.
The [main search component](https://github.com/rwblickhan/astro-rwblickhan.org/blob/main/src/components/Search.tsx) sends the current query via `postMessage`.
And... that's about it! Search still works, now without blocking the main thread.

The one tricky part was getting this to build in Astro, which uses Vite for compilation.
That required a quick trip to the [Vite docs](https://vitejs.dev/guide/features.html#web-workers), which explains that I have to create a `Worker` like so:

```javascript
new Worker(new URL("../search-worker", import.meta.url), {
  type: "module",
});
```

As long as `search-worker.ts` is in the `src/` directory and _not_ the `public/` directory, Vite will compile and bundle this correctly.

### References

- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Playing with React Hooks and Web Workers](https://blog.axlight.com/posts/playing-with-react-hooks-and-web-workers/)

## Filter by Date in Obsidian Dataview

For my newsletter, I was curious what notes I had added to Obsidian in the last month.
I could have jury-rigged a solution on the command line, but this felt like a great use case for the [Dataview plugin](https://blacksmithgu.github.io/obsidian-dataview/).
Figuring out the appropriate query took a little effort, but it's fairly concise in the end:

```dataview
LIST
WHERE file.ctime >= date(today) - dur(30 d)
SORT file.ctime DESC
```

`LIST` outputs a bullet-point list of matching files.
`ctime` is the creation time of the file, which gets filtered to `today` minus 30 days to output everything created in the last month.
It's all sorted `DESC` so that the newest files end up on top.

### References

- ["Dates" in Obsidian Dataview Docs](https://blacksmithgu.github.io/obsidian-dataview/reference/literals/#dates)

## \* and # in vim

When in normal mode in vim, you can use `*` to start searching forwards for the word underneath the cursor and `#` to search backwards.
You can then use `n` and `N` to jump forward and backward, like a regular search.
You can also use `g*` and `g#` to find matches that aren't a whole word themselves, e.g. find `line` by searching on `in`.

### References

- ["Search commands"](https://vimhelp.org/pattern.txt.html#search-commands)

## :sort in vim

vim has a built-in sorting function. Specify a range or a visual selection and run `:sort` in command mode to sort the given lines. You can also do things like:

- `:sort!` to invert the order.
- `:sort i` to ignore case.
- `:sort u` to deduplicate the lines.
- `:sort n` or `:sort f` for integer or float numeric sorting; in particular, these will sort by the first number on each line.
- `:sort /pattern/` to ignore a pattern and `:sort /pattern/ r` to sort based on pattern.

### References

- ["Sorting text"](https://neo.vimhelp.org/change.txt.html#sorting)
- ["A Vim Guide for Advanced Users", "Sorting Text"](https://thevaluable.dev/vim-advanced/#sorting-text)

## Numeric Increment and Decrement in Vim

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
2.
3.
```

### References

- ["Adding and subtracting"](https://vimhelp.org/change.txt.html#CTRL-A)
- ["At least one vim trick you might not know"](https://www.hillelwayne.com/post/intermediate-vim/)

## Walking Directories with Globs in Rust

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

### References

I pulled heavily from ["Writing Modern Command-Line Applications in Rust"](https://shark.fish/rustlab2019/#/), a 2019 workshop by David Peter, aka [sharkdp](https://github.com/sharkdp), of `fd` and `bat` fame.

## Border with Corner Radius in SwiftUI

How do you add a colored border with a corner radius to a view in SwiftUI?
This is... surprisingly difficult, given in CSS it's simply a matter of [`border-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color) and [`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius).

You might assume you can just combine the [`.border`](<https://developer.apple.com/documentation/swiftui/view/border(_:width:)>) and [`.cornerRadius`](<https://developer.apple.com/documentation/swiftui/view/cornerradius(_:antialiased:)>) view modifers like so:

```swift
var body: some View {
    Text("Sample Text")
        .border(.black)
        .cornerRadius(20)
}
```

That does not work, because the corner radius will mask the border, so the border will simply be cut off at the edges.
Also, apparently `.cornerRadius` is deprecated as of iOS 17.

Instead, the best way seems to be to use the [`.overlay`](<https://developer.apple.com/documentation/swiftui/view/overlay(alignment:content:)>) view modifier:

```swift
var body: some View {
    Text("Sample Text")
        .overlay(RoundedRectangle(cornerRadius: 20).stroke(.gray))
}
```

### References

- ["How to draw a border around a view"](https://www.hackingwithswift.com/quick-start/swiftui/how-to-draw-a-border-around-a-view), Hacking With Swift

## Relative Line Numbers in Vim

Most vim actions allow a count. However, if you use absolute line numbers, you're left to calculate offsets by yourself;
if you want to jump to the end of the current function, how many lines do you need to jump?

Luckily, vim provides a better way. You can use relative line numbers to display a count of how far each line is from the current line.
In particular, if you enable the "hybrid" mode, by setting both `number` and `relativenumber` at the same time,
the current line will still show the absolute line number, which can be useful.
This makes it trivial to jump wherever you want on screen.

```vimscript
:set number relativenumber
```

However, this assumes the cursor is close to the center of the screen.
If the cursor is at the bottom, it's not as useful.
Luckily, vim also provides the `zz` command the recenter the screen on the current line.
You can also use `zt` and `zb` to put the current line at the top or bottom of the screen, respectively.

VS Code also provides a "hybrid" line number, which is useful [if using VSCodeVim or VSCode Neovim](/technical/vscode-plugins#vscode-neovim).

### References

- [Vim's absolute, relative and hybrid line numbers](https://jeffkreeftmeijer.com/vim-number/)

## Computed Property Names in JavaScript

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

### References

- ["Computed property names", MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names)

## @State Initialization in SwiftUI

I'm building an iOS app for [Askhole](https://www.askhole.io) that shows a question out of a list of question.
I'm using a basic `@State private var` property to store the index of the current question.
I wanted to randomize this on launch, but `@State private var`s have to be initialized to a literal value, so instead I implemented this:

```swift
struct ContentView: View {
    private var questions: [Question]
    @State private var currentQuestion = 0

    init(questions: [Question]) {
        self.questions = questions
        currentQuestion = Int.random(in: 0 ..< questions.count)
    }
}
```

Turns out that does not work, due to the extra logic that comes with an `@State` property!
Every time I tried running this, it showed the first question.
What I had to do instead was initialize the property _as a `State` value_:

```swift
struct ContentView: View {
    private var questions: [Question]
    @State private var currentQuestion = 0

    init(questions: [Question]) {
        self.questions = questions
        _currentQuestion = State(initialValue: Int.random(in: 0 ..< questions.count))
    }
}
```

## Smartcase in Vim

Vim's search function when you press `/` defaults to case-sensitive, which I've always found pretty annoying.
It turns out you can enable "smartcase", where search is case-insensitive unless you use uppercase characters in the search, pretty easily:

```vimscript
:set ignorecase smartcase
```

Do note that you have to enable _both_ `ignorecase` and `smartcase`, or else the `smartcase` option does nothing.

## Visual Paste without Yank in Vim

A common pattern I follow in vim is yanking some text, then making a visual selection
(with `v`, for single characters, or `V`, for lines) and pasting with `p` to replace the visual selection.
That's as close as vim gets to a standard Cmd-c/Cmd-v flow that most text editing has.

One annoyance I've always had, however, is that a visual paste with `p` will put whatever was replaced in the unnamed register,
which is what `p` defaults to. So you can't make the same replacement multiple times - you have to re-yank before pasting again or specify the "yank register" with `"0p`.
However, it turns out that more recent versions of vim fix that - if you use `P` instead of `p`,
your visual paste will _not_ overwrite the unnamed register.

### References

- [put-Visual-mode v_p v_P](https://vimhelp.org/change.txt.html#v_P)

## Abbreviations in Vim

vim has an abbreviation system:

```vimscript
:iabbrev calc calculate
```

Then, any time you type `calc` followed by a non-word character in insert mode, it'll expand to `calculate`.
You can even abbreviate multiple words like `:iabbrev JB Jack Benny`!

Alternatively, I might use [Raycast's snippets with a keyword](https://manual.raycast.com/snippets) to get the same behavior,
which has the benefit of also working outside vim.

### References

- ["abbreviations", vimhelp](https://vimhelp.org/map.txt.html#abbreviations)
- ["Abbreviations", Neovim Manual](https://neovim.io/doc/user/usr_24.html#24.7)

## Macro Registers in Vim

The registers used for recording macros in vim are actually just the normal registers!
That means that you can record a macro, then print it to the buffer, fix issues, and yank it back to the register.

For instance, if I record a simple macro, like `qa2dw`, I can print it back out with `"ap` and get `2dw`.
If I then edit that text to read `3dw` and yank it to register `a` with `"ay`, the macro will perform `3dw` instead!

### References

- ["Using registers", Neovim Manual](https://neovim.io/doc/user/usr_10.html#_using-registers)

## Command K Bars in Any App via Raycast

I really like the [Command-K bar UI pattern](https://maggieappleton.com/command-bar) - many apps these days, including VS Code and Obsidian,
provide a single keyboard shortcut to open a typeahead exposing most commands you can perform and settings you can toggle.

Thanks to [Raycast](https://www.raycast.com), you can get this behavior in pretty much any Mac app!
Raycast has a built-in plugin for "Search Menu Items", which exposes a typeahead for all the menu bar items exposed by any Mac app,
which also shows the keyboard shortcut for each option.
Luckily, most well-behaved Mac apps expose most of their functionality through the menu bar items, so this is pretty much as good as a "real" Command-K bar.
I've bound this to Cmd-Shift-P, which doesn't conflict with most apps' own keyboard shortcuts.

## Setting Up Tmux in VS Code

I like to use tmux in the terminal, even in VS Code.
However, I wanted to have a single tmux session for each VS Code workspace, because otherwise I have to switch working directory every time I open a new project.
So here's how I got that set up!

First up, in the VS Code settings:

```json
  "terminal.integrated.profiles.osx": {
    "bash": null,
    "zsh": null,
    "fish": {
      "path": "/opt/homebrew/bin/fish",
      "args": ["-l"],
      "icon": "terminal-tmux"
    }
  },
  "terminal.integrated.env.osx": {
    "VSCODE_WORKSPACE": "${workspaceFolderBasename}"
  },
```

The first bit creates an [integrated terminal profile](https://code.visualstudio.com/docs/terminal/profiles) for fish, the shell I use, which just launches it normally.
The second bit adds an environment variable on launch, `VSCODE_WORKSPACE`, which inserts the title of the VS Code workspace via the `workspaceFolderBasename` [VS Code variable](https://code.visualstudio.com/docs/editor/variables-reference).
I set `null` for the default `bash` and `zsh` profiles so they don't show up in VS Code.

I actually launch tmux from the standard fish initialization script, `config.fish`:

```fish
if status is-interactive
    if not set -q TMUX
        if set -q VSCODE_WORKSPACE
            exec tmux new -A -t "$VSCODE_WORKSPACE"
        else
            exec tmux new -A -t default
        end
    end
end
```

A few parts:

- I check for `status is-interactive` so that this only runs in interactive shells, not when running scripts.
- I check if the `TMUX` environment variable is _not_ set, so that I don't try to recursively open tmux sessions.
- Finally, I check for the `VSCODE_WORKSPACE` environment variable. If it is, I create-or-attach a (`new -A`) new session with a name/tag (`-t`) pulled from `VSCODE_WORKSPACE`. Otherwise, I just use the title `default`, which attaches to the default session I normally use for terminals.

## Adjacent Sibling Combinator in CSS

Yesterday I was having a browse around MDN to learn a bit more about CSS and I found out about the very useful adjacent sibling combinator!
It combines two selectors and matches the second _only if_ it immediately follows the first.
That allows you to pick "the sibling element right after a particular element".

When is this useful?
One example that I actually used today is when you have a tab bar where each tab has a left border, but the active tab shouldn't have borders on either side.
With the adjacent sibling combinator, you can do that pretty easily with something like:

```css
.Tab--active,
.Tab--active + .Tab {
  border-left: none;
}
```

The first `.Tab--active` will match the element with class `.Tab--active`, while `.Tab--active + .Tab` will match the element with class `.Tab` immediately following the element with class `.Tab--active`, or in other words, the tab immediately following our active tab.
As a result, the active tab will not have borders on either side!

### References

- ["Adjacent sibling combinator"](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator), MDN

## Cloudflare Notifications

I use [Cloudflare Pages](https://pages.cloudflare.com) to build this site, and in particular I use the built-in GitHub integration because the build process is pretty simple (just run `pnpm run build` and you're golden).
Until recently, I was annoyed that I never got an email when a build failed and there didn't seem to be a way to enable it from the Pages console.

However! I recently learned about [Cloudflare Notifications](https://developers.cloudflare.com/notifications/), which allow you to get email notifications (or, if you pay, a PagerDuty integration) for all kinds of events in your Cloudflare account - including failed Pages builds.
So, following the instructions, I went into my account and enabled the Pages -> Project updates -> Build failed notification, and it just worked!

## JavaScript Arguments Object

JavaScript has a built-in `arguments` object in _every_ function that lets you access the arguments passed to a function, even if the function doesn't have any listed parameters! (What. _What_.)

```javascript
function foo() {
  // This is fine, apparently?
  console.log(arguments[0]);
  // Expected output: 1
}

foo(1);
```

Interestingly, it's an "array-like" object, so you can use a `for-of` loop on it, but it _isn't_ an array, so you can't use e.g. `forEach`; to get an array, you have to use `Array.from()` or the spread operator.

### References

- ["The arguments object"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)

## Cloudflare Pages Functions

Cloudflare has an easy way to build simple APIs for otherwise-static sites running on [Cloudflare Pages](https://pages.cloudflare.com), which is what I use to host most of my sites.

Just add a `functions/` directory and Cloudflare will set up endpoints with a file-system-based routing structure, e.g. `functions/api/leaderboard.ts` will end up at `/api/leaderboard`.
Add a couple exports for the HTTP verbs you want to support and you're golden:

```typescript
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const scores = await getScores();
  return new Response(JSON.stringify(scores));
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  await updateScores(context);
  return new Response();
};
```

The nice part is that Pages Functions has [bindings](https://developers.cloudflare.com/pages/functions/bindings/) for various other Cloudflare services, like Workers KV, which lets you set up a "backend" by just adding a couple calls to the appropriate API.
[TypeScript](https://developers.cloudflare.com/pages/functions/typescript/) is easy to set up as well.

### References

- ["Functions"](https://developers.cloudflare.com/pages/functions/)

## Fish Shell Directory History

[fish shell](https://fishshell.com) has two built-in functions, [`nextd`](https://fishshell.com/docs/current/cmds/nextd.html) and [`prevd`](https://fishshell.com/docs/current/cmds/prevd.html), that let you jump between recently visited directories in a stack-like manner.

```sh
cd ~/Developer
cd ~/Documents
nextd # Working directory is now ~/Developer
prevd # Working directory is now ~/Documents
```

You can also use [`dirh`](https://fishshell.com/docs/current/cmds/dirh.html) to print the directory stack and [`cdh`](https://fishshell.com/docs/current/cmds/cdh.html) for an interactive navigator (which doesn't work _that_ well, in my experience).

However, an extra neat fact is that `nextd` and `prevd` have [default keybindings](https://fishshell.com/docs/current/interactive.html#id13)! With an empty command line, press `Alt+←` (`Option+←` on Macs) for `prevd` and `Alt+→` (`Option+→` on Macs) for `nextd`.

### References

- ["Directory history"](https://fishshell.com/docs/current/interactive.html#id13), fish documentation

## fzf Preview Options

[fzf](https://github.com/junegunn/fzf) is one of my all-time favourite pieces of software;
it allows you to fuzzy-find entries in a list, which I use [all over my dotfiles](https://rwblickhan.org/technical/dotfiles/).
It has an absurd amount of additional functionality, however, some of which I'll explore now.

One of my favorite little command-line utilities, based off [an example](https://github.com/junegunn/fzf/blob/master/ADVANCED.md#ripgrep-integration) in the fzf docs, combines fzf and [ripgrep](https://github.com/BurntSushi/ripgrep) to do fancy searching:

```fish
function rfv --description 'rg tui built with fzf and bat'
    # https://github.com/junegunn/fzf/blob/master/ADVANCED.md#using-fzf-as-the-secondary-filter
    rg --smart-case --color=always --line-number --no-heading "$argv" |
        fzf -m --ansi \
            --color 'hl:-1:underline,hl+:-1:underline:reverse' \
            --delimiter ':' \
            --preview "bat --color=always {1} --theme='Solarized (light)' --highlight-line {2}" \
            --preview-window 'up,60%,border-bottom,+{2}+3/3,~3' \
            --bind "enter:become(code_demux {+1..2})"
end
```

There's a lot going on here, but basically it runs a regex with `rg` and pipes the results into `fzf` to multiselect.
Then it [binds `enter:become`](https://github.com/junegunn/fzf?tab=readme-ov-file#turning-into-a-different-process) to open the selected files in VS Code at the right line.

The part to focus on here is the bit inside `enter:become(...)`.
fzf has a number of [preview options](https://www.mankier.com/1/fzf#Options-Preview) that can also be used with bindings.
In particular, `{}` contains the string representation of a single selection and `{+}` contains a space-separated list of strings for multiselection.
You can also use `{q}` for the query string and `{n}` or `{+n}` for the index numbers of selections.

You can go a step farther and parse the selection with [field index expressions](https://www.mankier.com/1/fzf#Field_Index_Expression).
In particular, within this `rfv` utility, `fzf` will output the file name and the line number of the match, separated by a colon, along with further colon-separated metadata.
`1..2` grabs the first two fields and leaves the rest, so `{+1..2}` will provide a space-separated list of filename/line number pairs to open.

The last weird part here is `code_demux`.
That's necessary because, though VS Code's command-line interface does have a flag to open a particular file at a particular line number (`code -g file:line`), it only works for one file at a time.
So `code_demux` is a fish function that just takes the space-separated list and makes a bunch of calls to `code -g`:

```fish
function code_demux
    for arg in $argv
        code -g $arg
    end
end
```

### References

- ["Preview"](https://www.mankier.com/1/fzf#Options-Preview), fzf manpage

## no-case-declarations in ESLint

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

Why are the extra blocks necessary? Because apparently in JavaScript `switch` statements, declarations like `let` and `const` are visible in _all_ switch cases, even though they're not initialized until that case is reached! 😱

This does break code that relies on `switch` case fallthrough, but... you probably shouldn't be using that anyway?

### References

- ["no-case-declarations"](https://eslint.org/docs/latest/rules/no-case-declarations), ESLint Docs

## Template Literals with Tag Functions in JavaScript

If you've used JavaScript for more than about a week, you're probably familiar with template literals, as used for string interpolation:

```javascript
const now = Date.now();
console.log(`It is currently ${now}.`);
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
const name = "world";
const sayHi = html`<h1>Hello ${name}</h1>`;
render(sayHi, document.body);
```

### References

- ["Template literals (Template strings)"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), MDN

## TypeScript `using` Keyword

Yesterday I was working with a Sqlite database and I wanted to call `db.close()` every time a particular class went out of scope. This is a pretty common pattern across programming languages - [RAII via destructors](https://en.cppreference.com/w/cpp/language/raii) in C++, [`with` statements](https://docs.python.org/3/reference/compound_stmts.html#with) in Python, the [`Drop` trait](https://doc.rust-lang.org/std/ops/trait.Drop.html) in Rust – so I was slightly surprised that JavaScript doesn't have a similar pattern.

Except! Apparently there is an [Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management) proposal, and TypeScript went ahead and [implemented it already](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management)!

So we can now add a special `[Symbol.dispose]` function to a TypeScript class inheriting from `Disposable`, which will then be run _whenever_ an instance of that class leaves scope, as long as its declared with `using`. So for example, we can now do this:

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

### References

- [`using` Declarations and Explicit Resource Management](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management), TypeScript 5.2 Release Notes
- ["TypeScript 5.2's New Keyword: 'using'"](https://www.totaltypescript.com/typescript-5-2-new-keyword-using), Total TypeScript

## Adding Methods to Prototypes in TypeScript

Recently for a Secret Project 🤫 I had a need to shuffle an array. Luckily I found the [Fisher–Yates Shuffle](https://bost.ocks.org/mike/shuffle/), but I still needed to actually _implement_ it in TypeScript. In particular, I was hoping for an immutable method on `Array`, similar to existing methods like [`toSorted()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted). In that case, I would be able to get an array of shuffled questions by calling `questions.toShuffled()`.

Thanks to the wild world of JavaScript, this is very possible! First, we have to declare this so TypeScript's type checker doesn't get sad:

```typescript
declare interface Array<T> {
  toShuffled(): T[];
}
```

I just stuffed this in a convenient `.d.ts` declarations file I already had lying around.

Then, we need to implement it; I chose to put it in a `helpers.ts` file. The important part is to make this a function on the `Array.prototype`, so that it's inherited by all other arrays:

```typescript
Array.prototype.toShuffled = function <T>() {
  // Implement the sorting using `this`...
};
```

Then, finally, I need to `import` that whole file to make sure it gets bundled (I think?):

```typescript
import "./helpers";
```

And that's it! Seems kinda dangerous but that's JavaScript for you 🤷‍♀️ It did let me write very concise code to shuffle a list of questions, each with a shuffled list of answers:

```typescript
const questions = QUESTIONS.map((question) => ({
  ...question,
  answers: question.answers.toShuffled(),
})).toShuffled();
```

### References

- ["How to extend String Prototype and use it next, in Typescript?"](https://stackoverflow.com/questions/39877156/how-to-extend-string-prototype-and-use-it-next-in-typescript), StackOverflow

## Custom Keyboard Shortcuts on macOS

Did you know you can add custom keyboard shortcuts for pretty much any app on macOS, not just VS Code or Obsidian or similar apps that let you customize internally?

I learned this recently reading the [iA Writer docs](https://ia.net/writer/support/basics/shortcuts?tab=mac#custom-keyboard-shortcuts-mac). If you go into System Settings -> Keyboard -> Keyboard Shortcuts... -> App Shortcuts[^change], you can set arbitrary keyboard shortcuts for any menu items in any app, even if they already have keyboard shortcuts set. That let me swap around Cmd-O and Cmd-Shift-O in iA Writer!

See also: [Command K Bars in Any App via Raycast](#command-k-bars-in-any-app-via-raycast)!

### References

- ["Custom Keyboard Shortcuts"](https://ia.net/writer/support/basics/shortcuts?tab=mac#custom-keyboard-shortcuts-mac), iA Writer

[^change]: The interface has changed a bit since they wrote their documentation, apparently.

## Search in git log

Yesterday I wanted to look for a block of code in [my dotfiles](https://github.com/rwblickhan/dotfiles) that I deleted a while ago. Turns out there's an easy way to do that!

```bash
git log --oneline -p -S"$TMUX" .config/fish/config.fish
```

That'll output a list of all commits that changed the number of occurrences of the string `TMUX`, alongside the code that commit changed. `--oneline` cleans up the commit message output, `-p` generates the patch (basically, the code diff in that commit), and `-S` does the actual search. It can even filter to a particular file since, in this case, I knew exactly which file I was looking for.

With that command above, I was able to quickly find the last commit where I had deleted all references to the `$TMUX` environment variable in a script and edit that code for a new use!

Looking at the [`git-log` documentation](https://git-scm.com/docs/git-log), there's also a `-G` option. The two main differences seem to be:

- `-G` always operates on regexes; `-S` only operates on strings, unless you also provide the `--pickaxe-regex` flag.
- `-S` only triggers if the commit changed the number of occurrences of the search string; `-G` triggers any time an addition/deletion line in the patch matches the search regex.

I'm not sure which is generally better to use — the `git-log` documentation suggests `-S` is "intended for the scripter's use", whatever that means, and all of OpenAI, Anthropic, and Perplexity suggested `-S` over `-G` 🤷‍♀️

### References

- [git-log Documentation](https://git-scm.com/docs/git-log)

## Smart Selection in iTerm2

iTerm2 has a smart-selection feature
Quadruple-click in the scrollback buffer and iTerm will try to "smart select" an item, like a filesystem path or a quoted string.
You can also configure this to happen on double-click instead.
This is pretty handy for copy/pasting text from the terminal, especially if you also enable the "copy to clipboard on selection" option.

Unfortunately, by default the quoted-strings smart selection only recognizes double quotes, not single quotes.
Luckily, you can update this or even add completely new smart selections by editing the regexes in settings!
I updated the quotes smart selection to also respect single quotes, which is perfect for those messages like "command not found; did you mean 'pnpm run test'?".

### References

- [Smart Selection](https://iterm2.com/documentation-smart-selection.html)

## Find URLs in iTerm2

I always wanted to open URLs in the terminal from the command line.
To that end, I used to use tmux with a few plugins, which enabled searching for URLs and opening them.

It turns out this is built in natively to iTerm2!
Edit -> Find -> Find URLs (⌥⌘U) runs a regex over the scrollback buffer and finds "URLish things",
giving each a hotkey to open.

The only downside is that it only seems to find URLs on a single page of the scrollback buffer — it's not super consistent about what it finds.

## iPhone Back Tap

Don't have an iPhone 15 with an Action Button™️? It turns out you can get something similar with an accessibility feature on all iPhones on iOS 14 or later.

Just go into Settings > Accessibility > Touch > Back Tap and enable either double or triple tap.
You can map it to all kinds of system controls or any Shortcut — a wider selection than you can with the Action Button, actually.
I set mine to open Spotlight, so I can jump quickly to another app from anywhere in the system by tapping the back of my phone.

Surprisingly, this works even with a case on — it's probably based on haptics.
Unfortunately, it's not always extremely responsive — sometimes it takes a second or two, and sometimes it doesn't register at all 😞
Still, it's a neat feature that I'm already using regularly.

### References

- [Use Back Tap on your iPhone - Apple Support](https://support.apple.com/en-us/111772)

## Using Shoelace with Preact + Vite

I recently wanted to spruce up [my spicy questions site](https://spicy-questions.rwblickhan.org) with the addition of [Shoelace](https://shoelace.style) components. That was surprisingly difficult using Vite + Preact.

First up: install Shoelace directly with npm, instead of loading it from a CDN.

```sh
npm install @shoelace-style/shoelace
```

Shoelace depends on a bunch of SVG assets, which are also normally loaded from a CDN. If you want to bundle them, you have to make sure they're copied from Shoelace into some public directory. So, in `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@shoelace-style/shoelace/dist/assets/**/*",
          dest: "./shoelace_assets",
        },
      ],
    }),
  ],
});
```

Which requires installing `vite-plugin-static-copy`:

```sh
pnpm install -D vite-plugin-static-copy
```

Then you have to make sure that the Shoelace components know where to get assets, so somewhere at the top level of your app, you have to set the base path:

```typescript
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
setBasePath("./shoelace_assets");
```

It is **vitally** important that you "cherry-pick" from the specific `dist/utilitie/base-path.js` file, or else the **entirety** of Shoelace will be bundled, and the output JavaScript will be hundreds of kilobytes, even gzip'd.

You also have to make sure to import Shoelace's CSS:

```typescript
import "@shoelace-style/shoelace/dist/themes/light.css";
```

Then, in your actual Preact, you can import the React wrapper for the appropriate Shoelace component:

```typescript
import SlButton from "@shoelace-style/shoelace/dist/react/button/index.js";

export function App() {
    return <SlButton>Click me!</SlButton>
}
```

Again, it is **vitally** important that you cherry-pick directly from the appropriate `index.js` file.

Finally, Shoelace recommends turning on Preact's React-compat mode, if you haven't already, so over in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "react": ["./node_modules/preact/compat/"],
      "react-dom": ["./node_modules/preact/compat/"]
    }
    // ... and other stuff
  }
}
```

And then, finally, you should have working components. Annoyingly, the bundle size is still on the high side, but 🤷‍♀️

## mailto Header Fields

I recently added a "reply by email" button at the bottom of each of my posts. You might see it at the bottom of this very post! It's pretty simple — although it's styled as a button, it's actually an `<a>` tag with an `href` set to `mailto:reply@rwblickhan.org`, so clicking it pops open your email client.

Although I haven't received a response (yet), it would be nice if the email subject was autofilled to the actual post that's being responded to. It turns out that's trivially easy with `mailto:` links!

You can add `header`, `subject`, `cc`, `bcc`, and even `body` as query parameters, which are then autofilled in the email client. So now the button at the bottom links to `mailto:reply@rwblickhan.org?subject=${encodeURIComponent("Reply to " + title)}`, which URL-encodes the title of the post. Neat!

### References

- [Creating links | MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links#specifying_details)

## Caching in GitHub Actions

Recently, I moved this site (yes, this very one!) from [Cloudflare Pages](https://pages.cloudflare.com) to [Cloudflare Workers](https://workers.cloudflare.com) (on which more below).
So I no longer benefit from Cloudflare Page's built-in one-click deploys — I have to deploy myself via a GitHub Action.

That was _mostly_ very easy — run an `npm run build` followed by the official `cloudflare/wrangler-action`.[^wrangler]
But one complication came from Astro.

Astro optimizes images by default, which can take quite long (on the order of 5 websites for a site of my size).
Luckily, it has [image caching](https://docs.astro.build/en/guides/images/#asset-caching) in between builds.
Unluckily, GitHub Actions does not support this by default, as Cloudflare Pages did — I had to set it up manually.
Neither luckily nor unluckily, there's an official [`actions/cache`](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows) action that can support this workflow.

However, `actions/cache` was a bit of a hassle to get working, since we want to invalidate the cache when new images are added.
I read [one post](https://danielwulff.dev/blog/cache-astro-images-across-github-action-runs/) that recommended using the GitHub CLI within the workflow to delete the cache each time,
but I couldn't get that working — the GitHub CLI returned a permission error every time I tried.

I was stuck on this a bit, but eventually learned there's a `hashFiles` function in GitHub Actions.
That allows using the cache "correctly" — builds share a cache key (with the same hash value) only if no files have been added.
Astro optimizes any image files in `src/assets` by default, so I just hash all of those.

One last thing: for whatever reason, I couldn't get the default `/dist/.astro` cache directory to work.
Inspired by the blog post above, I configured Astro to use `cache/` instead, and it worked fine 🤷‍♀️

Here's the final workflow:

```yaml
name: Deploy
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - name: Restore cached images
        uses: actions/cache@v4
        with:
          path: cache
          key: _astro-${{ hashFiles('src/assets/**/*.jpg', 'src/assets/**/*.jpeg', 'src/assets/**/*.webp', 'src/assets/**/*.webp') }}
      - run: npm ci
      - run: npm run build
      - name: Build & Deploy Site
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          wranglerVersion: "4.14.4"
```

### Aside: Porting to Workers

Workers has support for fully-static websites now via [Static Assets](https://developers.cloudflare.com/workers/static-assets/),
with the exact same limits as Pages, and Cloudflare is quietly pushing folks to switch.
So I figured I'd get it out of the way. Luckily, with the latest version of Workers, it was extremely easy.

You just have to add a `wrangler.jsonc` that defines where to find the Static Assets and any custom routes you want to serve the site at.
Here's mine:

```jsonc
{
  "name": "rwblickhanorg",
  "compatibility_date": "2025-05-14",
  "assets": {
    "directory": "./dist",
  },
  "routes": [
    {
      "pattern": "rwblickhan.org",
      "custom_domain": true,
    },
  ],
}
```

Then just run `npx wrangler@latest deploy` to deploy! (Or use the GitHub Action above.)

[^wrangler]: Do note the specified `wranglerVersion`. Static Assets is pretty new — deploys failed with the older default version of Wrangler.

## hgroup

A neat new HTML element I learned about today: `<hgroup>`!
It lets you combine a heading (`<h1>-<h6>`) with one or more `<p>` tags that provide context, like a publication date or subtitle.

Each of my posts has a last-updated and originally-published date, so I've wrapped them all in `<hgroup>` tags!

### References

- [&lt;hgroup&gt;: The Heading Group element | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/hgroup)
- [What I learnt about making websites by reading two thousand web pages – alexwlchan](https://alexwlchan.net/2025/learning-how-to-make-websites/)

## search-text

A neat new experimental CSS pseudo-element: `::search-text` lets you style the highlighted text when users use the ⌘F "find in page" feature!

### References

- [::search-text - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::search-text)
