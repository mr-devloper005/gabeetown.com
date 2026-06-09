import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Image as ImageIcon, ShieldCheck } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#111827]">
        <section className="gabeetown-black-section">
          <div className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1120px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_0.85fr] lg:items-center lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8fd9d1]">{pagesContent.auth.login.badge}</p>
              <h1 className="mt-5 max-w-2xl text-5xl font-black leading-[0.96] tracking-[-0.06em] text-white sm:text-6xl">{pagesContent.auth.login.title}</h1>
              <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-white/78">{pagesContent.auth.login.description}</p>
              <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
                {[
                  { icon: ImageIcon, label: 'Visual posts' },
                  
                  { icon: BookOpen, label: 'Resources' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="rounded-md bg-white/10 p-4 text-white ring-1 ring-white/10">
                    <Icon className="h-6 w-6 text-[#8fd9d1]" />
                    <p className="mt-4 text-sm font-black">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-white p-7 text-black shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-9">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-7 w-7 text-[#2f6df6]" />
                <h2 className="text-3xl font-black tracking-[-0.04em]">{pagesContent.auth.login.formTitle}</h2>
              </div>
              <EditableLocalLoginForm />
              <p className="mt-5 text-sm font-semibold text-slate-600">
                New here? <Link href="/signup" className="font-black text-[#2f6df6] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link>
              </p>
            </div>
          </div>
        </section>

        <section className="gabeetown-blue-section">
          <div className="mx-auto grid max-w-[1120px] gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
            <p className="text-2xl font-black tracking-[-0.04em]">Continue managing submissions, browsing useful pages, and shaping publish-ready content.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-md bg-white px-7 py-4 text-base font-bold text-[#2f6df6]">
              Create account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
