---
name: review
description: Review, sol loop or second opinion on a change.
---

Skip for small local changes. Get one full review from GPT Sol through whatever agent tool can run it, else from one cold read-only subagent. Brief it with repo path, base commit, goal, out-of-scope and check results, and let it run `git diff` itself. Ask for bugs with file:line labeled blocker, should or nit. Verify each, fix with the smallest change, rebut with evidence, list extras as follow-ups.
