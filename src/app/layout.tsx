import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Caveat } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['400', '600'],
})

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <head>
        {/* Anti-flash: set theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('branchlab-theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t)})()`,
          }}
        />
      </head>
      <body
        className="font-sans antialiased"
        style={{ background: 'var(--bg-0)', color: 'var(--fg-0)' }}
      >
        {children}
      </body>
    </html>
  )
}
