# Accessibility

Hissi shows whether the elevators at stations in Berlin and Brandenburg are working. It is built for people who cannot take the stairs: wheelchair users, parents with strollers, people with luggage. This repository is the website [hissi.app](https://hissi.app) (German and English). Accessibility is the core of the product, not an add-on.

Decision records for individual success criteria live in [`docs/accessibility.md`](docs/accessibility.md). This file is the overview: what we aim for, where we fall short, and how to report a problem.

## Accessibility priorities

**Target state:** WCAG 2.2 Level AA is the required minimum for every change. Level AAA is a bonus goal: meet AAA success criteria wherever feasible (for example enhanced contrast of 7:1 for text, 1.4.6; target size of at least 44 by 44 CSS pixels, 2.5.5; no timing, 2.2.3; visible focus not obscured at all, 2.4.12), but missing AAA alone does not block a release. Conformance has not been formally audited yet; the Known barriers section lists where the project falls short of this target. In October 2026 the maintainers ran an automated audit (axe-core 4.13 with the WCAG 2.0/2.1/2.2 A, AA and AAA rules plus best practices, over all pages, light and dark, at 1280 and 320 CSS pixels, with text-spacing and 200 % zoom checks and a contrast calculation over the colour tokens), which reported no violations; it is a self-run check, not a formal third-party audit, and it predates later changes to the header and the store badges.

What the site already does:

- **Language.** Every page sets `lang` to its locale (`src/layouts/Base.astro`). Mixed-language content is marked: the Finnish words on floor 4 carry `lang="fi"`, the English half of the bilingual 404 page carries `lang="en"`, and the language switch carries `lang` and `hreflang` of its target (`src/components/LangSwitch.astro`). The switch returns to the same page in the other language; translated slugs come from one route table (`src/i18n/routes.ts`).
- **Structure.** Landmarks (`header`, `main`, `nav` with labels, `footer`), one `h1` per page, sections labelled by their headings, lists for lists. The current page is marked with `aria-current` in the footer navigation.
- **Skip link.** "Zum Inhalt springen" / "Skip to content" is the first focus stop and moves focus to `main` (`src/layouts/Base.astro`, `src/styles/base.css`).
- **Focus.** A 3 px outline with offset on `:focus-visible`, using a token that switches with the colour scheme and to the light foreground on the purple floors (`src/styles/base.css`, `src/styles/site.css`).
- **Colour and contrast.** All colours are tokens in `src/styles/tokens.css`, with a light and a dark palette that follow `prefers-color-scheme`. The "unknown" colour was darkened for contrast (2.9:1 to 6.2:1 on cream). Status is never conveyed by colour alone: each status has its own shape (circle with check, square with question mark, cross) and is always accompanied by a word (`src/components/StatusSprite.astro`, `src/components/Shape.astro`).
- **Target size.** Links and buttons outside running text have a minimum height of 2.75 rem (44 CSS pixels): header pills, footer links, support and legal links, the lift buttons.
- **Motion.** `prefers-reduced-motion: reduce` removes the door transition, the "Ding!" animation, smooth scrolling and the tilted cards; the lift then changes its example without delay. The header ping animation is finite (two runs). The lift chime is off by default when reduced motion is requested and has a toggle that exposes its state with `aria-pressed` and remembers the choice (`src/components/Lift.astro`).
- **Forced colours.** A `forced-colors: active` block keeps status shapes, door leaves, the floor display and chips visible with system colours (`src/styles/site.css`). Checked in Chrome's emulation only, see Known barriers.
- **Without JavaScript.** All content is static HTML. The hero lift starts with its door open and its first example readable; its buttons only appear once the script runs (`hidden` until then). The header floor display is decorative (`aria-hidden`).
- **Live region.** Each lift ride is announced once through a polite live region; nothing is announced while the doors are closed.
- **Images.** Decorative SVGs are `aria-hidden` and not focusable. App screenshots have descriptive `alt` text, and their list is labelled as showing the German interface. Store badges have text alternatives.
- **Plain language.** Short sentences; the Apple terms "complications" and "Live Activity" are explained inline (3.1.3). `scripts/readability.mjs` measures the reading level of the built pages (3.1.5); all pages were below grade 9 at the last measurement.
- **Automated checks in the repository.** None yet: there is no axe, pa11y or similar dependency and no accessibility job in `.github/workflows/`. The only CI gate is `astro check` (types). See Known barriers.

## Supported environments

- **Browsers:** current versions of Chrome, Edge, Firefox and Safari on desktop and mobile. The site uses modern CSS (`:focus-visible`, `color-mix()`, `text-wrap: balance`) and has no formal support matrix.
- **Viewport and zoom:** from 320 CSS pixels wide, up to 200 % zoom without horizontal scrolling, and user text-spacing overrides (1.4.12) without clipping.
- **User preferences honoured:** light and dark colour scheme, reduced motion, forced colours (Windows High Contrast).
- **Input:** keyboard, touch, mouse.
- **Assistive technology:** the target is VoiceOver with Safari (macOS and iOS) and NVDA with Firefox (Windows). Neither combination has been tested yet, see Known barriers.

What has actually been verified (October 2026): automated checks and a scripted keyboard walk in Chrome, forced colours in Chrome's emulation, and the no-JavaScript state.

## Known barriers

All open items are tracked as [issues with the `a11y` label](https://github.com/a11yland/Hissi-Web/issues?q=is%3Aissue+is%3Aopen+label%3Aa11y).

Open items left over from the first audit (closed issue [#1](https://github.com/a11yland/Hissi-Web/issues/1)):

- **No screen-reader pass yet.** VoiceOver with Safari and NVDA with Firefox have not been run over the site. Most important is the hero lift: the "doors open" announcement must fire once per ride, the sound toggle must read as a toggle with its state, and nothing from the lift must leak while the doors are closed (4.1.2, 4.1.3).
- **Forced colours not checked on real hardware.** Only Chrome's emulation was used; Windows High Contrast with real light and dark themes is unchecked (1.4.11, 1.4.1).
- **Keyboard walk only scripted in Chrome.** No manual keyboard-only walk in Firefox or Safari yet (2.1.1, 2.4.3, 2.4.7).

Other known gaps:

- **Audit predates later changes.** The header was regrouped and the store badges and support page changed on 29 October 2026, after the audit. The automated checks have not been re-run since.
- **No automated accessibility checks in CI.** Regressions are only caught by hand.
- **Focus may be hidden behind the sticky header on narrow screens (unverified).** `scroll-padding-top` is a fixed 4.5 rem (`src/styles/base.css`), but the header row is allowed to wrap (`flex-wrap` in `src/styles/site.css`) and is then taller. A focused element scrolled into view could end up under it (2.4.11 AA, 2.4.12 AAA). Needs a check at 320 CSS pixels.
- **No accessibility statement on the site.** hissi.app has no page that states the conformance target, known barriers and a feedback route for visitors.
- **No dedicated feedback route for website barriers.** The support page links the issue trackers of the iOS and Android apps and an e-mail address, but not this repository's tracker, and does not mention website accessibility. GitHub issues require an account.
- **1.4.8 paragraph spacing (AAA), deliberately not applied.** The legal pages use 1 em paragraph spacing instead of 1.5 times the line spacing; users can override it with text-spacing tools. Reasoning in `docs/accessibility.md`.

## Contributor expectations

- Every change must meet WCAG 2.2 AA. Aim for AAA where feasible and say in the pull request where it is not met.
- Keep the site usable without JavaScript. Controls that only work with JavaScript start `hidden` and are revealed by the script.
- Never convey status by colour alone: shape plus word, as in the apps.
- Use the colour tokens in `src/styles/tokens.css` and check contrast in both light and dark mode, including the purple and soft-purple floors. Add `forced-colors` and `prefers-reduced-motion` handling for anything new that moves or relies on colour.
- Interactive targets outside running text are at least 2.75 rem (44 CSS pixels) high.
- Put all text in `src/i18n/de.ts` and `src/i18n/en.ts`; mark foreign-language passages with `lang`. Keep sentences short and run `node scripts/readability.mjs` after `npm run build` when copy changes.
- Decorative SVGs get `aria-hidden="true"` and `focusable="false"`; meaningful images get an `alt` text in the page language.
- Before opening a pull request: run `npm run check` and `npm run build`, walk the changed pages with the keyboard, check 320 CSS pixels and 200 % zoom, and run an automated checker (for example axe) over the changed pages.
- Update the Known barriers section when you fix a barrier or find a new one, and record AAA judgment calls in `docs/accessibility.md`.

## Reporting process

**Every accessibility issue must have the `a11y` label** so it can be found and triaged.

- **With a GitHub account:** open an issue at <https://github.com/a11yland/Hissi-Web/issues> and add the `a11y` label (maintainers add it if you cannot). Problems inside the apps belong in the app trackers linked on the support page.
- **Without a GitHub account:** use the e-mail address on the support page, [hissi.app/support](https://hissi.app/support/) (English: [hissi.app/en/support](https://hissi.app/en/support/)). A maintainer turns the message into an issue with the `a11y` label.

Helpful details: the page address, what you tried to do, what happened, your device, browser and assistive technology (with versions, if you know them). A screenshot or recording helps but is not required.

Issues that block a task (for example content that cannot be reached with a keyboard or a screen reader) are treated as bugs and take priority over new features.

## Ownership

The a11yland maintainers (Kobe) own accessibility for this website: they triage issues with the `a11y` label, decide AAA judgment calls and keep this file current. Contributors are responsible for the accessibility of their own changes.

## Maintenance

- Review this file with every change that touches the UI, and at least when a new page or feature ships (for example the planned outage and review pages, #3, #4, #5).
- Re-run the automated checks over all pages, light and dark, at 320 and 1280 CSS pixels after UI changes, and record the date here.
- Move items out of Known barriers only when they are verified, and link the issue or commit that closed them.
- Last reviewed: November 2026.
