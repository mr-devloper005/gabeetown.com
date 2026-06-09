import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Image as ImageIcon, Search, Smartphone } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#111827]">
        <section className="gabeetown-blue-section">
          <div className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1120px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:px-8">
            <div className="rounded-md bg-white p-7 text-black shadow-[0_30px_90px_rgba(0,0,0,0.2)] sm:p-9">
              <h1 className="text-3xl font-black tracking-[-0.04em]">{pagesContent.auth.signup.formTitle}</h1>
              <EditableLocalSignupForm />
              <p className="mt-5 text-sm font-semibold text-slate-600">
                Already have an account? <Link href="/login" className="font-black text-[#2f6df6] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link>
              </p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-white/70">{pagesContent.auth.signup.badge}</p>
              <h2 className="mt-5 max-w-2xl text-5xl font-black leading-[0.96] tracking-[-0.06em] text-white sm:text-6xl">{pagesContent.auth.signup.title}</h2>
              <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-white/82">{pagesContent.auth.signup.description}</p>
              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
                {[
                  { icon: ImageIcon, label: 'Publish image-led posts' },
                  { icon: Search, label: 'Keep work searchable' },
                  { icon: Smartphone, label: 'Stay readable on every screen' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="rounded-md bg-white/12 p-4 ring-1 ring-white/15">
                    <Icon className="h-7 w-7 text-[#8fd9d1]" />
                    <p className="mt-4 text-sm font-black text-white">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="gabeetown-teal-section">
          <div className="mx-auto grid max-w-[1120px] gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
            <p className="inline-flex items-center gap-3 text-2xl font-black tracking-[-0.04em]"><CheckCircle2 className="h-7 w-7" /> Build a central hub for visual publishing.</p>
            <Link href="/login" className="inline-flex items-center gap-2 rounded-md bg-white px-7 py-4 text-base font-bold text-[#2f6df6]">
              Sign in <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
