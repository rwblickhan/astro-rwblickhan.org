---
title: "Border with Corner Radius in SwiftUI"
lastUpdatedDate: 2025-02-05
---

How do you add a colored border with a corner radius to a view in SwiftUI?
This is... surprisingly difficult, given in CSS it's simply a matter of [`border-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color) and [`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius).

You might assume you can just combine the [`.border`](https://developer.apple.com/documentation/swiftui/view/border(_:width:)) and [`.cornerRadius`](https://developer.apple.com/documentation/swiftui/view/cornerradius(_:antialiased:)) view modifers like so:

```swift
var body: some View {
    Text("Sample Text")
        .border(.black)
        .cornerRadius(20)
}
```

That does not work, because the corner radius will mask the border, so the border will simply be cut off at the edges.
Also, apparently `.cornerRadius` is deprecated as of iOS 17.

Instead, the best way seems to be to use the [`.overlay`](https://developer.apple.com/documentation/swiftui/view/overlay(alignment:content:)) view modifier:

```swift
var body: some View {
    Text("Sample Text")
        .overlay(RoundedRectangle(cornerRadius: 20).stroke(.gray))
}
```

## References

- ["How to draw a border around a view"](https://www.hackingwithswift.com/quick-start/swiftui/how-to-draw-a-border-around-a-view), Hacking With Swift