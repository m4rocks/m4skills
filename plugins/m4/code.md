# m4 code rules

The m4 skills that change code read this file after `principles.md`.

## Code

Aim for code that is obviously correct to a newcomer, since the next reader won't have this session's context and may not use an agent. Rank choices by correctness, then how easily the code reads and tests, then size; a one-liner that needs decoding is not simple.

Build only what was asked: features, options and configuration nobody requested wait until someone needs them. Before writing new code, look for it in this repo, then the standard library and platform, then installed dependencies. New code takes the shape of its golden file, or of the closest code that does something similar when its kind has none; when neither fits, ask before inventing a new shape.

Before editing, find every place the change must reach: callers, tests, fixtures, config, exports, the docs and version pins that use or describe it, and paths that must stay in step, such as a mock or sandbox mode beside production, each platform, and both sides of a feature flag. Finish all of them. When a better structure would make the task simpler, propose it; when it is bigger than the task, do the task and offer the redesign as a tracker entry with a one-line reason. Keep validation of untrusted input, error handling that prevents data loss, security and accessibility, including in code you move.

Comments explain why something non-obvious is true, such as a known limit and when it will matter. When code needs a comment to say what it does, rename or restructure it instead. Leave existing comments in code you don't change. New logic that can break quietly (branches, parsers, money, security, data writes, bug fixes) ships with a test that fails when it breaks. When a test fails, fix the code, or ask if the test's expectation looks wrong.

Leave nothing behind but the change: no summary files, commented-out code, debug logs or session scripts. Update the README in the same commit when user-visible behavior changes, and any line in CLAUDE.md or REVIEW.md that the change makes false.

## Related repos

Other repos are part of the work only when the change touches something they could use or describe: a public name, an API, a schema, a CLI flag or documented behavior. Only then look for them, in CLAUDE.md, the README and the manifests, and in folders beside this one whose remote is in the same org, and search them for what you changed. Before editing one, read its CLAUDE.md, since only this repo's loads on its own, and fetch first, because a local checkout can be days behind. Work from its default branch or the branch the maintainer named, through `git worktree add` when its checkout is dirty or on another branch, since another session may be working there.

## Golden files

A golden file shows how this repo does one kind of code it repeats, such as a route, a component, a command, a test or a migration. New code of that kind copies its file layout, naming, error handling, state, UI, tests and helpers, so the same job is always done the same way. Use the row in CLAUDE.md's golden-files table when there is one. Otherwise list the files of that kind: when one convention covers 95% or more of them, its clearest example is the golden file, and when the split is closer, ask which to follow, with a path for each side.

## Findings

A finding, from a reviewer, a bot or a person, holds only when you can name a concrete case where the code fails. Fix one that holds in every place the change makes the same mistake, so the next round doesn't find them one at a time. A bug the change didn't introduce is pre-existing: report it and leave it, so the diff stays the size of the goal. Put rejected findings and human comments in the report instead of replying on GitHub, because a reply is public.

## Review-time rules

Rules a reviewer can check from a diff live in REVIEW.md at the repo root, which Claude Code's code review reads at review time, so they don't load in every session. When CLAUDE.md has an enforced-rules table, it lists every rule and what enforces it; keep it true.
