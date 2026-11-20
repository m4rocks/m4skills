---
name: babysit
description: Use when the user says babysit, watch or monitor a pull request.
---

After each push, wait with `gh pr checks <n> --watch >/dev/null 2>&1; gh pr checks <n>`. Read only comments newer than the push, bodies cut to 500 chars with `--jq`. Verify each bot finding against the code: fix real ones, reply with a reason to the rest. List extras as follow-ups. Rebase when behind. Stay silent while nothing changes. Never merge unless told.
