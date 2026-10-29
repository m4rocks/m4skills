---
type: regex
target: { source: file, path: test/slugify.test.js }
pattern: 'slugify\(''Hello, World''\), ''hello-world''\)[\s\S]*slugify\(''  --Hello!--  ''\), ''hello''\)'
---
