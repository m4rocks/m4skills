---
name: do
description: Use for any request to build, add, implement, make, change, update, refactor or wire up behavior, a tracker entry, several entries, or a plain sentence, including short ones like 'add X' or 'make it Y'. Skip for bugs (m4:fix) and one-line edits like a rename, typo or config value.
---

# m4:do

Before any other output or command, write one line: you are running m4:do, the features you'll build, and what you expect to touch, naming any repo besides this one.

Read `../../principles.md` and `../../code.md` from this skill's folder and follow them: they hold the settings and rules every m4 skill shares, and this file wins where they differ.

When the tests setting calls for tests and the repo has no test runner, ask before the first feature whether to add one, since that adds a dependency. Narrowing scope is always a question: when part of the feature won't work somewhere the repo promises, such as a platform, a mode or existing data, or can't be built as the entry says, ask before building less.

## Short path

A small, local change, one that touches no public name, API, schema or documented behavior, skips steps 1, 2 and 6 below and takes screenshots only when what the user sees changes. It still gets a check that fails first (step 4) and passes after (step 5).

## Each feature

1. Before the first line of code, walk through the feature as its user: what they do first, what goes wrong, what they'll ask for next. Read the code the feature touches, and cover every platform, target and mode the README and CLAUDE.md promise.
2. Find everything the change reaches, including places the request doesn't mention and other repos as "Related repos" in `code.md` describes, and say in a line what you found.
3. Read the golden file for this kind of code, or when there is none, the closest code that does something like it. When the feature starts a kind of code later features will repeat, name the file they should copy in the report.
4. Give the feature a check: one command that passes only when the feature works. When the tests setting calls for a test, or the user asked for one, write it as "Tests" describes. Otherwise, or with no cheap seam, use the closest real check, such as a script that runs the feature and diffs its output, a curl against a dev server, or the existing tests for this area. Run it and confirm it fails for the reason you predicted, because a typo or import error also shows red. When the feature changes what the user sees and the harness can drive the app or a browser, take one before screenshot of the affected view now, since it can't be taken once the code has changed. When it claims to be faster or lighter, measure the current code on realistic data, such as a dev server seeded like a real install, so the after numbers have something to compare against.
5. Implement until the check and the project's checks for this area pass (see "Checks"), writing to the bar in "Shaping the code".
6. Use the feature the way its user would. For an app, CLI or server, launch it and go through each behavior, including the empty and error paths. Take the after screenshot from the same place as the before one; record a short clip only when the change is motion or timing a still can't show. For a performance claim, run the old and new code alternately on the same data, several runs each, and keep the numbers. Name anything you couldn't exercise in the report as not verified.
7. Check the behaviors off in the tracker, and commit and push per the settings and what the maintainer has said this session, with a message saying what the feature does. Stage only the files this feature changed. With a GitHub tracker, a commit that finishes every behavior in an issue ends with `Closes #N`, or `Refs #N` when the closing setting is "ask first"; partial work gets `Refs #N`. Never close a root issue that tracks others; that is the maintainer's call.

## Checks

A feature isn't finished until its check passes, however done the code looks. Treat the check as a sample of the inputs the feature will meet, not the whole set: make it pass by building the behavior, never by special-casing its inputs, weakening the command or editing the test to match the code. The same goes for whatever else judges the change, such as a lint rule, a type setting or a CI step: when the feature needs one of them changed, ask first and show the edit. Before calling the feature done, try two or three inputs the check doesn't cover, such as empty input or the last item, and add any that fail to the test.

When a feature the user called done fails its check, finishing it is the task, not a question.

## Tests

A good test fails when the behavior breaks and survives a restructuring of the internals. Before writing one, name the production change that would make it fail, such as a wrong branch, a missing side effect or a missed edge case; if you can't, test something you can observe instead.

- Write expected values by hand. A value computed the way the code computes it passes whatever the code does.
- Test the behavior a decision drives, not the decision: "a failing call is retried five times and the sixth never happens", not `MAX_RETRIES == 5`.
- Assert on the real code, never on a mock. Mock only the slow or external layer, and give the mock the full shape of the real data, because code that reads a field the mock left out passes the test and breaks in production.
- Code only tests call lives in test utilities.
- When a reference implementation exists, such as the code being replaced, an official tool or the previous version, compare outputs against it over many inputs, generated or sampled from real use. Ignore differences that don't matter, such as whitespace, and list the ones that are meant.
- When something must hold for every input, test that property and let the repo's property-testing library generate the inputs, since they aren't picked with the bias of whoever wrote the code. Decoding what was encoded gives back the input, running a migration twice equals running it once, an optimized path matches the simple one, a balance never goes below zero.

Then picture realistic mistakes in the new code: a wrong constant, the wrong branch, a missing state change, an empty return, missing validation. Some test should fail for each.

## Climbing a number

When the goal is a number rather than a pass, such as speed, size, cost or how often a prompt or heuristic gets it right, climb it one change at a time. Measure the starting point several times first, so you know how far the number moves by chance; a gain smaller than that isn't a gain. Each round, read what failed or ran slow, make the one change that addresses its cause, and measure again. Keep the change when the number improves by more than chance and revert it otherwise.

When the number comes from a set of cases, set some aside at random before the first round and never read them. A change is kept only when the set-aside cases improve too, because a rule shaped around the cases you read scores well on them and nowhere else; for the same reason, never copy a failing case into the prompt or the code. When two or three rounds bring nothing, stop changing things and sort the remaining failures by cause, since some will be a wrong case or a wrong check. Report the start and the end with their spread, and say so when the gain is within chance.

## Shaping the code

When more than one design is reasonable and they differ in what a user or the next developer would see, put them to the user with your recommendation: the one that matches the codebase and whose correctness is most obvious. Otherwise pick that one and say which.

Before creating a file, name the existing file that would otherwise hold the code and the line that will call the new one. When an existing file is the natural home, use it; when nothing will call the code yet, don't write it.

Keep the code cheap where it runs often. Name what runs per frame, keystroke, item or request; there, nothing does I/O on the UI or request thread, nothing grows with all the data when it could grow with what changed, and nothing wakes up with no work to do. Code that runs once can stay simple.

## Batches and commits

Features run one after another, each committed before the next starts. Stop at the first one you can't get to pass: leave it uncommitted and report what you tried, since later features may depend on it.

When commits wait for the user, leave each feature uncommitted without asking; when they later say to commit, make one commit per feature where the files separate cleanly. In ask mode, show each passing feature's message and files and ask: commit, commit the rest of the batch too, or leave it. When the maintainer names a branch a repo doesn't have, ask once which to use and keep the answer.

When the setting or the request calls for a pull request per batch, branch off the default branch before the first feature, then push and open it with `gh pr create` after the last, with this body and one `Closes #N` or `Refs #N` line per issue, since a squash merge drops the commit lines:

```markdown
## Summary
<the problem in a sentence or two, then how this fixes it, with the smallest view that makes the change clear: pseudocode, a call tree, or a file tree>

## Evidence
<the check failing before and passing after; before and after screenshots for visible changes; measured numbers for performance claims>

## Risk
<what could break, and how to undo the change: the revert, the flag to turn off, or the migration to run back>
```

`gh` can't attach images, so put screenshots where the maintainer can open them and say in the report where they are. Don't commit them to the branch, since they'd ship with the code.

After opening it, wait on the checks quietly as the principles show, then read what review bots posted. Handle each finding as "Findings" in `code.md` says, push, and wait again, with no status messages between rounds. Stop when the checks pass on the latest commit and no bot finding is left unanswered, after three rounds that don't converge, or when a finding needs a product decision.

Stop and wait for the maintainer only when nothing can move without them, or before a step nothing they've said allows.

## Report

Write the report once, after the last feature. Open with anything that waits on the maintainer, such as a decision that is theirs, with your recommendation. Then anything that doesn't work where the repo says it should, then what was built but not verified, keeping the two apart. For each feature, give its check command and that it passed. Then list the commits and pushes by repo, anything left uncommitted or unpushed, the places the change reached, the tracker changes, the calls you made yourself, any disagreement with a decision the user made, and any risk.
