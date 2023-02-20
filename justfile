alias r := run
alias p := push
alias b := build
alias c := clean

push message:
    git add -A && git commit -m '{{message}}' && git push

run:
    npm run dev

build:
    npm run build

clean:
    rm -rf _dist/*
