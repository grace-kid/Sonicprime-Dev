'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: '⊞' },
  { label: 'Projects', href: '/admin/projects', icon: '🗂' },
  { label: 'Services', href: '/admin/services', icon: '⚙️' },
  { label: 'Team', href: '/admin/team', icon: '👥' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: '💬' },
  { label: 'Messages', href: '/admin/contact', icon: '✉️' },
  { label: 'Newsletter', href: '/admin/newsletter', icon: '📧' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (pathname === '/admin/login') return <>{children}</>

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a1a] flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`}>
        {/* Logo */}
        <div className='px-6 py-6 border-b border-white/10'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center'>
              <img src='/images/logo.png' className='h-8 w-8' alt='Logo' />
            </div>
            <div>
              <p
                className='text-white font-bold text-sm leading-tight'
                style={{ fontFamily: "var(--font-display)" }}>
                SONICPRIME
              </p>
              <p className='text-gray-500 text-xs'>Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className='flex-1 px-4 py-6 space-y-1'>
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}>
                <span className='text-base'>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className='px-4 py-5 border-t border-white/10'>
          <button
            onClick={handleLogout}
            className='w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-red-600/20 hover:text-red-400 transition-colors'>
            <span>🚪</span> Logout
          </button>
          <Link
            href='/'
            target='_blank'
            className='mt-1 w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-colors'>
            <span>🌐</span> View Site
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/60 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className='flex-1 flex flex-col min-w-0'>
        {/* Top bar */}
        <header className='bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4'>
          <button
            className='lg:hidden text-gray-500 hover:text-gray-900'
            onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <h1
            className='text-gray-900 font-semibold text-lg flex-1'
            style={{ fontFamily: "var(--font-display)" }}>
            {navItems.find(
              (n) =>
                n.href === pathname ||
                (n.href !== "/admin" && pathname.startsWith(n.href)),
            )?.label ?? "Dashboard"}
          </h1>
          <span className='text-sm text-gray-400'>Admin</span>
        </header>

        {/* Content */}
        <main className='flex-1 p-6 overflow-auto'>{children}</main>
      </div>
    </div>
  );
}
