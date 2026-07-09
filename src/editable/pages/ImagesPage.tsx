import Link from 'next/link'
import { Camera, Filter, Image as ImageIcon, Search, Sparkles } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('image', {
    path: '/image',
    title: taskPageMetadata.image?.title,
    description: taskPageMetadata.image?.description,
  })

const displayName = 'Gabeetown Publisher'
const placeholder = '/placeholder.svg?height=900&width=1200'

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const stripHtml = (value: string) =>
  value
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
const getSummary = (post: SitePost) => {
  const raw = post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body)
  return raw ? stripHtml(raw) : ''
}
const getCategoryOf = (post: SitePost) => asText(getContent(post).category) || post.tags?.[0] || 'Visual'

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

export async function ImagesPageTaskPage({
  searchParams,
  basePath = '/images',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const { posts, pagination } = await fetchPaginatedTaskPosts('image', { page, limit: 24, category })
  const detailBase = getTaskConfig('image')?.route || '/image'
  return <ImagesHomeStyledView posts={posts} pagination={pagination} category={category} basePath={basePath} detailBase={detailBase} />
}

export default ImagesPageTaskPage
export const ImagesTaskPage = ImagesPageTaskPage

function ImagesHomeStyledView({
  posts,
  pagination,
  category,
  basePath,
  detailBase,
}: {
  posts: SitePost[]
  pagination: SiteFeedPagination
  category: string
  basePath: string
  detailBase: string
}) {
  const taskConfig = getTaskConfig('image')
  const voice = taskPageVoices.image
  const label = taskConfig?.label || 'Images'
  const page = pagination.page || 1
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const heroImages = Array.from({ length: 16 }).map((_, index) => getImage(posts[index % Math.max(posts.length, 1)] || ({} as SitePost)))
  const featured = posts.slice(0, 3)
  const grid = posts.slice(3)

  return (
    <EditableSiteShell>
      <main>
        <section className="gabeetown-black-section relative overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-3 opacity-45 sm:grid-cols-5 lg:grid-cols-8">
            {heroImages.map((src, index) => (
              <img key={index} src={src} alt="" className="h-40 w-full object-cover sm:h-56 lg:h-80" />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative mx-auto grid max-w-[1120px] gap-8 px-4 py-24 sm:px-6 lg:grid-cols-[0.9fr_0.85fr] lg:items-center lg:px-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white backdrop-blur">
                <Camera className="h-4 w-4" /> {label}
              </div>
              <h1 className="mt-6 max-w-xl text-4xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl">
                {voice?.headline || `Browse ${label}`}
              </h1>
              <p className="mt-7 max-w-xl text-xl font-semibold leading-8 text-white">
                {voice?.description || SITE_CONFIG.description}
              </p>
              <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-white/85">
                Gallery-first browsing with strong visuals and compact captions — discover portfolios, stories, and creative work in one polished stream.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href={basePath} className="rounded-md bg-white px-7 py-4 text-base font-bold text-[#2f6df6] transition hover:-translate-y-0.5">Browse all {label}</Link>
                <Link href="/search" className="rounded-md bg-[var(--slot4-green)] px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5">Search images</Link>
              </div>
            </div>
            <form action={basePath} className="rounded-md bg-white p-6 shadow-2xl">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#2f6df6]">
                <Filter className="h-4 w-4" /> Filter gallery
              </div>
              <label className="mt-5 block text-xs font-black uppercase tracking-[0.16em] text-black/60">Category</label>
              <select name="category" defaultValue={category} className="mt-2 h-12 w-full rounded-md border border-black/10 bg-white px-4 text-sm font-bold text-black outline-none">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="mt-4 h-12 w-full rounded-md bg-[#2f6df6] text-sm font-black uppercase tracking-[0.16em] text-white">Apply filter</button>
              <p className="mt-4 text-xs font-bold text-black/60">Showing: {categoryLabel}</p>
            </form>
          </div>
          <div className="relative border-t border-white/10 bg-black px-4 py-5">
            <div className="mx-auto grid max-w-[1120px] gap-4 text-center text-white sm:grid-cols-3">
              {[
                [`${pagination.total ?? posts.length}+`, 'Images in the gallery'],
                [`${pagination.totalPages || 1}`, 'Curated pages'],
                ['100%', 'Responsive delivery'],
              ].map(([value, copy]) => (
                <div key={copy}>
                  <p className="text-lg font-black">{value}</p>
                  <p className="text-base font-semibold">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {featured.length ? (
          <section className="gabeetown-blue-section">
            <div className="mx-auto max-w-[1120px] px-4 py-20 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-black tracking-[-0.04em]">Featured this collection</h2>
              <p className="mt-5 max-w-3xl text-lg font-semibold leading-7">
                Discover how {displayName} curates image-rich portfolios into an organized discovery experience for creators, brands, and visitors.
              </p>
              <div className="mt-14 grid gap-5 md:grid-cols-3">
                {featured.map((post, index) => (
                  <Link
                    key={post.id || post.slug}
                    href={`${detailBase}/${post.slug}`}
                    className="group relative min-h-[420px] overflow-hidden rounded-md bg-black text-white shadow-[0_22px_70px_rgba(0,0,0,0.25)]"
                  >
                    <img src={getImage(post)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-7">
                      <span className="inline-flex w-fit items-center gap-2 rounded-md bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur">
                        <ImageIcon className="h-3 w-3" /> {getCategoryOf(post)}
                      </span>
                      <h3 className="mt-4 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.03em]">{post.title}</h3>
                      <p className="mt-3 text-sm font-black uppercase tracking-wide opacity-85">Story {String(index + 1).padStart(2, '0')} · Gabeetown</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="gabeetown-teal-section overflow-hidden">
          <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black tracking-[-0.04em]">The full gallery</h2>
                <p className="mt-4 max-w-2xl text-lg font-semibold leading-7">
                  Every image published to the platform — filter by category, browse by page, and open any tile to view the full story.
                </p>
              </div>
              <div className="rounded-md bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] backdrop-blur">
                Page {page} of {pagination.totalPages || 1}
              </div>
            </div>
            {grid.length ? (
              <div className="mt-14 columns-1 gap-5 space-y-5 md:columns-2 lg:columns-3">
                {grid.map((post, index) => (
                  <Link
                    key={post.id || post.slug}
                    href={`${detailBase}/${post.slug}`}
                    className="group mb-5 block break-inside-avoid overflow-hidden rounded-md bg-white text-black shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className={index % 3 === 0 ? 'aspect-[3/4] overflow-hidden' : 'aspect-[4/3] overflow-hidden'}>
                      <img src={getImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <div className="inline-flex items-center gap-2 rounded-md bg-[#2f6df6]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#2f6df6]">
                        <ImageIcon className="h-3 w-3" /> {getCategoryOf(post)}
                      </div>
                      <h3 className="mt-4 line-clamp-3 text-xl font-black leading-tight tracking-[-0.03em]">{post.title}</h3>
                      {getSummary(post) ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/65">{getSummary(post)}</p> : null}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-14 rounded-md bg-white p-10 text-center text-black">
                <Search className="mx-auto h-8 w-8 text-[#2f6df6]" />
                <h3 className="mt-4 text-3xl font-black tracking-[-0.03em]">No images found</h3>
                <p className="mt-3 text-sm font-semibold text-black/65">Try another category or refresh this page after publishing new content.</p>
              </div>
            )}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {pagination.hasPrevPage ? (
                <Link href={pageHref(basePath, category, page - 1)} className="rounded-md bg-white px-6 py-3 text-sm font-black text-[#2f6df6]">Previous</Link>
              ) : null}
              <span className="rounded-md bg-black px-6 py-3 text-sm font-black text-white">Page {page} of {pagination.totalPages || 1}</span>
              {pagination.hasNextPage ? (
                <Link href={pageHref(basePath, category, page + 1)} className="rounded-md bg-[var(--slot4-green)] px-6 py-3 text-sm font-black text-white">Next</Link>
              ) : null}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-[1120px] px-4 py-20 text-center sm:px-6 lg:px-8">
            <Sparkles className="mx-auto h-8 w-8 text-[#2f6df6]" />
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">Publish your own visual stories</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-7 text-black/70">
              Bring image portfolios, profiles, and creative work to life on {displayName}. Add categories, summaries, and links to make discovery effortless.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link href="/create" className="rounded-md border border-[#2f6df6] px-7 py-4 text-base font-bold text-[#2f6df6]">Start publishing</Link>
              <Link href="/contact" className="rounded-md bg-[var(--slot4-green)] px-7 py-4 text-base font-bold text-white">Learn more</Link>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
