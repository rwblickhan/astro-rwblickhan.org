---
title: "@State Initialization in SwiftUI"
lastUpdatedDate: 2025-02-05
---

I'm building an iOS app for [Askhole](https://www.askhole.io) that shows a question out of a list of question.
I'm using a basic `@State private var` property to store the index of the current question.
I wanted to randomize this on launch, but `@State private var`s have to be initialized to a literal value, so instead I implemented this:

```swift
struct ContentView: View {
    private var questions: [Question]
    @State private var currentQuestion = 0

    init(questions: [Question]) {
        self.questions = questions
        currentQuestion = Int.random(in: 0 ..< questions.count)
    }
}
```

Turns out that does not work, due to the extra logic that comes with an `@State` property!
Every time I tried running this, it showed the first question.
What I had to do instead was initialize the property *as a `State` value*:

```swift
struct ContentView: View {
    private var questions: [Question]
    @State private var currentQuestion = 0

    init(questions: [Question]) {
        self.questions = questions
        _currentQuestion = State(initialValue: Int.random(in: 0 ..< questions.count))
    }
}
```