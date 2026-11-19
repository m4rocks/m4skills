# m4 pull requests

Read when opening a pull request.

## Body

```markdown
## Summary
<the problem in a sentence or two, then the fix, with a small view if it helps: pseudocode, a call tree or a file tree>

## Evidence
<the check failing before and passing after; before and after screenshots; measured numbers for performance claims>

## Risk
<what could break, and how to undo it>
```

End with one `Closes #N` or `Refs #N` line per issue, since a squash merge drops the commit lines. `gh` can't attach images, so leave screenshots where the maintainer can open them, uncommitted, and say where they are.

## Watching

After each push, wait with `gh pr checks <n> --watch >/dev/null 2>&1; gh pr checks <n>`. Bots are done when their checks have finished and none is left in `reviewRequests`. Then read only what's new since the push, shortened, and open a full body only for a finding that looks real:

```sh
gh api --paginate repos/{owner}/{repo}/pulls/<n>/comments --jq '.[] | select(.created_at > "<last push>") | {path, line, user: .user.login, body: .body[0:500]}'
gh api --paginate repos/{owner}/{repo}/pulls/<n>/reviews --jq '.[] | select(.submitted_at > "<last push>") | {user: .user.login, state, body: .body[0:500]}'
gh api --paginate repos/{owner}/{repo}/issues/<n>/comments --jq '.[] | select(.created_at > "<last push>") | {user: .user.login, body: .body[0:500]}'
```

Handle findings as `code.md` says and rerun only flaky failures. Stop when the latest commit is green with no bot finding unanswered, after three rounds that don't converge, or at a product decision.
