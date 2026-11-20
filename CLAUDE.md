# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static Astro website for [hissi.app](https://hissi.app), the landing page of the Hissi app (iOS and Android), which shows whether the elevators at stations in Berlin and Brandenburg (via accessibility.cloud) and at DB and city-operator stations across Germany (via the Aufzugsstatus API, aufzuege.ploetzlich-querschnitt.de) are working. Audience: wheelchair users, parents with strollers, people with luggage. German (default, no prefix) and English (`/en/`). Pages: landing page (an "elevator ride" of floors), support, privacy policy, legal notice, plus one bilingual 404. No backend, no web fonts, no trackers, no client framework.

## Commands

npm (`package-lock.json`), Node >= 22.12 (`.nvmrc`: 22).

```bash
npm ci
npm run dev        # astro dev
npm run check      # astro check: types; the only quality gate (no linter, no tests)
npm run build      # -> dist/
npm run preview    # http://localhost:4321
node scripts/readability.mjs   # after build: reading level per page (WCAG 3.1.5), bar is grade 9
npm run assets     # scripts/import-assets.sh: copy brand SVGs and screenshots from sibling repos
node scripts/make-og.mjs       # regenerate public/og.png and apple-touch-icon.png
npm run deploy     # scripts/deploy-bunny.mjs, needs BUNNY_* env vars (normally CI only)
```

## Architecture

- `src/pages/` - one file per page and locale (`index`, `support`, `datenschutz`, `impressum` and `en/index`, `en/support`, `en/privacy`, `en/legal-notice`), plus `404.astro` (bilingual, because the CDN serves a single 404) and `robots.txt.ts`.
- `src/i18n/` - `routes.ts` is the route table (`PageKey` to translated slug per locale); it feeds links, the language switch, hreflang, canonical URLs and the sitemap (`astro.config.ts`). `de.ts` holds all German strings and is the source; `en.ts` is typed as `typeof de`, so a missing key fails `astro check`. `index.ts` exports `t(locale)` and `href(path)`.
- `src/layouts/` - `Base.astro` (html `lang`, skip link, header, `main#inhalt`, footer "Roof"), `Legal.astro` (renders a Markdown entry).
- `src/content/legal/{de,en}/` - privacy policy and legal notice as Markdown (schema in `src/content.config.ts`). The privacy policy here is canonical for the apps too.
- `src/components/` - `floors/` holds one component per landing-page section (`HeroEG`, `Forms`, `Everywhere`, `Privacy`, `Finnish`), wrapped by `Floor.astro`. `Lift.astro` is the hero elevator with its inline script (ride, Web Audio chime, live-region announcement). `FloorDisplay` (decorative header indicator), `LangSwitch`, `StoreButtons`, `Screens` (app screenshots via `astro:assets`), `Shape` + `StatusSprite` (status symbols), `brand/Lockup` (inline SVG logo).
- `src/styles/` - `tokens.css` (colour tokens, light and dark palettes, type scale), `base.css`, `site.css` (component styles, global on purpose because selectors cross components, includes reduced-motion and forced-colors blocks), `prose.css` (legal pages). Imported once in `Base.astro`.
- `src/config.ts` - release toggles (store URLs, App Store id for the Smart App Banner) and contact data. `StoreButtons` derives badge vs. "soon" state from it.
- `src/assets/`, `public/` - brand SVGs and screenshots are snapshots from sibling repos; regenerate with the scripts instead of editing by hand.
- Data: the site is fully static and fetches no elevator data today. Live outage pages are proposed in open issues #3 (hourly rebuild) and #5 (edge-rendered); a review page in #4.

## Deployment and CI

- `.github/workflows/deploy.yml`: push to `main` -> `npm ci`, `astro check`, build, `scripts/deploy-bunny.mjs` uploads `dist/` to the bunny.net storage zone and purges the pull zone (skipped while the `BUNNY_*` secrets are missing).
- `.github/workflows/pages.yml`: preview on GitHub Pages (`/Hissi-Web` base, `SITE_NOINDEX=true`, `robots.txt` disallows all). This is why internal links must go through `href()`.
- CDN, redirects and DNS setup are documented in `README.md`.

## Conventions

- Never hard-code internal paths: use `href(paths[key][locale])`. Markdown links in `src/content/` are relative. A new page needs a `PageKey` in `routes.ts`, a page file per locale and strings in both dictionaries.
- All visible text goes into `src/i18n/de.ts` and `src/i18n/en.ts`; keep both in sync. Keep sentences short.
- Use the colour tokens; do not add raw colours without checking contrast in light and dark mode and on the purple floors.
- Progressive enhancement: every page works without JavaScript. JS-only controls start `hidden`; scripts are small inline `<script>` blocks in the component.
- Code comments and docs are in English. Commit messages follow Conventional Commits (`feat:`, `fix(a11y):`, `style:`, `docs:`, `ci:`).

## Accessibility

- Target: WCAG 2.2 AA is required for every change; AAA is a bonus goal where feasible. Accessibility issues must carry the `a11y` label.
- Read `ACCESSIBILITY.md` before any UI change and keep it updated (especially Known barriers).
- AAA judgment calls and verification notes are recorded in `docs/accessibility.md`.
- Status is never colour alone: `Shape` is always decorative (`aria-hidden`) and a status word stands next to it.
- Interactive targets outside running text: `min-height: 2.75rem` (44 CSS pixels). Keep the `:focus-visible` outline.
- Anything animated needs a `prefers-reduced-motion: reduce` fallback; anything relying on colour needs a `forced-colors: active` rule in `src/styles/site.css`.
- Mark foreign-language text with `lang`; decorative SVGs get `aria-hidden="true" focusable="false"`.
- After copy changes, run `npm run build && node scripts/readability.mjs`. There are no automated accessibility tests in the repo or CI; check changed pages with keyboard, 320 CSS pixels, 200 % zoom and an axe scan by hand.
