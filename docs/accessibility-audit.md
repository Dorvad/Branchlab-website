# Accessibility Audit — BranchLab Marketing Site

**Date:** 2026-06-07
**Scope:** `branchlab.online` marketing site (this repo only — does not cover the BranchLab app/editor/player, which lives in a separate codebase)
**Standard baseline:** WCAG 2.1 Level AA, referenced by Israeli Standard SI 5568 and the Equal Rights for Persons with Disabilities Law (5758-1998) accessibility regulations
**Status:** Internal engineering audit. **Not a substitute for a review by a certified accessibility auditor** — see "Required follow-up" below.

---

## 1. What this audit covers

This document records the accessibility posture of the marketing site as of the date above: what was checked, what was fixed as part of this pass, what already existed and worked, known limitations, and what still needs attention from a human reviewer.

It pairs with:
- The public statement at `/accessibility` (`src/app/(legal)/accessibility/page.tsx`)
- The automated test suite at `tests/a11y/pages.spec.ts` (Playwright + axe-core)

## 2. Already in place before this audit

- `lang="en"` set on `<html>` (`src/app/layout.tsx`)
- Visible focus rings via `:focus-visible` (`src/app/globals.css`)
- A persistent **Accessibility widget** (`src/components/marketing/AccessibilityWidget.tsx`) offering: text-size scaling (A / A+ / A++), high-contrast mode, reduced motion, and link-underline mode — all persisted to `localStorage` (`branchlab-a11y`) and applied via classes on `<html>`
- `prefers-reduced-motion` media query respected for all custom keyframe animations (`src/app/globals.css`)
- Semantic landmarks: `<header>`, `<nav aria-label="Main navigation">`, `<main>`, `<footer aria-label="Site footer">`
- Mobile navigation menu with `aria-expanded` / `aria-label`
- `aria-label`s on icon-only buttons throughout (close buttons, social links, etc.)

## 3. Fixes made in this pass

| Area | Issue | Fix |
| --- | --- | --- |
| Skip navigation | No way for keyboard/screen-reader users to bypass the header and jump to content | Added a visually-hidden-until-focused `.skip-link` (`src/app/globals.css`) rendered as the first focusable element in `<body>` (`src/app/layout.tsx`), targeting `id="main-content"` added to `<main>` on both the marketing homepage (`src/app/page.tsx`) and the legal pages layout (`src/app/(legal)/layout.tsx`) |
| Modal dialogs | `ProductFlowModal` (the "how it works" walkthrough) lacked dialog semantics and a focus trap — keyboard users could tab out into the page behind the overlay, and focus wasn't moved into or restored from the dialog | Added `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-headline"` (paired with `id="modal-headline"` on the heading), a `Tab`/`Shift+Tab` focus trap, focus moved to the first focusable element on open, and focus restored to the triggering element on close (`src/components/marketing/ProductFlowModal.tsx`) |
| Cookie/consent UI | No consent mechanism existed (see `docs/privacy-audit.md` for why one was built proactively) | Built `CookieConsent` (`src/components/marketing/CookieConsent.tsx`) as an accessible dialog: keyboard-operable toggles with `role="switch"`/`aria-checked`, focus trap + restore-on-close mirroring the modal pattern above, `aria-labelledby`, and a banner that doesn't steal focus on load |
| Security headers | No CSP / framing / referrer protections | Added a security-header set including `frame-ancestors 'none'` and `X-Frame-Options: DENY`, which also hardens against UI-redress ("clickjacking") attacks that disproportionately affect assistive-technology users (`next.config.ts`) |
| Automated regression testing | No accessibility test coverage existed | Added Playwright + `@axe-core/playwright` smoke tests covering all four public routes plus the skip-link and modal-dialog behaviors (`tests/a11y/pages.spec.ts`, `playwright.config.ts`) |

## 4. Known limitations (documented, not yet resolvable in this codebase)

- **Embedded scenario player**: `/accessibility` already documents that published BranchLab scenarios are served from a third-party origin (the BranchLab app, a separate codebase) and are audited independently. This marketing site cannot remediate that surface.
- **Color contrast on glow/gradient surfaces**: several decorative panels use low-opacity text over animated gradients (e.g. hero visuals, orbital timeline). These are decorative/`aria-hidden` where possible, but a manual contrast check against WCAG 1.4.3 is recommended wherever any of that text is meaningful.
- **Caveat (handwriting) display font**: used only for short decorative accents; verify it is never the sole carrier of essential information.

## 5. How to run the automated checks

```bash
npm install
npx playwright install --with-deps chromium   # one-time, downloads browser binaries
npm run test:a11y
```

The suite (`tests/a11y/pages.spec.ts`) does the following for `/`, `/accessibility`, `/privacy`, and `/terms`:
- Runs an axe-core scan tagged `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` and fails the build on any **serious** or **critical** violation
- Confirms the skip link receives focus first and moves focus to `#main-content`
- Confirms the product-flow dialog exposes `role="dialog"` / `aria-modal="true"` and closes on `Escape`

> Browser binaries could not be downloaded in the CI/sandbox environment used to author this change (outbound network allowlist blocks `cdn.playwright.dev`). Run `npx playwright install --with-deps chromium` locally or in your CI runner before `npm run test:a11y`.

## 6. Manual testing checklist (for the site owner / QA before each release)

- [ ] Tab through the entire homepage with a keyboard only — confirm a visible focus indicator at every stop and a logical order
- [ ] Open and close the "how it works" modal with keyboard only — confirm focus is trapped inside, `Escape` closes it, and focus returns to the trigger
- [ ] Open and close the cookie-preferences modal the same way
- [ ] Run the Accessibility widget through each mode (large text, high contrast, reduced motion, link highlight) and confirm layout doesn't break or clip content
- [ ] Test with a screen reader (VoiceOver on macOS/iOS, NVDA or JAWS on Windows) on the homepage and at least one legal page
- [ ] Zoom the page to 200% and confirm no content is lost or overlapping (WCAG 1.4.4)
- [ ] Confirm all images/icons that convey meaning have appropriate `alt` text or `aria-label`s, and decorative ones are `aria-hidden`

## 7. Required follow-up (owner action items)

- [ ] **Engage a certified accessibility auditor** for a full WCAG 2.1 AA / SI 5568 conformance review before publishing the accessibility statement as final — this document and the automated suite are an engineering-level baseline, not a legal certification
- [ ] Replace the placeholder `lastUpdated` dates on `/accessibility`, `/privacy`, and `/terms` once content is finalized
- [ ] Confirm the contact address `accessibility@branchlab.app` referenced on `/accessibility` is monitored and has a defined response-time process (the Israeli accessibility regulations expect a designated accessibility coordinator for larger organizations — confirm whether this threshold applies)
- [ ] Periodically re-run `npm run test:a11y` (ideally wired into CI) and re-triage any new violations
