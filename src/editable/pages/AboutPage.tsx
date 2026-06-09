import Link from 'next/link'
import { BookOpen, CheckCircle2, Globe2, Image as ImageIcon, Search, Smartphone, UsersRound } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const displayName = 'Gabeetown Publisher'

const outcomes = [
  { icon: Globe2, label: 'Reach new audiences and portfolio viewers' },
  { icon: Smartphone, label: 'Keep profiles readable on every device' },
  { icon: ImageIcon, label: 'Lead with visual work and clear summaries' },
  { icon: Search, label: 'Help visitors find content faster' },
]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#111827]">
        <section className="gabeetown-black-section relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-[8%] top-10 h-72 w-72 rounded-full bg-[#2f7faa] blur-3xl" />
            <div className="absolute right-[10%] top-24 h-72 w-72 rounded-full bg-[#08b1a5] blur-3xl" />
          </div>
          <div className="relative mx-auto grid max-w-[1120px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_0.85fr] lg:items-center lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8fd9d1]">{pagesContent.about.badge}</p>
              <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.96] tracking-[-0.06em] text-white sm:text-6xl">
                About {displayName}
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-white/82">{pagesContent.about.description}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/image" className="rounded-md bg-white px-7 py-4 text-base font-bold text-[#2f6df6] transition hover:-translate-y-0.5">View Products</Link>
                <Link href="/contact" className="rounded-md bg-[#2f6df6] px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5">Contact Us</Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {['Visual pages', 'Profiles', 'Resources', 'Search'].map((label, index) => (
                <div key={label} className={`rounded-md p-6 text-white shadow-2xl ${index % 2 ? 'bg-[#08b1a5]' : 'bg-[#2f7faa]'}`}>
                  <p className="text-5xl font-black">{String(index + 1).padStart(2, '0')}</p>
                  <p className="mt-6 text-xl font-black">{label}</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/80">A connected publishing lane built for polished public discovery.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="gabeetown-blue-section">
          <div className="mx-auto grid max-w-[1120px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
            <div>
              <h2 className="text-4xl font-black tracking-[-0.04em]">One platform for visual discovery</h2>
              <div className="mt-7 space-y-5 text-lg font-semibold leading-8 text-white/88">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            <div className="grid gap-4">
              {pagesContent.about.values.map((value, index) => (
                <article key={value.title} className="grid gap-4 rounded-md bg-white p-6 text-black shadow-[0_18px_50px_rgba(0,0,0,0.16)] sm:grid-cols-[64px_1fr]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d8e9f3] text-[#2f7faa]">
                    {index === 0 ? <ImageIcon className="h-8 w-8" /> : index === 1 ? <BookOpen className="h-8 w-8" /> : <UsersRound className="h-8 w-8" />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-[-0.04em]">{value.title}</h3>
                    <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{value.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-[-0.04em]">Deliver digital strategies with real outcomes</h2>
            <p className="mt-5 max-w-4xl text-lg font-medium leading-7">
              The site is shaped for creative professionals, freelancers, photographers, designers, artists, influencers, and businesses that need a sharper public surface.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {outcomes.map(({ icon: Icon, label }) => (
                <div key={label} className="text-center">
                  <Icon className="mx-auto h-20 w-20 text-[#f6a84f]" strokeWidth={1.4} />
                  <p className="mx-auto mt-6 max-w-xs text-lg font-medium leading-6">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="gabeetown-teal-section">
          <div className="mx-auto grid max-w-[1120px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-white/75"><CheckCircle2 className="h-5 w-5" /> Ready to publish</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em]">Create a cleaner home for profiles, visuals, articles, and resources.</h2>
            </div>
            <Link href="/signup" className="rounded-md bg-white px-8 py-4 text-base font-bold text-[#2f6df6] transition hover:-translate-y-0.5">Sign Up</Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
