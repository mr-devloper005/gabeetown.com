import Link from 'next/link'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bookmark, Building2, Camera, CheckCircle2, Download, ExternalLink, FileText, Globe2, Mail, MapPin, MessageCircle, Phone, Tag, UserRound } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.details) || ''
}

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const safeUrl = (value: string) => /^https?:\/\//i.test(value) ? value : '#'

const linkifyMarkdown = (value: string) => value
  .replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_match, label, url) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`)

const linkifyText = (value: string) => linkifyMarkdown(value)
  .replace(/(^|[\s(])((https?:\/\/)[^\s<)]+)/gi, (_match, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)

const hardenLinks = (html: string) => html.replace(/<a\s+([^>]*href=["'][^"']+["'][^>]*)>/gi, (_match, attrs) => {
  let next = String(attrs).replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  if (!/\starget=/i.test(next)) next += ' target="_blank"'
  if (!/\srel=/i.test(next)) next += ' rel="nofollow noopener noreferrer"'
  return `<a ${next}>`
})

const sanitizeHtml = (html: string) => hardenLinks(html
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<(iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/(href|src)=(['"])javascript:[\s\S]*?\2/gi, '$1="#"'))

const formatPlainText = (raw: string) => {
  const value = raw.trim()
  if (!value) return ''
  if (/<[a-z][\s\S]*>/i.test(value)) return sanitizeHtml(linkifyMarkdown(value))
  return value
    .split(/\n{2,}/)
    .map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

const summaryText = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || ''
const categoryOf = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const mapSrcFor = (post: SitePost) => {
  const address = getField(post, ['address', 'location', 'city'])
  const lat = getField(post, ['lat', 'latitude'])
  const lng = getField(post, ['lng', 'lon', 'longitude'])
  if (lat && lng) return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=14&output=embed`
  if (address) return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=13&output=embed`
  return ''
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const detailVars = { '--detail-bg': preset.colors.background, '--detail-text': preset.colors.foreground, '--detail-surface': preset.colors.surface, '--detail-accent': preset.colors.accent } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={detailVars} className="bg-[var(--detail-bg)] text-[var(--detail-text)]">
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
        {task === 'profile' ? <ProfileDetail post={post} related={related} /> : null}
        {task === 'article' ? <ArticleDetail post={post} related={related} comments={comments} /> : null}
      </main>
    </EditableSiteShell>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/70 px-4 py-2 text-sm font-black">
      <ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function ArticleDetail({ post, related, comments }: { post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_350px] lg:px-8 lg:py-16">
      <article className="min-w-0 rounded-[2.7rem] border border-[var(--editable-border)] bg-[var(--detail-surface)] p-5 shadow-[0_30px_90px_rgba(15,23,42,0.09)] sm:p-8 lg:p-12">
        <BackLink task="article" />
        <p className="mt-8 text-xs font-black uppercase tracking-[0.28em] text-[var(--detail-accent)]">{categoryOf(post, 'Article')}</p>
        <h1 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-5xl lg:text-7xl">{post.title}</h1>
        {images[0] ? <img src={images[0]} alt="" className="mt-8 max-h-[620px] w-full rounded-[2rem] object-cover" /> : null}
        <BodyContent post={post} />
        <EditableComments slug={post.slug} comments={comments} />
      </article>
      <RelatedPanel task="article" post={post} related={related} />
    </section>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const logo = images[0]
  const address = getField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  const mapSrc = mapSrcFor(post)
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="listing" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <article className="rounded-[2.8rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.09)] sm:p-9">
          <div className="grid gap-6 sm:grid-cols-[150px_1fr]">
            <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-[2rem] bg-[var(--detail-bg)] ring-1 ring-[var(--editable-border)]">
              {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <Building2 className="h-14 w-14 opacity-40" />}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--detail-accent)]">Business listing</p>
              <h1 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">{post.title}</h1>
              <div className="mt-5 max-w-3xl text-base leading-8 opacity-70 [&_a]:underline" dangerouslySetInnerHTML={{ __html: formatPlainText(summaryText(post)) }} />
            </div>
          </div>
          <InfoGrid items={[['Location', address, MapPin], ['Phone', phone, Phone], ['Email', email, Mail], ['Website', website, Globe2]]} />
          <BodyContent post={post} />
          <ImageStrip images={images.slice(1)} label="Business showcase" />
        </article>
        <aside className="space-y-5">
          {mapSrc ? <MapBox src={mapSrc} label={address || post.title} /> : <ContactAction website={website} phone={phone} email={email} />}
          {mapSrc ? <ContactAction website={website} phone={phone} email={email} /> : null}
          <RelatedPanel task="listing" post={post} related={related} compact />
        </aside>
      </div>
    </section>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-7 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-16">
      <aside className="rounded-[2.5rem] border border-[var(--editable-border)] bg-[var(--detail-text)] p-7 text-[var(--detail-bg)] shadow-xl lg:sticky lg:top-24 lg:self-start">
        <BackLink task="classified" />
        <p className="mt-10 text-xs font-black uppercase tracking-[0.28em] opacity-60">Classified notice</p>
        <h1 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-5xl">{post.title}</h1>
        <div className="mt-8 grid gap-3">
          {price ? <BadgeLine label="Price" value={price} /> : null}
          {condition ? <BadgeLine label="Condition" value={condition} /> : null}
          {location ? <BadgeLine label="Location" value={location} /> : null}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {phone ? <a href={`tel:${phone}`} className="rounded-full bg-[var(--detail-bg)] px-5 py-3 text-sm font-black text-[var(--detail-text)]">Call now</a> : null}
          {email ? <a href={`mailto:${email}`} className="rounded-full border border-white/25 px-5 py-3 text-sm font-black">Email</a> : null}
        </div>
      </aside>
      <article className="rounded-[2.7rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-9">
        <ImageStrip images={images} label="Offer images" large />
        <BodyContent post={post} />
        <ContactAction website={website} phone={phone} email={email} />
        <RelatedPanel task="classified" post={post} related={related} />
      </article>
    </section>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const heroImage = images[0]
  const gallery = images.slice(1)
  const category = categoryOf(post, 'Image')
  const summary = summaryText(post)
  const backgroundImages = Array.from({ length: 16 }).map((_, i) => images[i % Math.max(images.length, 1)] || '/placeholder.svg?height=900&width=1200')
  return (
    <>
      <section className="gabeetown-black-section relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3 opacity-40 sm:grid-cols-5 lg:grid-cols-8">
          {backgroundImages.map((src, index) => (
            <img key={index} src={src} alt="" className="h-40 w-full object-cover sm:h-56 lg:h-72" />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto max-w-[1120px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Link href="/images" className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white backdrop-blur transition hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" /> Back to gallery
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white backdrop-blur">
                <Camera className="h-4 w-4" /> {category}
              </div>
              <h1 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              {summary ? (
                <div
                  className="mt-7 max-w-xl text-xl font-semibold leading-8 text-white/90 [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: formatPlainText(summary) }}
                />
              ) : null}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/images" className="rounded-md bg-white px-7 py-4 text-base font-bold text-[#2f6df6] transition hover:-translate-y-0.5">Browse gallery</Link>
                <Link href="/contact" className="rounded-md bg-[var(--slot4-green)] px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5">Get in touch</Link>
              </div>
            </div>
            <div className="relative">
              {heroImage ? (
                <div className="rounded-md border-[10px] border-black bg-black p-1 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                  <img src={heroImage} alt={post.title} className="aspect-[4/3] w-full rounded-sm object-cover" />
                </div>
              ) : null}
              {gallery[0] ? (
                <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 overflow-hidden rounded-md border-[6px] border-black bg-white shadow-2xl sm:block">
                  <img src={gallery[0]} alt="" className="h-full w-full object-cover" />
                </div>
              ) : null}
              {gallery[1] ? (
                <div className="absolute -right-6 -top-6 hidden h-28 w-28 overflow-hidden rounded-md border-[6px] border-black bg-white shadow-2xl sm:block">
                  <img src={gallery[1]} alt="" className="h-full w-full object-cover" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="relative border-t border-white/10 bg-black px-4 py-5">
          <div className="mx-auto grid max-w-[1120px] gap-4 text-center text-white sm:grid-cols-2">
            <div><p className="text-lg font-black">{images.length}</p><p className="text-base font-semibold">Images in this story</p></div>
            <div><p className="text-lg font-black">{related.length}+</p><p className="text-base font-semibold">Related visuals</p></div>
          </div>
        </div>
      </section>

      {(() => {
        const body = getBody(post)
        const hasBody = body && body !== summary
        return (
          <section className="bg-white">
            <div className={`mx-auto grid max-w-[1120px] gap-12 px-4 ${hasBody ? 'py-16' : 'py-10'} sm:px-6 ${hasBody ? 'lg:grid-cols-[1fr_0.55fr]' : ''} lg:px-8`}>
              {hasBody ? (
                <article className="min-w-0 text-black">
                  <h2 className="text-3xl font-black tracking-[-0.04em]">About this image story</h2>
                  <div className="article-content mt-6 text-lg font-medium leading-8 text-black/80 [&_a]:text-[#2f6df6] [&_a]:underline" dangerouslySetInnerHTML={{ __html: formatPlainText(body) }} />
                </article>
              ) : null}
              <aside className="space-y-5">
                <div className="rounded-md border border-black/10 bg-[#f6f7fb] p-6 text-black">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2f6df6]">Story details</p>
                  <dl className="mt-5 space-y-3 text-sm font-semibold text-black/75">
                    <div className="flex items-center justify-between gap-3"><dt>Category</dt><dd className="font-black text-black">{category}</dd></div>
                    <div className="flex items-center justify-between gap-3"><dt>Images</dt><dd className="font-black text-black">{images.length}</dd></div>
                    <div className="flex items-center justify-between gap-3"><dt>Publisher</dt><dd className="font-black text-black">{SITE_CONFIG.name}</dd></div>
                  </dl>
                </div>
              </aside>
            </div>
          </section>
        )
      })()}

      {gallery.length ? (
        <section className="gabeetown-teal-section overflow-hidden">
          <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black tracking-[-0.04em]">Full gallery</h2>
                <p className="mt-4 max-w-2xl text-lg font-semibold leading-7">Every image in this story, laid out in a comfortable masonry.</p>
              </div>
              <div className="rounded-md bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] backdrop-blur">
                {gallery.length} visual{gallery.length === 1 ? '' : 's'}
              </div>
            </div>
            <div className="mt-12 columns-1 gap-5 space-y-5 md:columns-2 lg:columns-3">
              {gallery.map((src, index) => (
                <div key={`${src}-${index}`} className={`mb-5 break-inside-avoid overflow-hidden rounded-md bg-white/10 p-1 shadow-lg ${index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                  <img src={src} alt="" className="h-full w-full rounded-sm object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="gabeetown-blue-section">
          <div className="mx-auto max-w-[1120px] px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black tracking-[-0.04em]">More visual stories</h2>
                <p className="mt-4 max-w-2xl text-lg font-semibold leading-7">Discover more image-rich collections curated by {SITE_CONFIG.name}.</p>
              </div>
              <Link href="/images" className="rounded-md bg-white px-6 py-3 text-sm font-bold text-[#2f6df6]">View all</Link>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => {
                const cover = getImages(item)[0] || '/placeholder.svg?height=900&width=1200'
                return (
                  <Link key={item.id || item.slug} href={buildPostUrl('image', item.slug)} className="group relative min-h-[360px] overflow-hidden rounded-md bg-black text-white shadow-[0_22px_70px_rgba(0,0,0,0.25)]">
                    <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="relative z-10 flex min-h-[360px] flex-col justify-end p-6">
                      <span className="inline-flex w-fit items-center gap-2 rounded-md bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur">
                        <Camera className="h-3 w-3" /> {categoryOf(item, 'Visual')}
                      </span>
                      <h3 className="mt-4 line-clamp-3 text-xl font-black leading-tight tracking-[-0.03em]">{item.title}</h3>
                      <p className="mt-2 text-xs font-black uppercase tracking-wide opacity-85">Story {String(index + 1).padStart(2, '0')} · {SITE_CONFIG.name}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-16">
      <article className="rounded-[2.7rem] border border-[var(--editable-border)] bg-white p-7 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-10">
        <BackLink task="sbm" />
        <div className="mt-10 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-[var(--detail-text)] text-[var(--detail-bg)]"><Bookmark className="h-9 w-9" /></div>
        <h1 className="mt-7 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">{post.title}</h1>
        <div className="mt-5 max-w-3xl text-lg leading-9 opacity-70 [&_a]:underline" dangerouslySetInnerHTML={{ __html: formatPlainText(summaryText(post)) }} />
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--detail-text)] px-5 py-3 text-sm font-black text-[var(--detail-bg)]">Open saved resource <ExternalLink className="h-4 w-4" /></Link> : null}
        <BodyContent post={post} />
      </article>
      <RelatedPanel task="sbm" post={post} related={related} />
    </section>
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const fileUrl = getField(post, ['fileUrl', 'pdfUrl', 'documentUrl', 'url'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-16">
      <article className="rounded-[2.7rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-9">
        <BackLink task="pdf" />
        <div className="mt-8 grid gap-6 sm:grid-cols-[120px_1fr]">
          <div className="flex h-28 w-28 items-center justify-center rounded-[1.8rem] bg-[var(--detail-text)] text-[var(--detail-bg)]"><FileText className="h-12 w-12" /></div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--detail-accent)]">PDF resource</p>
            <h1 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">{post.title}</h1>
          </div>
        </div>
        <BodyContent post={post} />
        {fileUrl ? (
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-[var(--detail-bg)]">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--editable-border)] bg-white p-4">
              <span className="text-sm font-black">Document preview</span>
              <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--detail-text)] px-4 py-2 text-xs font-black text-[var(--detail-bg)]">Download <Download className="h-4 w-4" /></Link>
            </div>
            <iframe src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} title={post.title} className="h-[78vh] w-full" />
          </div>
        ) : null}
      </article>
      <RelatedPanel task="pdf" post={post} related={related} />
    </section>
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  const avatar = images[0]
  const gallery = images.slice(1)
  const summary = summaryText(post)
  const visualCount = images.length || 1
  return (
    <section className="bg-[#f4f2ec] text-[#171a18]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
       
        <div className="mt-6 overflow-hidden rounded-xl border border-[#171a18]/10 bg-white shadow-[0_30px_90px_rgba(23,26,24,0.1)]">
          <div className="grid min-h-[520px] lg:grid-cols-[0.95fr_1.05fr]">
            <aside className="relative flex flex-col justify-between bg-[#171a18] p-6 text-white sm:p-8 lg:p-10">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:42px_42px]" />
              <div className="relative">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#d9c38b]">
                  <UserRound className="h-4 w-4" /> Profile card
                </p>
                <div className="mt-10 flex items-end gap-5">
                  <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-white/10 sm:h-40 sm:w-40">
                    {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-16 w-16 text-white/45" />}
                  </div>
                  <div className="min-w-0 pb-1">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">Member profile</p>
                    <h1 className="mt-3 break-words text-4xl font-black leading-none sm:text-5xl">{post.title}</h1>
                  </div>
                </div>
                {role ? <p className="mt-6 max-w-xl text-sm font-black uppercase tracking-[0.18em] text-[#d9c38b]">{role}</p> : null}
                {summary ? <div className="mt-5 max-w-xl text-base leading-8 text-white/70 [&_a]:underline" dangerouslySetInnerHTML={{ __html: formatPlainText(summary) }} /> : null}
              </div>

              <div className="relative mt-10 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/12 bg-white/[0.08] p-4">
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/45">Gallery</p>
                  <p className="mt-2 text-sm font-black">{visualCount} visual{visualCount === 1 ? '' : 's'}</p>
                </div>
                <div className="rounded-lg border border-white/12 bg-white/[0.08] p-4">
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/45">Contact</p>
                  <p className="mt-2 text-sm font-black">{website || email ? 'Available' : 'Details inside'}</p>
                </div>
              </div>
            </aside>

            <article className="p-6 sm:p-8 lg:p-10">
              <div className="grid gap-4 sm:grid-cols-2">
                {website ? (
                  <Link href={website} target="_blank" rel="noreferrer" className="group rounded-lg border border-[#171a18]/10 bg-[#f4f2ec] p-5 transition hover:-translate-y-0.5 hover:bg-[#171a18] hover:text-white">
                    <Globe2 className="h-5 w-5" />
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] opacity-55">Website</p>
                    <p className="mt-2 truncate text-sm font-black">{website.replace(/^https?:\/\//, '')}</p>
                  </Link>
                ) : null}
                {email ? (
                  <a href={`mailto:${email}`} className="group rounded-lg border border-[#171a18]/10 bg-[#f4f2ec] p-5 transition hover:-translate-y-0.5 hover:bg-[#171a18] hover:text-white">
                    <Mail className="h-5 w-5" />
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] opacity-55">Email</p>
                    <p className="mt-2 truncate text-sm font-black">{email}</p>
                  </a>
                ) : null}
              </div>

              <div className="mt-7 rounded-lg border border-[#171a18]/10 bg-white p-1">
                <div className="rounded-md bg-[#f4f2ec] p-5 sm:p-7">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7c693d]">Profile notes</p>
                  <BodyContent post={post} />
                </div>
              </div>

              <ImageStrip images={gallery} label="Profile gallery" />
            </article>
          </div>
        </div>

        <div className="mt-8">
          <RelatedPanel task="profile" post={post} related={related} />
        </div>
      </div>
    </section>
  )
}

function BodyContent({ post, compact = false }: { post: SitePost; compact?: boolean }) {
  const body = getBody(post)
  const summary = summaryText(post)
  if (!body || body === summary) return null
  return <div className={`article-content mt-8 max-w-none ${compact ? 'text-base leading-8' : 'text-lg leading-9'} opacity-80`} dangerouslySetInnerHTML={{ __html: formatPlainText(body) }} />
}

function InfoGrid({ items }: { items: Array<[string, string, typeof MapPin]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {visible.map(([label, value, Icon]) => (
        <div key={label} className="rounded-[1.5rem] border border-[var(--editable-border)] bg-[var(--detail-bg)] p-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] opacity-55"><Icon className="h-4 w-4" /> {label}</div>
          <p className="mt-2 break-words text-sm font-bold leading-6 opacity-80">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ImageStrip({ images, label, large = false }: { images: string[]; label: string; large?: boolean }) {
  if (!images.length) return null
  return (
    <section className="mt-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--detail-accent)]">{label}</p>
      <div className={`mt-4 grid gap-3 ${large ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {images.slice(0, large ? 4 : 8).map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="aspect-[4/3] rounded-[1.4rem] object-cover ring-1 ring-[var(--editable-border)]" />)}
      </div>
    </section>
  )
}

function MapBox({ src, label }: { src: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-sm">
      <div className="flex items-center gap-2 p-4 text-sm font-black"><MapPin className="h-4 w-4" /> {label || 'Map location'}</div>
      <iframe src={src} title="Map" loading="lazy" className="h-80 w-full border-0" />
    </div>
  )
}

function ContactAction({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return (
    <div className="mt-5 rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.22em] opacity-55">Quick actions</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--detail-text)] px-4 py-2 text-sm font-black text-[var(--detail-bg)]">Website <ExternalLink className="h-4 w-4" /></Link> : null}
        {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-black"><Phone className="h-4 w-4" /> Call</a> : null}
        {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-black"><Mail className="h-4 w-4" /> Email</a> : null}
      </div>
    </div>
  )
}

function BadgeLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm"><span className="font-black uppercase tracking-[0.16em] opacity-60">{label}</span><span className="font-black">{value}</span></div>
}

function RelatedPanel({ task, post: _post, related, compact = false }: { task: TaskKey; post: SitePost; related: SitePost[]; compact?: boolean }) {
  const taskConfig = getTaskConfig(task)
  return (
    <aside className="min-w-0 space-y-5">
      {!compact ? (
        <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white/70 p-5 backdrop-blur">
          <p className="text-xs font-black uppercase tracking-[0.22em] opacity-55">About this post</p>
          <div className="mt-4 grid gap-3 text-sm font-bold opacity-75">
            <p className="inline-flex items-center gap-2"><Tag className="h-4 w-4" /> Task: {taskConfig?.label || task}</p>
            <p className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Site: {SITE_CONFIG.name}</p>
            
          </div>
        </div>
      ) : null}
      {related.length ? (
        <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white/70 p-5 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-black tracking-[-0.04em]">More like this</h2>
            <Link href={taskConfig?.route || '/'} className="text-xs font-black uppercase tracking-[0.16em] opacity-55">View all</Link>
          </div>
          <div className="mt-5 grid gap-3">
            {related.map((item) => <RelatedCard key={item.id || item.slug} task={task} post={item} />)}
          </div>
        </div>
      ) : null}
    </aside>
  )
}

function RelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  const image = getImages(post)[0]
  return (
    <Link href={buildPostUrl(task, post.slug)} className="group flex gap-3 rounded-2xl border border-[var(--editable-border)] bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-lg">
      {image && task !== 'sbm' ? <img src={image} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" /> : <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[var(--detail-bg)]"><FileText className="h-6 w-6 opacity-45" /></div>}
      <div className="min-w-0">
        <h3 className="line-clamp-3 text-sm font-black leading-tight tracking-[-0.03em]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 opacity-60">{summaryText(post)}</p>
      </div>
    </Link>
  )
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--editable-border)] bg-white/70 p-5">
      <div className="flex items-center gap-2 text-lg font-black"><MessageCircle className="h-5 w-5" /> Comments</div>
      <div className="mt-5 grid gap-3">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="rounded-2xl border border-[var(--editable-border)] bg-white p-4">
            <p className="text-sm font-black">{comment.name}</p>
            <p className="mt-2 text-sm leading-6 opacity-70">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-sm opacity-60">No comments yet for {slug}.</p> : null}
      </div>
    </section>
  )
}
