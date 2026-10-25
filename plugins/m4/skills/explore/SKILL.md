---
name: explore
description: Explain how part of this codebase works, including its structure, data flow, where things live and the conventions it follows. Use when the user asks how something works, where something is, why it is built a certain way, or wants to get oriented in unfamiliar code.
---

# m4:explore

Start with one line: you are running m4:explore, which reads and explains and changes no files.

Read the actual code, starting from where the behavior enters (a route, a command, an event, a public function) and following it through. For "why" questions, read the git history of the lines involved. Answer at the depth the user asked for, citing `file:line` so they can follow along.

Use a small text view when it explains faster than prose: a call tree for control flow, a file tree for where things live, pseudocode for an algorithm.

Mention what surprised you: inconsistencies, dead code, conventions the code follows that no file writes down. Offer to add the problems as tracker entries and the conventions to AGENTS.md, and write them only if the user agrees.
