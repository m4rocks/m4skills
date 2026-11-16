---
name: full-send
description: Use only when the user says 'full send' in those words, about a change, a bug, a tracker entry or work already in progress. Skip when autonomy is only implied.
---

# m4:full-send

Before any other output or command, write one line: you are running m4:full-send, the goal as you understand it, and that it will touch code, tests, the tracker, commits, a branch, a pull request and the merge.

The maintainer said "full send" because they aren't watching. Nobody reads your updates until long after you stop, so you own the work from where it stands now to a merged pull request. When they didn't say it in those words, this skill doesn't apply, however much autonomy the request implies.

## What the words allow

For this task, "full send" is the maintainer's word, and it overrides the commits and pushes settings in CLAUDE.md. It allows you to:

- commit, push the task's branch and open its pull request
- force-push that branch with `--force-with-lease` after a rebase
- merge the pull request once the merge gate passes
- use whatever way of testing the proof needs, even where CLAUDE.md or another instruction says to ask first or to leave testing to the maintainer, such as driving a browser, a simulator, a device or a dev server

Rules about how to test still hold: the named command, fixture or check stays the right one. Only the ask-first step goes. It covers this task alone, and it doesn't cover the steps under "Asking" or get past an approval prompt the harness shows.

## Steps

1. Finish the change. Build it to the bar a watched request gets: a bug is reproduced before it is fixed, a feature gets a check that fails first, and everything the change reaches is part of it. Make the smallest change that reaches the goal, fixing the case that happened rather than every case that could. On the default branch, create a branch first.
2. Prove it (see "Proof").
3. Have it reviewed (see "Review").
4. Open the pull request. Rebase onto the latest default branch first, and check whether the branch already has one. Write the title in the repo's title style, saying the outcome a user would notice. The body opens with the problem in a sentence or two, then the fix, then the proof, then the risk, with one `Closes #N` or `Refs #N` line per issue. Check off the tracker's behaviors in the same branch, and open no new entries or issues, since nobody is there to approve them; follow-ups go in the report. Read the title and body for secrets and private details before submitting. Open it ready rather than as a draft, because review bots skip drafts.
5. Watch it. Wait on `gh pr checks --watch`, then read what review bots and people posted since your last push. Fix each failure and each finding that holds up, meaning you can name a concrete case where the code fails. Prove each fix before pushing it, then wait again. Tell a failure in the code from a flaky runner, and rerun only the second kind. Review rounds grow a pull request one cheap fix at a time, so decline tests the goal doesn't need, guards for cases that don't happen and extra compatibility, and list them in the report as follow-ups.
6. Merge when the merge gate passes.
7. Report.

Stay in the turn from step 1 to step 7. Ending it while checks or bots are pending stops the work, because nobody will prompt you again. Send no status messages while waiting.

## Proof

Proof is something you observed in this session after your last edit: command output, a reproduction, a screenshot. Use the most direct kind the change allows.

- Reproduce the original failure, apply the fix, and watch the same reproduction pass.
- Run what the repo's CI runs: type check, lint, tests.
- When the behavior has no test and the repo has a test runner, add one that fails without the change.
- For what a user sees or a running system does, run it and look. Passing tests against mocks don't show that it works for a user. Keep before and after screenshots for the pull request.

A change you can't prove is one you can't merge unwatched. Ask.

## Review

Nobody else reads this diff before it merges, so one reader without this conversation does. Spawn one read-only subagent, which this skill is allowed to do regardless of the Subagents setting. Give it the repo path, the base commit, the goal in a sentence, what is out of scope and the check results, nothing else. Ask it to read the diff and the code around it, and to list bugs, broken callers and places the diff doesn't do what the goal says, each with a file and line and one of three labels:

- blocker: the intended case is wrong
- should: a bug callers will hit within the goal
- nit: everything else, including other paths, rare cases, small performance costs, extra compatibility and style

Check each finding and its label against the code yourself. Fix blockers and shoulds you agree with by the smallest change, preferring one that deletes or narrows code. Answer the ones you disagree with using evidence, such as a file and line, a test or output, and decline nits in a line each. Don't agree in order to end the review. After fixes that change behavior, run another round on the changed code and the open findings only, up to three rounds. When a blocker or should is still disputed after that, it is a question for the maintainer, since running out of rounds isn't approval.

When the harness has no subagents, read the diff against its base as if you had never seen the conversation, do the same pass inline, and say in the report that the review was weaker.

## Merge gate

Merge only when all of this is true of the latest commit:

- Your proof covers every change in the diff.
- The required checks pass.
- Review bots have finished, and each finding is fixed or rejected with a reason.
- No person's review still requests changes.
- The branch is up to date with the default branch and GitHub reports it mergeable.
- No commit that landed on the default branch after the last passing run touches a file this pull request changes. When one does, rebase, push and wait for the checks again.

Run `git fetch` and check the gate once more right before merging. Merge the way the repo does, which its allowed methods and recently merged pull requests show. With a merge queue or auto-merge, stay until GitHub reports it merged. Go through branch protection as configured, never around it with `--admin` or a similar bypass. A bot that only asks for human review doesn't block the merge when the rest of the gate passes.

Reply on GitHub only where a thread must be resolved before the merge is allowed, with the reason in a line or two. Rejected findings otherwise go in the report, because a reply is public.

## Asking

A question in an ordinary message goes unseen and the session looks finished. Ask through the harness's structured question tool, so the session shows it is waiting, and put everything in the question: the pull request link, what blocks you, and the options with your recommendation first.

Ask only when you can't continue alone:

- You can't prove the change.
- The merge gate can't pass and you can't fix why.
- The next step is outside what the words allow: deleting data, touching production, changing something outside the repo, closing a pull request, or force-pushing any other branch.
- The goal can be read two ways that lead to different results.
- Another pull request makes this one obsolete.

Make every other call yourself and list it in the report. Without a question tool, or when it returns no answer, take the safe path: leave the pull request open and unmerged, and start the final message with the question.

## Report

Lead with the pull request link and whether it merged, with the merge commit. Then the proof, with each command and the last lines of its passing run, the review rounds and what they changed, the findings you fixed and the ones you rejected with reasons, the follow-ups you declined, each call you made for the maintainer, and anything not verified.
