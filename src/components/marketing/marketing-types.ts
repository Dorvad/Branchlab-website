export type Accent = 'mint' | 'violet' | 'amber' | 'danger'

export type ProductStep = {
  id: string
  step: number
  eyebrow: string
  title: string
  description: string
  accent: Accent
}

export type UseCase = {
  id: string
  title: string
  description: string
  accent: Accent
  choices: string[]
}

export type ValidationItem = {
  id: string
  label: string
  type: 'error' | 'warning'
}

export type Differentiator = {
  id: string
  label: string
  description: string
}

export type FutureFeature = {
  id: string
  title: string
  status: 'soon' | 'planned' | 'later'
}

export type FeaturePill = {
  id: string
  label: string
}
