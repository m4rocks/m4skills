---
name: tidy
description: Use when the user says tidy, clean up, polish or simplify a diff, branch or PR, or hands over review comments to address.
---

Follow m4:repo and m4:code. Touch only the named diff. Cut what-comments, debris, dead guards, one-caller wrappers and reimplemented helpers. Anything that changes behavior becomes a finding. Fix a finding only when it has a concrete failing case.
