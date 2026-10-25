---
name: m4do
description: Build one or more features end to end, test-first where the repo's settings call for it, committing each. Use when the user asks to implement, add or change something whose desired behavior is known, whether that is a tracker entry, several entries, or a plain sentence.
---

# m4do

Before any other output or command, write one line: you are running m4do, the features you'll build, and what you expect to touch.

When the tests setting calls for tests and the repo has no test runner, ask before the first feature whether to add one, since that adds a dependency.

A request that isn't in the tracker gets an entry, then you build it. If a feature seems to depend on unfinished work, say so in one line and continue.

## Each feature

Work through the features in the order given. For each:

1. Read the code it touches and find every place the change must reach: callers, tests, fixtures, config, exports.
2. When the tests setting calls for a test, or the user asked for one, write a test that drives the new behavior through the public interface. Run it and confirm it fails for the reason you predicted, quoting the failure, because a typo or import error also shows red. When there's no cheap seam, name the closest real check you'll use instead and move on; a test that mostly tests mocks is worse than none.
3. Implement until it passes.
4. Run the checks the project has for this area: tests, type checker, linter.
5. Check the behaviors off in the tracker and commit per the commits setting, with a message saying what the feature does. Stage only the files this feature changed; other uncommitted work stays out of its commit.

A good test fails when the behavior breaks and keeps passing when the internals are restructured. A test whose expected value is computed the way the code computes it proves nothing; take expected values from the requirement.

## Shaping the code

For anything beyond a trivial change, consider more than one design and pick the one whose correctness is most obvious. Moves that often get there:

- get the data shape right before writing logic
- parse input once where it enters, so inner code can trust it
- keep logic pure and pass in time, randomness and I/O, so it tests without mocks
- split a function that branches on a boolean flag into two
- inline a wrapper that has a single caller
- replace a chain of conditionals with a lookup table when the cases are data

When a better structure would make this feature simpler, use it. When the redesign is bigger than the feature, build the feature and add the redesign to the tracker with a one-line reason.

## Batches

Several features run one after another in this session, each committed before the next starts. Stop at the first feature you can't get to pass: leave its changes uncommitted and report what you tried, because later features may depend on it.

If the session's context gets long, finish and commit the current feature, then suggest continuing the remaining entries in a fresh session; the commits and tracker carry everything over.

## Pull requests

When the pull requests setting is one per batch: before the first feature, if you're on the default branch, create a branch named after the batch. After the last feature, push it and open a pull request with `gh pr create`, using this body:

```markdown
## Summary
<the smallest view that makes the change clear: pseudocode, a call tree, or a file tree>

## Evidence
<the failing test output before, the passing output after>

## Risk
<easy or hard to undo, and what could break>
```

End by listing the commits, the tracker changes, anything skipped or unchecked, and any risk.
