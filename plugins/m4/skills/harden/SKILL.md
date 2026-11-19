---
name: harden
description: Use when the user corrects the same agent behavior a second time ('again', 'I told you', 'stop doing X'), asks to harden the repo or make a mistake impossible, or asks for a retro. Skip for a first correction, which is simply fixed.
---

# m4:harden

Open with one line: you're running m4:harden, the mistakes or the session you'll address, and that it may touch code, types, lint config, REVIEW.md and CLAUDE.md.

Read `../../principles.md` and `../../code.md` from this folder in one parallel call, unless they're already in context since the last compaction. For a retro, also follow `retro.md` beside this file.

## Find the mistake classes

Start from what the user describes. When they ask to harden the repo without naming a mistake, also look at recent reverts and fix-ups (`git log --oneline -300 | grep -iE 'revert|fixup|fix'`), review comments, unenforced CLAUDE.md rules and workaround comments. A class counts once it has happened twice.

For each class, find what led the agent there: what it read, copied, followed or missed. Confirm that against the files, and fix the context as well as the code. Assume the next agent sees only the files it opens and copies the nearest example, so a change that looks right from one file should be right for the whole repo.

## Fix each class at the highest level that works

1. Structure: one owner per piece of state, one supported way per task, internals the wrong import can't reach, one source of truth, old patterns deleted. For a wrong example that got copied, point the golden-files row at the right file and propose moving the minority files.
2. Types that make the wrong state unwritable.
3. A lint rule or CI check whose error names the fix, reusing an existing check first. For a common pattern, fail only on new occurrences.
4. A test.
5. A REVIEW.md line for a judgment call that shows in a diff, saying the trigger, what to check and the mistake behind it.
6. A CLAUDE.md sentence, only for what must be known while writing and nothing above can catch.

Write each rule for the class, not the instance. Ask before adding a tool or dependency. Prove each new check fails on a real past instance, then commit each class separately per the settings.

Keep CLAUDE.md's enforced-rules table, adding it if missing: each rule and what enforces it. Remove rules whose mistake can no longer happen, and propose deleting any rule whose prevented failure nobody can name.

End with each class, its evidence, the level you chose and why a higher one didn't work, and after a retro, the candidates that weren't picked.
