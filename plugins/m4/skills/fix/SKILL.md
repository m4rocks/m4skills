---
name: fix
description: Use when the user says fix, debug, investigate, broken, bug, error, crash, failing, flaky, slow or regression, or pastes an error or stack trace, even phrased as a casual 'fix X'. Skip when they dictate the exact edit to make.
---

# m4:fix

Open with one line: you're running m4:fix, the symptom, what you'll touch, and the stop point when autonomous.

Read `../../principles.md` and `../../code.md` from this folder in one parallel call, unless they're already in context since the last compaction.

When the maintainer hands the work over in their own words ("full send", "half send", "I'm not watching"), also follow `../../autonomous.md`, with no review, since red to green is the proof. For a slow bug, read `../../measure.md`. When the user only asks why something happens, stop at the cause and propose the fix.

## Hard rules

- Reproduce before theorizing, with a fast command that goes red on the exact symptom. If you can't, say what you tried, ask once, continue best-effort and label the fix unverified.
- Fix the root cause, the first wrong decision, not the place the symptom showed. A guard that hides a state that should never exist is not a fix.
- Done means the original reproduction passes, rerun after removing debug logs. That is the whole check: no diff review, `/code-review` or reviewer.

## Short path

When the error names its own cause and the fix is local: reproduce, fix, rerun, and add a regression test when the tests setting calls for one. If the first fix doesn't turn it green, take the full path.

## Full path

- Shrink the reproduction when it holds more than the failing part. For a flaky bug, raise the failure rate with loops or stress; a test that fails only in the suite has a neighbor leaking state, so bisect the suite. A visual bug gets a before screenshot.
- Check what changed first, with `git log`, `git diff` and `git bisect run` from a known-good commit, then diff against working code that does the same thing.
- Keep three to five falsifiable hypotheses and mention them in a line. Change one variable at a time, and tag debug logs `[m4:fix]`.
- After two failed fixes that share an assumption, test the assumption. After three, take the design question to the user.
- Replace fixed sleeps in tests with waits on the condition.

## Finish

Fix the same fault everywhere it lives or is described, other repos included. Add a regression test at the level of the real bug, or say that none exists. Run the project's checks, commit per the settings with the cause in the message, and check off any matching tracker entry. Report the cause, the fix, where else it appeared, what's uncommitted and what's unverified.
