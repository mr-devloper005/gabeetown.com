import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#ffffff',
  '--slot4-page-text': '#111827',
  '--slot4-panel-bg': '#2f7faa',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#31475a',
  '--slot4-soft-muted-text': '#64748b',
  '--slot4-accent': '#2f6df6',
  '--slot4-accent-fill': '#2f6df6',
  '--slot4-accent-soft': '#8fd9d1',
  '--slot4-dark-bg': '#000000',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#d8e9f3',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#0b0b0b',
  '--slot4-lavender': '#2f7faa',
  '--slot4-gray': '#f6f8fb',
  '--slot4-teal': '#08b1a5',
  '--slot4-orange': '#ff9d34',
  '--slot4-green': '#03aa54',
  '--slot4-body-gradient': 'linear-gradient(180deg, #ffffff 0%, #ffffff 35%, #2f7faa 35%, #2f7faa 70%, #000000 100%)',
  '--editable-container': '1120px',
  '--editable-border': 'rgba(15, 23, 42, 0.12)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-black/[0.06]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_16px_44px_rgba(15,23,42,0.12)]',
  shadowStrong: 'shadow-[0_24px_80px_rgba(0,0,0,0.22)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.62))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[140px] shrink-0 snap-start sm:w-[160px]',
  },
  type: {
    eyebrow: 'text-xs font-extrabold uppercase tracking-[0.18em]',
    heroTitle: 'text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-[3.4rem]',
    sectionTitle: 'text-3xl font-extrabold tracking-tight sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-xl border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-lg bg-[var(--slot4-accent-fill)] px-8 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:brightness-105`,
    secondary: `inline-flex items-center justify-center rounded-lg border ${editablePalette.border} ${editablePalette.surfaceBg} px-8 py-3.5 text-sm font-bold text-[var(--slot4-accent-fill)] transition hover:-translate-y-0.5`,
    accent: `inline-flex items-center justify-center rounded-lg bg-[var(--slot4-orange)] px-8 py-3.5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:brightness-105`,
  },
  media: {
    frame: `relative overflow-hidden rounded-xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(0,0,0,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Keep the YUDU-inspired black header, blue product bands, teal app section, white process rows, and black footer language.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so the home experience remains easy to restyle.',
  'Use existing post props and safe fallbacks for images, summaries, categories, and profile-like fields.',
  'Use mixed card styles across archive and homepage routes so image/profile discovery feels varied.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
