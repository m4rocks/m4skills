# m4skills plan

A small Claude Code skillset: predictable skills, a lean CLAUDE.md, agents that maintain the repo like its owner would. Installed as a Claude Code plugin.

## Skill conventions

Rules every skill follows, so nothing runs that the user didn't expect.

- [x] No skill invokes another skill
- [x] Opens by naming itself and what it will touch; ends with what changed, what was skipped or unchecked, and any risk
- [x] Model-invocable except `setup`, which writes CLAUDE.md and runs only when the user types it: each description opens with the plain words users type (fix, add, review), then when to skip, so common verbs still route. Descriptions name triggers, not steps, because an agent that reads a summary of the steps may follow it instead of the body (from superpowers' `writing-skills`)
- [x] No tool names; "the harness's structured question tool when it has one", falling back to one question per message
- [x] Subagents only when CLAUDE.md or the user allows them
- [x] Short verbs invoked as `/m4:<verb>`, none matching a Claude Code built-in (hence `setup` and `shape`, not `init` and `plan`)
- [x] Written to `prompt-audit` and `writing-for-agents`: reasons beside rules, positive phrasing, no caps or MUST, nothing the model does by default, nothing the environment already says

## CLAUDE.md template

The always-loaded file `m4:setup` generates, written as prose with reasons, not bullets.

- [x] Settings block: tracker, tests, commits, PRs, subagents
- [x] Working here: tracker is advisory intent; check off what the code already does; unlisted requests and noticed problems become entries after asking; plan order is a suggestion, never a reason to refuse
- [x] Ask only about product direction, scope, irreversible or outward-facing actions, and choices where readings of the request lead to materially different work; make every other call and name it in the report
- [x] Claims of done, passing or fixed carry output from the same turn; a subagent's success is checked against the diff
- [x] Chat with the maintainer is direct, honest and brief, grammar dropped where meaning survives, never at the cost of a failure, risk, skipped step, gap or disagreement; explanations take the space they need. Unslop's rule against over-compression applies to prose that lands somewhere, not to chat
- [x] Code: obviously correct to a newcomer; rank correctness, then readability and testability, then size
- [x] YAGNI on what gets built, open about how; reuse order: repo, stdlib and platform, installed dependencies
- [x] Golden files table: one file per recurring kind of code to copy, kept current in the same commit (from ECC's `inherit-legacy-style`)
- [x] Find every place a change must reach, parallel paths included (mock or sandbox mode, platforms, both sides of a flag), and finish all of them; better structure that simplifies the task goes in, bigger redesigns go to the plan with a reason
- [x] Values and project facts live in the template, procedure in the skills, so no rule is loaded twice
- [x] Never cut: validation of untrusted input, data-loss error handling, security, accessibility
- [x] Comments say why, including known limits; restructure instead of what-comments; leave others' comments alone
- [x] Risky logic (branches, parsers, money, security, data writes, bug fixes) ships with a test
- [x] No debris; fix code rather than tests; README updated with user-visible changes
- [x] Routing line: send casual requests ("fix X") through the matching m4 skill
- [x] Enforced-rules table, filled by `m4:harden`

## m4:setup

Use when: a new repo, or the user's preferences changed. Touches CLAUDE.md, and an empty PLAN.md in file mode.

- [x] Detect first: stack, test runner, formatter, existing CLAUDE.md or AGENTS.md, git remote; skip questions the repo already answers
- [x] Scan repeated kinds of code for golden files: a convention covering 95% or more wins, closer splits are asked with a path for each side
- [x] User-invoked only (`disable-model-invocation`), so its description costs no context
- [x] Multistep structured questions, recommended option first: tracker (PLAN.md or GitHub), tests default, commits, PRs, subagents, auto-close issues in GitHub mode, contributor profile, which picks the template's team or solo line on who reads the code
- [x] Offer a lint rule or hook for the comment policy when the stack has one
- [x] Add only commands the agent can't discover from the repo
- [x] Show the draft, write on approval, update its own section in place on re-runs
- [x] Re-runs also diff the template-owned prose against the current template and offer a per-section refresh, so repos set up with an older m4 get fixes; settings values, filled tables and the user's sections stay
- [x] Writes CLAUDE.md; an existing AGENTS.md's rules move into it, and deleting AGENTS.md is asked first
- [x] Won't create doc folders, labels, or overwrite the user's sections

## m4:shape

Use when: shaping an idea into features. Touches the tracker only.

- [x] Read relevant code first; finding facts is the agent's job
- [x] Rounds of every ready decision through the structured question tool, recommended option first, worded so "yes" accepts it
- [x] Every decision in the plan, details included, is the user's answer or approval; facts that drive a decision are shown in the question
- [x] Done when every branch of the decision tree is visited and nothing is assumed; only the user ends it early
- [x] Shows the reviewed entries verbatim and writes only after approval; one entry per feature with a short description and checklist
- [x] Reconcile on re-runs: check off what the code already does
- [x] Won't create ticket-per-task, dependency graphs, spikes, or write code

## m4:do

Use when: the user knows what to build, one entry, several, or a sentence. Touches code, tests, tracker, commits.

- [x] Per feature: test per the tests setting, confirm it fails for the predicted reason, implement, run project checks, check off, commit
- [x] Vertical slices through public interfaces; a test must fail when behavior breaks and survive internal changes; no cheap seam means the closest real check, stated
- [x] Batch runs inline, one commit per feature, stops at the first feature that can't go green
- [x] Builds for every platform, target and mode the repo promises; a scope cut found mid-build is asked, never reported after
- [x] Final report leads with what doesn't work where it should, then what wasn't verified
- [x] Asks what CLAUDE.md says to ask, up to four questions per call; narrowing scope is always asked. Rules the template already carries (unlisted requests, raising gaps, golden-file shape, output from this turn, readability, setting overrides) are not repeated in the skill, so nothing loads twice
- [x] New code follows the golden file, or the closest existing feature, and reuses its helpers; departing from it is asked
- [x] Before creating a file, names the file that would otherwise hold the code and the line that will call it (from ECC's `gateguard`)
- [x] Code is written to a bar of cost on hot paths, and inputs the check doesn't cover are tried before done; per feature, after the checks, it is used as its user would. No separate re-review step, since current models over-verify when told to
- [x] Tests name the break they catch, use hand-written expected values, test behavior rather than decisions, never assert on mocks, keep test-only code in test utilities, compare against a reference implementation when one exists, and end with a mental mutation check (from superpowers' `writing-good-tests`)
- [x] Checks, not guesses: each feature gets one command that passes only when it works. The check is a sample of the inputs, not the whole set: pass it by building the behavior, try inputs it doesn't cover before calling it done, and rerun it before every claim that it works. Steered by the skill's prose, not enforced by hooks, since a model can route around a hook
- [x] Unlisted request: add the entry and proceed
- [x] PR mode: work on a branch, open a PR after the batch with summary, before/after evidence, risk
- [x] Won't call reviewers, refuse over ordering, or push outside PR mode

## m4:fix

Use when: something is broken and the cause is unknown. Touches code, tests, tracker, commits.

- [x] Reproduce with a command before theorising; minimise to the smallest failing case
- [x] Check what changed first (log, diff, bisect), then diff against working code that does the same thing (from superpowers' `systematic-debugging`)
- [x] Rank 3-5 falsifiable hypotheses; after two failed fixes sharing a premise, test the premise; after three failed fixes, take the design question to the user
- [x] Flaky tests: bisect the suite for a polluting neighbor, replace fixed sleeps with waits on the condition; reproduce against a reference implementation when one exists
- [x] Fix the first wrong decision, then the same fault elsewhere; guards only for legitimate states
- [x] Regression test; tagged debug logs removed; cause stated in the commit message
- [x] Can't reproduce: say what was tried, ask once, continue best-effort

## m4:explore

Use when: unfamiliar code, or "how does X work". Touches nothing.

- [x] Explain structure, flow and conventions in chat
- [x] Offer to add discovered conventions to CLAUDE.md
- [x] Won't write docs

## m4:tidy

Use when: cleaning up a diff, including human-written ones, or working through review findings. Touches only the diff's files.

- [x] Doesn't hunt bugs: Claude Code's `/code-review` does that in fresh-context reviewers; asked for a review, tidy says so once and its findings can come back to tidy
- [x] Fix slop directly: what-comments, needless defensive code, one-caller wrappers, debris, departures from the golden file
- [x] Check callers outside the diff
- [x] Findings need a concrete failing case; behavior-changing fixes go to the user as one multi-select question
- [x] Review comments: read all, clarify unclear ones before changing anything, check each against the code, search for callers before building something out, push back with evidence, fix one at a time, answer without thanks (from superpowers' `receiving-code-review`)
- [x] Won't widen scope or write a report file

## m4:harden

Use when: the user corrected the agent for the same thing twice. Touches code, types, lint config, CLAUDE.md.

- [x] Find recurring mistake classes from the user's input and git history
- [x] Fix each at the highest level that works: structure, types, a lint whose error names the fix, a test, a CLAUDE.md line last
- [x] Record each rule with its enforcer in the CLAUDE.md table; drop rules whose mistake can no longer happen, and propose deleting rules whose prevented failure nobody can name
- [x] Work out what context led the agent to each mistake, confirm it against the files, and fix that context too
- [x] Mistakes from copying the wrong example fix the golden-files row and propose moving the minority files

## Packaging

Skills live in `plugins/m4/skills/`. No hooks, no scripts and no always-on context file: the skills steer the model rather than enforce.

- [x] Claude Code: `.claude-plugin/plugin.json` and `marketplace.json`; install with `/plugin marketplace add` then `/plugin install m4@m4skills`
- [x] Keep manifests to required fields so versions can't drift
- [x] README: install lines, the skill table, what each skill won't do

## Verification

- [x] Run `/doctor prompt-audit` over the skills and the CLAUDE.md template; its two template conflicts with `shape` and `do` are fixed, and the "moves" list it suggested cutting stays by choice
- [x] Install in Claude Code and run setup, shape and do end to end on a real repo
- [x] `m4:do` cut to state each rule once; the design-moves list is gone, since the bar it served stays
