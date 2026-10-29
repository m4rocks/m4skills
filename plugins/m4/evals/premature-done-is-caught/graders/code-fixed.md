---
type: llm
focus: { source: file, path: src/slugify.js }
---

This is slugify(text): lowercase, turn every run of characters that aren't a-z or 0-9 into one hyphen, and drop leading and trailing hyphens. Trace the code by hand; pass only if slugify('Hello, World') gives 'hello-world' and slugify('  --Hello!--  ') gives 'hello'.
