---
name: unslop
description: Use before writing prose that lands somewhere, such as docs, a README, pull request text, tracker entries or a message to another person, and whenever the user says unslop, de-AI or humanize. Skip for code, code comments, commit messages and chat replies.
---

# m4:unslop

Adapted from the unslop skill by poteto; the rule numbers are theirs.

Draft, scan for the patterns below, rewrite, then write it out; when the user hands you text, edit that. Keep the meaning and tone, and add nothing the source didn't say. Where a rule wants a mechanism or number you don't have, cut the sentence.

## Patterns

3. **Superficial -ing phrases** ("highlighting...", "ensuring..."). Delete them or back them with a source.
5. **Vague attributions** ("experts believe"). Name the source or delete.
7. **AI vocabulary**: additionally, crucial, delve, enduring, enhance, fostering, garner, interplay, intricate, landscape, pivotal, showcase, tapestry, testament, underscore, vibrant. Use plain words.
8. **Fancy "is"**: serves as, stands as, boasts, features. Say "is" or "has".
9. **"Not just X, but Y."** State the point.
10. **Forced groups of three.** Use the natural number.
11. **Synonym cycling.** Pick one term and repeat it.
12. **False ranges**: "from X to Y" with no real scale. List the items.
13. **Em dashes.** Use none, and no en dashes, parentheses or hyphens in their place; use a period or comma.
14. **Mid-sentence colons.** Use colons before a list or example, not as connectors.
15. **Bold overuse.** Don't bold every name.
16. **Inline-header lists** where a bold label restates the line ("**Performance:** Performance improved"). Write prose. A bold lead-in that names the item before new detail is fine.
17. **Title case headings.** Use sentence case.
18. **Decorative emojis.** Remove them.
19. **Curly quotes.** Use straight ones.
20. **Chatbot phrases**: "I hope this helps!", "Certainly!". Remove them.
22. **Sycophancy**: "Great question!" Answer directly.
23. **Filler**: "in order to" is "to", "due to the fact that" is "because".
24. **Stacked hedges.** One "may" is enough.
25. **Generic conclusions** ("the future looks bright"). State plans or facts.
26. **Abstract metaphor nouns**: substrate, wedge, vector, locus, nexus, primitive, harness, surface, bedrock, scaffolding, paradigm, gold-plating, ratchet, north star, flywheel. Use the concrete word.
27. **Feelings instead of facts.** "SQL you can read" becomes "`.toSQL()` returns the exact string sent to the database". Cut a sentence that could sit unchanged in another project's docs.
28. **Dense sentences.** One idea per sentence.
29. **Passive voice.** Name the actor unless it's unknown.
30. **Adverbs.** Use a stronger verb or the number.
31. **Fancy words**: utilize and leverage are "use", facilitate is "help", numerous is "many".
32. **Mannered prose**: aphorisms, rhetorical fragments, personified code, figurative verbs. Say it literally.
33. **Over-compression**: dropped articles, verbless fragments, arrows, abbreviations. Write whole sentences.
