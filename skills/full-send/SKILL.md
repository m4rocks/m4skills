---
name: full-send
description: Only on 'full send' or explicit autonomous merge.
---

Nobody is watching. Take the work to a merged PR and stay in the turn until then, without status messages. Follow `autonomy`, with these words granting: commits, pushing this task's branch, opening its PR, `--force-with-lease` after a rebase, merging once the gate passes, and any test method the proof needs, even where CLAUDE.md says to ask first.

1. Branch, then do the work with `fix`, `change` or `implement`.
2. Prove it with `verify`.
3. Review with `review`, unless it's a pure bug fix whose repro went red to green. A blocker or should still disputed after your rebuttal means no merge.
4. Open the PR with `pr`, with one line on how you proved it.
5. Babysit with `babysit`, proving each fix before pushing it.
6. Read the gate in its own call, then merge the repo's usual way in a call by itself.
7. Report per `report`, leading with the PR link and merge commit.

Gate, on the latest commit: proof covers the whole diff, required checks are green, bots are done with every finding answered, no review requests changes, and the branch is mergeable with no default-branch commit since the last green run touching its files. Read it with `git fetch`, `gh pr view <n> --json state,isDraft,mergeable,mergeStateStatus,reviewDecision` and `gh pr checks <n> --required`. Never use `--admin` or another bypass. If the harness refuses the merge, stop as blocked and name the permission rule that would allow it.

Also ask when you can't prove the change or pass the gate. Finish everything else first, then ask through the question tool with the PR link and your recommendation first.
