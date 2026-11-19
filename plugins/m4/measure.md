# m4 measuring

Read before the first edit when a change claims to be faster or lighter, or the goal is a number, since the baseline can't be taken afterwards.

Measure the current code on realistic data. Afterwards, run old and new alternately on the same data, several runs each, and report the numbers.

To climb a number, measure the start several times to learn the noise; a gain inside it isn't a gain. Make one change per round, aimed at the cause of what failed, and keep it only when it beats the noise. With a set of cases, hold some out unread and keep a change only when they improve too. Never copy a failing case into the prompt or the code. When two or three rounds bring nothing, stop and sort the failures by cause. Report the start and end with their spread.
