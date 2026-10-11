# Accessibility

Target: WCAG 2.2 AA, with AAA where it costs nothing. Automated checks (axe-core 4.13, tags wcag2a/aa/aaa, 2.1, 2.2, best-practice; all pages, light and dark, 1280 px and 320 px) report no violations. This file records the decisions behind the AAA judgment calls and what still needs a person.

## Decisions

- **1.4.8 Visual Presentation – paragraph spacing.** Not applied. The criterion asks for a *mechanism*; text-spacing overrides (1.4.12, verified: no clipping at paragraph spacing 2 × font size) deliver it via user stylesheet or extension. Strict 1.5 × line spacing (`.prose p { margin-top: 2.4em }`) makes the legal pages read like a list of fragments. One line in `src/styles/prose.css` if that changes. Everything else in 1.4.8 is met by default: ≤ 80 characters per line (`max-width: 44rem`), line-height 1.6, no justification, 200 % zoom without horizontal scrolling.
- **1.4.9 Images of Text.** The five screenshots on floor 2 are essential: they show the real app interface, and the content they carry (status as shape and word, grouping, distance) is also stated in the text rows and the `alt` texts. The App Store badge is a logotype, which the criterion exempts.
- **3.1.3 Unusual Words.** "Komplikationen" / "complications" and "Live-Aktivität" / "Live Activity" are Apple terms and now carry an inline explanation (G112, in `src/i18n/*.ts`). "Formenlehre" is the tag line of floor 1; the heading directly below it ("Drei Formen. Mehr musst du nicht lernen.") and the three cards are its definition, the English tag is plain "Shapes".
- **3.1.5 Reading Level.** Measured with `node scripts/readability.mjs` over `dist/` after removing proper names: German pages grade 3.6–8.0 (Wiener Sachtextformel 1), English pages 3.2–6.5 (Flesch-Kincaid). All below the lower-secondary bar of 9; the privacy policy and legal notice are the highest. The syllable count is heuristic, so a page near 9 deserves a second look.

## Verified without assistive technology

- **Keyboard** (Chrome, scripted): skip link appears on first Tab and moves focus to `main`; every stop has a visible focus ring; the lift rides on Enter, the sound toggle flips `aria-pressed` on Space; the language switch returns to the same page in both directions on all four pages.
- **Without JavaScript**: the lift's buttons stay hidden (`.controls[hidden]` – the scoped `display: flex` used to beat the UA's `[hidden]` rule).
- **Forced colors** (Chrome emulation, light and dark): status shapes are `CanvasText` on every floor (the lilac floor and the roof used to keep their brand colours because `.is-lila .shape.ok` outranks the forced-colors rule), door leaves and floor display keep a border, the "Ding!" badge and the privacy chips get one. The strike-through in the hero stays visible as a Canvas-coloured bar across the word.

## Still needs a person

- Screen-reader pass (VoiceOver + Safari, NVDA + Firefox) over the hero elevator: "Tür offen …" must be announced once per ride, "Ton" must read as a toggle with its state, nothing from the lift must be announced while the doors are closed.
- Windows High Contrast on a real machine, dark and light theme, since Chrome's emulation uses its own palette.
