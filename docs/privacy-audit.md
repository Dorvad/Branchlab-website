# Privacy Audit — BranchLab Marketing Site

**Date:** 2026-06-07
**Scope:** `branchlab.online` marketing site (this repo only — does not cover the BranchLab app, editor, player, dashboard, auth, or Supabase, which live in a separate codebase and have their own privacy posture)
**Legal framing:** Israeli Privacy Protection Law (5741-1981), the Privacy Protection Regulations (Data Security) 5777-2017, and Amendment 13 (in force August 2025)
**Status:** Internal engineering audit, not legal advice — see "Required follow-up" below.

---

## 1. Summary finding

**This marketing site, as currently built, collects no personal data.** It is a static set of pages with:
- No forms (contact, newsletter, signup, etc.)
- No analytics, advertising, or session-recording scripts
- No cookies set by this site's own code
- No server-side data store, API routes, authentication, or database (confirmed against `CLAUDE.md`: "No authentication, no database, no API routes")

The only outbound links to systems that *do* process personal data are CTAs that navigate the visitor to the separate BranchLab application (`APP_URL` in `src/components/marketing/marketing-data.ts`, currently `https://app.branchlab.app`) — e.g. "Open app", "Sign in", "Play a demo". Once a visitor clicks through, they leave this codebase's control and fall under the **app's** privacy policy, not this site's.

## 2. Audit method

- Searched the codebase for forms, input collection, `fetch`/`XMLHttpRequest` calls, third-party `<script>`/`<iframe>` embeds, analytics SDKs (Google Analytics, Plausible, Hotjar, etc.), and cookie usage — none found beyond the items below
- Read all three legal pages (`/privacy`, `/terms`, `/accessibility`) and the shared `LegalPage` wrapper
- Reviewed `src/app/layout.tsx`, `Footer.tsx`, `MarketingHeader.tsx`, `AccessibilityWidget.tsx`, and `CookieConsent.tsx` for any client-side storage or data egress

## 3. Data inventory

| Item | Collected? | Where it lives | Notes |
| --- | --- | --- | --- |
| Form submissions (contact, newsletter, etc.) | No | — | No forms exist in this codebase |
| Analytics / telemetry | No | — | No analytics SDK is integrated |
| Advertising / marketing pixels | No | — | None integrated |
| Server-side logs of visitor PII | No | — | No backend in this repo; hosting-platform (Vercel) access logs are outside this codebase's control — see follow-up |
| `localStorage: branchlab-theme` | Yes (preference only) | Visitor's browser | Light/dark theme choice. Not personal data; not transmitted anywhere |
| `localStorage: branchlab-a11y` | Yes (preference only) | Visitor's browser | Accessibility widget settings (text size, contrast, motion, link-highlight). Not personal data; not transmitted anywhere |
| `localStorage: branchlab-consent` | Yes (preference only) | Visitor's browser | Cookie-category choices recorded by the new consent system (see §4). Not personal data; not transmitted anywhere |

None of the `localStorage` entries above are cookies, are sent to any server, or identify a person — they are local UI preferences that stay on-device.

## 4. Cookie / consent system — built proactively

At the time of this audit there is **nothing on this site that requires consent** under Amendment 13 or the EU-style cookie rules it draws from (no analytics, no marketing, no functional cookies beyond the on-device preferences listed above, which are strictly necessary for the features that set them).

Per the site owner's direction, a full consent system was nonetheless built **now, as future-proofing**, so that the moment any optional script (analytics, marketing, embedded media, etc.) is added, it has a gate to plug into immediately rather than shipping ungated and creating a compliance gap:

- **`src/lib/consent.ts`** — typed consent-state utility (`essential` / `functional` / `analytics` / `marketing` categories), `localStorage`-backed (`branchlab-consent`), with `hasConsent(category)` for gating future scripts and `openConsentPreferences()` / a `CustomEvent` bus so any part of the UI can open the preferences modal
- **`src/components/marketing/CookieConsent.tsx`** — a banner shown on first visit (Accept all / Reject non-essential / Manage preferences) plus an accessible preferences dialog with a toggle per category (essential is locked on)
- **Footer → Legal → "Cookie preferences"** reopens the preferences dialog at any time (`src/components/marketing/Footer.tsx`)
- Mounted globally in `src/app/layout.tsx`

**Important:** this system currently has nothing to gate. No script in the codebase checks `hasConsent()` yet, because no optional script exists. The moment one is added (analytics, a chat widget, an embedded video SDK, etc.), its loader **must** be wrapped in a `hasConsent('analytics' | 'marketing' | 'functional')` check (or only injected after `CONSENT_CHANGE_EVENT` confirms permission) — otherwise the consent UI becomes decorative and non-compliant. This is called out again in `docs/data-retention.md`.

## 5. Third-party scripts and embeds — none found

No third-party JavaScript, web fonts loaded at runtime, analytics beacons, or embeds were found. Fonts (`Inter`, `JetBrains Mono`, `Caveat`) are loaded via `next/font/google`, which **self-hosts** the font files at build time — no runtime request to Google's servers, no data shared with Google.

The `/accessibility` page references an "embedded scenario player" (`branchlab.online/play/*`) as a third-party iframe — that player is part of the separate BranchLab app codebase, not this repo, and is out of scope for this audit.

**Update (hero "Try it" demo):** `PlayerShowcase.tsx` streams its inline demo videos and poster thumbnails directly from a Supabase storage bucket (`https://intzkjqmxrlfcbqjlaoj.supabase.co/storage/v1/object/public/Assets/...`). This is passive media (no script execution, no data sent about the visitor beyond the standard HTTP request for the asset) and carries no personal data, but it is a third-party origin and is allowlisted in `img-src`/`media-src` in the CSP (`next.config.ts`). Noting it here so the inventory stays accurate — no consent gating is needed since it's not tracking/analytics, but it should be documented if its retention/hosting changes.

## 6. User rights mechanism

Because no personal data is collected by this site, there is currently no subject-access/erasure mechanism to build here. The existing `/privacy` policy already directs data-subject requests to a contact address (`[PLACEHOLDER]` pending the owner filling in real company details — see `docs/data-retention.md` and the page's `ACTION REQUIRED` comment). That mechanism is correctly the responsibility of whichever system *does* hold the data — i.e. the BranchLab app, when a visitor signs up there.

## 7. Changes made as part of this audit

1. Built the consent system described in §4 (banner, preferences dialog, utility, footer entry)
2. Added security headers, including a Content-Security-Policy that blocks framing and restricts script/style/connect origins to `'self'` (`next.config.ts`) — reduces the attack surface for injection-based data exfiltration
3. Documented the current (non-)collection posture in this file and in `docs/data-retention.md`, so that the moment data collection is added, there's a framework already in place to extend rather than retrofit

## 8. Required follow-up (owner / legal review)

- [ ] **Have `/privacy` and `/terms` reviewed by a qualified Israeli attorney** and replace the remaining `[PLACEHOLDER]`s (`[REGISTRATION_NUMBER]`, `[DATABASE_NAME_IF_REGISTERED]`, `[DB_REG_NUMBER]`) — `[COMPANY_LEGAL_NAME]` and the registered address have been filled in (Branchlab, Jerusalem Boulevard 107, Tel Aviv-Yafo, Israel 6818365), but legal review of the full pages is still required
- [ ] Confirm whether the company needs to **register a database** with the Israeli Registrar of Databases under Amendment 13's expanded criteria — this depends on facts about the business (e.g. whether/when the BranchLab app reaches the data-volume thresholds), not on this marketing site
- [ ] Decide whether Vercel's platform-level access logs (IP addresses, request metadata — outside this codebase, configured in the Vercel dashboard) constitute "personal data" requiring disclosure in the privacy policy, and document the retention period Vercel applies
- [ ] When any analytics/marketing/embed script is added in the future: gate it behind `hasConsent()` from `src/lib/consent.ts` **before** merging, and add a row to the data table in `docs/data-retention.md`
- [ ] Re-run this audit whenever a form, login, analytics integration, or embed is added to this repo
