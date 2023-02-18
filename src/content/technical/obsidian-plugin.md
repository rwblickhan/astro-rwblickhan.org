---
title: "Building an Obsidian Plugin"
lastUpdatedDate: 2023-02-18
description: "An overview of how I built an Obsidian plugin."
---

I'm a heavy user of [Obsidian](https://obsidian.md), which comes with an extensive plugin system.
I recently found myself needing to write a plugin, so let's discuss how that worked.

I'm a fairly heavy user of tags in Obsidian; almost every note I write gets a tag, which I pull from a canonical list of about 150 tags.
Unfortunately, working with tags in Obsidian is a fairly bare-bones experience, though there is a fantastic plugin called [Tag Wrangler](https://github.com/pjeby/tag-wrangler) that provides various utilities to work with tags.

What it _doesn't_ provide, however, is an upgrade to the tag browser.
To view all notes with a particular tag, you either have to use the global search with a `tag:` prefix (which, annoyingly, doesn't autocomplete) or open the tag pane and scan a massive list of tags (which, annoyingly, always defaults to sorting by count instead of alphabetical).
To search for tags and tagged notes, I wanted a fuzzy-find modal similar to the note quick-open modal, and so [Tag Search](https://github.com/rwblickhan/obsidian-tag-search) was born.

Luckily, getting started with Obsidian plugins is quite easy.
There's an extensive TypeScript API to interact with, as well as an official [sample plugin](https://github.com/obsidianmd/obsidian-sample-plugin) provided as a template that shows off many of the features you might want to use.
I also heavily referenced the [Obsidian Plugin Developer Docs](https://marcus.se.net/obsidian-plugin-docs/), which I've been led to understand are the officially-unofficial guide to developing Obsidian plugins.

To implement fuzzy-finding, I was looking into [fzf for JavaScript](https://fzf.netlify.app/docs/latest), but luckily, the Obsidian API already exposes [the fuzzy-find modal as a first-class construct](https://marcus.se.net/obsidian-plugin-docs/user-interface/modals#select-from-list-of-suggestions). I just had to extend it:

```typescript
class TagSearchModal extends FuzzySuggestModal<string> {
    search: Search;

    constructor(app: App, search: Search) {
        super(app);
        this.search = search;
    }

    onOpen(): void {
        // See below!
    }

    onClose(): void {
        // See below!
    }

    getItems(): string[] {
        // See below!
    }

    getItemText(item: string): string {
        // See below!
    }

    onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {
        // See below!
    }

    private maybeChooseFirstSuggestion(evt: KeyboardEvent) {
        // See below!
    }
}
```

One interesting thing here is that `FuzzySuggestModal` is [generic](https://basarat.gitbook.io/typescript/type-system/generics) over the items being searched for.
In this case, I'm searching for tags, which are just simple `string`s.

The other interesting thing here is the reference to `Search`.
I want to read and write to the global search panel to append the selected tag, but the search panel isn't exposed by the Obsidian API;
it's actually another plugin, albeit a core plugin maintained by the Obsidian team.
As a result, I have to be a bit sneaky to get a reference to it, as we'll see below.
I didn't want to couple that to my business logic, so instead I pass it in as an [interface](https://basarat.gitbook.io/typescript/type-system/interfaces) that exposes the function I need:

```typescript
interface Search {
    openGlobalSearch(_: string): void;
    getGlobalSearchQuery(): string;
}
```

The logic for displaying the items is fairly straightforward:

```typescript
getItems(): string[] {
    const files = app.vault.getMarkdownFiles();
    const itemSet = new Set<string>();
    for (const file of files) {
        const cache = app.metadataCache.getCache(file.path);
        if (cache === null) {
            continue;
        }
        getAllTags(cache)?.forEach((tag) => {
            itemSet.add(tag);
        });
    }
    return Array.from(itemSet);
}

getItemText(item: string): string {
    return item;
}
```

`getItems` is responsible for loading all the items I want to fuzzy-find over and `getItemText` is responsible for providing the text I display in the results.
In this case, I'm fuzzy-finding strings, so `getItemText` can just return the tag text directly.

`getItems` is more interesting.
First, I load _all_ the Markdown (non-settings) files in the vault (Obsidian's term for a directory of notes).
I then load the metadata for each file, which includes the tags, then use the built-in `getAllTags` to retrieve the tags from the metadata.
Finally, I throw all the tags into a `Set` to deduplicate them, before converting that back to an `Array` to respect the return type.

Once the user has found the tag they're looking for, they can click or press Enter to select it.
However, there's some extra logic here:

- By default, the search for the new tag will replace whatever's currently in the global search bar.
- If the user presses Shift, the tag search will be negated, searching for notes that _don't_ contain that tag.
- If the user presses Command or Control, the tag will either be appended to the search, if not already present, and removed, if already present.
- Negation and appending can be combined, by pressing Shift _and_ Command or Control.

`onChooseItem` handles that logic:

```typescript
onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {
    const toggle = evt.ctrlKey || evt.metaKey;
    const negate = evt.shiftKey;

    const defaultTagSearchString = `tag:${item}`;
    const negatedTagSearchString = `-tag:${item}`;
    const tagSearchString = negate
        ? negatedTagSearchString
        : defaultTagSearchString;

    if (toggle) {
        let query = this.search.getGlobalSearchQuery();
        let needsNewTagSearchString = false;

        if (negate && !query.includes(negatedTagSearchString)) {
            needsNewTagSearchString = true;
        }
        query = query.replaceAll(negatedTagSearchString, "");

        if (!negate && !query.includes(defaultTagSearchString)) {
            needsNewTagSearchString = true;
        }
        query = query.replaceAll(defaultTagSearchString, "");

        if (needsNewTagSearchString) {
            this.search.openGlobalSearch(
                query.concat(query.length === 0 ? "" : " ", tagSearchString)
            );
        } else {
            this.search.openGlobalSearch(query);
        }
    } else {
        this.search.openGlobalSearch(tagSearchString);
    }
}
```

Luckily, the `FuzzySuggestModal` provides `evt`, representing the mouse or keyboard event, which lets me check if Shift, Command, or Control is pressed.

The important part here is calling `openGlobalSearch`, passing the tag with a `tag:` prefix (or `-tag:` in the negated case), to display all notes with that tag.
That's basically all I do in the non-toggle case.

The toggle case is a bit more complicated.
I have to keep track of `needsNewTagSearchString` so that I can append the tag if it's not already present.
An additional complication is that the non-negated search string (`tag:...`) is a substring of the negated version (`-tag:...`), so I can't check them independently.

Instead, what I do first is check if there's any instances of the negated string, so I can set `needsNewTagSearchString` for the negated case.
I can then remove any instances of the negated search string, since all other cases should remove it.
Then, with the negated search string removed, I can check for instances of the regular search string to set `needsNewTagSearchString` for the default case,
before removing any instances of the regular search string.
Finally, I can reopen the query, appending the new search string if necessary.

That all works fine for clicking, but `onChooseItem` will _only_ be called if the user presses Enter with no modifiers, which isn't the behavior I want.
To get around that, I hook into the `"keydown"` event on the input element provided by the modal's parent class:

```typescript
    onOpen(): void {
        super.onOpen();
        this.inputEl.addEventListener("keydown", (ev: KeyboardEvent) => {
            this.maybeChooseFirstSuggestion(ev);
        });
    }

    onClose(): void {
        super.onClose();
        this.inputEl.removeEventListener("keydown", (ev: KeyboardEvent) => {});
    }
```

Notably, I'm careful to remove the event listener again when the fuzzy suggest modal is closed.

The event listener calls into a new helper:

```typescript
    private maybeChooseFirstSuggestion(evt: KeyboardEvent) {
        const toggle = evt.ctrlKey || evt.metaKey;
        const negate = evt.shiftKey;
        // "Enter"-only case is handled by FuzzySuggestModal already
        if (evt.key === "Enter" && (toggle || negate)) {
            const suggestions = this.getSuggestions(this.inputEl.value);
            const choice = suggestions.first()?.item;
            if (choice != null) {
                this.close();
                this.onChooseItem(choice, evt);
            }
        }
    }
```

Now, because the Enter-only case is already handled by `onChooseItem` and I don't want double-selection, I only add extra logic if the user had actually pressed a modifier key as well.
In that case, I use `getSuggestions` - provided by `FuzzySuggestModal` - and pick the first, top suggestion, just like pressing Enter alone would do.
If there's acutally a suggestion, I call `onChooseItem` manually, making sure to also `close` the modal itself, which is handled for me in the normal case.
Now we get all the same behavior for clicking and pressing Enter!

Now that I have a fuzzy-find modal that can open search, I need some way to open the modal, and I still need to pass a `Search` reference to the modal as well.
That's all done from our core `Plugin`:

```typescript
export default class TagSearchPlugin extends Plugin {
    async onload() {
        this.addCommand({
            id: "open-tag-search",
            name: "Open tag search",
            callback: () => {
                /* eslint-disable @typescript-eslint/no-explicit-any */
                const searchPlugin = (
                    this.app as any
                ).internalPlugins.getPluginById("global-search");
                /* eslint-enable @typescript-eslint/no-explicit-any */
                const search = searchPlugin && searchPlugin.instance;

                if (searchPlugin && searchPlugin.instance) {
                    new TagSearchModal(this.app, search).open();
                } else {
                    new Notice("Please enable the search core plugin!");
                }
            }, 
        });
    }
}
```

I only override `onload`, which lets me set up the plugin when it's loaded.
For now, I've only added it as a command (via `addCommand`), accessible through the Cmd-P command modal or a user-defined hotkey.
In particular, when the `open-tag-search` command is run, I find the `searchPlugin` by explicitly providing its ID, then unwrap it and pass it to a new instance of my `TagSearchModal`, which I immediately `open`.

If the global search core plugin isn't enabled, I just show a basic `Notice` provided by Obsidian.
The `eslint-disable` line is there to avoid getting yelled at by the linter for casting to `any`, which I need to do to get `this.app` to typecheck, since `internalPlugins` isn't publicly exposed on the `App` type in the API.

And that's... about it!
If I install the plugin locally, it works!

![Obsidian plugin in action](/technical/obsidian-plugin.png)

I made a [pull request](https://github.com/obsidianmd/obsidian-releases/pull/1563) to add Tag Search to the official list of community plugins, though if you're curious to try it out now, you can install it immediately with [BRAT](https://github.com/TfTHacker/obsidian42-brat) - just point it at the [rwblickhan/obsidian-tag-search repo](https://github.com/rwblickhan/obsidian-tag-search)!
