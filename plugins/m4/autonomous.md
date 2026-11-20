# m4 autonomous mode

m4:do and m4:fix read this when the maintainer hands the work over. Their own steps still run; this file wins where they differ.

## When and how far

Only on the maintainer's own words handing over control, such as "full send", "half send" or "I'm not watching, merge it". Implied autonomy never counts, because this mode can merge.

| They say | Stop at |
|---|---|
| "full send", "merge it" | the pull request merged |
| "half send", "let me review", "don't merge" | the pull request ready to merge |
| "don't push" | local commits |
| "leave it uncommitted" | a verified working tree |

When two fit, take the earlier one.

Up to the stop point, the words allow committing, pushing the task's branch, opening its pull request, `--force-with-lease` after a rebase, merging once the gate passes, and any testing method the proof needs. Nobody is watching: make the calls yourself and list them, and stay in the turn until the stop point, without status messages.

## Hard rules

- Before a merge stop point, never merge, enable auto-merge, enter a merge queue or push to the default branch. Turn off auto-merge or a queue that is already on, and check again before your last push.
- Never bypass branch protection with `--admin` or anything like it.
- No proof, no merge. Proof is output observed after the last edit, as direct as possible: the reproduction going red to green, the commands CI runs, running the thing and looking at it. A change people see or use needs the app run and used, with an after screenshot; headless tests and CI only show state. When you can't run it, through computer-use or otherwise, the verdict is blocked.
- Still ask before anything irreversible: deleting data, touching production, changing something outside the repo, closing someone's pull request, force-pushing another branch. Finish the rest first, then ask with the pull request link and your recommendation.
- Open no new tracker entries or issues; follow-ups go in the report.

## Flow

Branch, build the smallest change that reaches the goal, prove it and have it reviewed. For a pull request stop point, rebase, open a ready pull request as `pr.md` beside this file says, and watch it. Decline extras from review rounds that the goal doesn't need, and list them as follow-ups. When the goal changes what a check expects, update the check and report the old and new expectation.

## Review

Skip it for a pure bug fix, since red to green is the proof. Otherwise one cold reviewer runs as "Reviews" in the principles says, regardless of the Subagents setting: handing the work over counts as asking for it, even when CLAUDE.md limits subagents. An inline review isn't enough for a merge. Brief it with the repo path, the base commit, the goal, what's out of scope and the check results. Ask for bugs, broken callers and gaps against the goal, each with a file and line, how to show it fails, and a label: blocker, should, nit or pre-existing. Fix the blockers and shoulds that hold with the smallest change, rebut the rest with evidence, and don't concede just to finish. Run a second round after fixes that change behavior. A blocker or should still disputed after it means no merge, with both sides in the report.

## Gate

Check the latest commit. The proof and review cover the whole diff, nothing that judges it was weakened, required checks are green, bots are done and every finding is answered, and no review requests changes. The branch is current and mergeable, and no default-branch commit since the last green run touches its files. Read the gate right before merging, in its own call: `git fetch`, then `gh pr view <n> --json state,isDraft,mergeable,mergeStateStatus,reviewDecision,autoMergeRequest` and `gh pr checks <n> --required`. Go through each condition above against that output, then merge the repo's usual way in a call by itself, and with a queue, stay until it's merged. When a permission check or the harness refuses the merge, don't retry or work around it: stop with the verdict blocked and name the allow rule that would let it through, such as `Bash(gh pr merge:*)` in `/permissions`.

At the ready stop point, the gate is the readiness check. End with a verdict: ready to merge; waiting for approval, when a required human approval is all that's missing; or blocked, with what blocks it, what you tried and what it needs.

## Report

Lead with where the work stopped: the pull request link and merge commit; the link, latest commit and verdict; or the branch. Then what waits on the maintainer, the proof, the review outcome, rejected findings with reasons, declined follow-ups, your calls and anything unverified.
