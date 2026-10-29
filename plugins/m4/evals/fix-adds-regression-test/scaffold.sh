#!/usr/bin/env bash
set -euo pipefail
bash "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/../_shared/string-lib.sh"
cat > src/truncate.js <<'JS'
function truncate(text, length) {
  if (text.length <= length) return text;
  return text.slice(0, length - 1) + '…';
}

module.exports = { truncate };
JS
git add -A && git commit -qm 'Add truncate'
