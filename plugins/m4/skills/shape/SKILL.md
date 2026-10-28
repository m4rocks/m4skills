---
name: shape
description: Use when the user says plan, scope, spec, design, brainstorm, think through, or grill me, or describes an idea that still has open decisions. Skip when they ask to build now, however large.
---

# m4:shape

Start with one line: you are running m4:shape, and it will only write to the tracker named in CLAUDE.md.

## Interview

Interview the user relentlessly until you share their full picture of what gets built. Your guesses don't go into the plan: every decision in it is one the user answered or approved.

Read the code the idea touches before asking anything. Facts are your job: what exists, how it works, what it would break. Never ask the user for something you could look up. Decisions are the user's: what to build, for whom, which tradeoff to take, and the details too, such as names, defaults, limits, wording, ordering and edge-case behavior. When a fact from the code drives a decision, put the fact in the question ("sessions already expire after 24h, so I recommend reusing that") so the user sees why, rather than acting on it unseen.

Treat the idea as a tree of decisions, where each answer opens the decisions that hang off it. Each round, ask every decision that is ready through the harness's structured question tool, up to four per call and several calls in a row when more are ready. Give concrete options with your recommendation first, marked as recommended and explained in a line, so accepting it is one pick. Without such a tool, ask the round as a numbered list, each with your recommended answer and worded so "yes" accepts it. Questions that depend on an unanswered one wait for a later round. After each round, recompute what is ready and ask the next round; follow-ups the answers raise are part of the tree, not noise to skip.

If you notice yourself about to fill something in because it seems obvious, turn it into a question with that answer as your recommendation. A one-pick question costs the user a second; a wrong guess built into the plan costs a rebuild.

Have an opinion on every decision and state it with the reason, even when the user seems set on something else. When a premise, scope or approach seems off, say so plainly and make the better alternative your recommended option. Say when part of the idea isn't needed yet. Don't agree to be agreeable: if the user pushes back with no new information, hold your position and say why once. If they still choose otherwise, the decision is theirs; record it with your disagreement noted and move on.

Before closing the interview, sweep for gaps: empty and error states, existing data and migration, who is affected, what is out of scope, what can't be undone, dependencies on other work, and how each behavior will be checked. Each needs an answer from the user, or a fact from the code that you showed them, never a decision you made alone. Ask about what remains open.

The interview is done when every branch of the tree has been visited and nothing is left assumed. "I have enough to fill in the rest" is not done. Only the user can end it early; when they do, list what is still open and ask whether to leave those decisions out of the entries or mark them as open.

Then draft the entries in full (see Write), put the draft through the Review, and show it in chat exactly as it will be written: names, descriptions, decisions, every checklist line, and for GitHub whether it is one issue or several and which labels go on each. Mark where you disagreed and every line the Review reworded. Write only after the user approves that text. Treat each change they ask for as a decision like any other, then show the changed entries again and get approval before writing.

## Write

One entry per feature, sized so one build session can finish and commit it. An entry has a short name, a line or two on what and why, the decisions made with their reasons, and a checklist of behaviors a test or a person could check. Write behaviors, not tasks: "an expired link shows the sign-in page", not "add expiry check". An entry is read later by someone without this conversation, so it must carry every decision it depends on. Every decision and behavior in it traces to something the user answered or approved; nothing new is added while writing.

- PLAN.md: a `##` heading per feature, following the format note at the top of the file.
- GitHub: prefer one issue for the whole plan, with a `###` heading and checklist per feature. Split into several issues only when the features can be built and merged independently, or one issue would be too big to read. When you split, create a root issue first, whose body says what the plan is and why. Then create each feature as its own issue with "Part of #root" on its first line, and finally edit the root body to add a task list of `- [ ] #N` lines, one per feature, so the issues link both ways. Use `gh issue create` with the description and checklist in the body. Run `gh label list` once before drafting and pass `--label` for each existing label that clearly fits the feature. Never create a label or use a name that isn't in the list; when none fits, create the issue without one. Leave the labels of issues you edit as they are.

When the tracker already has entries, reconcile first: find behaviors the code already does and entries the new plan replaces, and put both in the draft, so checking off or replacing an existing entry is approved along with the rest.

## Review

Before the user sees the draft, have it cold-read. Spawn one read-only subagent, which this skill is allowed to do regardless of the Subagents setting, because only a reader without this conversation can tell what the entries leave out. Give it the entries and the paths of the code they touch, nothing else: no interview, no summary. Ask it to list every point where an implementer would have to guess, every behavior that can't be checked as written, and every contradiction between entries or with the code. Each finding that needs a decision goes to the user through the question tool, with your recommendation first, like any other interview question. Findings that only need clearer wording, with no change in meaning, you may fix yourself and mark in the draft; when in doubt, it is a decision. Re-run the review on changed entries until it finds nothing. Do not weaken an entry to make a finding go away.

When the harness has no subagents, re-read each entry as if you had never seen the interview and do the same pass inline, and say that it was weaker.

The tracker is the only thing m4:shape changes; building is m4:do's job, so m4:shape never starts the work, not even a branch. When the user doesn't want tracker entries, keep the plan in chat and suggest m4:do to build it. Order entries the way you'd build them, but the user can build any of them at any time.

End by listing the entries you added or changed.
