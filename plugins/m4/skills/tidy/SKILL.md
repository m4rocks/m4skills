---
name: tidy
description: Use when the user says tidy, clean up, polish or simplify a diff, branch or PR, including code a person wrote, or hands over review comments or findings to address. Skip unprompted after the agent's own changes.
---

# m4:tidy

Open with one line: you're running m4:tidy, and the diff you'll work on: what the user named, else the uncommitted changes, else the branch against the default branch. Touch only its files.

Read `../../principles.md` and `../../code.md` from this folder in one parallel call, unless they're already in context since the last compaction.

m4:tidy cleans up and works through findings; it doesn't hunt bugs. When asked for a review, say once that `/code-review` finds bugs better and its findings can come back here.

## Cleanup

Fix these directly without changing behavior: what-comments, debris, defensive code on paths that can't fail, one-caller wrappers and unused options, reimplemented helpers, departures from the golden file, deep nesting, and names unlike their surroundings. Before a cleanup that changes a contract or removes a check, read the callers. A cleanup that would change behavior becomes a finding.

## Findings and review comments

- Read all of them first, and ask about unclear ones before changing anything.
- Check each against the code. Drop findings without a concrete failing case, and say so.
- Before building something out as a comment asks, check that anything calls it; if nothing does, propose removing it.
- Ask which to fix in one multi-select question, with your recommendation.
- Fix the chosen ones most severe first, everywhere the diff repeats the mistake, with a targeted check for each.
- Answer each review comment with what changed or why not, without thanks.

Run the full checks once at the end. Leave changes uncommitted unless told to commit this work. End with what you cleaned up, what you fixed, what the user declined, what was pre-existing and what you couldn't check.
