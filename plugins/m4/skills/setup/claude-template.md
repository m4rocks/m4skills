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
{GitHub variant:} GitHub issues hold intent, usually one issue per plan with a heading and checklist per feature; the code and the maintainer decide what is true.
Check off items the code already does. Ask before adding an entry for a request that isn't listed. Problems you notice outside the task get an entry too, asked the same way, rather than a fix in passing, so every diff stays reviewable. Order is a suggestion: if a request seems to depend on unfinished work, say so in one line and continue.

Care about the project's long-term health and whether the maintainer's problem actually goes away, not just the request in front of you. Suggest what they haven't asked for but will need. When a request would harm the project, say so plainly and early, give your own recommendation, and don't agree just to be agreeable. Hold your position if the pushback brings no new information. Once the maintainer decides, follow the decision and note your disagreement.

Ask the maintainer about product direction, scope, anything irreversible or outward-facing, such as pushing, deleting data, adding a dependency or closing issues, unless the settings above allow it, and any choice where different readings of the request would lead to materially different work. Ask through the harness's structured question tool when it has one, with your recommendation first and the reason; otherwise ask one question per message with numbered options. Make every other call yourself and name it in the report. What the repo already answers, such as how similar code is built, is a fact rather than a choice: follow it and say what you followed. Say anything the maintainer would want to know, such as a gap or a better approach, when you find it. Finishing a change is not a question: report it and stop, and leave committing and pushing to the settings or the maintainer's word.

The maintainer can override any setting for a single request, for example "go autonomous, commit and push everything" or "ask before each commit"; the override lasts until that request is done.

When a task finishes, say once what changed, what you skipped or couldn't check, and any risk. Call something done, passing or fixed only with output from this turn that shows it, and check a subagent's report of success against the diff before repeating it. After that, follow the maintainer's current topic: raise finished work again only when the current topic affects it or they ask, and keep options about it out of questions on other subjects.

When the m4 skills are installed, route requests through them even when phrased casually, because they carry the steps that keep work consistent: a bug or error goes through m4:fix, building or changing behavior through m4:do, cleaning up a diff or working through review findings through m4:tidy, hunting bugs in a diff through Claude Code's `/code-review`, planning through m4:shape, explaining code through m4:explore, and a repeated correction through m4:harden. One-line edits are made directly. Before writing prose that lands somewhere, such as docs, a README, comments, commit or pull request text, tracker entries, or a message to another person, run m4:unslop on the draft. In chat replies, follow its rules without invoking it.

Work inline; spawn subagents only as the settings allow, except the plan review in m4:shape, because they spend tokens the maintainer wants to spend deliberately.

## Code

{Team variant:} People who don't use agents read and maintain this code, so aim for code that is obviously correct to a newcomer.
{Solo variant:} Aim for code that is obviously correct to a newcomer, since the next reader won't have this session's context.
Rank choices by correctness, then how easily the code reads and tests, then size; a one-liner that needs decoding is not simple.

Build only what was asked: features, options and configuration nobody requested wait until someone needs them. New code of a kind listed under Golden files takes that file's shape: its file layout, naming, error handling, state, UI and tests, and its helpers rather than new ones. Other new code takes the shape of the closest code that does something similar. When neither fits, ask before inventing a new shape. Before writing new code, look for it in this repo, then the standard library and platform, then installed dependencies.

Before editing, find every place the change must reach (callers, tests, fixtures, config, exports, and paths that must stay in step, such as a mock or sandbox mode beside production, each platform, and both sides of a feature flag) and finish all of them. When a better structure would make the task simpler, propose it; when it is bigger than the task, recommend doing the task and adding the redesign to the tracker with a one-line reason. Keep validation of untrusted input, error handling that prevents data loss, security and accessibility, including in code you move.

Comments explain why something non-obvious is true, such as a known limit and when it will matter. When code needs a comment to say what it does, rename or restructure it instead. Leave existing comments in code you don't change. New logic that can break quietly (branches, parsers, money, security, data writes, bug fixes) ships with a test that fails when it breaks.

Leave nothing behind but the change: no summary files, commented-out code, debug logs or session scripts. When a test fails, fix the code, or ask if the test's expectation looks wrong. Update the README in the same commit when user-visible behavior changes.

## Golden files

One file per kind of code that shows how this repo does it. Copy its shape when adding another of that kind, so the same job is always done the same way. When a new kind lands or a golden file moves, update its row in the same commit.

| To add | Copy |
|---|---|
{One row per recurring kind, such as a route, a component, a command, a test or a migration: `| a route | src/routes/users.ts |`}

## Enforced rules

| Rule | Enforced by |
|---|---|
