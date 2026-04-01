'use client'
import { useEffect, useState } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import Modal from '@/components/admin/Modal'

interface ContactMessage {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function AdminContact() {
  const [data, setData] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [viewing, setViewing] = useState<ContactMessage | null>(null)

  const load = () => {
    setLoading(true)
    fetch('/api/contact').then(r => r.json()).then(d => { setData(d.data || []); setLoading(false) })
  }
  useEffect(load, [])

  const filtered = data.filter(m =>
    filter === 'all' ? true : filter === 'unread' ? !m.read : m.read
  )

  const handleView = async (row: ContactMessage) => {
    setViewing(row)
    if (!row.read) {
      await fetch(`/api/contact/${row._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      })
      load()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await fetch(`/api/contact/${id}`, { method: 'DELETE' })
    load()
  }

  const unread = data.filter(m => !m.read).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Contact Messages</h2>
          {unread > 0 && <p className="text-blue-600 text-sm mt-0.5 font-medium">📬 {unread} unread</p>}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {(['all', 'unread', 'read'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}>
            {f} {f === 'unread' && unread > 0 ? `(${unread})` : ''}
          </button>
        ))}
      </div>

      <AdminTable
        data={filtered}
        loading={loading}
        onEdit={handleView}
        onDelete={handleDelete}
        columns={[
          {
            key: 'read', label: '',
            render: row => !row.read
              ? <span className="inline-block w-2 h-2 rounded-full bg-blue-500" title="Unread" />
              : <span className="inline-block w-2 h-2 rounded-full bg-gray-200" />,
          },
          { key: 'name', label: 'Name', render: row => <span className={!row.read ? 'font-semibold text-gray-900' : 'text-gray-700'}>{row.name}</span> },
          { key: 'email', label: 'Email', render: row => <span className="text-blue-600">{row.email}</span> },
          { key: 'subject', label: 'Subject' },
          { key: 'createdAt', label: 'Date', render: row => <span className="text-gray-400 text-xs">{new Date(row.createdAt).toLocaleDateString()}</span> },
        ]}
      />

      {/* View message modal */}
      <Modal title="Message" open={!!viewing} onClose={() => setViewing(null)}>
        {viewing && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">From</p>
                <p className="text-gray-900 font-semibold">{viewing.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Email</p>
                <a href={`mailto:${viewing.email}`} className="text-blue-600 hover:underline">{viewing.email}</a>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Subject</p>
              <p className="text-gray-900 font-medium">{viewing.subject}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Message</p>
              <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4 whitespace-pre-wrap">{viewing.message}</p>
            </div>
            <p className="text-xs text-gray-400">{new Date(viewing.createdAt).toLocaleString()}</p>
            <div className="flex gap-3 pt-2">
              <a href={`mailto:${viewing.email}?subject=Re: ${viewing.subject}`}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl text-center transition-colors">
                Reply via Email
              </a>
              <button onClick={() => { handleDelete(viewing._id); setViewing(null) }}
                className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-xl transition-colors">
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
