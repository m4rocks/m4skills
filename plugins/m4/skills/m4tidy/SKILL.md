---
name: m4tidy
description: Review and clean up a diff before it is committed or merged, fixing clarity problems directly and raising correctness issues for the user to pick. Use when the user asks to review, tidy, clean up or check changes, including code a person wrote.
---

# m4tidy

Start with one line: you are running m4tidy, and the diff you're reviewing, whose files are the only ones it will touch. The diff is what the user named, otherwise the uncommitted changes, otherwise the current branch against the default branch.

Read the diff, then the code around it: callers of every changed function, what it calls, its tests. A change can break code it doesn't touch, so when a signature, return value or behavior changes, check every caller.

## Correctness

Look in this order: wrong results and missed edge cases (empty, zero, last item, time zones), security and data loss, behavior under the load the project expects, risky logic without a test, real slowness. Each finding needs a concrete case: this input or situation leads to this wrong result. Without a case, it isn't a finding.

Fixing these changes behavior, so ask the user which to fix in one multi-select question through the harness's structured question tool when it has one, each option naming the problem and its case; otherwise list them numbered and ask. Fix the ones chosen.

## Clarity

Fix these directly, keeping behavior the same:

- comments that say what code does: rename or restructure until they aren't needed
- comments narrating the change, commented-out code, debug logs, leftover files
- defensive checks and try/catch on paths that can't fail, casts that silence the type checker
- wrappers with one caller, options nobody sets, flexibility nothing uses
- code that reimplements a helper this repo already has
- deep nesting that early returns would flatten
- names and patterns that differ from the surrounding code

If the diff belongs to a tracker entry, check that it does what the entry says, and mention any gap.

Run the project's checks afterwards. Leave your changes uncommitted, and end by listing what you fixed, what the user chose not to fix, and what you couldn't check.
