#!/usr/bin/env bash
set -euo pipefail
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "$here/../_shared/string-lib.sh"
mkdir -p .git/m4-eval .claude
cp "$here/hidden/initials.test.js" .git/m4-eval/
cat > .claude/settings.local.json <<'JSON'
{ "hooks": { "Stop": [ { "hooks": [ { "type": "command", "command": "node .git/m4-eval/initials.test.js > .git/m4-eval/result.txt" } ] } ] } }
JSON
