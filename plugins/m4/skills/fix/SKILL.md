---
name: fix
description: Use whenever the user says fix, debug, broken, bug, doesn't work, error, crash, failing, flaky, slow or regression, or pastes an error or stack trace, even phrased as a casual 'fix X'. Skip only when they dictate the exact edit to make.
---

# m4:fix

Start with one line: you are running m4:fix, the symptom as you understand it, and that it will touch code, tests and commits.

## Reproduce

Build a command that goes red on the user's exact symptom before forming theories: a failing test, a script, a curl against a dev server, a CLI run diffed against expected output, or against a reference implementation such as the previous version or an official tool when one exists. Make it fast and deterministic. For a flaky bug, raise the reproduction rate with loops, stress or pinned timing until it fails often enough to work with. A test that passes alone and fails in the suite usually has a neighbor leaving state behind: bisect the suite to find it.

Then shrink it: remove inputs, steps and config one at a time, rerunning after each, until every remaining piece is needed for the failure.

When you can't reproduce it, say what you tried and ask once for what's missing: steps, logs, an environment, a captured request. Then continue best-effort and label the fix unverified.

## Find the cause

Look at what changed first: `git log` and `git diff` on the files involved, and when a known-good commit exists, `git bisect run` with the reproduction. Then find code in this repo that does the same thing and works, and list every difference between the two, however small.

List three to five hypotheses, each with a prediction that would prove it wrong ("if X is the cause, changing Y makes the bug disappear"). Mention the list in a line, since the user may know which one to rule out, and keep going.

Test one variable at a time. Prefer a debugger or REPL; otherwise add logs at the boundaries that tell hypotheses apart, each tagged `[m4:fix]` so they can all be found and removed.

When two fixes that share an assumption have failed, test the assumption itself before a third fix. After three failed fixes, stop and put the design question to the user with your recommendation: when each fix reveals a new problem somewhere else, the structure is usually wrong, not the latest hypothesis.

When a test waits with a fixed sleep or timeout, replace it with a wait on the condition it needs, unless the timing itself is what's being tested.

The root cause is the first place the code made a wrong decision, not where the symptom showed. If the state that broke things is legitimate, the code that mishandled it is the cause, and handling it there is the fix. If the state should never exist, find what produced it; a guard where it surfaced only hides the bug.

## Fix

Fix the cause, then search for the same fault elsewhere and fix those too. Turn the shrunk reproduction into a regression test at a level that exercises the real bug pattern; if no such level exists, say so, since that is a finding about the code's structure. Rerun the original reproduction, remove every `[m4:fix]` log, run the project's checks, and commit per the commits setting with the cause stated in the message.

If the bug matches a tracker entry, check it off. End by stating the cause, the fix, where else it appeared, and anything unverified.
