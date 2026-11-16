---
name: do
description: Use for any request to build, add, implement, make, change, update, refactor or wire up behavior, a tracker entry, several entries, or a plain sentence, including short ones like 'add X' or 'make it Y'. Skip for bugs (m4:fix) and one-line edits like a rename, typo or config value.
---

# m4:do

Before any other output or command, write one line: you are running m4:do, the features you'll build, and what you expect to touch, naming any repo besides this one.

When CLAUDE.md has no m4 settings, skip the tracker, write tests where a cheap seam exists, commit and push on the maintainer's word, and mention `/m4:setup` once in the report. Check off behaviors in the tracker, and change nothing else there on your own. A request with no entry is built without one and with no `Closes` or `Refs` line. Create an entry or open an issue only when the maintainer asked for it in this session or answered yes to a question that showed its text, since an issue is public. The same goes for follow-ups and problems you notice: they go in the report, not the tracker. When the tests setting calls for tests and the repo has no test runner, ask before the first feature whether to add one, since that adds a dependency. Ask up to four ready questions per call. Narrowing scope is always a question: when part of the feature won't work somewhere the repo promises, such as a platform, a mode or existing data, or can't be built as the entry says, ask before building less.

## Each feature

1. Before the first line of code, walk through the feature as its user: what they do first, what goes wrong, what they'll ask for next. Read the code the feature touches, and cover every platform, target and mode the README and CLAUDE.md promise.
2. Find everything the change reaches, including places the request doesn't mention. Search for the names you're changing here and in every repo the project mentions in CLAUDE.md, the README or the manifests, or keeps beside this one. Clients, docs, examples and version pins that use or describe the old behavior are part of this feature, because they go wrong the moment it ships. Say in a line what you found. In another repo, read its CLAUDE.md before editing, since only this repo's loads on its own, and fetch first, because a local checkout can be days behind. Work from its default branch or the branch the maintainer named. When its checkout is dirty or on another branch, use `git worktree add` rather than switching it, because another session may be working there.
3. Read the golden file for this kind of code end to end, or when there is none, the closest code that does something like it. When the feature starts a kind of code later features will repeat, add its golden-files row.
4. Give the feature a check: one command that passes only when the feature works. When the tests setting calls for a test, or the user asked for one, write it as "Tests" describes. Otherwise, or with no cheap seam, use the closest real check, such as a script that runs the feature and diffs its output, a curl against a dev server, or the existing tests for this area. Run it and confirm it fails for the reason you predicted, quoting the failure, because a typo or import error also shows red. When the feature changes what the user sees, and the harness can drive the app or a browser, capture a before screenshot now, since it can't be taken once the code has changed. When it claims to be faster or lighter, measure the current code on realistic data, such as a dev server seeded like a real install, so the after numbers have something to compare against.
5. Implement until the check and the project's checks for this area pass (see "Checks"), writing to the bar in "Shaping the code".
6. Use the feature the way its user would. For an app, CLI or server, launch it and go through each behavior, including the empty and error paths. Capture the after screenshot from the same place as the before one, and a short recording when the change is motion or timing, because a reviewer can judge those faster than they can read the diff. For a performance claim, run the old and new code alternately on the same data, several runs each, and keep the numbers. Name anything you couldn't exercise in the report as not verified.
7. Check the behaviors off in the tracker, and commit and push per the settings and what the maintainer has said this session, with a message saying what the feature does. Write the title in the repo's existing title style; when it has none, use a conventional prefix and the outcome a user would notice, like `fix(web): new threads no longer spike CPU`. Stage files by name, only those this feature changed.

With a GitHub tracker, a commit that finishes every behavior in an issue ends with `Closes #N`, or `Refs #N` when the closing setting is "ask first". Partial work gets `Refs #N`. Never close a root issue that tracks others; that is the maintainer's call.

## Checks

A feature isn't finished until its check passes, however done the code looks. Treat the check as a sample of the inputs the feature will meet, not the whole set: make it pass by building the behavior, never by special-casing its inputs, weakening the command or editing the test to match the code. Before calling the feature done, try two or three inputs the check doesn't cover, such as empty input or the last item, and add any that fail to the test.

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

What the maintainer says about delivery holds for the rest of the session. "Commit and push to next" covers every later fix and every repo this work reached, so they don't have to repeat it. It goes as far as their words: "commit" alone isn't a push, and a branch they didn't name is still a question. When a repo has no such branch, ask once which to use and keep the answer.

When the setting or the request calls for a pull request per batch, branch off the default branch before the first feature, then push and open it with `gh pr create` after the last, with this body and one `Closes #N` or `Refs #N` line per issue, since a squash merge drops the commit lines:

```markdown
## Summary
<the problem in a sentence or two, then how this fixes it, with the smallest view that makes the change clear: pseudocode, a call tree, or a file tree>

## Evidence
<the failing check output before, the passing output after; before and after screenshots or a recording for visible changes; measured numbers for performance claims>

## Risk
<easy or hard to undo, and what could break>
```

`gh` can't attach images, so put screenshots and recordings where the maintainer can open them and say in the report where they are. Don't commit them to the branch, since they'd ship with the code.

After opening it, wait on `gh pr checks --watch`, then read what review bots posted. Fix each finding that holds up, meaning you can name a concrete case where the code fails, push, and wait again, with no status messages between rounds. Stop when the checks pass on the latest commit and no bot finding is left unanswered, after three rounds that don't converge, or when a finding needs a product decision. List the findings you rejected and any human comments in the report instead of replying on GitHub, because a reply is public.

## Before you stop

Picture the maintainer's next message. If it would be "you forgot X" or "now push that", do that first. Run `git status -sb` in every repo you touched, so nothing meant to ship stays uncommitted or unpushed; a branch with no upstream counts as unpushed. Two endings make them repeat themselves: a report that announces the next step without taking it, and an offer to do what they already told you to do. Stop and wait only when nothing can move without them, or before a step nothing they've said allows.

## Report

Write the report once, after the last feature. Lead with anything that doesn't work where the repo says it should, then what was built but not verified, keeping the two apart. For each feature, show its check command and the last lines of its passing run. Then list the commits and pushes by repo, anything left uncommitted or unpushed, each place the change reached or why it needed nothing, the tracker changes, the calls you made yourself, any disagreement with a decision the user made, and any risk. Close with a recommendation only for a decision that is theirs. Later turns follow whatever the user brings up.
