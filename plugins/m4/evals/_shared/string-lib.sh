#!/usr/bin/env bash
# Seeds the workspace with a small string library set up for m4: the CLAUDE.md
# m4:setup would write, an empty PLAN.md, one helper as the golden file, and a passing test.
set -euo pipefail
git init -q
git config user.email eval@example.com
git config user.name eval
mkdir -p src test
printf '%s\n' '{ "name": "string-lib", "private": true, "scripts": { "test": "node --test" } }' > package.json
node "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/claude-md.js" > CLAUDE.md
printf '# Plan\n' > PLAN.md
cat > src/capitalize.js <<'JS'
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

module.exports = { capitalize };
JS
cat > test/capitalize.test.js <<'JS'
const test = require('node:test');
const assert = require('node:assert');
const { capitalize } = require('../src/capitalize');

test('uppercases the first letter', () => {
  assert.strictEqual(capitalize('hello'), 'Hello');
});
JS
git add -A
git commit -qm 'Add capitalize'
