# m4skills

Seven Claude Code skills for building with agents. Each does one thing, says what it will touch, and reports what it changed. No subagents unless you allow them (except one cold-read reviewer, of a plan in shape and of the diff in autonomous mode, which is GPT Sol when the harness can call it, as in t3code or Claudiu, and a native subagent otherwise), no ticket graphs, no refusals over ordering.

## Install

In Claude Code:

```text
/plugin marketplace add m4rocks/m4skills
/plugin install m4@m4skills
```

## Skills

| Skill | Use when | Changes | Won't |
|---|---|---|---|
| `/m4:shape` | Shaping an idea into features | Nothing, or the tracker when you send the plan there | Write code, write the plan anywhere before you choose, split work into ticket graphs or spikes |
| `/m4:do` | Building a feature or carrying out a task whose behavior is known | Code, tests, tracker, commits; in autonomous mode a branch, a pull request and the merge | Spawn reviewers when you're watching, refuse over ordering, push unless you, the settings or autonomous mode said to |
| `/m4:fix` | Something is broken, or you want to know why it behaves as it does | Code, tests, tracker, commits; in autonomous mode a branch, a pull request and the merge | Patch symptoms with guards, leave debug logs |
| `/m4:explore` | Understanding unfamiliar code | Nothing | Write docs |
| `/m4:tidy` | Cleaning up a diff, or working through review comments and `/code-review` findings | The diff's files | Hunt bugs (that's `/code-review`), change behavior without asking, widen scope |
| `/m4:harden` | The agent repeats a mistake you've corrected, or you want a retro on a session | Code, types, lint config, REVIEW.md, CLAUDE.md | Add a prose rule where a check can enforce it, change anything after a retro before you pick |
| `/m4:unslop` | Before the agent writes docs, PR text or tracker entries, or when you hand it text to clean up | The draft text | Change meaning or tone |

There is nothing to set up. Every skill reads `plugins/m4/principles.md` before it starts, which holds the rules they share: when to ask and when to decide, that what you say holds for the session, finishing everything a change reaches, and how to report. The skills that change code also read `plugins/m4/code.md`: the code rules, when other repos are part of the work, and how to find the file to copy for each kind of code the repo repeats. Three more files load only when a task needs them: `autonomous.md` when you hand the work over, `pr.md` when a pull request opens, and `measure.md` when the goal is speed, size or another number. The principles also set defaults: PLAN.md as the tracker when the repo has one, tests where a cheap seam exists, and commits, pushes and subagents only when you say. To change a default for good, put it in your repo's CLAUDE.md, such as `Commits: one per feature, without asking` or `Tracker: GitHub issues in owner/repo`, and the skills follow it. Casual phrasing like "fix X" reaches the right skill through each skill's description.

## Checks, not guesses

`/m4:do` finishes each feature on a command passing, not on the code looking done. The feature's test has to fail for the right reason before any code is written, the agent tries inputs the test doesn't cover before calling it done, and every claim that it works quotes a run made after the last edit. When the goal is a number, such as speed or how often a prompt gets it right, it climbs one change at a time, keeps only gains larger than chance, and holds some cases back to catch a change that only fits the ones it read. The skill steers rather than enforces: no hooks, nothing to install.

## Finishing the job

`/m4:do` and `/m4:fix` look for everything a change reaches, including docs the request didn't name, and treat those as part of the work. Other repos join in when the change touches a public name, an API, a schema or documented behavior. A small local change takes a short path: a check that fails first and passes after, without the repo search, the walk-through or screenshots of views that didn't change. When you say "commit and push to next", that holds for the rest of the session: later fixes and other repos follow without asking again, and a branch you never named is still a question. Before stopping, the agent pictures your next message and does the work it would ask for.

## Autonomous mode

`/m4:do` and `/m4:fix` run watched by default. Hand the work over in your own words, such as "full send" or "I'm not watching, merge it when it's green", and the agent takes the change as far as you allowed with nobody watching. It proves the change with output from the session, has one reviewer without the conversation read the diff unless the change is a bug fix, opens the pull request, fixes what the checks and review bots find, and merges when the gate passes: required checks passing on the latest commit, no review requesting changes, the branch up to date, and nothing landed on the default branch since the last passing run that touches the same files.

The merge is the default stop point, and your words can set an earlier one: "let me review it", "don't merge" or "half send" stops with the pull request ready for you to merge, "don't push" stops at local commits, and "leave it uncommitted" stops at a verified working tree. Handing over overrides the commits and pushes settings for that task, and autonomy that is only implied doesn't count. The agent doesn't stop to ask along the way: it makes the calls and lists them in the report, and when it can't prove the change or pass the gate it leaves the pull request open. Only a step that can't be taken back, such as deleting data or touching production, waits for you.

## Credits

`/m4:unslop` is adapted from the unslop skill by poteto. The rule numbers come from their skill.

The test rules in `/m4:do`, the debugging techniques in `/m4:fix` and the review-comment steps in `/m4:tidy` are adapted from [superpowers](https://github.com/obra/superpowers) by Jesse Vincent. The golden-files table and the new-file check are adapted from `inherit-legacy-style` and `gateguard` in [everything-claude-code](https://github.com/affaan-m/everything-claude-code) by Affaan Mustafa.

Autonomous mode is adapted from `full-send`, `full-stop`, `sol-loop`, `file-pr` and `babysit-pr` in [tstack](https://github.com/t3dotgg/tstack) by Theo Browne. The retro in `/m4:harden` is adapted from the `retro` skill in [skills](https://github.com/mattpocock/skills) by Matt Pocock.

Property tests, REVIEW.md as the home for review-time rules, fixing every instance of a finding, the pre-existing label, reports that open with what waits on you, and climbing a number against held-out cases come from Anthropic's posts on [verification](https://claude.dev/blog/how-the-claude-code-team-thinks-about-verification/), [code review](https://claude.dev/blog/solving-code-review-at-anthropic/), [eval design and hillclimbing](https://claude.dev/blog/automating-eval-design-and-hillclimbing/) and [Opus 5.5](https://claude.dev/blog/getting-the-most-out-of-opus-5-5/).

## Tracker

PLAN.md when the repo has one, or GitHub issues when CLAUDE.md or you say so: one entry per feature with a checklist of behaviors. It records intent; the code and you decide what is true. Agents check off what the code already does and treat order as a suggestion. They never add an entry or open an issue on their own: a request that isn't listed is built without one, and anything else is asked first with its text.
