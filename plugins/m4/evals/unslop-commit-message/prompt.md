---
max_turns: 10
allowed_tools: [Read, Skill]
---

Write a commit message for this change: I renamed getUser to fetchUser across the API client and updated the three call sites, because functions named get-something in this codebase never touch the network and this one does.
