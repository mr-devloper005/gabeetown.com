'use client'

import { Image as ImageIcon, Mail, MessageSquare, Phone, Search, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const displayName = 'Gabeetown Publisher'

const lanes = [
  { icon: ImageIcon, title: 'Visual launches', body: 'Discuss gallery launches, image-led portfolios, and visual campaigns.' },
  { icon: Search, title: 'Discovery requests', body: 'Ask about categories, search visibility, listings, and resource organization.' },
  { icon: Sparkles, title: 'Publishing help', body: 'Request creator decks, editorial support, or visual feature placement.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#111827]">
        <section className="gabeetown-black-section relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-[15%] top-16 h-80 w-80 rounded-full bg-[#2f7faa] blur-3xl" />
            <div className="absolute right-[15%] bottom-6 h-72 w-72 rounded-full bg-[#08b1a5] blur-3xl" />
          </div>
          <div className="relative mx-auto grid max-w-[1120px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:items-start lg:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8fd9d1]">{pagesContent.contact.eyebrow}</p>
              <h1 className="mt-5 max-w-2xl text-5xl font-black leading-[0.96] tracking-[-0.06em] text-white sm:text-6xl">{pagesContent.contact.title}</h1>
              <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-white/82">{pagesContent.contact.description}</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md bg-white/10 p-5 ring-1 ring-white/10">
                  <Mail className="h-7 w-7 text-[#8fd9d1]" />
                  <h2 className="mt-4 text-xl font-black text-white">Send a clear brief</h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/70">Share what you want to publish, improve, showcase, or organize.</p>
                </div>
                <div className="rounded-md bg-white/10 p-5 ring-1 ring-white/10">
                  <Phone className="h-7 w-7 text-[#8fd9d1]" />
                  <h2 className="mt-4 text-xl font-black text-white">Request support</h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/70">Use the form for usage rights, commercial requests, and public page updates.</p>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white p-6 text-black shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-8">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-7 w-7 text-[#2f6df6]" />
                <h2 className="text-3xl font-black tracking-[-0.04em]">{pagesContent.contact.formTitle}</h2>
              </div>
              <div className="mt-6">
                <EditableContactLeadForm />
              </div>
            </div>
          </div>
        </section>

        <section className="gabeetown-blue-section">
          <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black tracking-[-0.04em]">One place for publishing questions</h2>
            <p className="mt-5 max-w-4xl text-lg font-semibold leading-8 text-white/86">
              {displayName} supports image-rich posts, profiles, listings, articles, bookmarks, and document-style resources through one connected publishing surface.
            </p>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {lanes.map(({ icon: Icon, title, body }) => (
                <article key={title} className="rounded-md bg-white p-5 text-black shadow-[0_18px_50px_rgba(0,0,0,0.14)]">
                  <Icon className="h-8 w-8 text-[#f6a84f]" />
                  <h3 className="mt-5 text-xl font-black tracking-[-0.03em]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
