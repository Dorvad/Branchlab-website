import type { Metadata } from 'next'
import MarketingHeader from '@/components/marketing/MarketingHeader'
import HeroSection from '@/components/marketing/HeroSection'
import ProblemSection from '@/components/marketing/ProblemSection'
import ProductLoopSection from '@/components/marketing/ProductLoopSection'
import CreatorStudioShowcase from '@/components/marketing/CreatorStudioShowcase'
import PlayerShowcase from '@/components/marketing/PlayerShowcase'
import UseCasesSection from '@/components/marketing/UseCasesSection'
import ValidationSection from '@/components/marketing/ValidationSection'
import DifferentiationSection from '@/components/marketing/DifferentiationSection'
import FutureSection from '@/components/marketing/FutureSection'
import CTASection from '@/components/marketing/CTASection'
import Footer from '@/components/marketing/Footer'

export const metadata: Metadata = {
  title: 'BranchLab — Interactive Branching Video Simulations',
  description:
    'BranchLab helps trainers, educators, and creators turn video clips into interactive branching simulations with a visual editor, validation, and shareable player links.',
  openGraph: {
    title: 'BranchLab — Interactive Branching Video Simulations',
    description:
      'Turn video clips into branching simulations. A visual studio for trainers, educators, and creators.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BranchLab — Interactive Branching Video Simulations',
    description:
      'Turn video clips into branching simulations. A visual studio for trainers, educators, and creators.',
  },
}

export default function MarketingPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg-0)', color: 'var(--fg-0)' }}
    >
      <MarketingHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <ProductLoopSection />
        <CreatorStudioShowcase />
        <PlayerShowcase />
        <UseCasesSection />
        <ValidationSection />
        <DifferentiationSection />
        <FutureSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
