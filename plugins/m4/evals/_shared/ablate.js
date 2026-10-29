// Copies this plugin once per heading, each copy with that ## section of a skill
// removed, so a section's effect can be measured by running the evals on the copy.
//
//   node ablate.js <skill> <out dir> <heading>...
//   node ablate.js do /tmp/variants Checks Tests "Shaping the code" Report
const fs = require('fs');
const path = require('path');

const [skill, out, ...headings] = process.argv.slice(2);
if (!skill || !out || headings.length === 0) {
  console.error('usage: node ablate.js <skill> <out dir> <heading>...');
  process.exit(1);
}
const plugin = path.join(__dirname, '../..');

function withoutSection(text, heading) {
  const lines = text.split(/\r?\n/);
  const start = lines.indexOf(`## ${heading}`);
  if (start < 0) throw new Error(`no "## ${heading}" section in ${skill}`);
  let inFence = false;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    // Headings inside a fenced block, like a PR template, don't end the section.
    if (lines[i].startsWith('```')) inFence = !inFence;
    if (!inFence && lines[i].startsWith('## ')) {
      end = i;
      break;
    }
  }
  return [...lines.slice(0, start), ...lines.slice(end)].join('\n');
}

for (const heading of headings) {
  const name = `no-${heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const dest = path.join(out, name);
  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(plugin, dest, {
    recursive: true,
    filter: (file) => path.relative(plugin, file) !== path.join('evals', 'results'),
  });
  const file = path.join(dest, 'skills', skill, 'SKILL.md');
  const before = fs.readFileSync(file, 'utf8');
  const after = withoutSection(before, heading);
  fs.writeFileSync(file, after);
  console.log(`${dest}: ${before.split(/\s+/).length} -> ${after.split(/\s+/).length} words`);
}
