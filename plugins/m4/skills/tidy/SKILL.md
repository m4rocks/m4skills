---
name: tidy
description: Use when the user says tidy, clean up, polish or simplify changes, a diff, a branch or a PR, including code a person wrote, or hands over review comments or review findings to address. Skip unprompted after the agent's own changes.
---

# m4:tidy

Start with one line: you are running m4:tidy, and the diff you're working on, whose files are the only ones it will touch. The diff is what the user named, otherwise the uncommitted changes, otherwise the current branch against the default branch.

m4:tidy cleans up and works through review findings; it doesn't hunt for bugs. When the user asked for a review, say once that Claude Code's `/code-review` finds bugs better, in reviewers that never saw the code being written, and that its findings can come back here. Then do the cleanup.

## Cleanup

Read the diff, then the callers of every changed function, so a cleanup can't break code outside it. Fix these directly, keeping behavior the same:

- comments that say what code does: rename or restructure until they aren't needed
- comments narrating the change, commented-out code, debug logs, leftover files
- defensive checks and try/catch on paths that can't fail, casts that silence the type checker
- wrappers with one caller, options nobody sets, flexibility nothing uses
- code that reimplements a helper this repo already has, or departs from the golden file for its kind
- deep nesting that early returns would flatten
- names and patterns that differ from the surrounding code

When a cleanup would change behavior, it is a finding instead.

## Findings and review comments

Findings include review comments from a person or a bot, `/code-review` output, and anything the cleanup turned up. Treat each as a claim to check, not an order.

- Read them all first. When any item is unclear, ask about it before changing anything, since items are often related.
- Check each against the code: whether it holds for this codebase, whether fixing it breaks something, whether the current code has a reason. A finding needs a concrete case, this input leads to this wrong result; without one, say so and drop it.
- When a comment asks to build something out properly, search for its callers first; when nothing uses it, propose removing it instead.
- Fixing a finding changes behavior, so ask which to fix in one multi-select question through the structured question tool, each option naming the problem and its case, with your recommendation. Take disagreements about design to the user, with the evidence.
- Fix the chosen items one at a time, most severe first, running the checks after each.
- Answer each review comment with what changed, or why not. Leave out thanks and praise; the fix shows the comment was heard.

If the diff belongs to a tracker entry, check that it does what the entry says, and mention any gap.

Run the project's checks afterwards. Leave your changes uncommitted, and end by listing what you cleaned up, what you fixed, what the user chose not to fix, and what you couldn't check.
