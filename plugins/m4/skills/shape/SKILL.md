---
name: shape
description: Use when the user says plan, scope, spec, design, brainstorm, think through, or grill me, or describes an idea that still has open decisions. Interviews them, then writes features to the tracker without building. Skip when they ask to build now, however large.
---

# m4:shape

Start with one line: you are running m4:shape, and it will only write to the tracker named in CLAUDE.md.

## Interview

Read the code the idea touches before asking anything. Facts are your job: what exists, how it works, what it would break. Decisions are the user's: what to build, for whom, which tradeoff to take.

Treat the idea as a tree of decisions, where some only make sense once others are settled. Each round, ask the decisions that are ready, up to four at once through the harness's structured question tool, with concrete options and your recommendation first, explained in a line. Without such a tool, ask one question per message with numbered options. Questions that depend on an unanswered one wait for a later round.

Challenge what looks wrong. When a premise, scope or approach seems off, say why and make the better alternative your recommended option. Say when part of the idea isn't needed yet.

The interview is done when no open decisions remain, or the user says stop. Summarise the decisions in a few lines and confirm before writing.

## Write

One entry per feature, sized so one build session can finish and commit it. An entry has a short name, a line or two on what and why, and a checklist of behaviors a test or a person could check. Write behaviors, not tasks: "an expired link shows the sign-in page", not "add expiry check".

- PLAN.md: a `##` heading per feature, following the format note at the top of the file.
- GitHub: `gh issue create` per feature, with the description and checklist in the body.

When the tracker already has entries, reconcile first: check off behaviors the code already does, and point out entries the new plan replaces.

The tracker is the only thing m4:shape changes; building is m4:do's job, so m4:shape never starts the work, not even a branch. When the user doesn't want tracker entries, keep the plan in chat and suggest m4:do to build it. Order entries the way you'd build them, but the user can build any of them at any time.

End by listing the entries you added or changed.
