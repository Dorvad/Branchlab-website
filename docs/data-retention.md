# Data Retention Register — BranchLab Marketing Site

**Date:** 2026-06-07
**Scope:** `branchlab.online` marketing site (this repo only)
**Purpose:** A living register of every category of data this site stores or transmits, why, where, for how long, and who owns the decision to change that. Required reading alongside `docs/privacy-audit.md`.

This register currently has very few rows because **the site collects no personal data** (see `docs/privacy-audit.md` §1–3 for the full audit). The framework below exists so that the day a form, analytics integration, or embed is added, there is already a place — and a process — to record it, instead of retrofitting compliance after the fact.

---

## Register

| Data type | Purpose | Storage location | Provider | Retention | Deletion mechanism | Owner sign-off |
| --- | --- | --- | --- | --- | --- | --- |
| Theme preference (`branchlab-theme`) | Remember light/dark mode choice | Visitor's browser `localStorage` | None (on-device only) | Until the visitor clears site data | Visitor clears browser storage; no server copy exists | N/A — not personal data |
| Accessibility preferences (`branchlab-a11y`) | Remember text size / contrast / motion / link-highlight settings | Visitor's browser `localStorage` | None (on-device only) | Until the visitor clears site data | Visitor clears browser storage, or uses the in-widget "Reset to defaults" control | N/A — not personal data |
| Cookie-consent choice (`branchlab-consent`) | Record which optional cookie categories the visitor allowed | Visitor's browser `localStorage` | None (on-device only) | Until the visitor clears site data or changes their choice | Visitor changes their selection via Footer → "Cookie preferences", or clears browser storage | N/A — not personal data |
| Hosting/CDN access logs (IP, request metadata) | Operational: serving requests, abuse mitigation | Vercel platform (outside this repo) | Vercel Inc. | **[TODO: confirm Vercel's default retention period from the Vercel dashboard / DPA]** | Governed by Vercel's retention policy | **[TODO: site owner to confirm and document]** |
| Form submissions | — | — | — | — | — | **N/A — no forms exist in this codebase.** If one is added, add a row here before merging |
| Analytics / telemetry events | — | — | — | — | — | **N/A — no analytics integrated.** If one is added, add a row here, and gate the script behind `hasConsent('analytics')` from `src/lib/consent.ts` before merging |
| Marketing / advertising identifiers | — | — | — | — | — | **N/A — none integrated.** Same process as above, gated behind `hasConsent('marketing')` |
| Account / auth data | — | — | — | — | — | **N/A.** Per `CLAUDE.md`, authentication lives entirely in the separate BranchLab app codebase, not here |

## Process for adding a new row

Before merging any change that introduces a form, script, cookie, embed, or other data-touching feature to this repo:

1. **Add a row** to the table above describing exactly what is collected, why, where it's stored, which third party (if any) processes it, how long it's kept, and how it gets deleted.
2. **Gate it on consent** if it's not strictly necessary: wrap the loader in `hasConsent('analytics' | 'marketing' | 'functional')` (from `src/lib/consent.ts`), or defer loading until `CONSENT_CHANGE_EVENT` confirms the relevant category was accepted.
3. **Update `docs/privacy-audit.md`** §3/§5 so the inventory and "third-party scripts" sections stay accurate.
4. **Get the data-controller's (site owner's) sign-off** on retention period and deletion mechanism — fill in the "Owner sign-off" column with a name/date, not a placeholder.
5. If the new data is personal data under the Israeli Privacy Protection Law, confirm with counsel whether it changes the company's **database registration** obligations under Amendment 13.

## Outstanding `[TODO]` items

- [ ] Confirm Vercel's access-log retention period and whether it needs disclosure in `/privacy`
- [ ] Assign a named owner responsible for keeping this register current (recommended: whoever owns `APP_URL` / deployment configuration per `CLAUDE.md`)
