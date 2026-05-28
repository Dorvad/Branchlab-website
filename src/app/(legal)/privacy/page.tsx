import type { Metadata } from 'next'
import LegalPage from '@/components/marketing/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy — BranchLab',
  description: 'How BranchLab collects, uses, and protects your personal information under Israeli law.',
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTION REQUIRED: Replace every [PLACEHOLDER] before going live.
// Have this document reviewed by a qualified Israeli attorney.
// ─────────────────────────────────────────────────────────────────────────────

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="May 2026"
      intro={'BranchLab ("we", "us", or "our") is committed to protecting your privacy in accordance with the Israeli Privacy Protection Law (5741-1981) and its regulations, including the Privacy Protection Regulations (Data Security) 5777-2017, as amended. This policy explains what personal information we collect, how we use it, and your rights as a data subject.'}
    >

      <Section title="1. Data Controller">
        <p>
          The controller of your personal data is:
        </p>
        <AddressBlock
          name="[COMPANY_LEGAL_NAME]"
          address="[REGISTERED_ADDRESS, CITY, ISRAEL]"
          registration="Company No. [REGISTRATION_NUMBER]"
          email="privacy@branchlab.app"
        />
        <p>
          For privacy-related inquiries or to exercise your rights, contact us at the email above.
          We aim to respond within 30 days.
        </p>
      </Section>

      <Section title="2. What Personal Data We Collect">
        <Subsection title="2.1 Marketing website (branchlab.app)">
          <ul>
            <li>IP address and approximate geolocation derived from it</li>
            <li>Browser type, operating system, and device type</li>
            <li>Pages visited, referral URL, and session duration</li>
            <li>Cookies and similar tracking technologies (see Section 5)</li>
          </ul>
        </Subsection>
        <Subsection title="2.2 Application service (app.branchlab.app / branchlab.online)">
          <ul>
            <li><strong>Account data:</strong> name, email address, and password (stored as a one-way hash)</li>
            <li><strong>Profile data:</strong> organisation name and role (optional)</li>
            <li><strong>Content data:</strong> video clips, scenario structures, and choice trees you upload or create</li>
            <li><strong>Usage data:</strong> log-in times, feature usage, and error reports</li>
            <li><strong>Player analytics:</strong> anonymised completion data, choice paths, and session metrics for scenarios you publish</li>
            <li><strong>Communications:</strong> emails and messages you send to our support team</li>
          </ul>
        </Subsection>
        <Subsection title="2.3 Data we do not collect">
          <p>
            We do not collect special-category data (health, biometric, religious, political, or
            financial information) and do not sell your personal data to third parties.
          </p>
        </Subsection>
      </Section>

      <Section title="3. How We Use Your Data">
        <Table
          headers={['Purpose', 'Legal Basis (Israeli PPL / GDPR equivalent)']}
          rows={[
            ['Provide and operate the service', 'Performance of a contract'],
            ['Send transactional emails (account, password reset)', 'Performance of a contract'],
            ['Analyse and improve our service', 'Legitimate interests'],
            ['Ensure security, detect fraud, and prevent abuse', 'Legitimate interests / Legal obligation'],
            ['Comply with applicable law', 'Legal obligation'],
            ['Send product updates and marketing (with opt-out)', 'Consent / Legitimate interests'],
            ['Respond to support inquiries', 'Performance of a contract'],
            ['Aggregate anonymised analytics for creators', 'Performance of a contract'],
          ]}
        />
      </Section>

      <Section title="4. Database Registration">
        <p>
          Under Section 8 of the Israeli Privacy Protection Law, databases containing personal data
          about more than 10,000 individuals, or containing sensitive data, must be registered with
          the Israeli Privacy Protection Authority (PPA). We comply with this requirement where applicable.
          Our registered database name is <strong>[DATABASE_NAME_IF_REGISTERED]</strong> (registration
          number <strong>[DB_REG_NUMBER]</strong>).
        </p>
      </Section>

      <Section title="5. Cookies and Tracking Technologies">
        <p>
          We use the following categories of cookies:
        </p>
        <Table
          headers={['Category', 'Purpose', 'Can you opt out?']}
          rows={[
            ['Strictly necessary', 'Session management, security, load balancing', 'No — the service requires these'],
            ['Functional', 'Remember your preferences (theme, accessibility settings)', 'Yes — clear browser storage'],
            ['Analytics', 'Understand how visitors use our site (anonymised)', 'Yes — see below'],
            ['Embedded content', 'Play embedded scenario demos via branchlab.online', 'Yes — do not interact with demos'],
          ]}
        />
        <p>
          You can control cookies through your browser settings. Disabling strictly necessary cookies
          may affect service functionality. We honour the <code>Do Not Track</code> browser header
          for analytics cookies.
        </p>
      </Section>

      <Section title="6. Data Sharing">
        <p>We share personal data only in the following circumstances:</p>
        <ul>
          <li>
            <strong>Service providers:</strong> cloud hosting, email delivery, and analytics
            providers acting as data processors under written data-processing agreements
          </li>
          <li>
            <strong>Legal requirements:</strong> when required by Israeli law, court order, or
            regulation, or to protect the rights, property, or safety of BranchLab, our users,
            or the public
          </li>
          <li>
            <strong>Business transfers:</strong> in connection with a merger, acquisition, or sale
            of assets, with prior notice to affected users
          </li>
          <li>
            <strong>With your consent:</strong> for any other purpose with your explicit consent
          </li>
        </ul>
        <p>We do not sell, rent, or trade your personal data.</p>
      </Section>

      <Section title="7. International Data Transfers">
        <p>
          Our infrastructure may be located outside Israel, including in countries within the
          European Economic Area (EEA) and the United States. Where data is transferred outside
          Israel, we ensure an adequate level of protection through one or more of the following:
        </p>
        <ul>
          <li>
            Transfer to countries recognised by Israel as providing adequate protection (e.g., EU
            member states under the EU–Israel adequacy decision)
          </li>
          <li>Standard contractual clauses approved by relevant authorities</li>
          <li>Other legally recognised safeguards</li>
        </ul>
      </Section>

      <Section title="8. Data Retention">
        <p>
          We retain personal data only as long as necessary for the purposes described in this policy
          or as required by law:
        </p>
        <Table
          headers={['Data category', 'Retention period']}
          rows={[
            ['Account data', '3 years after account closure, then deleted'],
            ['Content (videos, scenarios)', '30 days after deletion request or account closure'],
            ['Player analytics (anonymised)', 'Up to 5 years for aggregate reporting'],
            ['Server logs (IP, access records)', '90 days'],
            ['Support correspondence', '3 years from last contact'],
            ['Legal compliance records', 'As required by law (typically 7 years)'],
          ]}
        />
      </Section>

      <Section title="9. Your Rights Under Israeli Law">
        <p>
          Under the Privacy Protection Law (5741-1981) and its amendments, you have the following rights:
        </p>
        <ul>
          <li>
            <strong>Right of access (Section 13):</strong> Request a copy of the personal data we
            hold about you
          </li>
          <li>
            <strong>Right to correction (Section 14):</strong> Request correction of inaccurate or
            incomplete data
          </li>
          <li>
            <strong>Right to deletion:</strong> Request deletion of data where we no longer have a
            lawful basis for processing it
          </li>
          <li>
            <strong>Right to object to direct marketing (Section 17A):</strong> Opt out of marketing
            communications at any time via the unsubscribe link in any email, or by contacting us
          </li>
          <li>
            <strong>Right to restriction:</strong> Request that we restrict processing in certain
            circumstances
          </li>
          <li>
            <strong>Right to data portability:</strong> Receive your data in a structured,
            machine-readable format
          </li>
          <li>
            <strong>Right to complain:</strong> Lodge a complaint with the Israeli Privacy Protection
            Authority (PPA) at{' '}
            <a href="https://www.gov.il/en/departments/the_privacy_protection_authority" target="_blank" rel="noopener noreferrer">
              gov.il/en/departments/the_privacy_protection_authority
            </a>
          </li>
        </ul>
        <p>
          To exercise any of these rights, email us at <strong>privacy@branchlab.app</strong> with
          subject line "Privacy Rights Request". We will verify your identity before processing
          the request and respond within 30 days.
        </p>
      </Section>

      <Section title="10. Data Security">
        <p>
          We implement technical and organisational measures required under the Privacy Protection
          Regulations (Data Security) 5777-2017, commensurate with the sensitivity level of the
          data we hold, including:
        </p>
        <ul>
          <li>Encryption of data in transit (TLS 1.2+) and at rest</li>
          <li>Access controls and role-based permissions for staff</li>
          <li>Regular security assessments and vulnerability testing</li>
          <li>Incident response procedures, including notification to the PPA and affected users
              within 72 hours of discovering a significant breach</li>
        </ul>
        <p>
          No system is completely secure. If you become aware of a potential security issue, please
          contact us immediately at <strong>security@branchlab.app</strong>.
        </p>
      </Section>

      <Section title="11. Children's Privacy">
        <p>
          Our service is not directed to children under 13 years of age. We do not knowingly collect
          personal data from children under 13. If you are a parent or guardian and believe your
          child has provided us with personal data, please contact us immediately and we will delete
          it. Users who create scenarios involving minors are responsible for obtaining all necessary
          consents from those minors' guardians.
        </p>
      </Section>

      <Section title="12. Changes to This Policy">
        <p>
          We may update this policy from time to time. We will notify registered users by email at
          least 14 days before material changes take effect. The "Last updated" date at the top of
          this page reflects the most recent revision. Continued use of the service after the
          effective date constitutes acceptance of the updated policy.
        </p>
      </Section>

      <Section title="13. Contact">
        <p>
          For any questions about this policy or to exercise your rights:
        </p>
        <AddressBlock
          name="[COMPANY_LEGAL_NAME] — Privacy"
          address="[ADDRESS]"
          email="privacy@branchlab.app"
        />
        <p className="mt-4 text-sm" style={{ color: 'var(--fg-4)', fontStyle: 'italic' }}>
          Note: This privacy policy was prepared in May 2026 and is intended to comply with the
          Israeli Privacy Protection Law (5741-1981), the Privacy Protection Regulations (Data
          Security) 5777-2017, and applicable international data protection standards. It should be
          reviewed by qualified legal counsel before reliance.
        </p>
      </Section>

    </LegalPage>
  )
}

// ── Shared sub-components ─────────────────────────────────────────────────────

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

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold" style={{ color: 'var(--fg-1)' }}>{title}</h3>
      {children}
    </div>
  )
}

function AddressBlock({
  name,
  address,
  registration,
  email,
}: {
  name: string
  address?: string
  registration?: string
  email: string
}) {
  return (
    <div
      className="my-4 p-4 rounded-xl text-sm"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <p className="font-semibold" style={{ color: 'var(--fg-1)' }}>{name}</p>
      {address && <p style={{ color: 'var(--fg-3)' }}>{address}</p>}
      {registration && <p style={{ color: 'var(--fg-3)' }}>{registration}</p>}
      <p style={{ color: 'oklch(82% 0.18 165)' }}>{email}</p>
    </div>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {headers.map(h => (
              <th key={h} className="text-left px-4 py-3 font-semibold text-xs tracking-wide" style={{ color: 'var(--fg-1)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined }}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-xs leading-relaxed" style={{ color: j === 0 ? 'var(--fg-1)' : 'var(--fg-3)' }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
