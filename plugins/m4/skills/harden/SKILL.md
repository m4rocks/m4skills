---
name: harden
description: Use when the user corrects the same agent behavior a second time ('again', 'I told you', 'stop doing X'), asks to harden the repo or make a mistake impossible, or asks for a retro or retrospective on a session. Skip for a first correction, which is simply fixed.
---

# m4:harden

Start with one line: you are running m4:harden, the mistakes you'll address or the session you'll review, and that it may touch code, types, lint config, REVIEW.md and CLAUDE.md.

## Find the mistake classes

Start from what the user describes, then look for more: reverts and fix-up commits in the git history, review comments, CLAUDE.md rules nothing enforces, comments that explain workarounds. Group them into classes. A class counts once it has happened twice.

For each class, work out what context led the agent there: what it read, which example it copied, which instruction it followed or missed. When the mistake was made in this session, say what you read and which example or instruction you followed; otherwise reconstruct it from the transcript or the commits. Treat the account as a lead, confirm it against the files, and fix that context along with the code.

Assume the next contributor is an agent that sees only the files it opened, copies the nearest example, and takes the shortest path that compiles. The goal is a repo where a change that looks right from one file is right for the whole repo.

## Retro

When the user asks for a retro, the session is the evidence instead of a repeated correction. Read its record, the current session by default or an earlier one they name from the transcript logs, and find the moments where the agent struggled. Each kind of moment has its own fix:

- It took many steps to find a file or a fact, or two files depended on each other with nothing saying so. Remove the hidden dependency when the structure allows; otherwise add a pointer in a file the agent already reads, such as a golden-files row or a line where the search started.
- It made a mistake a check could have caught. Read the repo's check commands and CI first: a check that exists but nothing runs, or that fails without anyone seeing, is the finding, and running it is the fix. A repo where nothing runs lint, types and tests before a merge is a finding of its own.
- A tool call cost far more than it returned, such as a command that prints thousands of lines to answer a yes or no. Propose the flag, script or narrower command.
- It needed information it couldn't reach, such as dev server logs or the state of an outside service. Propose a way in, like writing the log to a file or read-only access.
- An instruction in CLAUDE.md or another steering file changed nothing the agent did, such as a line telling the model to think carefully, which current models do unasked. Propose deleting it.

Every candidate points to a moment in the record: what the agent did there and what it cost. Drop any you can't trace to one, because categories invite generic advice, and a session that went smoothly has little to teach. Say so rather than fill the list.

Show the candidates in chat, most costly first, each with its moment and the fix you'd make, and ask which to fix in one multi-select question through the structured question tool, with your recommendations marked. A retro changes nothing until they pick. One moment is enough for a candidate here, since the maintainer chooses. Fix the picked ones as the next section describes.

## Fix each class at the highest level that works

1. Structure: give each piece of state one owner and each task one supported way; hide internals so the wrong import fails; replace hand-synced lists with one source of truth; delete old patterns an agent would copy. When the mistake came from copying the wrong example, point that kind's row in the golden-files table at a file that shows the right shape, adding the row if it's missing, and propose moving the minority files to that shape.
2. Types, so the wrong state can't be written.
3. A lint rule or CI check whose error message names the fix. Use a check the repo already has before writing one. If the pattern is already common, fail only on new occurrences.
4. A test of the behavior.
5. A line in REVIEW.md at the repo root, for a judgment call that shows in a diff. Claude Code's code review reads that file when it reviews, so the rule costs nothing in the sessions that write code. Write what a reviewer needs: the trigger that can be read from a diff, what to check when it matches, and the mistake behind it. Create the file when the repo has none.
6. A CLAUDE.md sentence, only for what has to be known while writing the code and nothing above can catch.

Write each rule for the class, not the instance. A rule that names the one file or value that went wrong passes on that case and misses the next one, so say what makes the mistake a mistake.

Adding a new tool or dependency is the maintainer's call, so ask before doing it.

Prove each new check fails on a real past instance of the mistake, then commit each class separately, per the commits setting.

## Keep the rule table

Record each rule and what enforces it in the enforced-rules table in CLAUDE.md, with REVIEW.md as the enforcer for the rules that live there. Remove rules whose mistake can no longer happen, and replace any prose rule that a check now covers. A CLAUDE.md rule whose prevented failure nobody can name costs context in every session; propose deleting it.

End by listing each class with its evidence, the level you chose, and why a higher level didn't work, and after a retro, the candidates the maintainer didn't pick.
