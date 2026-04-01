'use client'
import { useEffect, useState } from 'react'
import AdminTable from '@/components/admin/AdminTable'

interface Subscriber {
  _id: string
  email: string
  subscribedAt: string
}

export default function AdminNewsletter() {
  const [data, setData] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const load = () => {
    setLoading(true)
    fetch('/api/newsletter').then(r => r.json()).then(d => { setData(d.data || []); setLoading(false) })
  }
  useEffect(load, [])

  const filtered = data.filter(s => s.email.toLowerCase().includes(search.toLowerCase()))

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this subscriber?')) return
    await fetch(`/api/newsletter/${id}`, { method: 'DELETE' })
    load()
  }

  const exportCSV = () => {
    const csv = ['Email,Subscribed At', ...data.map(s => `${s.email},${new Date(s.subscribedAt).toLocaleDateString()}`)].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'subscribers.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Newsletter Subscribers</h2>
          <p className="text-gray-500 text-sm mt-0.5">{data.length} total subscribers</p>
        </div>
        <button onClick={exportCSV}
          className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors">
          ↓ Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-sm border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 outline-none transition-colors bg-white"
        />
      </div>

      <AdminTable
        data={filtered}
        loading={loading}
        onEdit={() => {}}    // no edit for subscribers
        onDelete={handleDelete}
        columns={[
          {
            key: 'email', label: 'Email',
            render: row => (
              <a href={`mailto:${row.email}`} className="text-blue-600 hover:underline font-medium">{row.email}</a>
            ),
          },
          {
            key: 'subscribedAt', label: 'Subscribed',
            render: row => (
              <span className="text-gray-400 text-xs">{new Date(row.subscribedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            ),
          },
        ]}
      />
    </div>
  )
}
