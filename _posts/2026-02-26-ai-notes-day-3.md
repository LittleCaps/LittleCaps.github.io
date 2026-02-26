---
layout: article
title: AI Notes - Day 3
date: 2026-02-26 22:00:00 +0800
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
    src: /assets/images/covers/cover-circuit.jpg
---

There's a phrase that's been floating around developer circles for the past year: **vibe coding**. The idea is simple — you describe what you want in natural language, the AI writes the code, you glance at it, and if the program runs, you ship it. No deep reading of every line, no manual debugging, no tracing through logic. You code by vibes.

<!--more-->

I've been doing a version of this for weeks now, and I want to be honest about what I've learned: vibe coding works shockingly well for some things, and it's a trap for others. The difference isn't about the AI's capability — it's about **your ability to verify the output**.

---

## What Vibe Coding Actually Looks Like

Here's a real example from yesterday. I wanted to update the avatar image on my blog. The task: change one image path in a config file and maybe in a couple of templates. I described what I wanted to Claude Code, it found the relevant files, made the edits, and I confirmed with a quick `git diff`. Done in 90 seconds.

That's vibe coding at its best. The task has a **clear, verifiable outcome** — either the avatar shows the new image or it doesn't. The blast radius is small. The worst-case scenario is a broken image on my blog, which I'd catch immediately.

Now here's the other end. Suppose I ask an AI to implement authentication for a web app. It generates a login flow, session management, password hashing, token validation. The code looks clean. The app starts. I can log in. Vibes feel great. But can I verify it's secure? Can I tell at a glance whether the session tokens have sufficient entropy? Whether the password hashing uses bcrypt with proper salt rounds? Whether there are timing attack vulnerabilities in the comparison logic?

Unless I'm a security engineer who reads auth code for breakfast, the answer is no. And that's where vibe coding quietly transitions from productivity hack to technical debt generator.

---

## The Verification Spectrum

I've started thinking about tasks on a verification spectrum:

**Easy to verify** — UI changes, formatting, file reorganization, simple CRUD operations, config changes, text content. You run the code, you see the result, you know if it's right.

**Medium to verify** — Business logic, data transformations, API integrations, moderate algorithms. You need to write tests, check edge cases, maybe trace through a few scenarios. The AI can help write the tests too, but you need to understand the logic well enough to know if the tests are testing the right things.

**Hard to verify** — Security code, performance-critical paths, concurrent systems, cryptographic implementations, financial calculations, anything where the failure mode is silent. The code can look correct, run correctly on your test cases, and still be fundamentally broken in ways you won't discover until production.

The mistake I see people making — and one I've made myself — is treating everything like category one. When the AI gives you code and it runs, there's a strong psychological pull to consider it done. The feedback loop of "describe → generate → run → works" is so fast and satisfying that stopping to actually think feels like unnecessary friction.

It's not friction. It's engineering.

---

## The Paradox of AI-Generated Code Quality

Here's something counterintuitive I've noticed: AI-generated code is often **better structured** than what I'd write on a first pass. It follows conventions, uses proper error handling, names things clearly. Claude in particular tends to write code that looks like it came from a senior developer having a good day.

This is precisely what makes it dangerous. Bad code that looks bad is easy to catch. Correct-looking code that has a subtle logical flaw? That's the bug that ships to production and costs you a weekend.

I had a case recently where I asked for a function to merge two sorted arrays. The AI generated a clean, readable implementation. It passed the basic tests I mentally ran through. But when I actually traced through it with duplicate values at the boundary, there was an off-by-one error that would only manifest with specific input patterns. The code looked professional. The variable names were descriptive. The logic was almost right. That "almost" is the whole game.

---

## A Practical Framework

After three days of building with AI as my primary coding partner, here's the framework I'm settling into:

### 1. Separate generation from validation

When the AI writes code, I explicitly switch into a different mode for review. Generation mode is creative, fast, collaborative. Validation mode is skeptical, slow, adversarial. Mixing them leads to sloppy review because the dopamine of creation overwhelms the discipline of checking.

### 2. Use AI to validate AI

This might sound circular, but it works surprisingly well. After Claude generates an implementation, I'll ask it: "What are the edge cases this doesn't handle? Where could this fail silently? If you were trying to break this code, how would you do it?" The responses are genuinely useful. The AI is often better at finding flaws in code when explicitly asked to look for them than when generating the code in the first place. This maps to a known pattern in LLM behavior — models are better critics than creators.

### 3. Keep the blast radius small

I commit frequently, keep changes atomic, and test incrementally. If I'm building a feature with five components, I don't ask the AI to generate all five at once. I do one, verify it, commit it, then move to the next. This way, when something breaks — and something always breaks — I know exactly where the fault lies.

### 4. Maintain your understanding

This is the hardest one. When AI writes code fast, there's a temptation to move on without fully understanding what was written. But code you don't understand is code you can't debug, extend, or maintain. I force myself to read every generated function at least once, even if I don't trace every line. If I can't explain what a function does in one sentence, I stop and study it until I can.

---

## The Skills That Matter Now

Vibe coding changes which skills matter, but it doesn't eliminate the need for skill. If anything, it shifts the required skills in interesting ways:

**Less important:** Syntax memorization, boilerplate writing, remembering API signatures, initial code structure setup.

**More important:** System design, architecture decisions, requirement specification, output verification, debugging methodology, understanding failure modes, knowing what questions to ask.

The best analogy I've found is the shift from manual drafting to CAD in architecture. CAD didn't eliminate the need for architects — it eliminated the tedious parts of their work and amplified the importance of the parts that required judgment. An architect who uses CAD still needs to understand load-bearing structures, material properties, building codes, and human flow patterns. The tool draws the lines faster, but the architect decides where they go.

Similarly, a developer who uses AI coding tools still needs to understand data structures, concurrency models, security principles, and system boundaries. The AI writes the code faster, but the developer decides what code to write and whether the result is correct.

---

## What I Got Wrong Early On

When I first started using AI for coding heavily, I made a mistake that's worth confessing: I over-delegated. I'd give Claude a complex task, get back a wall of code, skim it, run it, and if it worked, move on. I was optimizing for speed.

The result? I built up a codebase that I was increasingly unfamiliar with. When something broke three layers deep, I had to re-read code I should have understood the first time. The time I "saved" by not reading carefully was spent later, with interest, debugging in a codebase that felt foreign even though I'd "written" it.

Now I'm more deliberate. I still use AI for the heavy lifting, but I treat the generated code as a **draft** — a very good draft, often better than my first attempt would be, but a draft nonetheless. Drafts get reviewed. Drafts get questioned. Drafts sometimes get rewritten.

---

## The Real Skill: Calibrating Trust

After reflecting on all of this, I think the meta-skill of working with AI coding tools is **trust calibration** — developing accurate intuitions about when to trust the output and when to dig deeper.

Trust too little, and you're wasting the tool's potential by re-examining every semicolon. Trust too much, and you're shipping code you don't understand with bugs you won't catch. The sweet spot is dynamic — it depends on the task, the domain, the stakes, and your own expertise in the area.

I'm getting better at this calibration, but I'm far from having it dialed in. Some signals I watch for:

- **The AI hesitates or hedges.** When Claude says "this should work" or "you might want to double-check this part," it's often flagging genuine uncertainty. Pay attention.
- **The task is at the boundary of my knowledge.** If I'm working in a domain where I couldn't write the code myself, I need to be extra careful reviewing AI-generated code in that domain.
- **The code is longer than expected.** Unexpectedly long output often means the AI is handling edge cases I didn't think of — which is either impressive thoroughness or unnecessary complexity. Figure out which.
- **It works on the first try.** Paradoxically, I'm more suspicious of code that works perfectly on the first run than code that needs a round of debugging. Debugging gives me a chance to understand the code. First-try success means I might have a false sense of confidence.

---

## Looking Forward

Tomorrow I want to dig into something I touched on briefly — using AI to validate AI output. There are interesting patterns emerging around adversarial prompting, automated test generation, and multi-model verification that I think will become standard practice in the next year. The tooling around "AI code review" is still primitive compared to AI code generation, and I think that gap is where the most interesting work will happen.

For now, my takeaway from Day 3 is this: vibe coding is a real productivity multiplier, but it's a tool with a sharp edge. The developers who will thrive aren't the ones who generate the most code the fastest — they're the ones who develop the best judgment about when to trust, when to verify, and when to rewrite.

Speed without judgment is just velocity toward bugs.

---

*This is Day 3 of AI Notes — a daily log of building, thinking, and working alongside AI.*
