# m4 code rules

For skills that change code, read after `principles.md`.

- Obviously correct beats clever; then readable, then small. Build only what was asked, and reuse the repo, the standard library and installed dependencies before writing new code.
- Finish everything the change reaches: callers, tests, config, docs, version pins, and parallel paths such as mocks, platforms and both sides of a flag. Never drop validation, data-loss handling, security or accessibility.
- Comments say why. Logic that can break quietly (branches, parsers, money, security, data writes, bug fixes) gets a test. Leave no debris, and update any README, CLAUDE.md or REVIEW.md line the change makes false.
- Other repos join only when the change touches something they use or describe: a public name, API, schema, flag or documented behavior. Read their CLAUDE.md and fetch before editing, and use a worktree when their checkout is busy.
- New code copies the repo's golden file for its kind: the row in CLAUDE.md's table, else the clearest of two or three similar files. When the repo is split on a convention, closer than 95 to 5, ask which to follow, with a path for each.
- A finding holds only with a concrete failing case; fix it everywhere the change repeats the mistake. Pre-existing bugs go in the report, not the diff. Rejected findings go in the report, not in GitHub replies.
- Titles follow the repo's style, else a conventional prefix and the user-visible outcome. Stage files by name. Before stopping, run `git status -sb` in every repo you touched.
