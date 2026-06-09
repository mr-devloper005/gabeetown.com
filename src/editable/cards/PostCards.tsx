import Link from 'next/link'
import { ArrowRight, Clock3, Image as ImageIcon, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

const fallbackImage = '/placeholder.svg?height=900&width=1400'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  const avatar = typeof content.avatar === 'string' ? content.avatar : ''
  const thumbnail = typeof content.thumbnail === 'string' ? content.thumbnail : ''
  const featuredImage = typeof content.featuredImage === 'string' ? content.featuredImage : ''
  return mediaUrl || contentImage || featuredImage || thumbnail || logo || avatar || fallbackImage
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  if (!clean) return 'Open this post for more details, images, links, and supporting information.'
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group grid min-h-[520px] overflow-hidden rounded-md bg-black text-white shadow-[0_30px_90px_rgba(0,0,0,0.22)] lg:grid-cols-[0.95fr_1.05fr]">
      <div className="relative min-h-[320px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute left-5 top-5 rounded-md bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-black">{label}</div>
      </div>
      <div className="flex flex-col justify-center p-8 lg:p-12">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8fd9d1]">{getEditableCategory(post)}</p>
        <h3 className="mt-5 text-4xl font-black leading-[0.96] tracking-[-0.06em] sm:text-5xl">{post.title}</h3>
        <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-white/78">{getEditableExcerpt(post, 210)}</p>
        <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-[#2f6df6] px-6 py-4 text-sm font-black text-white">
          Read story <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block w-[220px] shrink-0 overflow-hidden rounded-md bg-white shadow-[0_16px_45px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#d8e9f3]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#2f6df6]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-3 text-xl font-black leading-tight tracking-[-0.04em] text-black">{post.title}</h3>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex items-center gap-4 rounded-md border border-black/10 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2f7faa] text-sm font-black text-white">{index + 1}</span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#2f6df6]"><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
        <h3 className="mt-1 line-clamp-2 text-lg font-black leading-tight text-black">{post.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm font-medium leading-6 text-slate-600">{getEditableExcerpt(post, 95)}</p>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const mode = index % 4
  if (mode === 1) {
    return (
      <Link href={href} className="group grid overflow-hidden rounded-md bg-[#2f7faa] text-white shadow-lg transition duration-300 hover:-translate-y-1 sm:grid-cols-[220px_1fr]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-60 w-full object-cover sm:h-full" />
        <div className="p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/70">Horizontal feature</p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
          <p className="mt-4 line-clamp-3 text-sm font-semibold leading-7 text-white/80">{getEditableExcerpt(post, 170)}</p>
        </div>
      </Link>
    )
  }
  if (mode === 2) {
    return (
      <Link href={href} className="group rounded-md border border-black/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-black uppercase tracking-[0.22em] text-[#2f6df6]">Editorial {String(index + 1).padStart(2, '0')}</span>
          <ImageIcon className="h-5 w-5 text-[#f6a84f]" />
        </div>
        <h2 className="mt-6 text-3xl font-black leading-tight tracking-[-0.05em] text-black">{post.title}</h2>
        <p className="mt-5 line-clamp-4 text-sm font-medium leading-7 text-slate-600">{getEditableExcerpt(post, 190)}</p>
      </Link>
    )
  }
  if (mode === 3) {
    return (
      <Link href={href} className="group grid gap-4 rounded-md border border-black/10 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:grid-cols-[96px_1fr]">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#d8e9f3]">
          <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.18em] text-[#2f6df6]"><UserRound className="h-3.5 w-3.5" /> Profile style</p>
          <h2 className="mt-2 line-clamp-2 text-2xl font-black leading-tight text-black">{post.title}</h2>
          <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-slate-600">{getEditableExcerpt(post, 120)}</p>
        </div>
      </Link>
    )
  }
  return (
    <Link href={href} className="group overflow-hidden rounded-md bg-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#d8e9f3]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-md bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-black">{getEditableCategory(post)}</span>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#2f6df6]">Image-first card</p>
        <h2 className="mt-3 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.04em] text-black">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm font-medium leading-7 text-slate-600">{getEditableExcerpt(post, 160)}</p>
      </div>
    </Link>
  )
}
