---
name: explore
description: Use when the user asks how, where or why something in this codebase works, or wants it explained, walked through or an orientation. Skip when one file or search answers it, or when they want changes made.
---

# m4:explore

Open with one line: you're running m4:explore, which reads and explains and changes no files.

Read `../../principles.md` from this folder, unless it's already in context since the last compaction.

Follow the code from where the behavior enters, and for a "why" question read the history of the lines involved. Answer at the depth asked, cite `file:line`, and mark what you couldn't confirm. Use a call tree, file tree or pseudocode when it explains faster than prose. Mention surprises, such as inconsistencies, dead code and unwritten conventions, and offer to record them as tracker entries or CLAUDE.md lines, writing only on a yes.
