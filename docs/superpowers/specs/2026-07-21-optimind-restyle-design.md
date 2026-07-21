# Touchline Restyle — OPTIMIND-Style Design (2026-07-21)

## Goal

Restyle the entire Jekyll site (TeXt theme, heavily customized) to match a
Pinterest reference: a minimal AI-agency landing page ("OPTIMIND"). Warm light-grey
canvas, big grotesk uppercase headline, thin uppercase nav, gold accents, pill
buttons, dark hero band with glowing particle network, generous whitespace.

User decisions:
- Scope: full-site restyle (homepage hero + all inner pages re-skinned).
- Hero visual: animated canvas particle network (dark base, gold links),
  football-flavored (pass-network feel).
- Route: rewrite the design system in `_sass/custom.scss`; keep existing page
  structures for inner pages; rebuild only the homepage layout.

## Current state (relevant)

- `_sass/custom.scss` (1253 lines): "Dark AstroTech" design system via CSS
  variables; hides the stock TeXt header; styles a custom `.blog-navbar`,
  homepage sidebar layout, article pages, archive, etc.
- `_layouts/home.html` (234 lines): sidebar + featured-post blog layout.
- `_includes/header.html`: custom `.blog-navbar` markup + mobile menu + scroll JS.
- `_includes/head/custom.html`: Google Fonts (Playfair Display, Inter, JetBrains Mono).
- `_data/navigation.yml`: Home / Analysis / Data & Models / Pass Advisor / Archive / About.
- Site config `text_skin: dark`.

## Design system (new tokens in custom.scss)

| Token | Value |
|---|---|
| `--bg` | `#e6e4e0` (warm grey canvas) |
| `--bg-panel` | `#efeeec` |
| `--bg-dark` | `#141414` (hero band, code blocks) |
| `--text-primary` | `#141414` |
| `--text-secondary` | `#6b6b66` |
| `--accent` | `#c9a24b` (gold) |
| `--border` | `rgba(20,20,20,0.12)` — 1px hairlines |
| Headline font | Space Grotesk, uppercase, tight letter-spacing on big sizes |
| Body font | Inter |
| Mono | JetBrains Mono |

Component language:
- Pill buttons: solid black w/ subtle gold ring glow; outlined variant.
- Uppercase 11px letter-spaced micro-labels for meta text.
- 1px hairline dividers instead of cards-with-shadows; flat panels, minimal radius
  (buttons stay pill).
- Dark surfaces only for hero band and code blocks.

## Changes by file

1. `_includes/head/custom.html` — swap Playfair Display → Space Grotesk
   (keep Inter, JetBrains Mono).
2. `_sass/custom.scss` — full rewrite. Same selectors/classes where inner pages
   depend on them (`.blog-navbar`, article/archive/analysis/data classes) but new
   light design system. Code highlight blocks stay dark (tomorrow-night) — ensure
   readable on light page.
3. `_includes/header.html` — keep structure (logo, nav-links, search, CTA,
   hamburger); visual becomes thin light bar with uppercase links; logo text
   `TOUCHLINE` in Space Grotesk. Minor markup tweaks allowed.
4. `_layouts/home.html` — rebuild:
   - Hero: left big headline `SEEING FOOTBALL / THROUGH DATA`; right small intro
     paragraph; two pill buttons (`READ ANALYSIS` → /analysis.html solid,
     `PASS ADVISOR` → external outlined); corner counter `001 / 00N`
     (N = total posts, Liquid).
   - Below: dark full-width canvas particle band (`#hero-particles`), particle
     network with gold connecting lines + slight mouse parallax; static fallback
     under `prefers-reduced-motion` and no-JS (dark band with subtle SVG/gradient).
   - Below: latest posts as a minimal 3-column grid (title, date micro-label,
     excerpt, hairline separators). Sidebar layout removed.
5. New `assets/js/home-particles.js` — vanilla canvas particle network
   (~60 particles, gold `rgba(201,162,75,·)` links, devicePixelRatio-aware,
   pauses when offscreen/hidden tab).

## Not touched

Post content, `_posts/`, Pass Advisor external link, analytics/SEO config,
TeXt theme core sass (all overrides live in custom.scss), FITS/data pages'
markup structure.

## Verification

- `bundle exec jekyll build` passes.
- Screenshot check: homepage, one article page, archive page — all readable,
  nav consistent, no dark-theme remnants (e.g. white-on-white text).
- Reduced-motion: hero band renders static.
- Mobile: nav hamburger works; hero stacks vertically.
