---
name: change
description: Use when the user wants existing behavior to work differently, such as 'make X do Y', 'I want X to...' or 'change how X works'.
---

Follow m4:autonomy, m4:repo and m4:code. Change the behavior at its source, then update every caller, doc, config and test that encodes the old one. Delete the old path instead of keeping a compatibility shim. Add tests per m4:test, only where it calls for them. Prove it per m4:verify.
