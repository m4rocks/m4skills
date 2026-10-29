---
name: setup
description: Set up m4 for this repo, change its standing rules for tracker, tests, commits, pushes and subagents, or refresh a CLAUDE.md written by an older m4. Interviews you, then writes CLAUDE.md.
disable-model-invocation: true
---

# m4:setup

Start with one line: you are running m4:setup, and it will touch CLAUDE.md, possibly AGENTS.md, and possibly create PLAN.md.

## Look before asking

Find out what the repo already answers, so the interview only covers real choices:

- language, package manager, test runner, type checker, linter, formatter
- whether AGENTS.md, CLAUDE.md, `.claude/CLAUDE.md` or CLAUDE.local.md exist, and what they say
- the git remote, and whether `gh auth status` succeeds
- an existing PLAN.md, or open GitHub issues
- the kinds of code the repo repeats, such as routes, components, commands, tests or migrations, and for each the file that best shows how most of the repo does it

For each kind, when one convention covers 95% or more of its files, that convention wins and its clearest example becomes the golden file. When the split is closer, it is a question for the interview, showing a path for each side. A small repo where three files go one way and two the other has no majority either.

## Interview

Ask in rounds with the harness's structured question tool when it has one; otherwise ask one question per message with numbered options. Put the recommended option first and say why in its description. Skip any question the repo already settled.

1. Workflow: tracker (PLAN.md, or GitHub issues when the remote is GitHub and `gh` works), tests (always, when a cheap test seam exists, only when asked), commits (only when the user says, one per feature without asking, or one per feature asking before each). Say plainly in each option whether the agent will commit or ask on its own.
2. Collaboration: pushes and pull requests (only when the user says, a pull request per batch without asking, or ask before pushing), closing issues (GitHub tracker only: allowed or ask first), subagents (only when asked, or allowed for read-only exploration), and who else works here (solo, or people who don't use agents), which sets how much the project sentence and README must explain.
3. Finish: a one-sentence description of the project, confirmed or corrected; the golden-files table, with each convention split as its own question; and, when the stack has a linter that can catch comments explaining what code does, whether to set that rule up.

Recommend "when a cheap test seam exists", commits and pushes only when the user says, and subagents only when asked.

## Write

Fill `claude-template.md` from this skill's folder: keep the tracker variant that matches, drop the commands paragraph when the repo's scripts already say everything, drop the closing-issues setting for the PLAN.md tracker, write the settings as plain values, and fill the golden-files table with the confirmed rows, leaving it empty when the repo has no repeated kinds yet. Show the result and write it on approval.

Write to `CLAUDE.md` at the repo root, or to `.claude/CLAUDE.md` when that is where the repo keeps it. When it already exists, keep the user's own sections and replace only the sections the template owns.

On a re-run, change the settings that moved, then compare the template-owned prose in CLAUDE.md with this version of `claude-template.md`, since repos set up with an older m4 keep the old text. When they differ, show the changes section by section and ask in one multi-select question which sections to refresh, recommending all. A refresh replaces only the template's prose: settings values, filled tables such as golden files and enforced rules, and every section the user wrote stay as they are. Add any section the template has gained, such as Golden files, as part of the refresh.

When AGENTS.md exists, carry its rules into CLAUDE.md and drop any `@AGENTS.md` import, so each rule has one home. Ask before deleting AGENTS.md, since other tools may still read it.

For the PLAN.md tracker, create PLAN.md if it doesn't exist:

```markdown
# Plan

One heading per feature: a line or two on what and why, then a checklist of behaviors. Check items off as the code does them; the code and the maintainer decide what is true.
```

If the user chose the lint rule, add it to the linter config and record it in the enforced-rules table.

When the commits setting commits without asking, commit the files m4:setup wrote on their own; otherwise leave them uncommitted without asking.

End by listing the files you wrote and the settings you chose.
