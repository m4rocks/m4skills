---
max_turns: 40
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Bash, Edit, Write]
---

truncate('hello world', 5) gives 'hell…' but it should give 'hello…'. Can you fix it?
