alias p := push
alias r := run
alias b := build
alias c := clean
alias s := sync

commit message:
    git add -A && git commit -m '{{message}}' && git push

bundle message: (commit message)
    git bundle create rwblickhan.org.bundle --all

push message: (bundle message)
    rclone copy rwblickhan.org.bundle r2:backups/

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
