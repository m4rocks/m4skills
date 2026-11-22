---
name: tidy
description: Tidy, clean up, polish, simplify a diff/PR, or address review comments.
---

Follow `repo` and `code`. Touch only the named diff. Cut what-comments, debris, dead guards, one-caller wrappers and reimplemented helpers. Anything that changes behavior becomes a finding. Fix a finding only when it has a concrete failing case.
