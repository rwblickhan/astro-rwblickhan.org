---
title: mailto Header Fields
lastUpdatedDate: 2025-02-05
---

I recently added a "reply by email" button at the bottom of each of my posts. You might see it at the bottom of this very post! It's pretty simple — although it's styled as a button, it's actually an `<a>` tag with an `href` set to `mailto:reply@rwblickhan.org`, so clicking it pops open your email client.

Although I haven't received a response (yet), it would be nice if the email subject was autofilled to the actual post that's being responded to. It turns out that's trivially easy with `mailto:` links!

You can add `header`, `subject`, `cc`, `bcc`, and even `body` as query parameters, which are then autofilled in the email client. So now the button at the bottom links to `mailto:reply@rwblickhan.org?subject=${encodeURIComponent("Reply to " + title)}`, which URL-encodes the title of the post. Neat!

## References

- [Creating links | MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links#specifying_details)