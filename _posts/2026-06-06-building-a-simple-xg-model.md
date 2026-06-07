---
layout: article
title: Building a Simple Expected Goals Model
date: 2026-06-06 21:00:00 +0800
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
    src: /assets/images/covers/cover-circuit.jpg
---

Expected goals (xG) is the single most useful number in football analytics. It
answers a simple question: given where and how a shot was taken, how likely was
it to become a goal? Here's how to build a first version from public event data.

<!--more-->

## The Idea

A goal is a rare, noisy event. A team can play well and lose; a single deflected
shot can decide a match. xG smooths out that noise by scoring each chance on its
quality rather than its outcome. Sum a team's xG over a match and you get a
better estimate of how many goals they *should* have scored than the scoreline
alone.

## The Features That Matter

Most of the predictive power in a basic model comes from a handful of features:

- **Distance to goal** — the strongest single predictor.
- **Angle to goal** — how much of the goal mouth the shooter can actually see.
- **Body part** — header vs. foot.
- **Play pattern** — open play, set piece, fast break, penalty.

You can compute distance and angle directly from the shot's `(x, y)` coordinates
in event data. StatsBomb's open data is a good place to start.

## A Minimal Model

```python
import pandas as pd
from sklearn.linear_model import LogisticRegression

# shots: DataFrame with x, y, is_header, is_open_play, goal (0/1)
shots["distance"] = ((120 - shots.x) ** 2 + (40 - shots.y) ** 2) ** 0.5

X = shots[["distance", "is_header", "is_open_play"]]
y = shots["goal"]

model = LogisticRegression(max_iter=1000).fit(X, y)
shots["xg"] = model.predict_proba(X)[:, 1]
```

Logistic regression is the right starting point: the output is already a
probability, the coefficients are interpretable, and it's hard to overfit. Once
this baseline works, gradient-boosted trees usually add a few points of
calibration — but get the baseline honest first.

## Reading the Output

The number to trust is not any single shot's xG — it's the aggregate. Over a
season, a striker who consistently outperforms their xG is either an elite
finisher or due for regression. Telling those two apart is where the analysis
starts, and it's a theme I'll keep coming back to.

This is a starter post for the **Data & Models** track — more on calibration,
tracking data, and possession value to come.
