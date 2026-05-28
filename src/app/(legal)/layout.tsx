import type { ReactNode } from 'react'
import MarketingHeader from '@/components/marketing/MarketingHeader'
import Footer from '@/components/marketing/Footer'

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-0)', color: 'var(--fg-0)' }}>
      <MarketingHeader />
      <main className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">
        {children}
      </main>
      <Footer />
    </div>
  )
}
