# m4skills

Eight Claude Code skills for building with agents. Each does one thing, says what it will touch, and reports what it changed. No subagents unless you allow them (except the one cold-read plan review in shape), no ticket graphs, no refusals over ordering.

## Install

In Claude Code:

```text
/plugin marketplace add m4rocks/m4skills
/plugin install m4@m4skills
```

## Skills

| Skill | Use when | Changes | Won't |
|---|---|---|---|
| `/m4:setup` | Setting up a repo, changing preferences, or refreshing a CLAUDE.md from an older m4 | CLAUDE.md, PLAN.md | Create doc folders or labels, overwrite your sections |
| `/m4:shape` | Shaping an idea into features | The tracker only | Write code, split work into ticket graphs or spikes |
| `/m4:do` | Building features whose behavior is known | Code, tests, tracker, commits | Spawn reviewers, refuse over ordering, push without PR mode |
| `/m4:fix` | Something is broken and the cause is unknown | Code, tests, tracker, commits | Patch symptoms with guards, leave debug logs |
| `/m4:explore` | Understanding unfamiliar code | Nothing | Write docs |
| `/m4:tidy` | Cleaning up a diff, or working through review comments and `/code-review` findings | The diff's files | Hunt bugs (that's `/code-review`), change behavior without asking, widen scope |
| `/m4:harden` | The agent repeats a mistake you've corrected | Code, types, lint config, CLAUDE.md | Add a prose rule where a check can enforce it |
| `/m4:unslop` | Before the agent writes docs, commit or PR text, or tracker entries, or when you hand it text to clean up | The draft text | Change meaning or tone |

Start with `/m4:setup`, which runs only when you type it. It interviews you, then writes a CLAUDE.md with your settings, code rules, a golden-files table naming the file to copy for each kind of code the repo repeats, and a line routing requests to the m4 skills so casual phrasing like "fix X" still uses them.

## Checks, not guesses

`/m4:do` finishes each feature on a command passing, not on the code looking done. The feature's test has to fail for the right reason before any code is written, the agent tries inputs the test doesn't cover before calling it done, and every claim that it works quotes a run made after the last edit. The skill steers rather than enforces: no hooks, nothing to install.

## Evals

`plugins/m4/evals/` holds cases that run a skill on a small seeded repo, with and without the plugin, so a change to a skill can be measured instead of guessed. Only cases where the arms differ are kept: a case both arms pass measures nothing, and the skill text behind it is cut, since the model does it unprompted. The seeded repo gets the CLAUDE.md `/m4:setup` would write, so the cases measure the template too. Shell tools need a sandbox, so run them on Linux or macOS:

```text
cd plugins/m4
claude plugin eval . --scaffold --allow-tools Write Edit "Bash(node *)" "Bash(npm *)" "Bash(git *)"
```

To see what one section of a skill is worth, `evals/_shared/ablate.js` copies the plugin once per section with that section removed, and the same command run inside a copy with `--ablation none` scores it:

```text
node evals/_shared/ablate.js do /tmp/variants Checks Tests "Shaping the code" Report
```

## Credits

`/m4:unslop` is adapted from the unslop skill by poteto. The rule numbers come from their skill.

The test rules in `/m4:do`, the debugging techniques in `/m4:fix` and the review-comment steps in `/m4:tidy` are adapted from [superpowers](https://github.com/obra/superpowers) by Jesse Vincent. The golden-files table and the new-file check are adapted from `inherit-legacy-style` and `gateguard` in [everything-claude-code](https://github.com/affaan-m/everything-claude-code) by Affaan Mustafa.

## Tracker

PLAN.md or GitHub issues, chosen in `m4:setup`: one entry per feature with a checklist of behaviors. It records intent; the code and you decide what is true. Agents check off what the code already does, add entries for unlisted requests, and treat order as a suggestion.
