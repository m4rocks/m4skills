---
name: half-send
description: Use only when the user says 'half send', 'full stop', 'let me review' or 'don't merge' while handing the work over.
---

Run m4:full-send, but stop with the PR ready to merge. Never merge, enable auto-merge, enter a merge queue or push to the default branch; turn off auto-merge or a queue already on, and check again before your last push. End with the gate's verdict: ready, waiting only on a required human approval, or blocked with what blocks it and what you tried.
