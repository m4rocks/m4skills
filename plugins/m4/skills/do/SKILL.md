---
name: do
description: Use for any request to build, add, implement, make, change, update, refactor or wire up behavior in this repo, a tracker entry, several entries, or a plain sentence, including short ones like 'add X' or 'make it Y'. Skip for bugs (m4:fix) and one-line edits like a rename, typo or config value.
allowed-tools: Bash(node "${CLAUDE_PLUGIN_ROOT}/scripts/check.js" *)
hooks:
  Stop:
    - hooks:
        - type: command
          command: node "${CLAUDE_PLUGIN_ROOT}/scripts/check.js" gate
  PreToolUse:
    - matcher: "Edit|Write|MultiEdit|NotebookEdit"
      hooks:
        - type: command
          command: node "${CLAUDE_PLUGIN_ROOT}/scripts/check.js" guard
---

# m4:do

Before any other output or command, write one line: you are running m4:do, the features you'll build, and what you expect to touch.

A request that isn't in the tracker gets an entry, after asking through the structured question tool; if declined, build without one and use no `Closes` or `Refs` line. When the tests setting calls for tests and the repo has no test runner, ask before the first feature whether to add one, since that adds a dependency. If a feature seems to depend on unfinished work, say so in one line and continue.

## Own the outcome

You are judged by whether the user's problem goes away, not by whether the checklist is ticked. Before the first line of code, walk through the feature as its user: what they do first, what goes wrong, what they'll ask for next. When the request misses something they'll hit, or a clearly better approach exists, say so when you find it, with your recommendation, rather than in the final report.

Ask what CLAUDE.md says to ask, up to four ready questions per call. A new module, pattern or dependency, or a departure from how similar code works, is always one of them. So is narrowing scope: when part of the feature won't work somewhere the repo promises, such as a platform, a mode or existing data, or can't be built as the entry says, ask before building less.

## Each feature

1. Read the code the feature touches and find every place the change must reach, as CLAUDE.md describes, including every platform, target and mode the README and CLAUDE.md promise.
2. Read the golden file for this kind of code from CLAUDE.md, or when there is none, the closest code that does something like it, end to end. Build the feature in the same shape and reuse its helpers, so a reader can't tell the two were written apart. When the feature starts a kind of code later features will repeat, add its golden-files row.
3. Give the feature a check: one command that passes only when the feature works. When the tests setting calls for a test, or the user asked for one, write it as "Tests" describes. Otherwise, or with no cheap seam, use the closest real check, such as a script that runs the feature and diffs its output, a curl against a dev server, or the existing tests for this area. Run it and confirm it fails for the reason you predicted, quoting the failure, because a typo or import error also shows red.
4. Register the check (see "Checks"), then implement until it and the project's checks for this area pass, writing to the bar in "Shaping the code".
5. Use the feature the way its user would. For an app, CLI or server, launch it (the `run` skill covers how) and go through each behavior, including the empty and error paths. Name anything you couldn't exercise in the report as not verified.
6. Clear the check, check the behaviors off in the tracker, and commit per the commits setting with a message saying what the feature does. Stage files by name, only those this feature changed.

With a GitHub tracker, a commit that finishes every behavior in an issue ends with `Closes #N`, or `Refs #N` when the closing setting is "ask first". Partial work gets `Refs #N`. Never close a root issue that tracks others; that is the maintainer's call.

## Checks

A feature is finished by a command passing, not by the code looking done. Once the check fails for the right reason, register it:

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/check.js" set "<command>"
node "${CLAUDE_PLUGIN_ROOT}/scripts/check.js" freeze <test files the check runs>
```

While it is set, this skill's hooks rerun it whenever you try to end a turn, send you back with its output while it fails, and refuse edits to the frozen files. Pass it by building the behavior, never by special-casing its inputs or weakening the command.

When the check passes as you end a turn, the hook clears it. `check.js clear` does the same on demand, refusing while the check fails, so run it on its own. Before stopping to ask the user something, or when giving up on the feature, run `check.js clear --abandon` and say why. When a frozen test's expectation looks wrong, ask the user before abandoning the check to edit it.

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

The code you leave is:

- Correct at the edges: empty, zero, one, the last item, errors and timeouts, a second call while the first runs, and data written by older versions.
- Cheap where it runs often. Name what runs per frame, keystroke, item or request; there, nothing does I/O on the UI or request thread, nothing grows with all the data when it could grow with what changed, and nothing wakes up with no work to do. Code that runs once can stay simple.
- Readable by a newcomer: names say what things are, each function does one thing, each piece of state has one owner, and the flow can be followed from where it enters.
- Repeatable: the next feature of the same kind is added by following this one, shared logic lives in one place, and general code carries no special cases for this feature.

## Batches and commits

Features run one after another, each committed before the next starts. Stop at the first one you can't get to pass: abandon its check, leave it uncommitted and report what you tried, since later features may depend on it. When the context gets long, finish the current feature and suggest a fresh session for the rest; the commits and tracker carry over.

The request can override the commits setting for this run: "autonomous" or "commit and push everything" commits and pushes without asking, "ask" asks before each commit. When commits wait for the user, leave each feature uncommitted without asking; when they later say to commit, make one commit per feature where the files separate cleanly. In ask mode, show each passing feature's message and files and ask: commit, commit the rest of the batch too, or leave it.

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

End once, after the last feature. Lead with anything that doesn't work where the repo says it should, then what was built but not verified, keeping the two apart. For each feature, show its check command and the last lines of its passing run. Then list the commits, the tracker changes, the calls you made yourself, any disagreement with a decision the user made, and any risk. Close with one recommendation for what to do next, if any. Later turns follow whatever the user brings up.
