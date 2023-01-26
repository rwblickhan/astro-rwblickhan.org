alias r := run
alias b := build
alias c := clean

run:
    npm run dev

build:
    npm run build

clean:
    rm -rf _dist/*
