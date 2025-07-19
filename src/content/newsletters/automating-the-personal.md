---
title: Automating the Personal
lastUpdatedDate: 2025-07-18
publicationDate: 2025-04-30
season: 7
---


Is there really value in personal automation? I wrote a [whole essay on Raycast](https://rwblickhan.org/technical/why-raycast/) and I’m still not really sure. Even though xkcd has a [helpful chart](https://xkcd.com/1205/) for how much time you can spend automating a task, the joke is that you’re probably spending *too much time*.

But it’s so much fun! I’ve seen this referred to as a [worry stone](https://ethanmarcotte.com/wrote/let-a-website-be-a-worry-stone/) or by the Dutch term [*prutsen*](https://stefan.vanburen.xyz/blog/prutsen/). Sometimes it’s okay to waste a bit of time on something trivial.

Anyway: [Hammerspoon](https://www.hammerspoon.org) [^hammerspoon] is a neat personal automation system that lets you write small Lua scripts to control macOS (that I have been wasting time with lately).

The most common use of Hammerspoon (even included in the [getting started guide](https://www.hammerspoon.org/go/) is window management — adding hotkeys or automations to move windows around. I was more interested in automating keystrokes.

For instance, when writing up PRs on GitHub, I often have to type out the Markdown for a checkbox: `- [x]`. Five whole characters! For each checkbox! I could make a [snippet in Raycast](https://rwblickhan.org/technical/why-raycast/#snippets), but then I still have to pop open Raycast and search for the snippet each time. I’d much rather have a single key combination to just immediately print that out.

```lua
hs.loadSpoon("LeftRightHotkey")
spoon.LeftRightHotkey:start()

local function typeCheckbox()
    hs.eventtap.keyStrokes("- [x]")
end

spoon.LeftRightHotkey:bind({ "rOpt" }, "x", typeCheckbox)
```

Now, whenever I press (right-)⌥X,[^right] the Markdown for a checkbox pops right out.

Is this silly? Yes, a little bit. But xkcd’s chart suggests that, if I save 1 second each and use it 5 times a day, then over five years I’ve saved 2 hours!

Here’s a more serious example:

```lua
hs.loadSpoon("LeftRightHotkey")
spoon.LeftRightHotkey:start()

local function searchHighlighted()
    hs.eventtap.keyStroke({ "cmd" }, "c")
    hs.timer.doAfter(0.1, function()
        hs.eventtap.keyStroke({ "cmd" }, "f")
        hs.timer.doAfter(0.1, function()
            hs.eventtap.keyStroke({ "cmd" }, "v")
        end)
    end)
end

spoon.LeftRightHotkey:bind({ "rOpt" }, "f", searchHighlighted)
```

This solves a minor annoyance while browsing the web. Sometimes, I want to search for other usages of a term on a page. Normally, that requires highlighting the term, copying with ⌘C, opening search with ⌘F, then pasting with ⌘V. With this little snippet, I can highlight and press (right)-⌥F to go straight to search.

Theoretically, these hotkeys could then be mapped to a macropad like the [BNK8](https://binepad.com/products/bnk8?srsltid=AfmBOorI6Fmch3C6Ow2Jaf2WJ9hUe5EjGZRsymxXHspKPzDD0LrEuAyh)... but I don’t *actually* have a good reason to buy one of those, as tempted as I may be.

More broadly, you have the full power of Lua as a scripting language, so you can do pretty wild stuff. I have a script that uses a regex to look through my pasteboard for URLs, which can then get dumped into a Markdown link format (`[]()`) at the press of a hotkey. You can see all these in my [`init.lua`](https://github.com/rwblickhan/dotfiles/blob/main/.hammerspoon/init.lua) on GitHub.

Hammerspoon is fun largely because Lua is simple (in the [“Simple Made Easy”](https://youtu.be/SxdOUGdseq4) sense), easy to learn, and amenable to LLMs (because I don’t want to spend *too* much time tinkering). My configs were largely written with the help of Claude — with no context on Lua, I tossed it the prompt “Write a hammerspoon config that maps f13 + x to typing out `- [x]`”. Claude hallucinated a couple APIs, but that’s fine; the output gave me enough of a hook on Lua that I was able to correct the rest myself.

## In Other News

- I’ve had an FL Studio license for almost as long as I can remember (a gift in middle school, I think), but only recently did I sit down to really *learn* it. I’m still a beginner, but I am embarrassed to say my first thought was to make some [ambient drone](/owls.mp3): <audio controls src="/owls.mp3"></audio>
- We made another zine! If you’re in the Bay Area, come check out the [launch party](https://partiful.com/e/aXkJxDQVh9aKqOL0vzkp)!

[^hammerspoon]: I’m sure I’ve seen it mentioned in passing many times before, but specifically I learned about Hammerspoon from [this recent tooling post](https://macwright.com/2025/04/03/personal-tools) by Tom MacWright.
[^right]: Specifically the right Option key, because I don’t want to clobber my normal Option key use, similar to how I use the [right Command key as a hyperkey](https://rwblickhan.org/technical/why-raycast/#keyboard-shortcuts-for-days). (So, technically, I have *two* hyperkeys now.) That’s what that `LeftRightHotkey` rigamarole is all about — Hammerspoon’s default [`hs.hotkey`](https://www.hammerspoon.org/docs/hs.hotkey.html) is insensitive to right or left modifier keys, which the [LeftRightHotkey spoon](https://www.hammerspoon.org/Spoons/LeftRightHotkey.html) fixes.