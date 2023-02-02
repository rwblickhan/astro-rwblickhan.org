---
title: "Building an Obsidian Plugin"
lastUpdatedDate: 2023-01-30
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

    getItems(): string[] {
        // See below!
    }

    getItemText(item: string): string {
        // See below!
    }

    onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {
        // See below!
    }
}
```

One interesting thing here is that `FuzzySuggestModal` is [generic](https://basarat.gitbook.io/typescript/type-system/generics) over the items being searched for.
In this case, I'm searching for tags, which are just simple `string`s.

The other interesting thing here is the reference to `Search`.
I wanted to open the search panel with the results for the selected tag, but the search panel isn't exposed by the Obsidian API;
it's actually another plugin, albeit a core plugin maintained by the Obsidian team.
As a result, I have to be a bit sneaky to get a reference to it, as we'll see below.
I didn't want to couple that to my business logic, so instead I pass it in as an [interface](https://basarat.gitbook.io/typescript/type-system/interfaces) that exposes the function I need:

```typescript
interface Search {
    openGlobalSearch(_: string): void;
}
```

The rest of the logic is fairly straightforward:

```typescript
getItems(): string[] {
    const files = app.vault.getAllLoadedFiles();
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

onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {
    this.search.openGlobalSearch(`tag:${item}`);
}
```

`getItems` is responsible for loading all the items I want to fuzzy-find over, `getItemText` is responsible for providing the text we display in the results, and `onChooseItem` is responsible for handling selection. In this case, I'm fuzzy-finding strings, so `getItemText` can just return the tag text directly. Similarly, `onChooseItem` just takes the selected tag string and opens the global search, using the `tag:` prefix, to display all the notes with that tag.

`getItems` is more interesting.
First, I load _all_ the files in the vault (Obsidian's term for a directory of notes).
I then load the metadata for each file, which includes the tags, then use the built-in `getAllTags` to retrieve the tags from the metadata.
Finally, I throw all the tags into a `Set` to deduplicate them, before converting that back to an `Array` to respect the return type.

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
                    new UnsupportedTagSearchModel(this.app).open();
                }
            }, 
        });
    }
}
```

I only override `onload`, which lets me set up the plugin when it's loaded.
For now, I've only added it as a command (via `addCommand`), accessible through the Cmd-P command modal or a user-defined hotkey.
In particular, when the `open-tag-search` command is run, I find the `searchPlugin` by explicitly providing its ID, then unwrap it and pass it to a new instance of my `TagSearchModal`, which I immediately `open`.

I also provide a very simple `UnsupportedTagSearchModel` if the user doesn't have the global search core plugin enabled.
The `eslint-disable` line is there to avoid getting yelled at by the linter for casting to `any`, which I need to do to get `this.app` to typecheck, since `internalPlugins` isn't publicly exposed on the `App` type in the API.

And that's... about it!
If I install the plugin locally, it works!

![Obsidian plugin in action](/technical/obsidian-plugin.png)

I made a [pull request](https://github.com/obsidianmd/obsidian-releases/pull/1563) to add Tag Search to the official list of community plugins, though if you're curious to try it out now, you can install it immediately with [BRAT](https://github.com/TfTHacker/obsidian42-brat) - just point it at the [rwblickhan/obsidian-tag-search repo](https://github.com/rwblickhan/obsidian-tag-search)!
