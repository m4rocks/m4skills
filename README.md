# m4skills

Ten Claude Code skills for building with agents. Each does one thing, says what it will touch, and reports what it changed. No subagents unless you allow them (except one cold-read reviewer, of a plan in shape and of the diff in full send and half send), no ticket graphs, no refusals over ordering.

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
| `/m4:shape` | Shaping an idea into features | Nothing, or the tracker when you send the plan there | Write code, write the plan anywhere before you choose, split work into ticket graphs or spikes |
| `/m4:do` | Building features whose behavior is known | Code, tests, tracker, commits | Spawn reviewers, refuse over ordering, push unless you or the settings said to |
| `/m4:fix` | Something is broken and the cause is unknown | Code, tests, tracker, commits | Patch symptoms with guards, leave debug logs |
| `/m4:explore` | Understanding unfamiliar code | Nothing | Write docs |
| `/m4:tidy` | Cleaning up a diff, or working through review comments and `/code-review` findings | The diff's files | Hunt bugs (that's `/code-review`), change behavior without asking, widen scope |
| `/m4:harden` | The agent repeats a mistake you've corrected, or you want a retro on a session | Code, types, lint config, CLAUDE.md | Add a prose rule where a check can enforce it, change anything after a retro before you pick |
| `/m4:full-send` | You say "full send" and stop watching | Code, tests, tracker, commits, a pull request, the merge | Merge before the gate passes, go around branch protection, run without those words |
| `/m4:half-send` | You say "half send": the same, stopping at ready to merge | Code, tests, tracker, commits, a pull request | Merge, or leave auto-merge on |
| `/m4:unslop` | Before the agent writes docs, commit or PR text, or tracker entries, or when you hand it text to clean up | The draft text | Change meaning or tone |

Start with `/m4:setup`, which runs only when you type it. It interviews you, then writes a CLAUDE.md with your settings, code rules, a golden-files table naming the file to copy for each kind of code the repo repeats, and a line routing requests to the m4 skills so casual phrasing like "fix X" still uses them.

## Checks, not guesses

`/m4:do` finishes each feature on a command passing, not on the code looking done. The feature's test has to fail for the right reason before any code is written, the agent tries inputs the test doesn't cover before calling it done, and every claim that it works quotes a run made after the last edit. The skill steers rather than enforces: no hooks, nothing to install.

## Finishing the job

`/m4:do` and `/m4:fix` look for everything a change reaches, including other repos and docs the request didn't name, and treat those as part of the work. When you say "commit and push to next", that holds for the rest of the session: later fixes and other repos follow without asking again, and a branch you never named is still a question. Before stopping, the agent pictures your next message and does the work it would ask for.

## Sending it

Say "full send" and the agent takes the change to a merged pull request with nobody watching. It proves the change with output from the session, has one reviewer without the conversation read the diff, opens the pull request, fixes what the checks and review bots find, and merges when the gate passes: required checks passing on the latest commit, no review requesting changes, the branch up to date, and nothing landed on the default branch since the last passing run that touches the same files. "Half send" does the same and stops with the pull request ready for you to merge. Either phrase overrides the commits and pushes settings for that task, and neither runs unless you say it.

## Credits

`/m4:unslop` is adapted from the unslop skill by poteto. The rule numbers come from their skill.

The test rules in `/m4:do`, the debugging techniques in `/m4:fix` and the review-comment steps in `/m4:tidy` are adapted from [superpowers](https://github.com/obra/superpowers) by Jesse Vincent. The golden-files table and the new-file check are adapted from `inherit-legacy-style` and `gateguard` in [everything-claude-code](https://github.com/affaan-m/everything-claude-code) by Affaan Mustafa.

`/m4:full-send` and `/m4:half-send` are adapted from `full-send`, `full-stop`, `sol-loop`, `file-pr` and `babysit-pr` in [tstack](https://github.com/t3dotgg/tstack) by Theo Browne. The retro in `/m4:harden` is adapted from the `retro` skill in [skills](https://github.com/mattpocock/skills) by Matt Pocock.

## Tracker

PLAN.md or GitHub issues, chosen in `m4:setup`: one entry per feature with a checklist of behaviors. It records intent; the code and you decide what is true. Agents check off what the code already does and treat order as a suggestion. They never add an entry or open an issue on their own: a request that isn't listed is built without one, and anything else is asked first with its text.
