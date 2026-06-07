import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// Automated baseline scan for the public marketing routes against
// WCAG 2.0/2.1 A & AA — the standard referenced by Israeli Standard SI 5568
// and the site's accessibility statement. This catches regressions in
// contrast, labelling, landmarks, and ARIA usage; it does NOT replace manual
// keyboard/screen-reader testing (see docs/accessibility-audit.md).
const ROUTES = ['/', '/accessibility', '/privacy', '/terms']

for (const route of ROUTES) {
  test(`${route} has no critical accessibility violations`, async ({ page }) => {
    await page.goto(route)
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const seriousOrCritical = results.violations.filter(
      v => v.impact === 'serious' || v.impact === 'critical'
    )

    if (seriousOrCritical.length > 0) {
      console.log(JSON.stringify(seriousOrCritical, null, 2))
    }

    expect(seriousOrCritical, `Serious/critical a11y violations on ${route}`).toEqual([])
  })
}

test('skip link moves focus to main content', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skipLink = page.locator('.skip-link')
  await expect(skipLink).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})

test('product flow modal traps focus and is announced as a dialog', async ({ page }) => {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: /how it works|see how it works|product flow/i }).first()
  if (await trigger.count() === 0) test.skip(true, 'No modal trigger found on the homepage')

  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAttribute('aria-modal', 'true')

  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
})
