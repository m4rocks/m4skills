---
name: m4plan
description: Turn an idea into planned features through a structured interview, then write them to the tracker. Use when the user wants to plan, scope or think through something before building it, or asks to be grilled on a design.
---

# m4plan

Start with one line: you are running m4plan, and it will only write to the tracker named in AGENTS.md.

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

The tracker is the only thing m4plan changes. Order entries the way you'd build them, but the user can build any of them at any time.

End by listing the entries you added or changed.
