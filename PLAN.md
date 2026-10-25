# m4skills plan

A small Claude Code skillset: predictable skills, a lean AGENTS.md, agents that maintain the repo like its owner would. Installed as a Claude Code plugin.

## Skill conventions

Rules every skill follows, so nothing runs that the user didn't expect.

- [x] No skill invokes another skill
- [x] Opens by naming itself and what it will touch; ends with what changed, what was skipped or unchecked, and any risk
- [x] Auto-triggerable: descriptions are precise routing text with non-overlapping triggers, one sentence each
- [x] No tool names; "the harness's structured question tool when it has one", falling back to one question per message
- [x] Subagents only when AGENTS.md or the user allows them
- [x] Short verbs invoked as `/m4:<verb>`, none matching a Claude Code built-in (hence `setup` and `shape`, not `init` and `plan`)
- [x] Written to `prompt-audit` and `writing-for-agents`: reasons beside rules, positive phrasing, no caps or MUST, nothing the model does by default, nothing the environment already says

## AGENTS.md template

The always-loaded file `m4:setup` generates, written as prose with reasons, not bullets.

- [x] Settings block: tracker, tests, commits, PRs, subagents
- [x] Working here: tracker is advisory intent; check off what the code already does; add unlisted requests and noticed problems as entries; plan order is a suggestion, never a reason to refuse
- [x] Ask only about product direction, scope, and irreversible or outward-facing actions; decide everything reversible and report
- [x] Code: obviously correct to a newcomer; rank correctness, then readability and testability, then size
- [x] YAGNI on what gets built, open about how; weigh more than one shape for non-trivial logic; reuse order: repo, stdlib and platform, installed dependencies
- [x] Find every place a change must reach and finish all of them; better structure that simplifies the task goes in, bigger redesigns go to the plan with a reason
- [x] Never cut: validation of untrusted input, data-loss error handling, security, accessibility
- [x] Comments say why, including known limits; restructure instead of what-comments; leave others' comments alone
- [x] Risky logic (branches, parsers, money, security, data writes, bug fixes) ships with a test
- [x] No debris; fix code rather than tests; README updated with user-visible changes
- [x] Enforced-rules table, filled by `m4:harden`

## m4:setup

Use when: a new repo, or the user's preferences changed. Touches AGENTS.md, an `@AGENTS.md` line in an existing CLAUDE.md, and an empty PLAN.md in file mode.

- [x] Detect first: stack, test runner, formatter, existing AGENTS.md or CLAUDE.md, git remote; skip questions the repo already answers
- [x] Multistep structured questions, recommended option first: tracker (PLAN.md or GitHub), tests default, commits, PRs, subagents, auto-close issues in GitHub mode, contributor profile
- [x] Offer a lint rule or hook for the comment policy when the stack has one
- [x] Add only commands the agent can't discover from the repo
- [x] Show the draft, write on approval, update its own section in place on re-runs
- [x] Claude Code skips AGENTS.md when any CLAUDE.md or CLAUDE.local.md exists: add the import and warn about CLAUDE.local.md
- [x] Won't create doc folders, labels, or overwrite the user's sections

## m4:shape

Use when: shaping an idea into features. Touches the tracker only.

- [x] Read relevant code first; finding facts is the agent's job
- [x] Rounds of up to four independent structured questions, recommended option first, worded so "yes" accepts it
- [x] Done when no open decisions remain; one entry per feature with a short description and checklist
- [x] Reconcile on re-runs: check off what the code already does
- [x] Won't create ticket-per-task, dependency graphs, spikes, or write code

## m4:do

Use when: the user knows what to build, one entry, several, or a sentence. Touches code, tests, tracker, commits.

- [x] Per feature: test per the tests setting, confirm it fails for the predicted reason, implement, run project checks, check off, commit
- [x] Vertical slices through public interfaces; a test must fail when behavior breaks and survive internal changes; no cheap seam means the closest real check, stated
- [x] Design moves: data shape first, parse at the boundary, pass in clock and I/O, split flag-driven functions, inline one-caller wrappers
- [x] Batch runs inline, one commit per feature, stops at the first feature that can't go green
- [x] Unlisted request: add the entry and proceed
- [x] PR mode: work on a branch, open a PR after the batch with summary, before/after evidence, risk
- [x] Won't call reviewers, refuse over ordering, or push outside PR mode

## m4:fix

Use when: something is broken and the cause is unknown. Touches code, tests, tracker, commits.

- [x] Reproduce with a command before theorising; minimise to the smallest failing case
- [x] Rank 3-5 falsifiable hypotheses; after two failed fixes sharing a premise, test the premise
- [x] Fix the first wrong decision, then the same fault elsewhere; guards only for legitimate states
- [x] Regression test; tagged debug logs removed; cause stated in the commit message
- [x] Can't reproduce: say what was tried, ask once, continue best-effort

## m4:explore

Use when: unfamiliar code, or "how does X work". Touches nothing.

- [x] Explain structure, flow and conventions in chat
- [x] Offer to add discovered conventions to AGENTS.md
- [x] Won't write docs

## m4:tidy

Use when: before committing or merging a diff, including human-written ones. Touches only the diff's files.

- [x] Check in order: correct, safe, holds under real load, tested, fast, lean; a finding needs a concrete failing case
- [x] Fix slop directly: what-comments, needless defensive code, one-caller wrappers, debris
- [x] Check callers outside the diff
- [x] Behavior-changing findings go to the user as one multi-select question
- [x] Won't widen scope or write a report file

## m4:harden

Use when: the user corrected the agent for the same thing twice. Touches code, types, lint config, AGENTS.md.

- [x] Find recurring mistake classes from the user's input and git history
- [x] Fix each at the highest level that works: structure, types, a lint whose error names the fix, a test, an AGENTS.md line last
- [x] Record each rule with its enforcer in the AGENTS.md table; drop rules whose mistake can no longer happen

## Packaging

Skills live in `plugins/m4/skills/`. No hooks, no always-on context file.

- [x] Claude Code: `.claude-plugin/plugin.json` and `marketplace.json`; install with `/plugin marketplace add` then `/plugin install m4@m4skills`
- [x] Keep manifests to required fields so versions can't drift
- [x] README: install lines, the skill table, what each skill won't do

## Verification

- [ ] Run `/claude-api prompt-audit` over the skills and the AGENTS.md template
- [x] Install in Claude Code and run setup, shape and do end to end on a real repo
- [ ] Re-run after the renames and first-run fixes
