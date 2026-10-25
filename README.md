# m4skills

Seven skills for building with coding agents. Each does one thing, says what it will touch, and reports what it changed. No subagents unless you allow them, no ticket graphs, no refusals over ordering.

## Install

Claude Code:

```text
/plugin marketplace add m4rocks/m4skills
/plugin install m4@m4skills
```

Codex:

```shell
codex plugin marketplace add m4rocks/m4skills
```

Then install `m4` from the Codex plugins directory.

## Skills

| Skill | Use when | Changes | Won't |
|---|---|---|---|
| `m4init` | Setting up a repo, or changing preferences | AGENTS.md, an import line in CLAUDE.md, PLAN.md | Create doc folders or labels, overwrite your sections |
| `m4plan` | Shaping an idea into features | The tracker only | Write code, split work into ticket graphs or spikes |
| `m4do` | Building features whose behavior is known | Code, tests, tracker, commits | Spawn reviewers, refuse over ordering, push without PR mode |
| `m4fix` | Something is broken and the cause is unknown | Code, tests, tracker, commits | Patch symptoms with guards, leave debug logs |
| `m4explore` | Understanding unfamiliar code | Nothing | Write docs |
| `m4tidy` | Reviewing a diff before commit or merge | The diff's files | Change behavior without asking, widen scope |
| `m4harden` | The agent repeats a mistake you've corrected | Code, types, lint config, AGENTS.md | Add a prose rule where a check can enforce it |

Start with `m4init`. It interviews you, then writes an AGENTS.md that every harness reading that file follows, whether or not m4 is installed.

## Tracker

PLAN.md or GitHub issues, chosen in `m4init`: one entry per feature with a checklist of behaviors. It records intent; the code and you decide what is true. Agents check off what the code already does, add entries for unlisted requests, and treat order as a suggestion.
