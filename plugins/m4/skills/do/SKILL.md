---
name: do
description: Use for any request to build, add, implement, make, change, update, refactor or wire up behavior in this repo, a tracker entry, several entries, or a plain sentence, including short ones like 'add X' or 'make it Y'. Skip for bugs (m4:fix) and one-line edits like a rename, typo or config value.
---

# m4:do

Before any other output or command, write one line: you are running m4:do, the features you'll build, and what you expect to touch.

When the user declines a tracker entry for an unlisted request, build without one and use no `Closes` or `Refs` line. When the tests setting calls for tests and the repo has no test runner, ask before the first feature whether to add one, since that adds a dependency. Ask up to four ready questions per call. Narrowing scope is always a question: when part of the feature won't work somewhere the repo promises, such as a platform, a mode or existing data, or can't be built as the entry says, ask before building less.

## Each feature

1. Before the first line of code, walk through the feature as its user: what they do first, what goes wrong, what they'll ask for next. Read the code the feature touches, and cover every platform, target and mode the README and CLAUDE.md promise.
2. Read the golden file for this kind of code end to end, or when there is none, the closest code that does something like it. When the feature starts a kind of code later features will repeat, add its golden-files row.
3. Give the feature a check: one command that passes only when the feature works. When the tests setting calls for a test, or the user asked for one, write it as "Tests" describes. Otherwise, or with no cheap seam, use the closest real check, such as a script that runs the feature and diffs its output, a curl against a dev server, or the existing tests for this area. Run it and confirm it fails for the reason you predicted, quoting the failure, because a typo or import error also shows red.
4. Implement until the check and the project's checks for this area pass (see "Checks"), writing to the bar in "Shaping the code".
5. Use the feature the way its user would. For an app, CLI or server, launch it and go through each behavior, including the empty and error paths. Name anything you couldn't exercise in the report as not verified.
6. Check the behaviors off in the tracker, and commit per the commits setting with a message saying what the feature does. Stage files by name, only those this feature changed.

With a GitHub tracker, a commit that finishes every behavior in an issue ends with `Closes #N`, or `Refs #N` when the closing setting is "ask first". Partial work gets `Refs #N`. Never close a root issue that tracks others; that is the maintainer's call.

## Checks

A feature is finished when its check passes, not when the code looks done. Treat the check as a sample of the inputs the feature will meet, not the whole set: make it pass by building the behavior, never by special-casing its inputs, weakening the command or editing the test to match the code. Before calling the feature done, try two or three inputs the check doesn't cover, such as empty input or the last item, and add any that fail to the test.

Output from before your last edit doesn't count as passing. When a feature the user called done fails its check, finishing it is the task, not a question. When a test's expectation looks wrong, ask the user rather than change it.

## Tests

A good test fails when the behavior breaks and survives a restructuring of the internals. Before writing one, name the production change that would make it fail, such as a wrong branch, a missing side effect or a missed edge case; if you can't, test something you can observe instead.

- Write expected values by hand. A value computed the way the code computes it passes whatever the code does.
- Test the behavior a decision drives, not the decision: "a failing call is retried five times and the sixth never happens", not `MAX_RETRIES == 5`.
- Assert on the real code, never on a mock. Mock only the slow or external layer, and give the mock the full shape of the real data, because code that reads a field the mock left out passes the test and breaks in production.
- Code only tests call lives in test utilities.
- When a reference implementation exists, such as the code being replaced, an official tool or the previous version, compare outputs against it over many inputs.

Then picture realistic mistakes in the new code: a wrong constant, the wrong branch, a missing state change, an empty return, missing validation. Some test should fail for each.

## Shaping the code

When more than one design is reasonable and they differ in what a user or the next developer would see, put them to the user with your recommendation: the one that matches the codebase and whose correctness is most obvious. Otherwise pick that one and say which.

Before creating a file, name the existing file that would otherwise hold the code and the line that will call the new one. When an existing file is the natural home, use it; when nothing will call the code yet, don't write it.

Keep the code cheap where it runs often. Name what runs per frame, keystroke, item or request; there, nothing does I/O on the UI or request thread, nothing grows with all the data when it could grow with what changed, and nothing wakes up with no work to do. Code that runs once can stay simple.

## Batches and commits

Features run one after another, each committed before the next starts. Stop at the first one you can't get to pass: leave it uncommitted and report what you tried, since later features may depend on it.

When commits wait for the user, leave each feature uncommitted without asking; when they later say to commit, make one commit per feature where the files separate cleanly. In ask mode, show each passing feature's message and files and ask: commit, commit the rest of the batch too, or leave it.

When the setting or the request calls for a pull request per batch, branch off the default branch before the first feature, then push and open it with `gh pr create` after the last, with this body and one `Closes #N` or `Refs #N` line per issue, since a squash merge drops the commit lines:

```markdown
## Summary
<the smallest view that makes the change clear: pseudocode, a call tree, or a file tree>

## Evidence
<the failing check output before, the passing output after>

## Risk
<easy or hard to undo, and what could break>
```

## Report

Write the report once, after the last feature. Lead with anything that doesn't work where the repo says it should, then what was built but not verified, keeping the two apart. For each feature, show its check command and the last lines of its passing run. Then list the commits, the tracker changes, the calls you made yourself, any disagreement with a decision the user made, and any risk. Close with one recommendation for what to do next, if any. Later turns follow whatever the user brings up.
