---
name: full-send
description: Use only when the user says 'full send' or explicitly hands the work over to merge with nobody watching.
---

# Full send

Nobody is watching. Take the work from its current state to a merged PR, and stay in the turn until then, without status messages. Implied autonomy never counts.

The words grant: committing, pushing this task's branch, opening its PR, `--force-with-lease` after a rebase, merging once the gate passes, and any test method the proof needs (running the app, computer use, screenshots), even where CLAUDE.md says to ask first.

## Steps

1. Branch off the default branch. Do the work with m4:fix, m4:change or m4:implement: the smallest change that meets the goal.
2. Prove it with m4:verify. A change people see needs the app run and every screenshot you rely on read. Green mocked tests prove nothing a user sees.
3. Review with m4:review, skipped for a pure bug fix whose repro went red to green. A should or blocker still disputed after round 2 means no merge.
4. Rebase, then open the PR with m4:pr, adding one line on how you proved it.
5. Babysit with m4:babysit. Prove each fix before pushing it.
6. Read the gate in its own call, then merge the repo's usual way in a call by itself.
7. Report per m4:report, leading with the PR link and merge commit, then proof, review outcome, declined follow-ups and your calls.

## Gate

On the latest commit: proof covers the whole diff, required checks are green, bots are done and each finding is fixed or answered, no review requests changes, and the branch is current and mergeable with no default-branch commit since the last green run touching its files. Read it with `git fetch`, then `gh pr view <n> --json state,isDraft,mergeable,mergeStateStatus,reviewDecision` and `gh pr checks <n> --required`. Never use `--admin` or any bypass. If the harness refuses the merge, stop as blocked and name the allow rule that would let it through.

## Asking

Ask through the question tool, with the PR link and your recommendation first, only when you can't prove the change, the gate can't pass, the step is irreversible (deleting data, production, outside the repo, closing a PR, force-pushing another branch), or the goal is ambiguous in a way that changes the result. Finish everything else first. Decide the rest yourself and list it. Open no issues.
