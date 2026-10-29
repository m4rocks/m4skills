#!/usr/bin/env bash
set -euo pipefail
bash "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/../_shared/string-lib.sh"
cat > src/slugify.js <<'JS'
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

module.exports = { slugify };
JS
cat > test/slugify.test.js <<'JS'
const test = require('node:test');
const assert = require('node:assert');
const { slugify } = require('../src/slugify');

test('turns runs of other characters into one hyphen', () => {
  assert.strictEqual(slugify('Hello, World'), 'hello-world');
});

test('drops leading and trailing hyphens', () => {
  assert.strictEqual(slugify('  --Hello!--  '), 'hello');
});
JS
mkdir -p .git/m4
echo 'node --test test/slugify.test.js' > .git/m4/check
echo 'test/slugify.test.js' > .git/m4/frozen
