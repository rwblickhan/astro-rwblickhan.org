alias p := push
alias r := run
alias b := build
alias c := clean
alias s := sync

push message:
    git add -A && git commit -m '{{message}}' && git push

run:
    npm run dev

build:
    npm run build

clean:
    rm -rf _dist/*

sync:
    npm run astro sync