---
layout: article
title: "Pass Advisor: An Interactive Pass Decision Simulator"
date: 2026-07-20 21:00:00 +0800
tags: Data
mode: immersive
header:
  theme: dark
article_header:
  type: overlay
  theme: dark
  background_color: '#142019'
  background_image:
    gradient: 'linear-gradient(135deg, rgba(34, 195, 100, .4), rgba(20, 120, 80, .4))'
    src: /assets/images/covers/cover-forest.jpg
---

Freeze both teams at one instant. Where is the best place to pass the ball?

**Pass Advisor** is a small interactive app that answers this question live in
your browser: **[open the demo](https://littlecaps.github.io/pass-advisor/)** —
no install, no backend, one HTML file.

<!--more-->

## What it does

Given a static snapshot of both teams' positions, the app estimates, for every
point on the pitch:

1. **Pass success probability P** — can the ball get there?
2. **Advantage gain ΔV = reward − λ·risk** — how worthwhile is it once the
   pass succeeds?
3. **Expected value EV = P × ΔV** — the combined recommendation.

The surface is evaluated on an 84×54 grid; a white ★ marks the optimum and an
arrow points to it from the passer.

![Expected value surface](/assets/images/posts/pass-advisor/app_ev.png)

## Try it

- **Drag** any dot to move a player (touch works on mobile); pick from seven
  formation presets (4-3-3, 4-4-2, 5-3-2, …).
- **Double-click** a red player to make them the passer, or drag the ball to
  them.
- Switch between the three surfaces (P / ΔV / EV) and watch the recommended
  target move.
- Three sliders expose the model: λ (risk weight), interception sensitivity,
  control softness.

![Pass success surface](/assets/images/posts/pass-advisor/app_success.png)

![Advantage surface](/assets/images/posts/pass-advisor/app_advantage.png)

## The model in one paragraph

Pass success combines a soft-Voronoi control probability (sigmoid of
nearest-teammate vs nearest-defender distance to the target), lane openness
(sigmoid of the minimum perpendicular defender distance to the passing lane),
and a distance decay. Reward is control × proximity to goal, weighted toward
the central channel; risk is a Gaussian density of defenders around the
target. The framework follows SoccerMap (Fernández & Bornn 2020), the
reward/risk EPV split of Overmeer et al. (2025), and the pitch-control
tradition of Spearman (2017, 2018).

> ⚠️ The coefficients are a hand-tuned analytic approximation for teaching
> purposes — not fitted to real tracking data. Good for building intuition and
> playing with formations; serious analysis needs calibration on real data.

![Formation presets](/assets/images/posts/pass-advisor/app_formations.png)

## Links

- **Live demo**: <https://littlecaps.github.io/pass-advisor/>
- **Code & full model write-up**: <https://github.com/LittleCaps/pass-advisor>
  (MIT licensed, single-file HTML — view source is the documentation)

Next steps on the roadmap: a "pass to whom" mode that evaluates only the 11
teammates, player velocity vectors, and calibrating the coefficients on
StatsBomb 360 freeze frames.
