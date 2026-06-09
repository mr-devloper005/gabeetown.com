import Link from 'next/link'
import type { ReactNode } from 'react'
import { BarChart3, BookOpen, FileText, Globe2, Image as ImageIcon, Mail, MessageSquare, MousePointerClick, Search, ShoppingBasket, Smartphone, Sparkles, UsersRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const displayName = 'Gabeetown Publisher'

const fallbackCovers = [
  '/placeholder.svg?height=900&width=700',
  '/placeholder.svg?height=700&width=900',
  '/placeholder.svg?height=800&width=800',
  '/placeholder.svg?height=900&width=1200',
]

function imageFor(posts: SitePost[], index: number) {
  const post = posts[index % Math.max(posts.length, 1)]
  return post ? getEditablePostImage(post) : fallbackCovers[index % fallbackCovers.length]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function DeviceMockup({ posts }: { posts: SitePost[] }) {
  return (
    <div className="relative mx-auto min-h-[330px] max-w-[520px]">
      <div className="absolute left-[9%] top-[45%] z-20 h-36 w-20 rounded-[1.15rem] border-[7px] border-black bg-white shadow-2xl">
        <img src={imageFor(posts, 3)} alt="" className="h-full w-full rounded-[0.7rem] object-cover" />
      </div>
      <div className="absolute left-[19%] right-[5%] top-[8%] h-72 rounded-t-[1.1rem] border-[12px] border-black bg-white shadow-2xl">
        <div className="grid h-full grid-cols-2 overflow-hidden">
          <img src={imageFor(posts, 0)} alt="" className="h-full w-full object-cover" />
          <div className="flex flex-col justify-center bg-[#e95c42] p-6 text-white">
            <p className="text-4xl font-light leading-none">Gold</p>
            <p className="text-4xl font-light leading-none">Medal</p>
            <p className="text-4xl font-light leading-none">Care</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-[31%] h-10 w-[43%] rounded-b-full bg-black/30 blur-sm" />
      <div className="absolute bottom-[2%] left-[41%] h-16 w-[22%] bg-slate-200 shadow-lg" />
      <div className="absolute bottom-0 left-[33%] h-5 w-[39%] rounded-t-full bg-slate-100 shadow-lg" />
      <div className="absolute right-0 top-[44%] z-20 h-40 w-24 rounded-[1.25rem] border-[7px] border-black bg-white shadow-2xl">
        <img src={imageFor(posts, 2)} alt="" className="h-full w-full rounded-[0.7rem] object-cover" />
      </div>
    </div>
  )
}

function ProductTile({ icon: Icon, title, image }: { icon: typeof BookOpen; title: string; image?: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-28 items-end justify-center">
        {image ? <img src={image} alt="" className="max-h-28 max-w-[150px] object-contain drop-shadow-xl" /> : <Icon className="h-20 w-20 text-white" />}
      </div>
      <div className="mt-7 rounded-md bg-white px-5 py-3 text-lg font-semibold leading-tight text-[#2f6df6] shadow-sm">{title}</div>
    </div>
  )
}

function LogoText({ children }: { children: ReactNode }) {
  return <div className="flex h-16 items-center justify-center px-5 text-center text-xl font-black leading-none text-black/78 grayscale">{children}</div>
}

function InsightCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group relative min-h-[500px] overflow-hidden rounded-md bg-black text-white shadow-[0_22px_70px_rgba(0,0,0,0.2)]">
      <img src={getEditablePostImage(post)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex min-h-[500px] flex-col items-center justify-center p-8 text-center">
        <h3 className="max-w-sm text-2xl font-black leading-tight">{post.title}</h3>
        <p className="mt-14 text-base font-semibold">{index % 2 ? 'Digital Publishing' : 'How-to Guide'}</p>
        <p className="mt-2 text-sm font-black uppercase tracking-wide">Gabeetown</p>
        <div className="mt-8 h-14 w-14 overflow-hidden rounded-full bg-white/60">
          <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover grayscale" />
        </div>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  return (
    <section className="gabeetown-black-section relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-3 opacity-45 sm:grid-cols-5 lg:grid-cols-8">
        {Array.from({ length: 16 }).map((_, index) => (
          <img key={index} src={imageFor(posts, index)} alt="" className="h-40 w-full object-cover sm:h-56 lg:h-80" />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative mx-auto grid max-w-[1120px] gap-8 px-4 py-24 sm:px-6 lg:grid-cols-[0.85fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <h1 className="max-w-xl text-4xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl">
            Digital publishing software to grow your audience
          </h1>
          <p className="mt-7 max-w-xl text-xl font-semibold leading-8 text-white">
            Showcase image-rich portfolios, professional profiles, visual stories, and useful resources from one polished public website.
          </p>
          <p className="mt-6 max-w-xl text-xl font-semibold leading-8 text-white">
            Build an organized discovery experience for creative professionals, businesses, and visitors who want to browse with confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={primaryRoute} className="rounded-md bg-white px-7 py-4 text-base font-bold text-[#2f6df6] transition hover:-translate-y-0.5">View {taskLabel(primaryTask)}</Link>
            <Link href="/contact" className="rounded-md bg-[var(--slot4-green)] px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5">Learn More</Link>
          </div>
        </div>
        <DeviceMockup posts={posts} />
      </div>
      <div className="relative border-t border-white/10 bg-black px-4 py-5">
        <div className="mx-auto grid max-w-[1120px] gap-4 text-center text-white sm:grid-cols-3">
          {[
            ['4,500,000+', 'Portfolio Views'],
            ['15,000+', 'Profiles Indexed'],
            ['1,000,000+', 'Pages Published'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-lg font-black">{value}</p>
              <p className="text-base font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ posts }: HomeSectionProps) {
  const products = [
    ['Catalogues', BookOpen],
    ['Textbooks', FileText],
    ['Magazines', ImageIcon],
    ['Brochures', FileText],
    ['Prospectus', Globe2],
    ['Business Docs', UsersRound],
    ['Smartphone Apps', Smartphone],
    ['Redemption Codes', ShoppingBasket],
    ['Reflowable Mode', BookOpen],
  ] as const

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-[1120px] px-4 py-5 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black">Trusted By</h2>
          <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            <LogoText>TRAVELER</LogoText>
            <LogoText>RYA</LogoText>
            <LogoText>Financial Times</LogoText>
            <LogoText>visit exeter</LogoText>
            <LogoText>UNEP</LogoText>
            <LogoText>Gill Education</LogoText>
          </div>
        </div>
      </section>
      <section className="gabeetown-blue-section">
        <div className="mx-auto max-w-[1120px] px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-[-0.04em]">One platform for everything</h2>
          <p className="mt-5 max-w-6xl text-lg font-semibold leading-7">
            Bring any type of content to life as a digital publication. Discover how {displayName} can grow your audience, increase visibility, and deliver rich reading experiences across platforms and devices.
          </p>
          <div className="mt-14 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-6">
            {products.map(([title, Icon], index) => (
              <ProductTile key={title} title={title} icon={Icon} image={posts[index] ? imageFor(posts, index) : undefined} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableMagazineSplit({ posts }: HomeSectionProps) {
  return (
    <>
      <section className="gabeetown-teal-section overflow-hidden">
        <div className="mx-auto grid max-w-[1120px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-xl bg-white/20 p-1 shadow-lg">
                <img src={imageFor(posts, index)} alt="" className="h-full w-full rounded-lg object-cover" />
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-[-0.04em]">Create a mobile app for your publication</h2>
            <p className="mt-6 text-xl font-semibold leading-8">Build a central hub for visual portfolios and profiles, with discovery paths that make your work easier to browse and share.</p>
            <Link href="/image" className="mt-8 inline-flex rounded-md bg-white px-7 py-4 text-base font-bold text-[#2f6df6]">Explore Branded Apps</Link>
          </div>
        </div>
      </section>
      <section className="gabeetown-blue-section">
        <div className="mx-auto grid max-w-[1120px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-black">Reflowable Mode</h2>
            <p className="mt-6 max-w-xl text-2xl font-semibold leading-9">A responsive layout improves readability across every screen size, so posts, images, profiles, and resources stay comfortable on phones, tablets, and desktops.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/about" className="rounded-md bg-[#2f6df6] px-7 py-4 text-base font-bold text-white">Learn More</Link>
              <Link href="/search" className="rounded-md bg-[var(--slot4-green)] px-7 py-4 text-base font-bold text-white">Explore Reflowable Mode</Link>
            </div>
          </div>
          <div className="flex items-end justify-center gap-10">
            <div className="h-64 w-32 rounded-[1.75rem] border-[10px] border-black bg-white p-2 shadow-2xl">
              <img src={imageFor(posts, 8)} alt="" className="h-full w-full rounded-xl object-cover" />
            </div>
            <div className="h-96 w-64 rounded-[1.75rem] border-[12px] border-black bg-white p-3 shadow-2xl">
              <img src={imageFor(posts, 9)} alt="" className="h-full w-full rounded-lg object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const mergedPosts = timeSections.flatMap((section) => section.posts)
  const displayPosts = (mergedPosts.length ? mergedPosts : posts).slice(0, 3)
  const outcomes = [
    [Globe2, 'Reach new audiences & marketing channels'],
    [Smartphone, 'Deliver content access on any device'],
    [MousePointerClick, 'Engage users with interactive content'],
    [Mail, 'Share portfolio updates with subscribers'],
    [ShoppingBasket, 'Drive sales direct from digital content'],
    [MessageSquare, 'Promote inclusion with accessible pages'],
    [Search, 'Unlock the power of content search'],
    [BarChart3, 'Measure success with detailed analytics'],
  ] as const

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-[1120px] px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-[-0.04em]">Get started with digital publishing in 3 simple steps</h2>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {[
              ['1', 'Upload', 'Add images, profiles, posts, documents, and details to the platform.'],
              ['2', 'Enhance', 'Shape the experience with cards, categories, summaries, media, and links.'],
              ['3', 'Publish', 'Share polished public pages with the audience that matters to you.'],
            ].map(([number, title, copy]) => (
              <div key={number}>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2f7faa] text-3xl font-light text-white">{number}</div>
                <h3 className="mt-6 text-2xl font-black">{title}</h3>
                <p className="mx-auto mt-5 max-w-sm text-lg font-medium leading-7">{copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center gap-4">
            <Link href={primaryRoute} className="rounded-md border border-[#2f6df6] px-7 py-4 text-base font-bold text-[#2f6df6]">View Features</Link>
            <Link href="/contact" className="rounded-md bg-[var(--slot4-green)] px-7 py-4 text-base font-bold text-white">Learn More</Link>
          </div>
        </div>
      </section>
      <section className="gabeetown-blue-section">
        <div className="mx-auto grid max-w-[1120px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <img src={imageFor(posts, 12)} alt="" className="mx-auto max-h-[320px] rounded-xl object-cover shadow-2xl" />
          <div className="text-center">
            <h2 className="text-3xl font-black leading-tight">Discover why creators and organizations choose {displayName} to deliver visual content strategy</h2>
            </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-[-0.04em]">Deliver digital strategies with real outcomes</h2>
          <p className="mt-5 text-lg font-medium">Combine a flexible publishing surface with clean discovery patterns for image portfolios, profiles, posts, and resources.</p>
          <div className="mt-14 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map(([Icon, label]) => (
              <div key={label} className="text-center">
                <Icon className="mx-auto h-20 w-20 text-[#f6a84f]" strokeWidth={1.4} />
                <p className="mx-auto mt-7 max-w-xs text-lg font-medium leading-6">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex justify-center gap-4">
            <Link href={primaryRoute} className="rounded-md border border-[#2f6df6] px-7 py-4 text-base font-bold text-[#2f6df6]">View Features</Link>
            <Link href="/contact" className="rounded-md bg-[var(--slot4-green)] px-7 py-4 text-base font-bold text-white">Learn More</Link>
          </div>
        </div>
      </section>
      <section className="gabeetown-blue-section">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-[-0.04em]">Explore digital publishing insights from {displayName}</h2>
          {displayPosts.length ? (
            <div className="mt-20 grid gap-5 md:grid-cols-3">
              {displayPosts.map((post, index) => <InsightCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
          ) : (
            <div className="mt-12 rounded-md bg-white p-8 text-center text-black">
              <Sparkles className="mx-auto h-8 w-8 text-[#2f6df6]" />
              <h3 className="mt-4 text-2xl font-black">Insights will appear here soon</h3>
              <p className="mt-3 text-sm font-semibold text-black/60">{pagesContent.home.taskSection.descriptionSuffix}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="fixed bottom-4 right-4 z-40">
      <Link href="/contact" className="flex h-16 w-16 items-center justify-center rounded-full bg-[#c04aa0] text-white shadow-2xl transition hover:-translate-y-1" aria-label="Contact">
        <MessageSquare className="h-8 w-8" />
      </Link>
      <div className="pointer-events-none absolute bottom-16 right-0 hidden w-64 rounded-md bg-white p-4 text-sm text-black shadow-2xl md:block">
        <div className="absolute right-2 top-2 text-lg leading-none">x</div>
        Got any questions? I am happy to help.
        <div className="mt-4 border-t pt-3 text-xs font-bold">Spam protection enabled</div>
      </div>
    </section>
  )
}
