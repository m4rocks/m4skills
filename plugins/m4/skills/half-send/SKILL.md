---
name: half-send
description: Use only when the user says 'half send', 'full stop', 'let me review' or 'don't merge' while handing the work over.
---

Run m4:full-send, but stop with the PR ready for the user to merge. Never merge, enable auto-merge, enter a merge queue or push to the default branch. Turn off auto-merge or a queue that is already on, and check again before your last push.

Use the gate as the readiness check and end with a verdict: ready to merge; waiting for approval, when only a required human approval is missing; or blocked, with what blocks it, what you tried and what it needs. Report per m4:report, leading with the PR link, latest commit and verdict, then proof and review outcome.
