#!/usr/bin/env node
// m4:do's check gate. The state lives in the repo's git dir, so it is never
// committed and each worktree gets its own.
//
//   check.js set <command>    the command that must pass before a turn can end
//   check.js freeze <file>... test files the agent may not edit while the check is set
//   check.js clear            drop the check and the frozen list, only once the check passes
//   check.js clear --abandon  drop them while the check still fails
//   check.js status           print both
//   check.js gate             Stop hook: block while the check fails
//   check.js guard            PreToolUse hook: deny edits to frozen files

const { execFileSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHECK_TIMEOUT_MS = 10 * 60 * 1000;
const OUTPUT_TAIL_LINES = 60;
const SCRIPT = path.resolve(__filename);

function git(cwd, args) {
  try {
    return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null;
  }
}

function locate(cwd) {
  const gitDir = git(cwd, ['rev-parse', '--absolute-git-dir']);
  const root = git(cwd, ['rev-parse', '--show-toplevel']);
  if (!gitDir || !root) return null;
  const dir = path.join(gitDir, 'm4');
  return { root, checkFile: path.join(dir, 'check'), frozenFile: path.join(dir, 'frozen') };
}

function readLines(file) {
  try {
    return fs.readFileSync(file, 'utf8').split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

function repoRelative(root, cwd, file) {
  return path.relative(root, path.resolve(cwd, file)).split(path.sep).join('/');
}

function readHookInput() {
  try {
    return JSON.parse(fs.readFileSync(0, 'utf8'));
  } catch {
    return {};
  }
}

function tail(text, lines) {
  const all = text.trimEnd().split('\n');
  return all.slice(-lines).join('\n');
}

// Returns null when the check passes, otherwise a report of the failure.
function runCheck(root, command) {
  const run = spawnSync(command, {
    shell: true,
    cwd: root,
    encoding: 'utf8',
    timeout: CHECK_TIMEOUT_MS,
    maxBuffer: 64 * 1024 * 1024,
  });
  if (run.status === 0) return null;
  const outcome = run.error ? `did not finish (${run.error.message})` : `exited ${run.status ?? run.signal}`;
  return (
    `m4:do check still fails: \`${command}\` ${outcome}.\n` +
    `Make the code pass it. If it can't pass, or you need the user's answer first, ` +
    `run \`node "${SCRIPT}" clear --abandon\` and say why in your reply.\n\n` +
    tail(`${run.stdout || ''}\n${run.stderr || ''}`, OUTPUT_TAIL_LINES) +
    '\n'
  );
}

function gate() {
  const input = readHookInput();
  const where = locate(input.cwd || process.cwd());
  if (!where) return 0;
  const [command] = readLines(where.checkFile);
  if (!command) return 0;
  const failure = runCheck(where.root, command);
  if (!failure) return 0;
  process.stderr.write(failure);
  return 2;
}

function guard() {
  const input = readHookInput();
  const cwd = input.cwd || process.cwd();
  const where = locate(cwd);
  if (!where) return 0;
  const target = input.tool_input && (input.tool_input.file_path || input.tool_input.notebook_path);
  if (!target) return 0;
  const frozen = readLines(where.frozenFile);
  if (!frozen.includes(repoRelative(where.root, cwd, target))) return 0;

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason:
          `${target} is a test m4:do confirmed failing for the right reason, so it is frozen while you make the code pass it. ` +
          `Change the code. If the test's expectation is wrong, ask the user, and on their yes run ` +
          `\`node "${SCRIPT}" clear --abandon\` before editing it.`,
      },
    }),
  );
  return 0;
}

function main([command, ...args]) {
  if (command === 'gate') return gate();
  if (command === 'guard') return guard();

  const where = locate(process.cwd());
  if (!where) {
    process.stderr.write('check.js: not inside a git repository\n');
    return 1;
  }
  fs.mkdirSync(path.dirname(where.checkFile), { recursive: true });

  if (command === 'set' && args.length) {
    fs.writeFileSync(where.checkFile, args.join(' ') + '\n');
    return 0;
  }
  if (command === 'freeze' && args.length) {
    const frozen = new Set(readLines(where.frozenFile));
    for (const file of args) frozen.add(repoRelative(where.root, process.cwd(), file));
    fs.writeFileSync(where.frozenFile, [...frozen].join('\n') + '\n');
    return 0;
  }
  if (command === 'clear') {
    const [check] = readLines(where.checkFile);
    const failure = check && !args.includes('--abandon') && runCheck(where.root, check);
    if (failure) {
      process.stderr.write(failure);
      return 1;
    }
    fs.rmSync(where.checkFile, { force: true });
    fs.rmSync(where.frozenFile, { force: true });
    return 0;
  }
  if (command === 'status') {
    const [check] = readLines(where.checkFile);
    process.stdout.write(`check: ${check || '(none)'}\nfrozen: ${readLines(where.frozenFile).join(', ') || '(none)'}\n`);
    return 0;
  }
  process.stderr.write('usage: check.js set <command> | freeze <file>... | clear [--abandon] | status | gate | guard\n');
  return 1;
}

process.exitCode = main(process.argv.slice(2));
