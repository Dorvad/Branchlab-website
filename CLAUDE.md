# BranchLab Website

This is the **marketing website** for BranchLab — a standalone Next.js project. It does not contain the BranchLab app (editor, player, dashboard, auth, Supabase).

## What this repo contains

The public marketing site at `/`. All content lives in `src/components/marketing/`. No authentication, no database, no API routes.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## App URL config

CTA buttons link to the BranchLab app. Update `APP_URL` in:

```
src/components/marketing/marketing-data.ts
```

Change `https://app.branchlab.app` to the actual deployed app URL.

## Development

```bash
npm install
npm run dev     # localhost:3000
npm run build   # production build
```

## Structure

```
src/
  app/
    page.tsx                    # assembles all marketing sections
    layout.tsx                  # root layout + metadata + fonts
    globals.css                 # design tokens + marketing animations
  components/
    marketing/
      marketing-types.ts        # TypeScript interfaces
      marketing-data.ts         # all data arrays + APP_URL config
      MarketingHeader.tsx       # sticky nav
      HeroSection.tsx           # hero + animated graph visual
      ProblemSection.tsx        # linear vs. branching split
      ProductLoopSection.tsx    # 6-step product flow
      CreatorStudioShowcase.tsx # editor mockup with interactive stages
      PlayerShowcase.tsx        # phone player mockup with animation states
      UseCasesSection.tsx       # use cases grid
      ValidationSection.tsx     # validation → publish sequence
      DifferentiationSection.tsx# positioning constellation
      FutureSection.tsx         # roadmap
      CTASection.tsx            # final CTA
      Footer.tsx                # footer
public/
  branchlab-logo.png            # logo asset (replaceable)
```
