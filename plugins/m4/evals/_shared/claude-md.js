// Prints the CLAUDE.md m4:setup would write for the seeded string library, filled
// from the real template so the evals measure the prose users actually get.
const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(
  path.join(__dirname, '../../skills/setup/claude-template.md'),
  'utf8',
);

const settings = {
  'Tracker': 'PLAN.md',
  'Tests': 'always',
  'Commits': 'only when the maintainer says',
  'Pushes and pull requests': 'only when the maintainer says',
  // m4:setup drops the closing-issues setting for a PLAN.md tracker.
  'Closing issues': null,
  'Subagents': 'only when the maintainer asks',
};

const goldenRows = [
  '| a string helper | src/capitalize.js |',
  '| a test | test/capitalize.test.js |',
];

const lines = [];
for (const line of template.split(/\r?\n/)) {
  if (line.startsWith('{One sentence')) {
    lines.push('A tiny string-utilities library.');
  } else if (line.startsWith('{Commands') || line.startsWith('{GitHub variant:}') || line.startsWith('{Solo variant:}')) {
    continue;
  } else if (line.startsWith('{PLAN.md variant:} ') || line.startsWith('{Team variant:} ')) {
    lines.push(line.slice(line.indexOf('} ') + 2));
  } else if (line.startsWith('{One row')) {
    lines.push(...goldenRows);
  } else {
    const setting = line.match(/^- ([^:]+): \{/);
    if (!setting) lines.push(line);
    else if (settings[setting[1]] !== null) lines.push(`- ${setting[1]}: ${settings[setting[1]]}`);
  }
}

const result = lines.join('\n').replace(/\n{3,}/g, '\n\n');
const leftover = result.match(/\{[^}]*\}/);
if (leftover) throw new Error(`unfilled placeholder in CLAUDE.md template: ${leftover[0]}`);
process.stdout.write(result);
