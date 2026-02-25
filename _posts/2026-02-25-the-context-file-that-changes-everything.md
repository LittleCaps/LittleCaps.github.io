---
layout: article
title: AI Notes - Day 2
date: 2026-02-25 22:00:00 +0800
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
    src: /assets/images/covers/cover-sunset-hills.jpg
---

Today I stumbled onto two things I hadn't properly explored before — LSP (Language Server Protocol) integration with AI tooling, and Claude's system-level customization features. I plan to dig into both tomorrow. But the real insight of the day was something simpler and, I suspect, more universally useful: **creating a master background markdown file that serves as persistent context for every AI interaction in a project**.

<!--more-->

This is AI Notes — Day 2. If Day 1 was about the big-picture multi-agent workflow, today is about the quiet infrastructure that makes everything else work.

---

## The Problem: Every Conversation Starts From Zero

Here's a frustration anyone who uses AI tools daily knows well. You open a new chat. You have a clear task. But the AI knows nothing about your project, your preferences, your constraints, your stack, your naming conventions, or what you tried yesterday that didn't work.

So you spend the first 5–10 minutes of every session re-explaining context. Or worse, you skip the context-setting entirely and get generic answers that miss the mark.

I've been guilty of both. And today it clicked: **the single highest-leverage thing I can do to improve my AI workflow is to maintain a living context document** — a single markdown file that captures the background, conventions, decisions, and current state of whatever I'm working on.

---

## What Goes Into a Master Context File

After experimenting today, here's the structure I've landed on. It's simple, but the simplicity is the point — this file needs to be easy to maintain, easy to paste, and easy for any model to parse.

```markdown
# Project Context — [Project Name]

## Overview
One paragraph: what this is, who it's for, what stage it's at.

## Stack & Environment
- Language / framework / key libraries
- Deployment target
- Local dev setup quirks

## Architecture Decisions
- Brief list of major choices made and WHY
- What was explicitly rejected and WHY

## Current State
- What's working
- What's broken or in progress
- What changed most recently

## Conventions
- Naming patterns, file organization, code style
- Commit message format, branch strategy

## Known Constraints
- Performance budgets, browser support, API limits
- Things that look wrong but are intentional

## Today's Focus
- What I'm trying to accomplish right now
- Specific questions or blockers
```

The key insight is the **"Architecture Decisions"** and **"Known Constraints"** sections. These are the things that trip up AI assistants the most. Without them, the model will cheerfully suggest solutions you've already considered and rejected, or propose approaches that violate constraints it doesn't know about.

---

## Using AI to Generate the Prompt Itself

Here's where today got interesting. Instead of writing all of this from scratch, I used AI to help generate the context file — and then used that file to improve subsequent AI interactions. It's recursive, and it works.

The process:

1. **Start with a rough dump.** I pasted my project's README, a few key config files, and some notes into Claude and asked: *"Based on this, write a comprehensive project context document that I can use as background for future AI conversations about this project."*

2. **Review and correct.** The AI got about 80% right. It inferred my stack, guessed at some conventions, and structured everything cleanly. I corrected the 20% it got wrong — mostly around *why* certain decisions were made, which the AI couldn't know from code alone.

3. **Use it immediately.** In the very next conversation, I pasted the context file at the top and asked a specific question. The difference in answer quality was dramatic. No more "well, it depends on your setup" hedging. The model knew my setup.

4. **Iterate.** Every time I make a significant decision or change direction, I update the file. It takes 30 seconds. The ROI on those 30 seconds is enormous.

This is what I mean by "using AI to generate prompts." The context file *is* a prompt — a reusable, evolving, project-specific system prompt that you control.

---

## Why This Matters More Than Prompt Engineering Tricks

The internet is full of prompt engineering advice: "use chain-of-thought," "assign the AI a role," "add examples." These techniques work. But they optimize the wrong layer.

The biggest variable in AI output quality isn't *how* you ask — it's *what context the model has when you ask*. A mediocre prompt with excellent context beats a brilliant prompt with no context every single time.

Think of it this way:

- **Prompt engineering** = optimizing the question
- **Context engineering** = optimizing the background knowledge

Most people are over-invested in the first and under-invested in the second. A master context file is the simplest form of context engineering, and it requires zero technical sophistication.

---

## LSP and Claude Customization: Tomorrow's Experiments

Two other things caught my attention today that I want to explore tomorrow.

### LSP (Language Server Protocol)

LSP is the protocol that powers intelligent features in code editors — autocomplete, go-to-definition, find-references, real-time error checking. It was originally designed by Microsoft for VS Code but has become a universal standard.

What interests me is the intersection of LSP and AI coding tools. When an AI assistant like Claude Code or Cursor operates on your codebase, how much of its understanding comes from static file reading versus LSP-style semantic analysis? If an AI tool could tap into an LSP server, it would have access to:

- The full type graph of your project
- Cross-file reference chains
- Real-time compilation errors
- Symbol resolution across dependencies

This is a fundamentally richer understanding than "I read your files." I want to investigate which tools already leverage this and what the gaps are.

### Claude's Customization Features

Claude offers several layers of customization that I haven't fully explored:

- **System prompts / custom instructions** — persistent instructions that shape every response
- **Project-level context** (in Claude's web interface) — uploaded documents that persist across conversations
- **CLAUDE.md files** (in Claude Code) — project-specific instructions that the CLI loads automatically
- **Memory features** — auto-saved preferences and patterns across sessions

These are, in effect, different implementations of the same idea I described above — persistent context that survives across conversations. The difference is that they're built into the tool rather than requiring manual copy-paste.

Tomorrow I want to test: how much of my manual context file workflow can be replaced by these built-in features? And where do they fall short?

---

## The Broader Pattern: Infrastructure Over Technique

Today's main takeaway, if I had to distill it to one sentence:

> **The most impactful improvement to your AI workflow isn't a better prompt — it's better infrastructure around your prompts.**

A context file is infrastructure. LSP integration is infrastructure. Customization settings are infrastructure. None of these are glamorous. None of them make for exciting demos. But they compound. Every conversation you have with good context is a conversation where the AI starts at 80% instead of 0%.

And here's the thing about infrastructure: it's boring to set up, but once it exists, everything built on top of it gets better automatically. Write the context file once, update it incrementally, and every AI interaction improves. That's a trade I'll take every time.

---

## Practical Takeaways

If you use AI tools regularly and take nothing else from this post:

1. **Create a `CONTEXT.md` for your active projects.** Even a rough one. Five minutes of work will save hours of re-explanation.

2. **Let AI draft it, then correct it.** Don't stare at a blank file. Paste your project artifacts into an AI and ask it to synthesize a context document. Fix what it gets wrong.

3. **Include the "why," not just the "what."** The model can read your code to know *what* you built. It can't know *why* you chose this approach over that one unless you tell it.

4. **Update it as you go.** A stale context file is worse than none — it actively misleads. Keep a "Current State" section and update it when things change.

5. **Explore your tools' built-in context features.** Claude's custom instructions, Cursor's `.cursorrules`, Claude Code's `CLAUDE.md` — these exist to solve exactly this problem. Use them.

---

Tomorrow: hands-on testing with LSP integration and Claude's customization layers. I'll report what works and what doesn't.

*This is Day 2 of AI Notes — a daily log of building, thinking, and working alongside AI.*
