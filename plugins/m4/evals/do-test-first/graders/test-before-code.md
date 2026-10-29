---
type: tool_order
before: { tool: Bash, input_match: 'node --test|npm (run )?test' }
after: { tool: Write, input_match: '"file_path"\s*:\s*"[^"]*src/slugify' }
---
