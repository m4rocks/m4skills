---
name: explore
description: Use when the user asks how, where or why something works in this codebase, says explain, walk me through or get oriented, or is new to the code. Skip when one file or search answers it, or when they want changes made.
---

# m4:explore

Start with one line: you are running m4:explore, which reads and explains and changes no files.

Read the actual code, starting from where the behavior enters (a route, a command, an event, a public function) and following it through. For "why" questions, read the git history of the lines involved. Answer at the depth the user asked for, citing `file:line` so they can follow along.

Use a small text view when it explains faster than prose: a call tree for control flow, a file tree for where things live, pseudocode for an algorithm.

Mention what surprised you: inconsistencies, dead code, conventions the code follows that no file writes down. Offer to add the problems as tracker entries, and the conventions to CLAUDE.md, including golden-files rows for kinds of code the table misses. Write them only if the user agrees.
