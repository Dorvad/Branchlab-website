import type {
  ProductStep,
  UseCase,
  ValidationItem,
  Differentiator,
  FutureFeature,
  FeaturePill,
} from './marketing-types'

export const featurePills: FeaturePill[] = [
  { id: 'editor', label: 'Visual node editor' },
  { id: 'player', label: 'Video-first player' },
  { id: 'validation', label: 'Validation before publishing' },
  { id: 'share', label: 'Shareable public URLs' },
]

export const productSteps: ProductStep[] = [
  {
    id: 'upload',
    step: 1,
    eyebrow: '01 — UPLOAD',
    title: 'Upload video clips',
    description:
      'Drag and drop your MP4, WebM, or MOV files into the asset library. Each clip is hosted and ready to attach to any scene in your scenario.',
    accent: 'mint',
  },
  {
    id: 'map',
    step: 2,
    eyebrow: '02 — MAP',
    title: 'Build the map',
    description:
      'Arrange scenes as nodes on a visual canvas. See the entire scenario structure at a glance — from the opening scene to every possible ending.',
    accent: 'mint',
  },
  {
    id: 'choices',
    step: 3,
    eyebrow: '03 — CONNECT',
    title: 'Add choices',
    description:
      'Write the decision buttons shown after each scene. Each choice creates a glowing edge to its destination node, building your branching logic visually.',
    accent: 'violet',
  },
  {
    id: 'feedback',
    step: 4,
    eyebrow: '04 — COACH',
    title: 'Add feedback',
    description:
      'Optionally attach coaching feedback to any choice. Players see it before moving forward — or skip straight to the next scene if no feedback is needed.',
    accent: 'violet',
  },
  {
    id: 'validate',
    step: 5,
    eyebrow: '05 — VALIDATE',
    title: 'Validate paths',
    description:
      'BranchLab checks for dead ends, missing clips, unreachable nodes, and choices without destinations before the scenario ever reaches a learner.',
    accent: 'amber',
  },
  {
    id: 'publish',
    step: 6,
    eyebrow: '06 — PUBLISH',
    title: 'Publish a playable URL',
    description:
      'Lock your scenario and share a public link. Players open it on any device — no login, no install, no friction. Just the scenario.',
    accent: 'amber',
  },
]

export const useCases: UseCase[] = [
  {
    id: 'leadership',
    title: 'Leadership dilemmas',
    description:
      'Managers practice difficult decisions, team escalations, and judgment calls in realistic video-based situations.',
    accent: 'mint',
    choices: ['Confront directly', 'Delegate first', 'Observe longer'],
  },
  {
    id: 'customer-service',
    title: 'Customer-service conversations',
    description:
      'Service teams build empathy and communication skills through branching customer interaction simulations.',
    accent: 'violet',
    choices: ['Acknowledge & resolve', 'Escalate', 'Offer alternative'],
  },
  {
    id: 'sales',
    title: 'Sales objection handling',
    description:
      'Sales reps explore how different responses to objections lead to different outcomes in realistic scenarios.',
    accent: 'mint',
    choices: ['Address concern', 'Reframe value', 'Ask a question'],
  },
  {
    id: 'onboarding',
    title: 'Onboarding scenarios',
    description:
      'New employees navigate realistic workplace situations from day one — with immediate feedback on their choices.',
    accent: 'amber',
    choices: ['Ask a colleague', 'Check the docs', 'Make a call'],
  },
  {
    id: 'ethics',
    title: 'Ethics and compliance',
    description:
      'Walk employees through realistic dilemmas where the right choice matters and the reasoning is clearly explained.',
    accent: 'danger',
    choices: ['Report it', 'Ignore for now', 'Seek advice first'],
  },
  {
    id: 'storytelling',
    title: 'Interactive storytelling',
    description:
      'Creators build branching short films, social scenarios, and choose-your-own-adventure video stories.',
    accent: 'violet',
    choices: ['Stay and speak', 'Leave quietly', 'Find another way'],
  },
  {
    id: 'workshop',
    title: 'Workshop discussion triggers',
    description:
      'Facilitators use scenarios to reveal different perspectives and spark structured group conversations.',
    accent: 'mint',
    choices: ['Challenge the brief', 'Agree and explore', 'Propose a third path'],
  },
  {
    id: 'product-training',
    title: 'Product and service training',
    description:
      'Train teams on features, procedures, and role-specific knowledge through interactive video paths.',
    accent: 'amber',
    choices: ['Show the feature', 'Explain the why', 'Let them try'],
  },
]

export const validationItems: ValidationItem[] = [
  { id: 'v1', label: 'Missing start node', type: 'error' },
  { id: 'v2', label: 'Choice without destination — "Walk Away"', type: 'error' },
  { id: 'v3', label: 'Unreachable node — "The Hard Moment"', type: 'error' },
  { id: 'v4', label: 'Node cannot reach any ending — "Intro B"', type: 'error' },
  { id: 'v5', label: 'Missing video clip on scene "Opening"', type: 'warning' },
]

export const differentiators: Differentiator[] = [
  {
    id: 'game-engine',
    label: 'Game engine',
    description: 'Requires coding, art, and a large production pipeline.',
  },
  {
    id: 'video-platform',
    label: 'Video platform',
    description: 'Great for hosting, but linear-only. No decision logic.',
  },
  {
    id: 'form-builder',
    label: 'Form / survey builder',
    description: 'Text-based branching only. No video-first experience.',
  },
  {
    id: 'lms',
    label: 'Generic LMS tool',
    description: 'Full-featured but heavy, slow, and not built for video simulation.',
  },
  {
    id: 'enterprise-sim',
    label: 'Enterprise sim tools',
    description: 'Expensive, specialist-produced, not creator-friendly.',
  },
]

export const futureFeatures: FutureFeature[] = [
  { id: 'templates', title: 'Scenario templates', status: 'soon' },
  { id: 'analytics', title: 'Learner analytics', status: 'soon' },
  { id: 'facilitator', title: 'Facilitator and debrief mode', status: 'planned' },
  { id: 'collaboration', title: 'Team collaboration', status: 'planned' },
  { id: 'lms-integration', title: 'LMS integrations', status: 'later' },
  { id: 'ai', title: 'AI-assisted scenario writing', status: 'later' },
]
