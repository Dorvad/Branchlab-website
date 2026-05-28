import type { Metadata } from 'next'
import LegalPage from '@/components/marketing/LegalPage'

export const metadata: Metadata = {
  title: 'Accessibility Statement — BranchLab',
  description: 'BranchLab\'s commitment to digital accessibility under Israeli law.',
}

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      eyebrowAccent="mint"
      title="Accessibility Statement"
      lastUpdated="May 2026"
      intro="BranchLab is committed to ensuring equal access to its web service for people with disabilities, in accordance with the Equal Rights for People with Disabilities Law (5758-1998) and the Equal Rights for Persons with Disabilities Regulations (Service Accessibility) 5773-2013, as updated. We strive to meet Israeli Standard SI 5568, which adopts the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA."
    >

      <Section title="1. Legal Basis">
        <p>
          The Equal Rights for People with Disabilities Law (5758-1998) prohibits discrimination
          against people with disabilities in the provision of public services. The associated
          Accessibility Regulations require providers of public-facing digital services to make
          reasonable accommodations so that their websites and applications are accessible to
          people with disabilities.
        </p>
        <p>
          Israeli Standard SI 5568 aligns with WCAG 2.1 AA and constitutes the benchmark for
          digital accessibility compliance in Israel. We are committed to meeting this standard
          across all pages of the BranchLab marketing website and to pursuing comparable
          accessibility in the application.
        </p>
      </Section>

      <Section title="2. Our Current Accessibility Level">
        <p>
          We have taken the following steps to achieve WCAG 2.1 AA compliance:
        </p>
        <ul>
          <li>
            <strong>Semantic HTML:</strong> Headings, landmarks (<code>header</code>, <code>main</code>,{' '}
            <code>footer</code>, <code>nav</code>), and lists are used correctly to provide document
            structure that screen readers can navigate.
          </li>
          <li>
            <strong>Keyboard navigation:</strong> All interactive elements (links, buttons, form
            controls) are reachable and operable via keyboard alone.
          </li>
          <li>
            <strong>Focus management:</strong> Visible focus indicators are provided for keyboard
            users. Focus is managed programmatically in modal dialogs and dynamic content.
          </li>
          <li>
            <strong>Colour contrast:</strong> Text and UI components meet WCAG 2.1 AA minimum
            contrast ratios (4.5:1 for normal text, 3:1 for large text and UI components).
          </li>
          <li>
            <strong>Alternative text:</strong> Images have meaningful <code>alt</code> attributes;
            decorative images are marked with <code>alt=""</code> and <code>aria-hidden="true"</code>.
          </li>
          <li>
            <strong>ARIA labels:</strong> Interactive components without visible labels include
            appropriate <code>aria-label</code> or <code>aria-labelledby</code> attributes.
          </li>
          <li>
            <strong>Reduced motion:</strong> Animations respect the <code>prefers-reduced-motion</code>{' '}
            media query. The built-in accessibility widget also provides a manual "Reduce motion"
            toggle.
          </li>
          <li>
            <strong>Responsive design:</strong> All content is accessible and usable at viewport
            widths down to 320px, and supports browser text-size scaling up to 200% without loss
            of functionality.
          </li>
          <li>
            <strong>Accessible forms:</strong> All form fields have visible or programmatically
            associated labels. Error messages are associated with their fields via{' '}
            <code>aria-describedby</code>.
          </li>
          <li>
            <strong>Language attribute:</strong> The page language is declared (<code>lang="en"</code>)
            so screen readers use the correct voice.
          </li>
        </ul>
      </Section>

      <Section title="3. Built-in Accessibility Settings">
        <p>
          The BranchLab website includes a built-in accessibility widget (the icon in the bottom-left
          corner of every page) that allows you to:
        </p>
        <ul>
          <li>Increase text size (three levels)</li>
          <li>Enable high-contrast mode</li>
          <li>Disable animations and transitions</li>
          <li>Highlight all links with a visible underline</li>
        </ul>
        <p>
          Your preferences are saved in your browser and persist between visits. You can reset them
          at any time through the widget.
        </p>
      </Section>

      <Section title="4. Known Limitations">
        <p>
          Despite our efforts, we are aware of the following current limitations:
        </p>
        <ul>
          <li>
            <strong>Embedded video player:</strong> The interactive scenario player embedded on the
            marketing page (<code>branchlab.online/play/*</code>) is a third-party iframe.
            Full WCAG 2.1 AA compliance within embedded players is a work in progress. Standalone
            published scenarios are tested independently.
          </li>
          <li>
            <strong>Complex animations:</strong> Some marketing animations (3D card effects,
            particle flows) may be distracting for users with vestibular disorders. These are
            automatically disabled when <code>prefers-reduced-motion</code> is set, and can also
            be disabled via the accessibility widget.
          </li>
          <li>
            <strong>PDF exports:</strong> Any downloadable PDFs have not yet been made accessible.
            Contact us for an accessible alternative.
          </li>
        </ul>
        <p>
          We are actively working to address these limitations. If you encounter an accessibility
          barrier not listed here, please contact us (see below).
        </p>
      </Section>

      <Section title="5. Browser and Assistive Technology Support">
        <p>We aim to support the following combinations:</p>
        <ul>
          <li>NVDA + Firefox (Windows)</li>
          <li>JAWS + Chrome (Windows)</li>
          <li>VoiceOver + Safari (macOS, iOS)</li>
          <li>TalkBack + Chrome (Android)</li>
        </ul>
        <p>
          If you experience difficulties with any other assistive technology or browser combination,
          please let us know.
        </p>
      </Section>

      <Section title="6. Accessibility Feedback and Contact">
        <p>
          We welcome feedback on the accessibility of this website. If you encounter a barrier,
          need content in an alternative format, or have a general accessibility question:
        </p>
        <ContactBlock />
        <p>
          We will acknowledge your message within 2 business days and aim to resolve accessibility
          issues or provide a reasonable alternative within 14 business days, in accordance with
          the Israeli Accessibility Regulations.
        </p>
        <p>
          If you are not satisfied with our response, you may contact the Israeli Commission for
          Equal Rights of Persons with Disabilities at{' '}
          <a
            href="https://www.gov.il/en/departments/equal_rights_commission"
            target="_blank"
            rel="noopener noreferrer"
          >
            gov.il/en/departments/equal_rights_commission
          </a>.
        </p>
      </Section>

      <Section title="7. Review and Improvement">
        <p>
          This accessibility statement was prepared following a self-assessment conducted in
          May 2026. We review and update it at least annually, or whenever significant changes
          are made to the website. Our next scheduled review is May 2027.
        </p>
        <p>
          We are committed to ongoing improvement of accessibility across all our digital services
          and consider accessibility requirements in the design and development of new features.
        </p>
      </Section>

    </LegalPage>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold tracking-[-0.01em]" style={{ color: 'var(--fg-0)' }}>
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--fg-2)' }}>
        {children}
      </div>
    </section>
  )
}

function ContactBlock() {
  return (
    <div
      className="my-4 p-4 rounded-xl text-sm"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <p className="font-semibold" style={{ color: 'var(--fg-1)' }}>BranchLab Accessibility Team</p>
      <p style={{ color: 'oklch(82% 0.18 165)' }}>accessibility@branchlab.app</p>
      <p className="text-xs mt-1" style={{ color: 'var(--fg-4)' }}>
        Please include "Accessibility" in the subject line and describe the page or feature
        affected and the assistive technology you are using.
      </p>
    </div>
  )
}
