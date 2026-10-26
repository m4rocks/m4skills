# m4skills

Seven Claude Code skills for building with agents. Each does one thing, says what it will touch, and reports what it changed. No subagents unless you allow them (except the one cold-read plan review in shape), no ticket graphs, no refusals over ordering.

## Install

In Claude Code:

```text
/plugin marketplace add m4rocks/m4skills
/plugin install m4@m4skills
```

## Skills

| Skill | Use when | Changes | Won't |
|---|---|---|---|
| `/m4:setup` | Setting up a repo, or changing preferences | CLAUDE.md, PLAN.md | Create doc folders or labels, overwrite your sections |
| `/m4:shape` | Shaping an idea into features | The tracker only | Write code, split work into ticket graphs or spikes |
| `/m4:do` | Building features whose behavior is known | Code, tests, tracker, commits | Spawn reviewers, refuse over ordering, push without PR mode |
| `/m4:fix` | Something is broken and the cause is unknown | Code, tests, tracker, commits | Patch symptoms with guards, leave debug logs |
| `/m4:explore` | Understanding unfamiliar code | Nothing | Write docs |
| `/m4:tidy` | Reviewing a diff before commit or merge | The diff's files | Change behavior without asking, widen scope |
| `/m4:harden` | The agent repeats a mistake you've corrected | Code, types, lint config, CLAUDE.md | Add a prose rule where a check can enforce it |

Start with `/m4:setup`. It interviews you, then writes a CLAUDE.md with your settings, code rules, and a line routing requests to the m4 skills so casual phrasing like "fix X" still uses them.

## Tracker

PLAN.md or GitHub issues, chosen in `m4:setup`: one entry per feature with a checklist of behaviors. It records intent; the code and you decide what is true. Agents check off what the code already does, add entries for unlisted requests, and treat order as a suggestion.
