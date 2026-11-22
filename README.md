# m4skills

Microskills for coding agents. Each skill is a short template prompt for one step of the work, so you can say "fix this, verify it, then half send" instead of spelling the steps out. Most bodies are two or three sentences, and they cover only what the model wouldn't do by default.

## Install

With [skills.sh](https://skills.sh) (Claude Code, Codex, Cursor, Windsurf and others):

```bash
npx skills add m4rocks/m4skills
```

Or as a Claude Code plugin (prefixes skills with `m4:`):

```text
/plugin marketplace add m4rocks/m4skills
/plugin install m4@m4skills
```

## Skills

| Skill | Say | What it does |
|---|---|---|
| `fix` | "fix", or paste an error | Reproduces the bug red, fixes the root cause, and stops when the same repro is green. |
| `change` | "make X do Y" | Changes existing behavior and updates everything that still encodes the old one. |
| `implement` | "add", "build" | Builds the smallest thing that meets the goal, starting from the data shape. |
| `verify` | "verify", "prove it" | Checks the real artifact after the last edit, including running the app and reading screenshots. |
| `test` | "add tests" | Adds tests only where breakage would be quiet, and asserts behavior. |
| `review` | "review", "sol loop" | Has GPT Sol review the diff in one full round through any agent tool that can run it, or a cold subagent otherwise. |
| `pr` | "open a PR" | Opens a PR that leads with the problem, without model attribution. |
| `babysit` | "babysit" | Watches checks and review bots, fixes the real findings and answers the rest. |
| `full-send` | "full send" | Fixes or builds, verifies, reviews, opens the PR, babysits it and merges once the gate passes. |
| `half-send` | "half send" | Does the same as full send, but stops with the PR ready for you to merge. |
| `tidy` | "tidy", "clean up" | Cleans up a diff without changing behavior. |
| `harden` | "again", "stop doing X" | Turns a repeated mistake into a check that fails on it. |
| `write` | docs, PR text, messages | Strips AI patterns from prose. |
| `autonomy` | loaded by the others | Decides reversible calls without asking and asks only before irreversible or outward-facing steps. |
| `repo` | loaded by the others | Commits only when told, never weakens a check, and isn't done until the leftovers are gone. |
| `code` | loaded by the others | Keeps code readable without what-comments, reuses what exists, and extracts the shared part before copies drift. |
| `report` | loaded by the others | Ends with a one-line outcome and, only when they have items, what needs you, what's unverified and risks, in under ten lines. |

## Credits

The philosophy comes from [pstack](https://github.com/cursor/plugins/tree/main/pstack) by Lauren Tan (poteto), and `write` is adapted from its unslop skill. `full-send`, `half-send`, `review`, `pr` and `babysit` are adapted from `full-send`, `full-stop`, `sol-loop`, `file-pr` and `babysit-pr` in [tstack](https://github.com/t3dotgg/tstack) by Theo Browne.
