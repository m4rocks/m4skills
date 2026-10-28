---
name: tidy
description: Use when the user says review, tidy, clean up, check, look over or polish changes, a diff, a branch or a PR, including code a person wrote, or hands over review comments to address. Skip unprompted after the agent's own changes.
---

# m4:tidy

Start with one line: you are running m4:tidy, and the diff you're reviewing, whose files are the only ones it will touch. The diff is what the user named, otherwise the uncommitted changes, otherwise the current branch against the default branch.

When the diff was written earlier in this session, say once that a fresh session or Claude Code's `/code-review` will catch more, because this context shares the assumptions that wrote the code. Then continue here if the user wants.

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

## Review comments

When the user hands over review comments, from a person or a bot, treat each one as a claim to check, not an order.

- Read them all first. When any item is unclear, ask about it before changing anything, since items are often related.
- Check each against the code: whether it is right for this codebase, whether it breaks something, and whether the current code has a reason.
- When a comment asks to build something out properly, search for its callers first; when nothing uses it, propose removing it instead.
- When a comment is wrong for this code, answer with the evidence. Take disagreements about design to the user.
- Fix the accepted items one at a time, most severe first, running the checks after each.
- Answer each comment with what changed, or why not. Leave out thanks and praise; the fix shows the comment was heard.

Run the project's checks afterwards. Leave your changes uncommitted, and end by listing what you fixed, what the user chose not to fix, and what you couldn't check.
