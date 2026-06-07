import type { NextConfig } from 'next'

// Content-Security-Policy: this is a static marketing site with no analytics,
// ads, or third-party trackers. Everything is self-hosted except the
// PlayerShowcase "Try it" demo videos/thumbnails, which stream from the
// Supabase storage bucket below — that origin is allowlisted in img-src and
// media-src so the inline player can load them. 'unsafe-inline' is required
// for script-src (the anti-flash theme-setter in the document head and
// Next.js's streaming hydration scripts) and style-src (Tailwind/Framer
// Motion inline `style` attributes) since the project does not wire up CSP
// nonces.
//
// 'unsafe-eval' is added only in development: `next dev`'s Fast Refresh /
// eval-based source maps call eval() to wrap modules, and a strict
// script-src blocks that with "Refused to evaluate a string as JavaScript".
// Production builds don't use eval, so the prod policy stays strict.
const isDev = process.env.NODE_ENV !== 'production'
const SUPABASE_ASSETS = 'https://intzkjqmxrlfcbqjlaoj.supabase.co'
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${SUPABASE_ASSETS}`,
  `media-src 'self' ${SUPABASE_ASSETS}`,
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

// Subpath deployment support — this app is ALSO served at
// https://branchlab.online/marketing via a Vercel rewrite in the separate
// "BranchLab app" repo (proxying /marketing and /marketing/:path* to this
// deployment's root). basePath/assetPrefix are baked into the build: every
// generated <script>/<link>/<Image>/<Link> URL gets this prefix, so a
// *single* build can serve correctly at its own root (branchlab-website.vercel.app)
// OR under /marketing, but not both — whichever basePath is compiled in is
// the only one that works for that deployment.
//
// NEXT_PUBLIC_BASE_PATH lets each Vercel deployment opt in independently:
// leave it unset on the deployment serving the standalone root domain, and
// set it to "/marketing" on the (separate) deployment that backs the
// /marketing proxy. Don't set it globally — that would break the root domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig: NextConfig = {
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),

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
