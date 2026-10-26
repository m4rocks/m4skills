# CLAUDE.md

{One sentence: what this project is and who uses it.}

{Commands an agent can't discover from the repo, such as a test run that needs an env var. Omit this paragraph when there are none.}

## Settings

- Tracker: {PLAN.md | GitHub issues in owner/repo}
- Tests: {always | when a cheap test seam exists | only when asked}
- Commits: {only when the maintainer says | one per feature, without asking | one per feature, ask before each}
- Pushes and pull requests: {only when the maintainer says | one pull request per batch from a branch, without asking | ask before pushing}
- Closing issues: {allowed | ask first}
- Subagents: {only when the maintainer asks | allowed for read-only exploration}

## Working here

{PLAN.md variant:} PLAN.md holds intent, one heading per feature with a checklist; the code and the maintainer decide what is true.
{GitHub variant:} GitHub issues hold intent, one issue per feature with a checklist in its body; the code and the maintainer decide what is true.
Check off items the code already does. Add entries for requests that aren't listed, and for problems you notice outside the task, rather than fixing those in passing, so every diff stays reviewable. Order is a suggestion: if a request seems to depend on unfinished work, say so in one line and continue.

Ask the maintainer about product direction, scope, and anything irreversible or outward-facing, such as pushing, deleting data, adding a dependency or closing issues, unless the settings above allow it. Ask through the harness's structured question tool when it has one, recommended option first; otherwise ask one question per message with numbered options. Decide everything reversible yourself and report it. Ask a question only when you can't continue without a decision. Finishing a change is not such a point: report it in a line or two and stop, and leave committing and pushing to the settings or the maintainer's word.

The maintainer can override any setting for a single request, for example "go autonomous, commit and push everything" or "ask before each commit"; the override lasts until that request is done.

When a task finishes, say once what changed, what you skipped or couldn't check, and any risk. After that, follow the maintainer's current topic: raise finished work again only when the current topic affects it or they ask, and keep options about it out of questions on other subjects.

When the m4 skills are installed, route requests through them even when phrased casually, because they carry the steps that keep work consistent: a bug or error goes through m4:fix, building or changing behavior through m4:do, reviewing a diff through m4:tidy, planning through m4:shape, explaining code through m4:explore, and a repeated correction through m4:harden. One-line edits are made directly.

Work inline; spawn subagents only as the settings allow, because they spend tokens the maintainer wants to spend deliberately.

## Code

People who don't use agents read and maintain this code, so aim for code that is obviously correct to a newcomer. Rank choices by correctness, then how easily the code reads and tests, then size; a one-liner that needs decoding is not simple.

Build only what was asked: features, options and configuration nobody requested wait until someone needs them. How the requested thing is built is open. For non-trivial logic, weigh more than one shape and pick the one whose correctness is most obvious, even if it is unconventional. Before writing new code, look for it in this repo, then the standard library and platform, then installed dependencies.

Before editing, find every place the change must reach (callers, tests, fixtures, config, exports) and finish all of them. When a better structure would make the task simpler, use it in this change; when it is bigger than the task, do the task and add the redesign to the tracker with a one-line reason. Keep validation of untrusted input, error handling that prevents data loss, security and accessibility, including in code you move.

Comments explain why something non-obvious is true, such as a known limit and when it will matter. When code needs a comment to say what it does, rename or restructure it instead. Leave existing comments in code you don't change. New logic that can break quietly (branches, parsers, money, security, data writes, bug fixes) ships with a test that fails when it breaks.

Leave nothing behind but the change: no summary files, commented-out code, debug logs or session scripts. When a test fails, fix the code, or ask if the test's expectation looks wrong. Update the README in the same commit when user-visible behavior changes.

## Enforced rules

| Rule | Enforced by |
|---|---|
