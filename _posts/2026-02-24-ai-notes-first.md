---
layout: article
title: AI Notes - Day 1
tags: AI
mode: immersive
header:
  theme: dark
article_header:
  type: overlay
  theme: dark
  background_color: '#203028'
  background_image:
    gradient: 'linear-gradient(135deg, rgba(34, 100, 195, .4), rgba(139, 34, 139, .4))'
    src: /assets/images/covers/cover-nightsky.jpg
---

First, other than the posts about RGS, the whole website was written by AI. Today I want to document a workflow that combines **Claude Code**, **Codex** and **Gemini** -- let AI itself do more things, the responsibility of human is to check.

<!--more-->

> **Core Principle:** Treat AI collaboration as a **production pipeline**, not a chat session. Every step must have clear inputs, defined outputs, quality gates, and a rollback path.

This workflow is designed for teams that want AI to execute most of the delivery lifecycle, while humans remain responsible for final sign-off and high-risk decisions.

---

## Objectives

- Run projects with an **AI-first** execution model.
- Keep outputs auditable, reproducible, and easy to hand over.
- Minimize manual coordination across multiple AI systems.

---

## End-to-End Flow

```
Requirements --> AI PM --> AI Architect --> Router --> Agents (parallel)
    |                                                       |
    v                                                       v
 PRD.md                                              Quality Gates
                                                           |
                                                           v
                                                    Cross-Review
                                                           |
                                                           v
                                                   Acceptance Score
                                                     /          \
                                                  Pass          Fail
                                                   |              |
                                              Delivery        Rework Loop
                                              Package         (max 3x)
                                                   |
                                                   v
                                            Human Sign-Off
```

---

## Roles and Responsibilities

| Role | Responsibilities |
|------|-----------------|
| **AI PM** | Produces `PRD.md`, milestones, and acceptance criteria. Converts business goals into implementation boundaries. |
| **AI Architect** | Builds `TASK_BOARD.md` with task dependencies and risk labels. Assigns complexity levels (S/M/L). |
| **Router Agent** | Selects the best model and sub-agents per task type. Documents routing decisions in `ROUTING_PLAN.md`. |
| **Executor Agents** | **Build:** implement features and refactors. **Test:** add/maintain tests. **Docs:** update API notes and runbooks. |
| **Reviewer Agents** | Perform independent cross-checks. Flag blockers, regressions, and risk areas. |

---

## Recommended Model Routing

| Task Type | Lead Model | Reasoning |
|-----------|-----------|-----------|
| Requirement analysis | **Gemini** | Long-context synthesis, option comparison |
| Coding / debugging / testing | **Codex** | Implementation, refactoring, CI/test failure resolution |
| Pre-merge quality / risk review | **Claude** | Review quality, risk narratives, delivery summaries |
| High-risk domains (auth, payments, etc.) | **Dual-model** | Mandatory cross-validation |

---

## Standard Task Contract

Each task should include:

```yaml
task_id: T-001
owner_model: codex
sub_agents: [test, docs]
inputs: [spec.md, api_schema.json]
outputs: [feature_branch, test_report]
dependencies: [T-000]
definition_of_done: "All tests pass, docs updated"
test_plan: "Unit + integration coverage >= 80%"
risk_level: Medium    # Low / Medium / High
rollback_plan: "Revert commit + restore DB snapshot"
```

---

## Quality Gates

All gates must pass before merge:

1. Lint and type checks
2. Unit and integration tests
3. Dependency and baseline security scanning
4. Documentation updates for any contract/interface change

**On failure:** return task to execution lane, generate `FAILURE_REPORT.md`, retry up to **3 times**, then escalate to human decision.

---

## Shared Memory and Coordination

Update these artifacts after each execution cycle:

| Artifact | Purpose |
|----------|---------|
| `TASK_BOARD.md` | Track task status and dependencies |
| `DECISIONS.md` | Record architectural and routing decisions |
| `RISKS.md` | Log identified risks and mitigations |
| `memory.md` | Shared context across agents |

**Sync cadence:** short tasks sync on completion; long tasks sync every 60-90 minutes.

---

## Automated Acceptance Scoring

| Dimension | Weight |
|-----------|--------|
| Functional completeness | 40 |
| Quality and reliability | 25 |
| Maintainability | 15 |
| Performance and cost | 10 |
| Documentation completeness | 10 |

**Decision thresholds:**

- **>= 85:** approved for delivery
- **70 - 84:** one rework cycle required
- **< 70:** re-scope and re-route tasks

---

## Delivery Package

Final output includes: `final_report.md`, `release_notes.md`, `test_report.md`, `known_issues.md`, and `rollback.md`.

---

## Human Sign-Off (Minimal but Critical)

Human reviewers only validate:

1. Business and compliance alignment
2. Mitigation quality for high-risk items
3. Rollback readiness and test evidence
4. Release window and monitoring readiness

---

## Practical Adoption Plan

| Week | Focus |
|------|-------|
| **Week 1** | Pilot on a small-to-medium project. Freeze routing and scoring rules. |
| **Week 2** | Add dual-model review for high-risk modules. |
| **Week 3** | Add trend reporting and automation dashboards. |

---

## TL;DR -- MVP Loop

1. Input requirements and generate `PRD.md`
2. Break into 5-10 tasks
3. Route and execute in parallel
4. Run gates and cross-review
5. Score, rework if needed
6. Produce delivery package and perform final human sign-off

