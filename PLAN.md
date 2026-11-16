# m4skills plan

A small Claude Code skillset: predictable skills, a lean CLAUDE.md, agents that maintain the repo like its owner would. Installed as a Claude Code plugin.

## Skill conventions

Rules every skill follows, so nothing runs that the user didn't expect.

- [x] No skill invokes another skill; `half-send` reads `full-send`'s file rather than repeat it
- [x] Opens by naming itself and what it will touch; ends with what changed, what was skipped or unchecked, and any risk
- [x] Model-invocable except `setup`, which writes CLAUDE.md and runs only when the user types it: each description opens with the plain words users type (fix, add, review), then when to skip, so common verbs still route. Descriptions name triggers, not steps, because an agent that reads a summary of the steps may follow it instead of the body (from superpowers' `writing-skills`)
- [x] No tool names; "the harness's structured question tool when it has one", falling back to one question per message
- [x] Subagents only when CLAUDE.md or the user allows them, except one cold-read reviewer in `shape`, `full-send` and `half-send`
- [x] Short verbs invoked as `/m4:<verb>`, none matching a Claude Code built-in (hence `setup` and `shape`, not `init` and `plan`). `full-send` and `half-send` are named for the phrase that triggers them
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
- [x] Find every place a change must reach, parallel paths and other repos included (mock or sandbox mode, platforms, both sides of a flag, docs, version pins), and finish all of them; better structure that simplifies the task goes in, bigger redesigns go to the plan with a reason
- [x] Values and project facts live in the template, procedure in the skills, so no rule is loaded twice. The exceptions are the next-message test and the rule that the maintainer's word holds: `do` and `fix` repeat them because a repo may have no template, and the template keeps them because follow-ups may skip the skills
- [x] The request names a goal and the job is what the goal needs: a change that leaves something it affects stale is unfinished, a retired thing has no users left, and improvements the change doesn't require stay separate entries
- [x] What the maintainer says holds for the rest of the session unless limited, facts and ways of working alike, and gives no new permission. Named early stops and wanted stops follow Anthropic's prompting guide for Opus 5.5
- [x] Before stopping, picture the maintainer's next message and do what it would ask for
- [x] Related repos and where they're checked out, as a fact the agent can't see from the repo
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
- [x] Finds repos that depend on this one or describe it and confirms them in the interview; the commits and pushes questions say that a word from the user holds for the session
- [x] Won't create doc folders, labels, or overwrite the user's sections

## m4:shape

Use when: shaping an idea into features. Touches nothing, or the tracker when the maintainer sends the plan there.

- [x] Read relevant code first; finding facts is the agent's job
- [x] Rounds of every ready decision through the structured question tool, recommended option first, worded so "yes" accepts it
- [x] Every decision in the plan, details included, is the user's answer or approval; facts that drive a decision are shown in the question
- [x] Done when every branch of the decision tree is visited and nothing is assumed; only the user ends it early
- [x] The plan lands in chat, one entry per feature with a short description and checklist, then one question asks whether it stays there or goes to the tracker; an earlier word such as "just plan it here" holds for the session
- [x] For the tracker: cold-read review, entries shown verbatim, written only after approval. A plan kept in chat skips the review, since its reader has the conversation
- [x] Reconcile on re-runs: check off what the code already does
- [x] The gap sweep asks what else depends on or describes the idea, so other repos and docs become checklist lines
- [x] Won't create ticket-per-task, dependency graphs, spikes, or write code

## m4:do

Use when: the user knows what to build, one entry, several, or a sentence. Touches code, tests, tracker, commits.

- [x] Per feature: test per the tests setting, confirm it fails for the predicted reason, implement, run project checks, check off, commit
- [x] Vertical slices through public interfaces; a test must fail when behavior breaks and survive internal changes; no cheap seam means the closest real check, stated
- [x] Batch runs inline, one commit per feature, stops at the first feature that can't go green
- [x] Builds for every platform, target and mode the repo promises; a scope cut found mid-build is asked, never reported after
- [x] Final report leads with what doesn't work where it should, then what wasn't verified
- [x] Asks what CLAUDE.md says to ask, up to four questions per call; narrowing scope is always asked. Rules the template already carries (unlisted requests, raising gaps, golden-file shape, output from this turn, readability) are not repeated in the skill, so nothing loads twice
- [x] New code follows the golden file, or the closest existing feature, and reuses its helpers; departing from it is asked
- [x] Before creating a file, names the file that would otherwise hold the code and the line that will call it (from ECC's `gateguard`)
- [x] Code is written to a bar of cost on hot paths, and inputs the check doesn't cover are tried before done; per feature, after the checks, it is used as its user would. No separate re-review step, since current models over-verify when told to
- [x] Tests name the break they catch, use hand-written expected values, test behavior rather than decisions, never assert on mocks, keep test-only code in test utilities, compare against a reference implementation when one exists, and end with a mental mutation check (from superpowers' `writing-good-tests`)
- [x] Checks, not guesses: each feature gets one command that passes only when it works. The check is a sample of the inputs, not the whole set: pass it by building the behavior, try inputs it doesn't cover before calling it done, and rerun it before every claim that it works. Steered by the skill's prose, not enforced by hooks, since a model can route around a hook
- [x] Unlisted request: add the entry and proceed
- [x] PR mode: work on a branch, open a PR after the batch with summary, before/after evidence, risk
- [x] PR summary opens with the problem in a sentence or two, then the fix
- [x] Visible changes get before and after screenshots, motion or timing a short recording; performance claims get old and new measured alternately on realistic data
- [x] Commit titles follow the repo's style, else a conventional prefix and the user-visible outcome
- [x] After opening a PR, wait on checks and review bots, fix findings that hold up, stop when green, after three non-converging rounds, or at a product decision; never reply on GitHub
- [x] Before building, finds everything the change reaches, including repos and docs the request didn't name, and reads a sibling's CLAUDE.md before editing it, since Claude Code only loads CLAUDE.md files from the working directory, its parents and its subfolders
- [x] Works in a sibling from its default or named branch, through a worktree when the checkout is dirty or elsewhere, since another session may be using it
- [x] Before stopping, runs `git status -sb` in every repo it touched, counting a branch with no upstream as unpushed; the report covers pushes by repo, what's left and each place the change reached, and recommends only decisions that are the maintainer's
- [x] Repos with no m4 settings get working defaults and one mention of `/m4:setup`
- [x] Won't call reviewers, refuse over ordering, or push unless the maintainer or the settings said to

## m4:fix

Use when: something is broken and the cause is unknown. Touches code, tests, tracker, commits.

- [x] Reproduce with a command before theorising; minimise to the smallest failing case
- [x] Check what changed first (log, diff, bisect), then diff against working code that does the same thing (from superpowers' `systematic-debugging`)
- [x] Rank 3-5 falsifiable hypotheses; after two failed fixes sharing a premise, test the premise; after three failed fixes, take the design question to the user
- [x] Flaky tests: bisect the suite for a polluting neighbor, replace fixed sleeps with waits on the condition; reproduce against a reference implementation when one exists
- [x] Fix the first wrong decision, then the same fault elsewhere; guards only for legitimate states
- [x] Regression test; tagged debug logs removed; cause stated in the commit message
- [x] Visual bugs get a before screenshot; slow bugs reproduce as a measurement and the fix states old and new numbers
- [x] Commit titles follow the repo's style, else a conventional prefix and the user-visible outcome
- [x] Can't reproduce: say what was tried, ask once, continue best-effort
- [x] The same fault is searched for across other repos, clients, docs and version pins; commits and pushes follow the settings and the maintainer's earlier word

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
- [x] Leaves changes uncommitted unless the maintainer already said to commit this work
- [x] Won't widen scope or write a report file

## m4:harden

Use when: the user corrected the agent for the same thing twice, or asks for a retro on a session. Touches code, types, lint config, CLAUDE.md.

- [x] Find recurring mistake classes from the user's input and git history
- [x] Fix each at the highest level that works: structure, types, a lint whose error names the fix, a test, a CLAUDE.md line last
- [x] Record each rule with its enforcer in the CLAUDE.md table; drop rules whose mistake can no longer happen, and propose deleting rules whose prevented failure nobody can name
- [x] Work out what context led the agent to each mistake, confirm it against the files, and fix that context too
- [x] Mistakes from copying the wrong example fix the golden-files row and propose moving the minority files
- [x] Retro: reads a session's record for slow searches, mistakes a check could have caught, costly tool calls, information out of reach and instructions that changed nothing; a check that exists but nothing runs is the finding (from Matt Pocock's `retro`)
- [x] Every retro candidate traces to a moment in the record, a smooth session yields none, and nothing changes until the maintainer picks from one multi-select question
- [x] Left out of the retro: a reviewer agent and its standards file, since m4 has neither

## m4:full-send

Use when: the user says "full send". Touches code, tests, tracker, commits, a branch, a pull request and the merge. Adapted from tstack's `full-send`, with what it took from `sol-loop`, `file-pr` and `babysit-pr` written inline.

- [x] Runs only on the words themselves, which override the commits and pushes settings for the task and drop ask-first rules for testing, never rules about how to test
- [x] Proof is output observed after the last edit; a change that can't be proved is a question, not a merge
- [x] One read-only cold-read reviewer regardless of the Subagents setting, since nobody else reads the diff before it merges; findings labeled blocker, should or nit, up to three rounds, and running out of rounds isn't approval
- [x] Opens a ready pull request, problem first, after rebasing and checking for an existing one; fixes check failures and findings that hold up, proves each fix, and declines what the goal doesn't need
- [x] Merge gate on the latest commit: proof covers the diff, required checks pass, bot findings answered, no review requesting changes, branch up to date, and no later default-branch commit touches the same files
- [x] Merges the way the repo does, never around branch protection; replies on GitHub only where a thread must be resolved to merge
- [x] Questions go through the structured question tool so the session shows as waiting; with no answer, the pull request stays open and unmerged
- [x] Left out: tstack's reviewer on another provider's model, its watcher script and its comment header, since m4 ships no scripts and stays inside Claude Code
- [ ] Run a full send end to end on a real repo

## m4:half-send

Use when: the user says "half send". Touches what full send touches, except the merge. Adapted from tstack's `full-stop` and renamed.

- [x] Follows `full-send`'s file for steps, proof, review and asking; its own file wins where they differ
- [x] Never merges, turns off auto-merge and leaves a merge queue before working, and checks again before each push
- [x] Ends with one of three verdicts: ready to merge, waiting for approval, or blocked

## Packaging

Skills live in `plugins/m4/skills/`. No hooks, no scripts and no always-on context file: the skills steer the model rather than enforce.

- [x] Claude Code: `.claude-plugin/plugin.json` and `marketplace.json`; install with `/plugin marketplace add` then `/plugin install m4@m4skills`
- [x] Keep manifests to required fields so versions can't drift
- [x] README: install lines, the skill table, what each skill won't do

## Verification

- [x] Run `/doctor prompt-audit` over the skills and the CLAUDE.md template; its two template conflicts with `shape` and `do` are fixed, and the "moves" list it suggested cutting stays by choice
- [x] Install in Claude Code and run setup, shape and do end to end on a real repo
- [x] `m4:do` cut to state each rule once; the design-moves list is gone, since the bar it served stays
