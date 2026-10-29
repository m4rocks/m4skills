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
  'Closing issues': 'ask first',
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
  } else if (line.startsWith('{Commands') || line.startsWith('{GitHub variant:}')) {
    continue;
  } else if (line.startsWith('{PLAN.md variant:} ')) {
    lines.push(line.slice('{PLAN.md variant:} '.length));
  } else if (line.startsWith('{One row')) {
    lines.push(...goldenRows);
  } else {
    const setting = line.match(/^- ([^:]+): \{/);
    lines.push(setting ? `- ${setting[1]}: ${settings[setting[1]]}` : line);
  }
}

const result = lines.join('\n').replace(/\n{3,}/g, '\n\n');
const leftover = result.match(/\{[^}]*\}/);
if (leftover) throw new Error(`unfilled placeholder in CLAUDE.md template: ${leftover[0]}`);
process.stdout.write(result);
