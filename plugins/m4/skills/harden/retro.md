# m4:harden, retro

The evidence is a session: the current one, or an earlier one the user names. For the current one, use what's in context. Never read a transcript file whole; use `grep` or `jq` to pull out user turns, tool errors, retries and oversized results, then read the spans around them.

Look for moments where the agent struggled, each with its usual fix:

- Many steps to find something, or files that silently depend on each other: remove the hidden dependency, or add a pointer where the agent already looks.
- A mistake a check could have caught: a check that exists but nothing runs is the finding.
- A tool call that cost far more than it returned: propose a narrower command.
- Information out of reach, such as dev server logs: propose a way in.
- A steering line that changed nothing, such as "think carefully": propose deleting it.

Every candidate cites a moment in the record and what it cost. Drop any you can't trace, and when the session went smoothly, say so instead of filling a list. Show the candidates, most costly first, and ask which to fix in one multi-select question. Nothing changes until they pick.
