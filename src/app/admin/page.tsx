'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  projects: number
  services: number
  team: number
  testimonials: number
  messages: number
  newsletter: number
  pendingReviews: number
  unreadMessages: number
}

const statCards = [
  { key: 'projects',     label: 'Projects',      icon: '🗂',  href: '/admin/projects',     color: 'bg-blue-50 text-blue-600' },
  { key: 'services',     label: 'Services',      icon: '⚙️',  href: '/admin/services',     color: 'bg-indigo-50 text-indigo-600' },
  { key: 'team',         label: 'Team Members',  icon: '👥',  href: '/admin/team',         color: 'bg-purple-50 text-purple-600' },
  { key: 'testimonials', label: 'Testimonials',  icon: '💬',  href: '/admin/testimonials', color: 'bg-emerald-50 text-emerald-600' },
  { key: 'messages',     label: 'Messages',      icon: '✉️',  href: '/admin/contact',      color: 'bg-orange-50 text-orange-600' },
  { key: 'newsletter',   label: 'Subscribers',   icon: '📧',  href: '/admin/newsletter',   color: 'bg-pink-50 text-pink-600' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Partial<Stats>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/projects').then(r => r.json()),
      fetch('/api/services').then(r => r.json()),
      fetch('/api/team').then(r => r.json()),
      fetch('/api/testimonials?all=true').then(r => r.json()),
      fetch('/api/contact').then(r => r.json()),
      fetch('/api/newsletter').then(r => r.json()),
    ]).then(([projects, services, team, testimonials, contact, newsletter]) => {
      setStats({
        projects: projects.data?.length ?? 0,
        services: services.data?.length ?? 0,
        team: team.data?.length ?? 0,
        testimonials: testimonials.data?.length ?? 0,
        messages: contact.data?.length ?? 0,
        newsletter: newsletter.data?.length ?? 0,
        pendingReviews: testimonials.data?.filter((t: any) => !t.approved).length ?? 0,
        unreadMessages: contact.data?.filter((m: any) => !m.read).length ?? 0,
      })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-[#0a0a1a] to-blue-900 rounded-2xl p-8 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          Welcome back, Admin 👋
        </h2>
        <p className="text-blue-200 text-sm">Manage your SonicPrime Dev company website from here.</p>
      </div>

      {/* Alert badges */}
      {(stats.pendingReviews || stats.unreadMessages) ? (
        <div className="flex flex-wrap gap-3 mb-6">
          {!!stats.pendingReviews && (
            <Link href="/admin/testimonials" className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm px-4 py-2 rounded-xl hover:bg-yellow-100 transition-colors">
              ⚠️ {stats.pendingReviews} pending review{stats.pendingReviews !== 1 ? 's' : ''}
            </Link>
          )}
          {!!stats.unreadMessages && (
            <Link href="/admin/contact" className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors">
              ✉️ {stats.unreadMessages} unread message{stats.unreadMessages !== 1 ? 's' : ''}
            </Link>
          )}
        </div>
      ) : null}

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {statCards.map(card => (
          <Link
            key={card.key}
            href={card.href}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-blue-200 transition-all group"
          >
            <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
              {card.icon}
            </div>
            <p className="text-gray-500 text-sm mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              {loading ? '—' : (stats[card.key as keyof Stats] ?? 0)}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '+ Add Project', href: '/admin/projects' },
            { label: '+ Add Team Member', href: '/admin/team' },
            { label: '+ Add Service', href: '/admin/services' },
            { label: 'View Messages', href: '/admin/contact' },
            { label: 'Approve Reviews', href: '/admin/testimonials' },
          ].map(a => (
            <Link
              key={a.label}
              href={a.href}
              className="px-4 py-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 text-gray-700 text-sm font-medium rounded-xl border border-gray-200 hover:border-blue-200 transition-all"
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
