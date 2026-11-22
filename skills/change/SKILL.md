---
name: change
description: Change existing behavior ('make X do Y', 'I want X to...').
---

Follow `autonomy`, `repo` and `code`. Change the behavior at its source, then update every caller, doc, config and test that encodes the old one. Delete the old path instead of keeping a compatibility shim. Add tests per `test`, only where it calls for them. Prove it per `verify`.
