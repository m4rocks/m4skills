---
name: repo
description: Use when changing files in a repository, for how to treat its git history, checks and conventions.
---

Commit, push or open PRs only when told, staging files by name. Never weaken a test, lint rule, type setting or CI step to get green. Work is done only when the leftovers are gone: debug logs, temp files, dead code, unused imports, stale docs. Run `git status` before stopping.
