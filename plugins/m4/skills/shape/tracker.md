# m4:shape, writing to the tracker

1. Reconcile: when the tracker already has entries, add to the draft the behaviors the code already does and the entries this plan replaces, so they're approved with the rest.
2. Review: one cold read, as "Reviews" in the principles says, regardless of the Subagents setting. Give it only the entries and the paths of the code they touch. Ask where an implementer would have to guess, which behaviors can't be checked as written, and what contradicts another entry or the code. One round. Findings that need a decision go to the user as questions. You may fix pure wording yourself, but a wording change that could change what a behavior accepts is a decision. Never weaken an entry to clear a finding.
3. Show only the lines the review changed, marked in place, and for GitHub the issue split and labels. Write after the user approves.

Formats:

- PLAN.md: a `##` heading per feature. When creating the file, start it with `# Plan` and the line "One heading per feature: a line or two on what and why, then a checklist of behaviors. Check items off as the code does them; the code and the maintainer decide what is true."
- GitHub: prefer one issue with a `###` heading and checklist per feature. Split only when the features ship independently or one issue would be too long; then create a root issue, one issue per feature starting "Part of #root", and edit the root to list `- [ ] #N` lines. Use only existing labels from `gh label list` that clearly fit.
