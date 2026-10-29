---
type: regex
target: { source: file, path: src/capitalize.js }
pattern: 'console\.log|// const old|// uppercase the first'
match: not_contains
---
