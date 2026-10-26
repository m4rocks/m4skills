---
name: shape
description: Use when the user says plan, scope, spec, design, brainstorm, think through, or grill me, or describes an idea that still has open decisions. Interviews them, then writes features to the tracker without building. Skip when they ask to build now, however large.
---

# m4:shape

Start with one line: you are running m4:shape, and it will only write to the tracker named in CLAUDE.md.

## Interview

Read the code the idea touches before asking anything. Facts are your job: what exists, how it works, what it would break. Decisions are the user's: what to build, for whom, which tradeoff to take.

Treat the idea as a tree of decisions, where some only make sense once others are settled. Each round, ask the decisions that are ready, up to four at once through the harness's structured question tool, with concrete options and your recommendation first, explained in a line. Without such a tool, ask one question per message with numbered options. Questions that depend on an unanswered one wait for a later round.

Have an opinion on every decision and state it with the reason, even when the user seems set on something else. When a premise, scope or approach seems off, say so plainly and make the better alternative your recommended option. Say when part of the idea isn't needed yet. Don't agree to be agreeable: if the user pushes back with no new information, hold your position and say why once. If they still choose otherwise, the decision is theirs; record it with your disagreement noted and move on.

Before closing the interview, sweep for gaps. Each of these needs an answer from the user, the code, or a decision you state, never a silent assumption: empty and error states, existing data and migration, who is affected, what is out of scope, what can't be undone, dependencies on other work, and how each behavior will be checked. Ask about what remains open.

The interview is done when the sweep leaves no open decisions, or the user says stop. Summarise the decisions in a few lines, including where you disagreed, and confirm before writing.

## Write

One entry per feature, sized so one build session can finish and commit it. An entry has a short name, a line or two on what and why, the decisions made with their reasons, and a checklist of behaviors a test or a person could check. Write behaviors, not tasks: "an expired link shows the sign-in page", not "add expiry check". An entry is read later by someone without this conversation, so it must carry every decision it depends on.

- PLAN.md: a `##` heading per feature, following the format note at the top of the file.
- GitHub: prefer one issue for the whole plan, with a `###` heading and checklist per feature. Split into several issues only when the features can be built and merged independently, or one issue would be too big to read. When you split, create a root issue first, whose body says what the plan is and why. Then create each feature as its own issue with "Part of #root" on its first line, and finally edit the root body to add a task list of `- [ ] #N` lines, one per feature, so the issues link both ways. Use `gh issue create` with the description and checklist in the body. Run `gh label list` once first and pass `--label` for each existing label that clearly fits the feature. Never create a label or use a name that isn't in the list; when none fits, create the issue without one. Leave the labels of issues you edit as they are.

When the tracker already has entries, reconcile first: check off behaviors the code already does, and point out entries the new plan replaces.

## Review

Before finishing, have the entries cold-read. Spawn one read-only subagent, which this skill is allowed to do regardless of the Subagents setting, because only a reader without this conversation can tell what the entries leave out. Give it the entries and the paths of the code they touch, nothing else: no interview, no summary. Ask it to list every point where an implementer would have to guess, every behavior that can't be checked as written, and every contradiction between entries or with the code. Resolve each finding by asking the user, deciding it yourself and saying so, or fixing the entry, then re-run the review on changed entries until it finds nothing. Do not weaken an entry to make a finding go away.

When the harness has no subagents, re-read each entry as if you had never seen the interview and do the same pass inline, and say that it was weaker.

The tracker is the only thing m4:shape changes; building is m4:do's job, so m4:shape never starts the work, not even a branch. When the user doesn't want tracker entries, keep the plan in chat and suggest m4:do to build it. Order entries the way you'd build them, but the user can build any of them at any time.

End by listing the entries you added or changed.
