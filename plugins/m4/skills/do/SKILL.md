---
name: do
description: Use for any request to build, add, implement, make, change, update, refactor or wire up behavior in this repo, a tracker entry, several entries, or a plain sentence, including short ones like 'add X' or 'make it Y'. Skip for bugs (m4:fix) and one-line edits like a rename, typo or config value.
---

# m4:do

Before any other output or command, write one line: you are running m4:do, the features you'll build, and what you expect to touch.

When the tests setting calls for tests and the repo has no test runner, ask before the first feature whether to add one, since that adds a dependency.

A request that isn't in the tracker gets an entry, then you build it. Ask first through the structured question tool before adding the entry, whether it's a GitHub issue or a PLAN.md line; if declined, build without one and use no `Closes` or `Refs` line. If a feature seems to depend on unfinished work, say so in one line and continue.

## Own the outcome

Build as if you'll be the one using the feature and answering for it. You are judged by whether the user's problem goes away, not by whether the entry's checklist is ticked.

Ask what CLAUDE.md says to ask, up to four ready questions per call rather than one at a time. A new module, pattern or dependency, or a departure from how similar code works, changes how the feature fits the codebase, so it is one of those questions.

Before the first line of code, walk through the feature as its user: what they do first, what goes wrong, what they'll ask for next. When the request misses something they'll hit, would solve the problem badly, or has a clearly better approach, say so and put it to the user through the structured question tool, with your recommendation first and the reason. Don't build what you think is wrong without saying so.

Keep doing this while you build. When you notice something the user would want to know, such as a gap, a better option or a problem the feature creates, raise it when you find it, not in the report at the end. If the user has to ask "what about X?" about something you already knew, you raised it too late.

## Each feature

Work through the features in the order given. For each:

1. Read the code it touches and find every place the change must reach, as CLAUDE.md describes. Also read what the repo promises: the README and CLAUDE.md for supported platforms, targets and modes, and how existing code branches on them, such as `cfg` attributes or platform modules. The feature works on every one of them unless the entry says otherwise.
2. Read the golden file for this kind of code from CLAUDE.md, or when there is none, the code in this repo that already does something like it, end to end: where its files live, how it names things, how it handles state, errors and I/O, how its UI is put together and how it is tested. Build the new feature in the same shape and reuse its helpers instead of writing new ones, so a reader can't tell the two were written apart. When the existing shape doesn't fit, ask before inventing a new one. When the feature starts a kind of code that later features will repeat, add its row to the golden-files table.
3. When the tests setting calls for a test, or the user asked for one, write a test that drives the new behavior through the public interface, following "Tests" below. Run it and confirm it fails for the reason you predicted, quoting the failure, because a typo or import error also shows red. When there's no cheap seam, name the closest real check you'll use instead and move on.
4. Implement until it passes, writing to the bar in "Shaping the code".
5. Run the checks the project has for this area: tests, type checker, linter.
6. Use the feature the way its user would. For an app, CLI or server, launch it (the `run` skill covers how) and go through each behavior in the entry, including the empty and error paths. Anything you couldn't exercise goes into the report by name as not verified.
7. Check the behaviors off in the tracker and commit per the commits setting, with a message saying what the feature does. Stage files by name, only those this feature changed, so other uncommitted work stays out of its commit.

With a GitHub tracker, when every behavior in the issue is checked off and its checks pass, end the commit message with a `Closes #N` line so merging closes the issue. When the closing setting is "ask first", write `Refs #N` instead. A feature left partly done, or an earlier feature in an issue that still has unchecked ones, gets `Refs #N`, never `Closes`. Never close a root issue that tracks others; it closes when its task list is complete, and that is the maintainer's call. PLAN.md entries have no issue to close.

When building shows that part of the feature won't work somewhere it should, such as a platform, a mode or an existing data case, or can't be built as the entry says, stop and ask through the structured question tool, recommending that you build it or saying why not. Narrowing scope is the user's decision, never something to report afterwards.

## Tests

A good test fails when the behavior breaks and keeps passing when the internals are restructured. Before writing one, name the production change that would make it fail, such as a wrong branch, a missing side effect, a wrong argument or a missed edge case. If you can't name one, test a behavior you can observe instead.

- Write expected values by hand, as literals or hand-checked fixtures. An expected value computed the way the code computes it, or with its helpers, passes whatever the code does.
- Test the behavior a decision drives, not the decision: "a failing call is retried five times and the sixth never happens", not `MAX_RETRIES == 5`. A test that fails only on deliberate changes sleeps through bugs.
- Assert on the real code, never on a mock. Mock only the slow or external layer, after learning which side effects of the real code the test relies on, and give the mock the full shape of the real data, because code that reads a field the mock left out passes the test and breaks in production.
- Code that only tests call lives in test utilities, not in production code.
- When a reference implementation exists, such as the code being ported or replaced, an official tool, or the previous version, compare outputs against it over many inputs. It finds more than any expected value written by hand.

Then picture realistic mistakes in the new code: a wrong constant, the wrong branch, a missing state change, an empty return, no validation for empty or malformed input. Some test should fail for each one; a mistake nothing catches marks behavior that is unprotected.

## Shaping the code

Start from the shape the golden file or closest existing code uses. When more than one design is reasonable and they differ in what a user or the next developer would see, put them to the user with your recommendation: the one that matches the codebase and whose correctness is most obvious. Otherwise pick that one yourself and say which.

Before creating a file, name the existing file that would otherwise hold this code and the line that will call the new one. When an existing file is the natural home, put the code there; when nothing will call it yet, don't create it.

The code you leave meets this bar:

- Correct at the edges: empty, zero, one, the last item, errors and timeouts, a second call while the first is running, and data written by older versions.
- Cost fits how often it runs. Name what runs per frame, tick, keystroke, item or request. There, nothing does I/O on the UI or request thread, nothing grows with all the data when it could grow with what's visible or what changed, nothing wakes up with no work to do, and events replace polling where the platform has them. Code that runs once can stay simple.
- Readable by a newcomer: names say what things are, each function does one thing at one level, each piece of state has one owner, and the flow can be followed from where it enters without chasing indirection.
- Scales with the codebase: the next feature of the same kind is added by following this one, not by copying and editing it. Shared logic lives in one place, and general code carries no special cases for this feature.

Moves that often get there:

- get the data shape right before writing logic
- parse input once where it enters, so inner code can trust it
- keep logic pure and pass in time, randomness and I/O, so it tests without mocks
- split a function that branches on a boolean flag into two
- inline a wrapper that has a single caller
- replace a chain of conditionals with a lookup table when the cases are data

## Batches

Several features run one after another in this session, each committed before the next starts. Stop at the first feature you can't get to pass: leave its changes uncommitted and report what you tried, because later features may depend on it.

If the session's context gets long, finish and commit the current feature, then suggest continuing the remaining entries in a fresh session; the commits and tracker carry everything over.

## Committing and pushing

The request can set the mode for this run, overriding the settings: "autonomous" or "commit and push everything" means commit and push without asking; "ask" means ask before each commit. Without that, the settings decide.

When commits happen only when the user says, leave each feature uncommitted, don't ask, and go on to the next. When the user later says to commit, make one commit per feature wherever the files separate cleanly.

In ask mode, when a feature passes, show its commit message and files and ask through the structured question tool: commit, commit this and the rest of the batch without asking, or leave it uncommitted. Then go on to the next feature.

## Pull requests

When the setting or the request calls for a pull request per batch: before the first feature, if you're on the default branch, create a branch named after the batch. After the last feature, push it and open a pull request with `gh pr create`, using this body:

```markdown
## Summary
<the smallest view that makes the change clear: pseudocode, a call tree, or a file tree>

## Evidence
<the failing test output before, the passing output after>

## Risk
<easy or hard to undo, and what could break>
```

With a GitHub tracker, end the body with one `Closes #N` line per fully finished issue, each on its own line because GitHub reads one issue per keyword. Use `Refs #N` for unfinished issues, and for all of them when the closing setting is "ask first". The commit lines are not enough on their own, since a squash merge drops them.

End once, after the last feature, with a report. Lead with anything that doesn't work where the repo says it should, then what was built but not verified, keeping the two apart. Then list the commits, the tracker changes, the calls you made yourself, anything else skipped or unchecked, any disagreement with a decision the user made, and any risk. Close with what you'd do next and why, if anything, as one recommendation, not a menu. That report closes m4:do; later turns follow whatever the user brings up next.
