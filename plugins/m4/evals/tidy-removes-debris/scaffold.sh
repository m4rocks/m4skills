#!/usr/bin/env bash
set -euo pipefail
bash "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/../_shared/string-lib.sh"
cat > src/capitalize.js <<'JS'
function capitalize(text) {
  // uppercase the first character and append the rest
  console.log('capitalize called with', text);
  // const old = text[0].toUpperCase() + text.substr(1);
  return text.charAt(0).toUpperCase() + text.slice(1);
}

module.exports = { capitalize };
JS
