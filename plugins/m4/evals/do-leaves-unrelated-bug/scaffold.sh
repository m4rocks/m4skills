#!/usr/bin/env bash
set -euo pipefail
bash "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/../_shared/string-lib.sh"
cat > src/count.js <<'JS'
function wordCount(text) {
  return text.split(' ').length;
}

function lineCount(text) {
  return text.split('\n').length;
}

module.exports = { wordCount, lineCount };
JS
cat > test/count.test.js <<'JS'
const test = require('node:test');
const assert = require('node:assert');
const { wordCount, lineCount } = require('../src/count');

test('counts words separated by spaces', () => {
  assert.strictEqual(wordCount('a b c'), 3);
});

test('counts lines', () => {
  assert.strictEqual(lineCount('a\nb'), 2);
});
JS
git add -A
git commit -qm 'Add word and line counts'
