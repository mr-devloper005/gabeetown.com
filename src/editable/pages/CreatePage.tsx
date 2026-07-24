'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PenSquare, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass = 'rounded-md border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black outline-none transition placeholder:text-black/40 focus:border-[#2f6df6] focus:ring-2 focus:ring-[#2f6df6]/20'

const backgroundTiles = [
  '/placeholder.svg?height=900&width=1200',
  '/placeholder.svg?height=700&width=900',
  '/placeholder.svg?height=800&width=800',
  '/placeholder.svg?height=900&width=700',
]

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'image' && task.key !== 'profile'), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main>
          <section className="gabeetown-black-section relative overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-3 opacity-40 sm:grid-cols-5 lg:grid-cols-8">
              {Array.from({ length: 16 }).map((_, index) => (
                <img key={index} src={backgroundTiles[index % backgroundTiles.length]} alt="" className="h-40 w-full object-cover sm:h-56 lg:h-72" />
              ))}
            </div>
            <div className="absolute inset-0 bg-black/65" />
            <div className="relative mx-auto max-w-[1120px] px-4 py-20 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white backdrop-blur">
                    <Lock className="h-4 w-4" /> {pagesContent.create.locked.badge}
                  </div>
                  <h1 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                    {pagesContent.create.locked.title}
                  </h1>
                  <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-white/90">
                    {pagesContent.create.locked.description}
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link href="/login" className="inline-flex items-center gap-2 rounded-md bg-white px-7 py-4 text-base font-bold text-[#2f6df6] transition hover:-translate-y-0.5">
                      Login <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/signup" className="rounded-md bg-[var(--slot4-green)] px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5">
                      Sign up
                    </Link>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <div className="rounded-md border-[10px] border-black bg-black p-1 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-sm bg-gradient-to-br from-[#2f6df6] via-[#1e40af] to-black">
                      <Lock className="h-24 w-24 text-white/80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main>
        <section className="gabeetown-black-section relative overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-3 opacity-40 sm:grid-cols-5 lg:grid-cols-8">
            {Array.from({ length: 16 }).map((_, index) => (
              <img key={index} src={backgroundTiles[index % backgroundTiles.length]} alt="" className="h-40 w-full object-cover sm:h-56 lg:h-72" />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative mx-auto max-w-[1120px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white backdrop-blur">
              <PenSquare className="h-4 w-4" /> {pagesContent.create.hero.badge}
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              {pagesContent.create.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/90">
              {pagesContent.create.hero.description}
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-md bg-white/10 px-4 py-2 text-sm font-black text-white backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[var(--slot4-green)]" /> Signed in as {session.name}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <aside>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2f6df6]">Choose type</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-black">What are you publishing today?</h2>
                <p className="mt-4 text-base font-semibold leading-7 text-black/70">Pick a content type to open the matching form. Every option is optimized for a clean, image-first presentation on the public site.</p>
                <div className="mt-8 grid gap-3">
                  {enabledTasks.map((item) => {
                    const Icon = taskIcon[item.key] || FileText
                    const active = item.key === task
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setTask(item.key)}
                        className={`group flex items-start gap-4 rounded-md border p-5 text-left transition ${
                          active
                            ? 'border-black bg-black text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]'
                            : 'border-black/10 bg-white text-black hover:-translate-y-0.5 hover:border-[#2f6df6] hover:shadow-lg'
                        }`}
                      >
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${active ? 'bg-white/10 text-white' : 'bg-[#f6f7fb] text-[#2f6df6]'}`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-black tracking-[-0.02em]">{item.label}</span>
                          <span className={`mt-1 block text-sm font-semibold leading-6 ${active ? 'text-white/75' : 'text-black/60'}`}>{item.description}</span>
                        </span>
                        <ArrowRight className={`mt-1 h-4 w-4 transition ${active ? 'translate-x-0 text-white' : 'text-black/30 group-hover:translate-x-1 group-hover:text-[#2f6df6]'}`} />
                      </button>
                    )
                  })}
                </div>
              </aside>

              <form onSubmit={submit} className="rounded-md border border-black/10 bg-[#f6f7fb] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2f6df6]">Create {activeTask?.label || 'post'}</p>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-black sm:text-3xl">{pagesContent.create.formTitle}</h2>
                  </div>
                  <span className="rounded-md bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-black shadow-sm">{activeTask?.label}</span>
                </div>

                <div className="mt-6 grid gap-4">
                  <label className="grid gap-2">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-black/60">Title</span>
                    <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Give your post a clear title" required />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-xs font-black uppercase tracking-[0.18em] text-black/60">Category</span>
                      <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="e.g. Business, Tech" />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-xs font-black uppercase tracking-[0.18em] text-black/60">Source URL</span>
                      <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com" />
                    </label>
                  </div>
                  <label className="grid gap-2">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-black/60">Featured image</span>
                    <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="https://images.example.com/cover.jpg" />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-black/60">Short summary</span>
                    <textarea className={`${fieldClass} min-h-24 resize-y`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="One or two sentences that describe the post" required />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-black/60">Main content</span>
                    <textarea className={`${fieldClass} min-h-48 resize-y`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write the full details, notes, or description here" required />
                  </label>
                </div>

                {created ? (
                  <div className="mt-6 flex items-start gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-black">{pagesContent.create.successTitle}</p>
                      <p className="mt-1 truncate text-sm font-semibold opacity-80">{created.title}</p>
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="submit" className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[#2f6df6] px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 sm:flex-none">
                    <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
                  </button>
                  <Link href="/" className="inline-flex items-center justify-center rounded-md border border-black/15 bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:border-black">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
