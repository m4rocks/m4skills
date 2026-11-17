---
name: half-send
description: Use only when the user says 'half send' in those words, about a change, a bug, a tracker entry or work already in progress. Skip when autonomy is only implied.
---

# m4:half-send

Before any other output or command, write one line: you are running m4:half-send, the goal as you understand it, and that it will touch code, tests, the tracker, commits, a branch and a pull request, and will not merge.

Read `../../principles.md` from this skill's folder and follow it: it holds the settings and rules every m4 skill shares, and this file wins where the two differ.

Half send is full send that stops with the pull request ready for the maintainer to merge. Read `../full-send/SKILL.md` from this skill's folder and follow its steps, proof, review and rules for deciding alone. Saying "half send" allows everything "full send" allows except the merge, including the ways of testing the proof needs. Where the two differ, this file wins.

## No merging

You may commit, push, rebase, resolve conflicts and force-push this task's branch with `--force-with-lease`. Never merge, turn on auto-merge, enter a merge queue, push to the default branch or go around branch protection, and never hand any of those to a subagent.

Before starting, and again before each push, check whether the pull request has auto-merge on or sits in a merge queue. Turn auto-merge off, take it out of the queue, and say so in the report. When you can't stop it from merging on its own, push nothing and report that.

## Stop at the gate

Full send's merge gate is the readiness check here. Fetch the default branch, then read the live pull request: head, base, checks, reviews and whether it is mergeable. Confirm it is open, not a draft, and not set to merge without the maintainer. When someone else merged it meanwhile, report that instead.

End with one of three verdicts:

- Ready to merge: the gate passes. Leave the pull request open.
- Waiting for approval: the gate passes except for a required human approval. Confirm that this is the only thing blocking it.
- Blocked: say what prevents readiness, what you tried and what it needs.

## Report

Lead with the pull request link, its latest commit and the verdict, and say that it is open and unmerged. Then anything else that waits on the maintainer, and any check whose expectation you changed. Then the proof, the review rounds and what they changed, the findings you fixed and the ones you rejected with reasons, the follow-ups you declined, the pre-existing bugs the review found, each call you made for the maintainer, and anything not verified.
