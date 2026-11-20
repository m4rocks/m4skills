---
name: do
description: Use when the user asks to build, add, implement, change or refactor something, says they want something to work differently ('I want X to...', 'make X do Y'), carries out a task or finishes work in progress, or hands the work over ('full send', 'half send'), including short asks. Skip for bugs and investigations (m4:fix) and one-line renames or typos.
---

# m4:do

Open with one line: you're running m4:do, the features, what you'll touch (naming other repos), and the stop point when autonomous.

Read `../../principles.md` and `../../code.md` from this folder in one parallel call, unless they're already in context since the last compaction.

When the maintainer hands the work over in their own words ("full send", "half send", "I'm not watching"), also follow `../../autonomous.md`. When a change claims to be faster or lighter, or the goal is a number, read `../../measure.md` before the first edit. When you open a pull request, read `../../pr.md`.

## Each feature

1. Understand it as its user would, and read the code it touches. Cover every platform and mode the repo promises, and find everything the change reaches.
2. Read the golden file.
3. Give it a check: one command that passes only when the feature works. Use a test when the tests setting calls for one, else the closest real check. Watch it fail for the reason you predicted. For a visible change, save a before screenshot now.
4. Implement until the check and the area's checks pass.
5. Use it as its user would, including the empty and error paths, and take the after screenshot, driving the app from the shell when computer-use tools are missing. Open each screenshot with Read and compare it with what you expected; one you haven't looked at proves nothing, and a mismatch is a bug to fix. Report what you couldn't exercise as unverified.
6. Check off the tracker, and commit and push per the settings, staging only this feature's files. With GitHub issues, use `Closes #N` when every behavior is done, `Refs #N` when partial or when closing is "ask first", and never close a root issue.

A small local change skips the walkthrough, the reach search and step 5, but keeps the check that fails first.

## Hard rules

- Pass the check by building the behavior, never by special-casing inputs or editing the test to fit. Try a few inputs it doesn't cover before calling the feature done.
- Ask before building less than asked, or adding a test runner the repo lacks.
- A batch stops at the first feature that won't pass: leave it uncommitted and report.

## Tests

Test behavior through the real code. Write expected values by hand, mock only slow or external layers and give mocks the real data's shape, and keep test-only code in test utilities. Use a reference implementation or property tests when they fit. Each test should fail for a realistic mistake you can name.

## Shaping the code

When designs differ in what users or the next developer see, ask with a recommendation; otherwise pick the one that matches the codebase. Before creating a file, name the existing file that would otherwise hold the code and the line that will call it. Keep hot paths, the code that runs per frame, keystroke, item or request, free of blocking I/O and of work that grows with all the data.

## Commits and pull requests

When commits wait for the user, leave features uncommitted, then make one commit per feature when asked. For a pull request per batch, branch first and open it after the last feature.

## Report

Report as the principles say, keeping what's broken apart from what's unverified. Give each feature's check command and result, commits and pushes by repo, what's left uncommitted, and where the change reached.
