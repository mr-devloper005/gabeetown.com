import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'Nothing published here yet',
  description = 'Fresh posts will appear here automatically once this section has published content.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('rounded-md border border-dashed border-[#2f7faa]/35 bg-white p-10 text-center shadow-sm', className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2f7faa] text-white">
        <SearchX className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-3xl font-black tracking-[-0.04em]">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-7 text-slate-600">{description}</p>
      <Link href={actionHref} className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#2f6df6] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Published ${taskLabel} will appear here automatically. The layout stays ready with a polished empty state while the feed is quiet.`}
      actionLabel="Explore the site"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for reaching out. Your request has been saved and routed through the contact workflow."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
