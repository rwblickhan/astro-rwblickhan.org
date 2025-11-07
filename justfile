alias r := run
alias b := build
alias c := clean
alias s := sync

bundle:
    git bundle create rwblickhan.org.bundle --all

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
