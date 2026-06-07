---
layout: article
title: Watching the Match Is the Best Way to Understand Football — But Data Closes the Loop
date: 2026-06-07 22:30:00 +0800
tags: Analysis
mode: immersive
header:
  theme: dark
article_header:
  type: overlay
  theme: dark
  background_color: '#142019'
  background_image:
    gradient: 'linear-gradient(135deg, rgba(195, 60, 34, .4), rgba(120, 30, 20, .4))'
    src: /assets/images/covers/cover-sunset-hills.jpg
---

Watching match footage is still the most authentic way to understand how a
team plays and what a player can truly do. Nothing replaces sitting through
90 minutes to feel the rhythm, the spacing, the moments of brilliance and
panic.

But video is expensive. Time-expensive. Attention-expensive. You can't scout
every team, every match, every season this way.

<!--more-->

That's where data earns its place — not to replace the eye test, but to make
decisions efficient. And if someone tells you "data is useless, only the
match matters," what they really mean is they haven't found the right data to
reflect what the match is showing.

Recently, I tested this idea on Arsenal's 2024–25 season.

Using only public match data from Sofascore — no Opta, no StatsBomb, just
freely available stats — I broke down Arteta's open-play structure into three
distinct attacking patterns:

- **Pattern A · Right-Side Overload (~55%, primary)** — White inverts high,
  Ødegaard occupies the right halfspace, Saka isolates the left-back. The
  chain ends in a cross or cut-back to the centre forward.
- **Pattern B · Left Isolation / Underlap (~25%)** — Martinelli pinned wide,
  Calafiori underlaps, low cut-back to Merino.
- **Pattern C · Vertical Transition (~20%)** — Rice and Raya spring play
  vertically; Havertz drops to link, the wingers attack the channels.

For each pattern I drew three views: a role-link map (the shape of the
pattern), a per-player focus grid (each role's linkages in isolation), and a
role-execution grading pitch (how well each role actually performed its task,
with the chain's bottleneck ringed in black).

## Pattern A · Right-Side Overload (~55%)

![Pattern A — role-link map](/assets/images/posts/arsenal-attack-patterns/rolemap_pattern_a.png)

The primary pattern. The heavy links live on the right: Saliba's carry into
White and Ødegaard, the Saka–Ødegaard–White triangle, then a cross or
cut-back. The per-player grid shows how concentrated the structure is —
Ødegaard and Saka's panels are dense, Martinelli's nearly empty.

![Pattern A — per-player linkages](/assets/images/posts/arsenal-attack-patterns/focus_grid_pattern_a.png)

Grading the execution role by role: Saliba A+, Rice A+, Saka A+, Ødegaard A.
The build and progression phases are elite. Then the chain reaches the box.

![Pattern A — role-execution grading](/assets/images/posts/arsenal-attack-patterns/grading_pattern_a.png)

The bottleneck — the dark ring — sits on the centre forward. Havertz grades C:
big-chance conversion poor. Every upstream role does its job; the last one
doesn't.

## Pattern B · Left Isolation / Underlap (~25%)

![Pattern B — role-link map](/assets/images/posts/arsenal-attack-patterns/rolemap_pattern_b.png)

The mirror-image idea: Martinelli held wide for the 1v1, Calafiori
underlapping into the channel, a low cut-back arriving for Merino. The link
weights show the Martinelli–Calafiori axis carrying the whole pattern.

![Pattern B — per-player linkages](/assets/images/posts/arsenal-attack-patterns/focus_grid_pattern_b.png)

This pattern has two breakers, and neither is in the build-up.

![Pattern B — role-execution grading](/assets/images/posts/arsenal-attack-patterns/grading_pattern_b.png)

Martinelli grades C (1v1 success and finishing down across 24–26), and
Calafiori grades C (underlap dynamism limited). The back seven all grade A
or better — the platform is fine; the left-side blade is blunt. Havertz, on
the near-post pin, again grades C.

## Pattern C · Vertical Transition (~20%)

![Pattern C — role-link map](/assets/images/posts/arsenal-attack-patterns/rolemap_pattern_c.png)

The direct route: Raya or Rice plays the first vertical pass, Havertz drops
to link, Saka and Martinelli run the channels, the 8s arrive late.

![Pattern C — per-player linkages](/assets/images/posts/arsenal-attack-patterns/focus_grid_pattern_c.png)

Raya B+, Rice A+ on the first pass, Saka A on depth runs. The hinge of the
whole pattern is the dropping striker — and that is exactly where it breaks.

![Pattern C — role-execution grading](/assets/images/posts/arsenal-attack-patterns/grading_pattern_c.png)

Havertz, the designated link, grades C: link play and spin inconsistent. The
launch pad is elite, the runners are ready, the connection point fumbles.

## The Finding

For each pattern, I mapped all 11 roles' tasks and graded execution. The
finding was striking: in two of three patterns, the chain broke at the
**same role — centre forward**. The structure built elite chances, but the
finisher didn't convert. In the third, the same player broke the chain in a
different function.

The data-driven conclusion was simple: **Arsenal's number-one recruitment
priority had to be an elite, ruthless No. 9.**

This summer, Arsenal signed Viktor Gyökeres.

And this season, they ended a 22-year wait to lift the Premier League title.

The data didn't replace the football. It pointed exactly where the football
was already telling us to look — just faster, cheaper, and more
communicable.

If you find yourself saying "the data doesn't capture what I'm seeing," the
answer isn't to abandon the data. It's to design better data.

---

*Data: Sofascore public match data · Charts: synthetic role-link weights,
style adapted from The Athletic's pass-network charts · Stack: Python +
matplotlib*
