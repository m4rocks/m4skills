---
name: test
description: Use when the user asks to add, write or fix tests.
---

Test only where breakage is quiet: parsers, branches, money, security, data writes, fixed bugs. A change too small to break, like a docs typo, needs no new test. Assert behavior through the public API with hand-written expected values, and mock only external layers. Each test must fail on a mistake you can name.
