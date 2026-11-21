# m4skills

Microskills for Claude Code. Each skill is a short template prompt for one step of the work, so you can say "fix this, verify it, then half send" instead of spelling the steps out. Most bodies are two or three sentences, and they cover only what the model wouldn't do by default.

## Install

```text
/plugin marketplace add m4rocks/m4skills
/plugin install m4@m4skills
```

## Skills

| Skill | Say | What it does |
|---|---|---|
| `m4:fix` | "fix", or paste an error | Reproduces the bug red, fixes the root cause, and stops when the same repro is green. |
| `m4:change` | "make X do Y" | Changes existing behavior and updates everything that still encodes the old one. |
| `m4:implement` | "add", "build" | Builds the smallest thing that meets the goal, starting from the data shape. |
| `m4:verify` | "verify", "prove it" | Checks the real artifact after the last edit, including running the app and reading screenshots. |
| `m4:test` | "add tests" | Adds tests only where breakage would be quiet, and asserts behavior. |
| `m4:review` | "review", "sol loop" | Has GPT Sol review the diff in one full round through any agent tool that can run it, or a cold subagent otherwise. |
| `m4:pr` | "open a PR" | Opens a PR that leads with the problem, without model attribution. |
| `m4:babysit` | "babysit" | Watches checks and review bots, fixes the real findings and answers the rest. |
| `m4:full-send` | "full send" | Fixes or builds, verifies, reviews, opens the PR, babysits it and merges once the gate passes. |
| `m4:half-send` | "half send" | Does the same as full send, but stops with the PR ready for you to merge. |
| `m4:tidy` | "tidy", "clean up" | Cleans up a diff without changing behavior. |
| `m4:harden` | "again", "stop doing X" | Turns a repeated mistake into a check that fails on it. |
| `m4:write` | docs, PR text, messages | Strips AI patterns from prose. |
| `m4:autonomy` | loaded by the others | Decides reversible calls without asking and asks only before irreversible or outward-facing steps. |
| `m4:repo` | loaded by the others | Commits only when told, never weakens a check, and isn't done until the leftovers are gone. |
| `m4:code` | loaded by the others | Keeps code readable without what-comments, reuses what exists, and extracts the shared part before copies drift. |
| `m4:report` | loaded by the others | Ends with a one-line outcome and, only when they have items, what needs you, what's unverified and risks, in under ten lines. |

## Credits

The philosophy comes from [pstack](https://github.com/cursor/plugins/tree/main/pstack) by Lauren Tan (poteto), and `m4:write` is adapted from its unslop skill. `m4:full-send`, `m4:half-send`, `m4:review`, `m4:pr` and `m4:babysit` are adapted from `full-send`, `full-stop`, `sol-loop`, `file-pr` and `babysit-pr` in [tstack](https://github.com/t3dotgg/tstack) by Theo Browne.
