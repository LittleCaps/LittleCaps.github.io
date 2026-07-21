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
| `--text-secondary` | `#5c5c56` |
| `--accent` | `#c9a24b` (gold, decorative / on-dark) |
| `--accent-text` | `#8a6a26` (gold-tone text on light bg) |
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

Contrast rules (WCAG):
- Gold `#c9a24b` is decorative-only on light backgrounds (hairlines, dots,
  glows) and text-safe only on dark surfaces. For gold-toned *text* on light
  backgrounds use `--accent-text: #8a6a26` (≥4.5:1 on `#e6e4e0`).
- `--text-secondary` is `#5c5c56` (≥4.5:1 on `#e6e4e0`), not lighter.
- Active nav / link hover on light: black text + gold underline (decorative),
  never gold text alone.

## Changes by file

1. `_config.yml` — flip `text_skin: dark` → `text_skin: default` so the TeXt
   base skin (everything custom.scss doesn't reach) is light. Keep
   `highlight_theme: tomorrow-night` — code blocks stay dark by design.
2. `_includes/head/custom.html` — swap Playfair Display → Space Grotesk
   (keep Inter, JetBrains Mono).
3. `_sass/custom.scss` — full rewrite. Same selectors/classes where inner pages
   depend on them (`.blog-navbar`, article/archive/analysis/data classes) but new
   light design system. Code highlight blocks stay dark (tomorrow-night) — ensure
   readable on light page. Additionally restyle:
   - The search modal (`_includes/search-providers/default/search.html` markup:
     `.search__header`, result list, its `button--theme-dark button--pill`) to the
     light system — the header keeps its search affordance, so the modal must match.
   - `.layout--404` (404 page) to the light system.
4. `_includes/header.html` — keep structure (logo, nav-links, search, CTA,
   hamburger); visual becomes thin light bar with uppercase links; logo text
   `TOUCHLINE` in Space Grotesk. Minor markup tweaks allowed.
5. `_layouts/home.html` — rebuild:
   - Hero: left big headline `SEEING FOOTBALL / THROUGH DATA`; right small intro
     paragraph; two pill buttons (`READ ANALYSIS` → /analysis.html solid,
     `PASS ADVISOR` → external outlined); corner counter `001 / NNN` where `NNN`
     is the total post count zero-padded to 3 digits via Liquid (`001` is a
     static label riffing on the reference's slide counter).
   - Below: dark full-width particle band — a `<div>` with a dark CSS gradient
     background (this is the no-JS/reduced-motion fallback, always rendered)
     containing a `<canvas id="hero-particles">` that the script draws on.
     Gold connecting lines + slight mouse parallax. Script skips animation
     entirely under `prefers-reduced-motion`.
   - Below: latest 9 posts in a minimal grid (title, date micro-label, excerpt,
     hairline separators), 3 columns → 2 at ≤1024px → 1 at ≤640px, followed by a
     `VIEW ARCHIVE` link. No pagination on home (site `paginate: 8` unused here;
     archive page remains the full listing).
   - Loads the particle script via `<script src="/assets/js/home-particles.js" defer>`
     at the end of the layout (home only, not global).
6. New `assets/js/home-particles.js` — vanilla canvas particle network
   (~60 particles, gold `rgba(201,162,75,·)` links, devicePixelRatio-aware,
   pauses when offscreen/hidden tab, no-op under `prefers-reduced-motion`).

## Not touched

Post content, `_posts/`, Pass Advisor external link, analytics/SEO config,
TeXt theme core sass (all overrides live in custom.scss), FITS/data pages'
markup structure.

## Verification

- `bundle exec jekyll build` passes.
- Screenshot check: homepage, one article page, archive page, 404 page, search
  modal — all readable, nav consistent, no dark-theme remnants (e.g.
  white-on-white text, dark modal on light site).
- Contrast: no gold text on light backgrounds; secondary text ≥4.5:1.
- Reduced-motion / no-JS: hero band renders as static dark gradient.
- Mobile: nav hamburger works; hero stacks vertically; post grid collapses 3→2→1.
