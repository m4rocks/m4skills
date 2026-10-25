---
name: m4init
description: Set up or update this repo's AGENTS.md through a short interview about tracker, tests, commits, pull requests and subagents. Use when starting to use m4 in a project, or when the user wants to change how agents work in this repo.
---

# m4init

Start with one line: you are running m4init, and it will touch AGENTS.md, possibly CLAUDE.md, and possibly create PLAN.md.

## Look before asking

Find out what the repo already answers, so the interview only covers real choices:

- language, package manager, test runner, type checker, linter, formatter
- whether AGENTS.md, CLAUDE.md, `.claude/CLAUDE.md` or CLAUDE.local.md exist, and what they say
- the git remote, and whether `gh auth status` succeeds
- an existing PLAN.md, or open GitHub issues

## Interview

Ask in rounds with the harness's structured question tool when it has one; otherwise ask one question per message with numbered options. Put the recommended option first and say why in its description. Skip any question the repo already settled.

1. Workflow: tracker (PLAN.md, or GitHub issues when the remote is GitHub and `gh` works), tests (always, when a cheap test seam exists, only when asked), commits (one per feature, ask before committing, none).
2. Collaboration: pull requests (one per batch from a branch, or none), closing issues (GitHub tracker only: allowed or ask first), subagents (only when asked, or allowed for read-only exploration), and who else works here (solo, or people who don't use agents), which sets how much the project sentence and README must explain.
3. Finish: a one-sentence description of the project, confirmed or corrected; and, when the stack has a linter that can catch comments explaining what code does, whether to set that rule up.

Recommend "when a cheap test seam exists", "one per feature", no pull requests for a solo repo without a remote, and subagents only when asked.

## Write

Fill `agents-template.md` from this skill's folder: keep the tracker variant that matches, drop the commands paragraph when the repo's scripts already say everything, drop the closing-issues setting for the PLAN.md tracker, and write the settings as plain values. Show the result and write it on approval.

When AGENTS.md already exists, keep the user's own sections and replace only the sections the template owns. On a re-run, change only the settings that moved.

Claude Code reads AGENTS.md only when no CLAUDE.md, `.claude/CLAUDE.md` or CLAUDE.local.md exists in the working directory or above. When one exists, add a line `@AGENTS.md` to it, and move its rules into AGENTS.md if the user agrees. Tell the user that creating a CLAUDE.local.md later stops Claude Code from reading AGENTS.md.

For the PLAN.md tracker, create PLAN.md if it doesn't exist:

```markdown
# Plan

One heading per feature: a line or two on what and why, then a checklist of behaviors. Check items off as the code does them; the code and the maintainer decide what is true.
```

If the user chose the lint rule, add it to the linter config and record it in the enforced-rules table.

End by listing the files you wrote and the settings you chose.
