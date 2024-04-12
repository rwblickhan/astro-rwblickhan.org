---
title: "Setting Up Tmux in VS Code"
lastUpdatedDate: 2024-04-11
tags: [tmux, vscode]
---

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
- I check if the `TMUX` environment variable is *not* set, so that I don't try to recursively open tmux sessions.
- Finally, I check for the `VSCODE_WORKSPACE` environment variable. If it is, I create-or-attach a (`new -A`) new session with a name/tag (`-t`) pulled from `VSCODE_WORKSPACE`. Otherwise, I just use the title `default`, which attaches to the default session I normally use for terminals.