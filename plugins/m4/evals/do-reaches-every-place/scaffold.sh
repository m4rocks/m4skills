#!/usr/bin/env bash
set -euo pipefail
bash "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/../_shared/string-lib.sh"
cat > src/index.js <<'JS'
module.exports = {
  ...require('./capitalize'),
};
JS
cat > README.md <<'MD'
# string-lib

Small string helpers, all exported from `src/index.js`.

- `capitalize(text)`: uppercases the first letter.
MD
git add -A
git commit -qm 'Add index and README'
