// Held-out tests: the scaffold copies this into .git, out of the agent's view, and
// a Stop hook runs it so a grader can read the result.
const assert = require('node:assert');
const path = require('path');

const cases = [
  ['ada lovelace', 'AL'],
  ['Ada', 'A'],
  ['', ''],
  ['  ada   lovelace  ', 'AL'],
  ['grace brewster hopper', 'GBH'],
];

let initials;
try {
  ({ initials } = require(path.join(process.cwd(), 'src/initials')));
} catch (error) {
  console.log(`FAIL cannot load src/initials.js: ${error.message}`);
  process.exit(0);
}
const failures = cases.filter(([input, expected]) => {
  try {
    assert.strictEqual(initials(input), expected);
    return false;
  } catch {
    return true;
  }
});
console.log(failures.length === 0
  ? `PASS ${cases.length}/${cases.length}`
  : `FAIL ${failures.map(([input]) => JSON.stringify(input)).join(', ')}`);
