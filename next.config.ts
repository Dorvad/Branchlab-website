import type { NextConfig } from 'next'

// Content-Security-Policy: this is a static marketing site with no analytics,
// ads, or third-party trackers. Everything (scripts, styles, fonts, images)
// is self-hosted, so the policy stays tight. 'unsafe-inline' is required for
// script-src (the anti-flash theme-setter in the document head and Next.js's
// streaming hydration scripts) and style-src (Tailwind/Framer Motion inline
// `style` attributes) since the project does not wire up CSP nonces.
//
// 'unsafe-eval' is added only in development: `next dev`'s Fast Refresh /
// eval-based source maps call eval() to wrap modules, and a strict
// script-src blocks that with "Refused to evaluate a string as JavaScript".
// Production builds don't use eval, so the prod policy stays strict.
const isDev = process.env.NODE_ENV !== 'production'
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: CSP },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

const nextConfig: NextConfig = {
  // FFmpeg.wasm uses browser APIs — exclude from server-side bundle
  serverExternalPackages: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
