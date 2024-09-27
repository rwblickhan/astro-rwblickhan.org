alias p := push
alias r := run
alias b := build
alias l := log
alias c := clean
alias s := sync

push message:
    git add -A && git commit -m '{{message}}' && git push

run:
    pnpm run dev

build:
    pnpm run build

check:
    pnpm run astro check

clean:
    rm -rf _dist/*

sync:
    pnpm run astro sync

log:
  git camp "Log"
