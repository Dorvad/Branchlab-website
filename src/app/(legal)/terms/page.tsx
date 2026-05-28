import type { Metadata } from 'next'
import LegalPage from '@/components/marketing/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service — BranchLab',
  description: 'Terms and conditions governing use of the BranchLab platform.',
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTION REQUIRED: Replace every [PLACEHOLDER] before going live.
// Have this document reviewed by a qualified Israeli attorney.
// ─────────────────────────────────────────────────────────────────────────────

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="May 2026"
      intro={`These Terms of Service ("Terms") govern your access to and use of the BranchLab website (branchlab.app) and application service (app.branchlab.app, branchlab.online) operated by [COMPANY_LEGAL_NAME], a company registered in Israel ("BranchLab", "we", "us", "our"). By accessing or using the service you agree to be bound by these Terms. If you do not agree, do not use the service.`}
    >

      <Section title="1. The Service">
        <p>
          BranchLab provides a software-as-a-service (SaaS) platform that enables creators, trainers,
          and educators to build interactive branching video simulations using a visual node editor,
          validate those simulations, and publish shareable player links. The service includes the
          marketing website, web application, and any related APIs or integrations.
        </p>
        <p>
          The service is provided on an "as-is" basis and may be updated, modified, or discontinued
          at any time. We will give reasonable notice of significant changes that affect existing users.
        </p>
      </Section>

      <Section title="2. Acceptance and Eligibility">
        <p>
          By using the service you confirm that:
        </p>
        <ul>
          <li>You are at least 18 years of age, or 16 years of age with verifiable parental or
              guardian consent</li>
          <li>You have the legal capacity to enter into a binding agreement under Israeli law</li>
          <li>You are not prohibited from using the service under Israeli law or the laws of any
              applicable jurisdiction</li>
          <li>If you are accepting these Terms on behalf of a legal entity, you have authority to
              bind that entity</li>
        </ul>
      </Section>

      <Section title="3. Account Registration">
        <p>
          To access the full service you must create an account. You agree to:
        </p>
        <ul>
          <li>Provide accurate and complete registration information</li>
          <li>Keep your account credentials confidential and notify us immediately of any
              unauthorised access at <strong>security@branchlab.app</strong></li>
          <li>Be solely responsible for all activity that occurs under your account</li>
          <li>Not share, sell, or transfer your account to any third party</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate accounts where we have reasonable grounds to
          believe these requirements have been breached.
        </p>
      </Section>

      <Section title="4. Permitted and Prohibited Use">
        <p>You may use the service to create and publish lawful interactive video content. You must not:</p>
        <ul>
          <li>Upload or publish content that is unlawful, defamatory, harassing, pornographic,
              violent, discriminatory, or otherwise harmful under Israeli law, including the
              Prohibition on Incitement to Violence or Terror Law (5764-2004)</li>
          <li>Infringe any intellectual property rights or other rights of third parties</li>
          <li>Upload content depicting minors in inappropriate contexts or that could constitute
              an offence under any law</li>
          <li>Attempt to gain unauthorised access to our systems or data</li>
          <li>Use automated tools to scrape, crawl, or extract data from the service</li>
          <li>Reverse engineer, decompile, or create derivative works from the service software</li>
          <li>Resell, sublicense, or otherwise commercialise access to the service without our
              written consent</li>
          <li>Use the service in any way that violates applicable law or regulation</li>
        </ul>
        <p>
          Violation of these restrictions may result in immediate suspension or termination of your
          account without refund, and may be reported to the appropriate authorities.
        </p>
      </Section>

      <Section title="5. Your Content">
        <p>
          "Your Content" means any video files, text, images, or other material you upload to the
          service.
        </p>
        <ul>
          <li>
            <strong>Ownership:</strong> You retain all intellectual property rights in Your Content.
            These Terms do not transfer any ownership to BranchLab.
          </li>
          <li>
            <strong>Licence to us:</strong> You grant BranchLab a non-exclusive, worldwide,
            royalty-free licence to store, process, and display Your Content solely to provide and
            improve the service. This licence ends when you delete the content or close your account.
          </li>
          <li>
            <strong>Your responsibility:</strong> You represent and warrant that Your Content does
            not infringe any third-party rights, is not unlawful, and that you have all necessary
            rights, licences, and consents (including from persons appearing in videos) to upload
            and publish it.
          </li>
          <li>
            <strong>Published scenarios:</strong> When you publish a scenario, you choose whether
            to make it publicly accessible. You are solely responsible for the content you make
            public.
          </li>
        </ul>
        <p>
          We reserve the right to remove content that violates these Terms or applicable law,
          without prior notice where urgent action is required.
        </p>
      </Section>

      <Section title="6. Intellectual Property">
        <p>
          The service, including all software, design, text, graphics, logos, and other materials
          created by BranchLab, is owned by BranchLab or its licensors and is protected by Israeli
          and international intellectual property laws. Nothing in these Terms grants you any right
          to use our trade marks, logos, or brand materials without prior written consent.
        </p>
      </Section>

      <Section title="7. Fees and Payment">
        <p>
          Certain features of the service require a paid subscription. Fees are set out on our
          pricing page. By subscribing you agree to pay all applicable fees. In accordance with the
          Israeli Consumer Protection Law (5741-1981) and the Electronic Commerce Law (5762-2002):
        </p>
        <ul>
          <li>
            <strong>Subscription cancellation:</strong> You may cancel a subscription at any time.
            Cancellation takes effect at the end of the current billing period. No partial refunds
            are provided for unused periods unless required by law.
          </li>
          <li>
            <strong>Fourteen-day right of withdrawal:</strong> For first-time purchases of digital
            services, you have the right under the Consumer Protection Law to withdraw from the
            purchase within 14 days, provided you have not yet accessed or used the digital content.
            Once you have actively used the service (e.g., created a scenario), the right of
            withdrawal is deemed waived in accordance with Section 14c(d)(1) of the Consumer
            Protection Law.
          </li>
          <li>Prices include VAT where required by Israeli law</li>
          <li>We reserve the right to change pricing with 30 days' notice to existing subscribers</li>
        </ul>
      </Section>

      <Section title="8. Privacy">
        <p>
          Your use of the service is also governed by our{' '}
          <a href="/privacy">Privacy Policy</a>, which is incorporated into these Terms by reference.
          By using the service you acknowledge you have read and understood the Privacy Policy.
        </p>
      </Section>

      <Section title="9. Disclaimer of Warranties">
        <p>
          To the maximum extent permitted by Israeli law, the service is provided "as is" and "as
          available", without warranty of any kind. BranchLab expressly disclaims all warranties,
          whether express, implied, statutory, or otherwise, including without limitation warranties
          of merchantability, fitness for a particular purpose, and non-infringement.
        </p>
        <p>
          We do not warrant that the service will be uninterrupted, error-free, or free of harmful
          components. You assume full responsibility for your use of the service.
        </p>
        <p>
          Nothing in this clause limits the rights afforded to consumers under the Israeli Consumer
          Protection Law (5741-1981) or other mandatory consumer protection legislation that cannot
          be contractually excluded.
        </p>
      </Section>

      <Section title="10. Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, and in particular taking into account
          the provisions of the Israeli Standard Contracts Law (5743-1982) which may render
          disproportionately one-sided clauses unenforceable:
        </p>
        <ul>
          <li>
            BranchLab's total cumulative liability to you arising out of or relating to these Terms
            or the service shall not exceed the greater of (a) the total fees paid by you to
            BranchLab in the twelve months preceding the claim, or (b) ILS 500.
          </li>
          <li>
            BranchLab shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages, including loss of profits, data, goodwill, or business opportunities,
            arising out of or related to these Terms, even if advised of the possibility of such
            damages.
          </li>
        </ul>
        <p>
          These limitations do not apply to liability arising from wilful misconduct or gross
          negligence, personal injury caused by our negligence, or any other liability that cannot
          be limited or excluded under applicable mandatory Israeli law.
        </p>
      </Section>

      <Section title="11. Indemnification">
        <p>
          You agree to defend, indemnify, and hold harmless BranchLab and its officers, directors,
          employees, and agents from any claims, liabilities, damages, costs, and expenses
          (including reasonable legal fees) arising out of: (a) Your Content; (b) your use of the
          service in violation of these Terms; or (c) your violation of any applicable law or the
          rights of a third party. We reserve the right to assume exclusive control of the defence
          of any matter subject to indemnification by you, at your cost.
        </p>
      </Section>

      <Section title="12. Third-Party Services">
        <p>
          The service may integrate with or link to third-party services. BranchLab is not
          responsible for the availability, content, or privacy practices of third-party services.
          Your use of third-party services is subject to their own terms and conditions.
        </p>
      </Section>

      <Section title="13. Service Availability and Changes">
        <p>
          We aim to maintain high availability but do not guarantee uninterrupted access to the
          service. We may perform maintenance, updates, or emergency fixes at any time. For
          scheduled maintenance exceeding 2 hours, we will endeavour to provide 48 hours' notice
          to registered users.
        </p>
        <p>
          We reserve the right to modify or discontinue features of the service. For material
          changes, we will provide at least 30 days' notice to registered users.
        </p>
      </Section>

      <Section title="14. Termination">
        <p>
          Either party may terminate these Terms at any time:
        </p>
        <ul>
          <li>
            <strong>By you:</strong> Delete your account through account settings. Your Content will
            be deleted within 30 days of account closure.
          </li>
          <li>
            <strong>By us:</strong> We may suspend or terminate your access immediately if you
            materially breach these Terms, and may provide notice where appropriate. For paid
            accounts, we will provide a pro-rated refund for any unused prepaid period unless
            termination is due to your breach.
          </li>
        </ul>
        <p>
          Provisions of these Terms that by their nature should survive termination (intellectual
          property, limitation of liability, indemnification, governing law) will do so.
        </p>
      </Section>

      <Section title="15. Governing Law and Dispute Resolution">
        <p>
          These Terms are governed by the laws of the State of Israel, without regard to conflicts
          of law principles. You agree that the exclusive jurisdiction for any dispute arising out
          of or related to these Terms or the service shall be the competent courts of Tel Aviv-Jaffa,
          Israel. Nothing in this clause prevents you from raising a complaint with a relevant
          consumer protection authority.
        </p>
        <p>
          Before initiating legal proceedings, we encourage you to contact us at{' '}
          <strong>legal@branchlab.app</strong> to attempt to resolve the dispute amicably.
        </p>
      </Section>

      <Section title="16. Severability and Entire Agreement">
        <p>
          If any provision of these Terms is found to be invalid, unlawful, or unenforceable under
          Israeli law (including pursuant to the Standard Contracts Law 5743-1982), that provision
          shall be severed or modified to the minimum extent necessary, and the remaining provisions
          shall continue in full force. These Terms, together with the Privacy Policy and any
          supplemental terms applicable to specific features, constitute the entire agreement between
          you and BranchLab regarding the service.
        </p>
      </Section>

      <Section title="17. Changes to Terms">
        <p>
          We may update these Terms from time to time. We will notify registered users by email at
          least 14 days before material changes take effect. Continued use of the service after the
          effective date constitutes acceptance of the updated Terms. If you do not agree to the
          updated Terms, you may close your account before the effective date.
        </p>
      </Section>

      <Section title="18. Contact">
        <p>For legal notices or questions about these Terms:</p>
        <AddressBlock
          name="[COMPANY_LEGAL_NAME] — Legal"
          address="[ADDRESS, CITY, ISRAEL]"
          email="legal@branchlab.app"
        />
        <p className="mt-4 text-sm" style={{ color: 'var(--fg-4)', fontStyle: 'italic' }}>
          These Terms were prepared in May 2026 and are intended to comply with Israeli law,
          including the Standard Contracts Law (5743-1982), Consumer Protection Law (5741-1981),
          and Electronic Commerce Law (5762-2002). They should be reviewed by qualified legal
          counsel before reliance.
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

function AddressBlock({ name, address, email }: { name: string; address?: string; email: string }) {
  return (
    <div
      className="my-4 p-4 rounded-xl text-sm"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <p className="font-semibold" style={{ color: 'var(--fg-1)' }}>{name}</p>
      {address && <p style={{ color: 'var(--fg-3)' }}>{address}</p>}
      <p style={{ color: 'oklch(82% 0.18 165)' }}>{email}</p>
    </div>
  )
}
