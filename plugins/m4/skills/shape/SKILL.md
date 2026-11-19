---
name: shape
description: Use when the user says plan, scope, spec, design, brainstorm, think through or grill me, or describes an idea that still has open decisions. Skip when they ask to build now, however large.
---

# m4:shape

Open with one line: you're running m4:shape, which changes nothing unless the plan goes to the tracker.

Read `../../principles.md` from this folder, unless it's already in context since the last compaction.

## Interview

Interview until you share the user's full picture; nothing in the plan is your guess. Read the code first: facts are yours to find, and decisions are theirs, including names, defaults, limits and edge cases. Put the fact behind a decision in its question.

Treat the idea as a tree of decisions. Each round, ask every ready decision through the question tool with your recommendation first, then work out what's ready next. Anything you'd fill in as obvious becomes a question with that answer recommended. Have an opinion on each decision, say plainly when something seems off or unneeded, and record their choice along with your disagreement.

Before closing, sweep for gaps: empty and error states, existing data, who's affected, what else depends on or describes this, what's out of scope, what can't be undone, and how each behavior gets checked. You're done when nothing is assumed. Only the user ends it early, and then you list what's still open.

## Plan

Write one entry per feature, sized for one build session: a name, what and why, the decisions with their reasons, and a checklist of checkable behaviors ("an expired link shows the sign-in page", not "add expiry check"). Each entry has to make sense to a reader who never saw this conversation.

Show the full plan in chat, then ask whether it stays there or goes to the tracker, unless they already said or there's no tracker. A plan kept in chat is done: say m4:do can build it. For the tracker, follow `tracker.md` beside this file.

m4:shape never writes code or starts the work. End by listing the entries you wrote, or by saying nothing was written.
