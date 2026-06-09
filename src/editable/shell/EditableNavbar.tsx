'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Menu, PlusCircle, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      ...SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile').slice(0, 5).map((task) => ({ label: task.label, href: task.route })),
      { label: 'About', href: '/about' },
    ],
    []
  )

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-[0_1px_0_rgba(255,255,255,0.08)]">
      <nav className="mx-auto flex min-h-[88px] w-full max-w-[1120px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${SITE_CONFIG.name} home`}>
          
            <img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} className="h-18 w-18" />
          <span className="leading-none">
            <span className="block text-2xl font-black uppercase tracking-[-0.05em] text-[#a6ded7]">Gabeetown</span>
           </span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`px-3 py-2 text-sm font-black uppercase transition ${active ? 'text-[#2f6df6]' : 'text-white hover:text-[#8fd9d1]'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <Link href="/create" className="hidden items-center gap-2 rounded-lg bg-[#2f6df6] px-5 py-3 text-sm font-black uppercase text-white transition hover:-translate-y-0.5 sm:inline-flex">
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <button type="button" onClick={logout} className="hidden items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-black uppercase text-white transition hover:border-white/40 hover:text-[#8fd9d1] md:inline-flex">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden px-3 py-2 text-sm font-black uppercase text-white transition hover:text-[#8fd9d1] md:inline-flex">Sign in</Link>
              <Link href="/signup" className="hidden px-3 py-2 text-sm font-black uppercase text-white transition hover:text-[#8fd9d1] md:inline-flex">Sign up</Link>
              <Link href="/contact" className="hidden rounded-lg bg-[#2f6df6] px-6 py-3 text-sm font-black uppercase text-white transition hover:-translate-y-0.5 sm:inline-flex">Contact us</Link>
            </>
          )}
          <Link href="/search" className="hidden h-12 w-12 items-center justify-center rounded-lg bg-white text-black transition hover:-translate-y-0.5 sm:inline-flex" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-lg border border-white/15 bg-white/10 p-2 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-black px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-xl border border-white/15 bg-white px-3 py-3 text-black">
            <Search className="mt-0.5 h-4 w-4 opacity-60" />
            <input name="q" type="search" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-bold outline-none" />
          </form>
          <div className="grid gap-2">
            {[...navItems, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Sign in', href: '/login' }, { label: 'Sign up', href: '/signup' }]), { label: 'Contact', href: '/contact' }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black uppercase">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-black uppercase text-white">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
