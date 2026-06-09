'use client'

import Link from 'next/link'
import { ArrowUpRight, LogOut, ShieldCheck } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const displayName = 'Gabeetown Publisher'

export function EditableFooter() {
  const { session, logout } = useEditableLocalAuthSession()
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled).slice(0, 4)
  const year = new Date().getFullYear()
  const columns = [
    {
      title: 'Resources',
      links: [
        { label: 'Search', href: '/search' },
        ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }]),
        { label: 'Contact', href: '/contact' },
      ],
    },
    
  ]

  return (
    <footer className="gabeetown-black-section">
      <div className="mx-auto grid max-w-[1120px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_0.8fr] lg:px-8">
        <div className="flex items-start gap-4">
          <ShieldCheck className="mt-1 h-8 w-8 shrink-0 text-white" />
          <div>
            <h2 className="text-lg font-black">{displayName} keeps profile and visual discovery organized.</h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-white/82">{globalContent.footer.description}</p>
          </div>
        </div>
        <div className="rounded-sm bg-white p-4 text-sm font-black text-black">
          Publication-ready visual pages, resources, and searchable archives in one place.
        </div>
      </div>
      <div className="mx-auto grid max-w-[1120px] gap-8 px-4 pb-12 pt-8 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-black uppercase">{column.title}</h3>
            <div className="mt-5 grid gap-1.5">
              {column.links.map((link) => (
                <Link key={`${column.title}-${link.href}-${link.label}`} href={link.href} className="inline-flex w-fit items-center gap-1 text-base font-semibold leading-6 text-white/88 hover:text-white">
                  {link.label} <ArrowUpRight className="h-3.5 w-3.5 opacity-55" />
                </Link>
              ))}
              {session && column.title === 'Resources' ? (
                <button type="button" onClick={logout} className="mt-2 inline-flex w-fit items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-base font-black leading-6 text-white/88 transition hover:border-white/40 hover:text-white">
                  Logout <LogOut className="h-4 w-4 opacity-70" />
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-[1120px] px-4 pb-14 text-sm font-semibold text-white/86 sm:px-6 lg:px-8">
        Copyright {year} {displayName}. {globalContent.footer.bottomNote}
      </div>
    </footer>
  )
}
