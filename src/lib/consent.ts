// Lightweight cookie-consent utility shared between the consent banner/modal
// and any future scripts that need to check user permissions before loading.
//
// No third-party scripts are wired up yet (this is a static marketing site
// with no analytics, ads, or trackers) — this exists so that if/when one is
// added, it can gate itself on `hasConsent('analytics')` etc. instead of
// loading unconditionally.

export type ConsentCategory = 'essential' | 'analytics' | 'marketing' | 'functional'

export type ConsentState = Record<ConsentCategory, boolean>

export const CONSENT_STORAGE_KEY = 'branchlab-consent'

/** Fired on `window` whenever stored consent changes (including cross-tab via `storage`). */
export const CONSENT_CHANGE_EVENT = 'branchlab-consent-change'

/** Fired on `window` to request that the preferences modal be opened (e.g. from the footer link). */
export const OPEN_CONSENT_PREFERENCES_EVENT = 'branchlab-open-consent-preferences'

export const DEFAULT_CONSENT: ConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
}

export const CONSENT_CATEGORIES: {
  id: ConsentCategory
  label: string
  description: string
  locked: boolean
}[] = [
  {
    id: 'essential',
    label: 'Essential',
    description:
      'Required for the site to function — page navigation, security, and remembering your preferences. Cannot be disabled.',
    locked: true,
  },
  {
    id: 'functional',
    label: 'Functional',
    description: 'Remembers choices you make (such as accessibility settings) to personalize your visit.',
    locked: false,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description: 'Helps us understand how visitors use the site so we can improve it. Not currently in use.',
    locked: false,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Used to measure the effectiveness of campaigns. Not currently in use.',
    locked: false,
  },
]

function isConsentState(value: unknown): value is ConsentState {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (['essential', 'analytics', 'marketing', 'functional'] as const).every(
    key => typeof v[key] === 'boolean'
  )
}

/** Returns the stored consent, or `null` if the visitor hasn't made a choice yet. */
export function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return isConsentState(parsed) ? { ...parsed, essential: true } : null
  } catch {
    return null
  }
}

export function saveConsent(state: ConsentState) {
  if (typeof window === 'undefined') return
  const next: ConsentState = { ...state, essential: true }
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next))
  } catch {}
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_CHANGE_EVENT, { detail: next }))
}

/** Convenience check for gating a script/feature on a given category. Defaults to `false` until the visitor decides. */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === 'essential') return true
  return getStoredConsent()?.[category] ?? false
}

/** Dispatches an event asking the consent UI to open its preferences modal (used by the footer link). */
export function openConsentPreferences() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(OPEN_CONSENT_PREFERENCES_EVENT))
}
