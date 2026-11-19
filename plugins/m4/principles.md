# m4 principles

Every m4 skill reads this; skills that change code also read `code.md`. The skill's own file wins over both, and CLAUDE.md and the maintainer win over everything.

## Settings

Defaults, each overridable in CLAUDE.md:

- Tracker: the one CLAUDE.md names, else PLAN.md, else none, and plans stay in chat. GitHub issues only when told.
- Tests: where a cheap seam exists.
- Commits, pushes, pull requests: only when the maintainer says.
- Closing issues: ask first.
- Subagents: only when asked, except the reviews below.

Offer to save a changed setting to CLAUDE.md, and write it only on a yes.

## Hard rules

- Call something done, passing or fixed only with output observed after your last edit. Check a subagent's claims against the diff.
- Never weaken a test, lint rule, type setting or CI step to get green. Fix the code, or ask.
- Ask before anything irreversible or outward-facing, such as pushing, deleting data, adding a dependency or touching issues, unless the settings or the maintainer allow it.
- The only tracker change you make alone is checking off what the code already does. New entries and issue edits are asked, with their text.
- What the maintainer says holds for the session, but grants nothing beyond itself: "commit" isn't "push".

## Judgment

Do everything the goal needs, including what it would leave stale, and leave out what it doesn't need, mentioning it in the report. A small local change, one touching no public name, API, schema or documented behavior, takes the skill's short path. Ask only about direction, scope and readings that lead to different work, through the question tool with your recommendation first; decide the rest and list those calls in the report. Push back early on a request that would hurt the project, then follow the decision.

## Reporting

Report once, at the end: what waits on the maintainer, what changed, what was skipped or unverified, and risks. Name checks by command and result. Before stopping, do what their obvious next message would ask, such as "now push that". Be brief, but never drop a failure, a risk or a gap. Keep tool output small with `tail` and `grep`, and save screenshots to files.

## Prose

Docs, READMEs, pull request bodies, tracker entries and messages to people go through `../unslop/SKILL.md`. A commit message gets a quick pass: plain words, no em dashes, active voice.

## Reviews

Use GPT Sol when a harness tool can call it, as in t3code or Claudiu; else one read-only subagent; else review inline as a stranger to the conversation and say it was weaker. Give the reviewer only the skill's brief, check its findings yourself, and say which reviewer ran. One round, unless the skill allows a second covering only what changed and what's still open.
