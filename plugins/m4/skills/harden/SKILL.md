---
name: harden
description: Make a mistake agents keep repeating in this repo impossible, enforcing the fix through structure, types, lint or tests instead of another instruction. Use when the user has corrected the same agent behavior more than once, or asks to harden the repo against recurring mistakes.
---

# m4:harden

Start with one line: you are running m4:harden, the mistakes you'll address, and that it may touch code, types, lint config and AGENTS.md.

## Find the mistake classes

Start from what the user describes, then look for more: reverts and fix-up commits in the git history, review comments, AGENTS.md rules nothing enforces, comments that explain workarounds. Group them into classes. A class counts once it has happened twice.

Assume the next contributor is an agent that sees only the files it opened, copies the nearest example, and takes the shortest path that compiles. The goal is a repo where a change that looks right from one file is right for the whole repo.

## Fix each class at the highest level that works

1. Structure: give each piece of state one owner and each task one supported way; hide internals so the wrong import fails; replace hand-synced lists with one source of truth; delete old patterns an agent would copy.
2. Types, so the wrong state can't be written.
3. A lint rule or CI check whose error message names the fix. If the pattern is already common, fail only on new occurrences.
4. A test of the behavior.
5. An AGENTS.md sentence, only for judgment calls nothing can check.

Adding a new tool or dependency is the maintainer's call, so ask before doing it.

Prove each new check fails on a real past instance of the mistake, then commit each class separately, per the commits setting.

## Keep the rule table

Record each rule and what enforces it in the enforced-rules table in AGENTS.md. Remove rules whose mistake can no longer happen, and replace any prose rule that a check now covers.

End by listing each class with its evidence, the level you chose, and why a higher level didn't work.
