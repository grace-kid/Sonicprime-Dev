'use client'
import { useEffect, useState } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import Modal from '@/components/admin/Modal'
import { FormField, Input, Textarea } from '@/components/admin/FormField'

interface Testimonial {
  _id: string
  name: string
  title: string
  company: string
  comment: string
  rating: number
  imageUrl?: string
  imageFileId?: string
  approved: boolean
  createdAt: string
}

const empty = { name: '', title: '', company: '', comment: '', rating: 5, imageUrl: '', approved: false }

export default function AdminTestimonials() {
  const [data, setData] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [form, setForm] = useState(empty)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    fetch('/api/testimonials?all=true')
      .then(r => r.json())
      .then(d => { setData(d.data || []); setLoading(false) })
  }
  useEffect(load, [])

  const filtered = data.filter(t =>
    filter === 'all' ? true : filter === 'pending' ? !t.approved : t.approved
  )

  const openCreate = () => { setEditing(null); setForm(empty); setImageFile(null); setImagePreview(''); setError(''); setModalOpen(true) }
  const openEdit = (row: Testimonial) => {
    setEditing(row)
    setForm({ name: row.name, title: row.title, company: row.company, comment: row.comment, rating: row.rating, imageUrl: row.imageUrl || '', approved: row.approved })
    setImageFile(null)
    setImagePreview(row.imageFileId ? `/api/files/${row.imageFileId}` : row.imageUrl || '')
    setError(''); setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.title || !form.company || !form.comment) { setError('All fields required.'); return }
    setSaving(true); setError('')
    const url = editing ? `/api/testimonials/${editing._id}` : '/api/testimonials'
    const method = editing ? 'PUT' : 'POST'
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('title', form.title)
    formData.append('company', form.company)
    formData.append('comment', form.comment)
    formData.append('rating', String(form.rating))
    formData.append('approved', String(form.approved))
    if (form.imageUrl) formData.append('imageUrl', form.imageUrl)
    if (imageFile) formData.append('image', imageFile)

    const res = await fetch(url, { method, body: formData })
    const d = await res.json()
    setSaving(false)
    if (d.success) { setModalOpen(false); load() } else setError(d.error || 'Failed')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
    load()
  }

  const toggleApprove = async (row: Testimonial) => {
    await fetch(`/api/testimonials/${row._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved: !row.approved }),
    })
    load()
  }

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const getImageUrl = (row: Testimonial) => {
    if (row.imageFileId) return `/api/files/${row.imageFileId}`
    return row.imageUrl || ''
  }

  const pending = data.filter(t => !t.approved).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Testimonials</h2>
          {pending > 0 && (
            <p className="text-yellow-600 text-sm mt-0.5 font-medium">⚠️ {pending} pending approval</p>
          )}
        </div>
        <button onClick={openCreate} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
          + Add Testimonial
        </button>
      </div>

      <div className="flex gap-2 mb-5">
        {(['all', 'pending', 'approved'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f} {f === 'pending' && pending > 0 ? `(${pending})` : ''}
          </button>
        ))}
      </div>

      <AdminTable
        data={filtered}
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'company', label: 'Company', render: row => <span className="text-blue-600">{row.title}, {row.company}</span> },
          { key: 'rating', label: 'Rating', render: row => <span className="text-yellow-500">{'★'.repeat(row.rating)}</span> },
          { key: 'comment', label: 'Comment', render: row => <span className="text-gray-500 line-clamp-2 max-w-xs">{row.comment}</span> },
          {
            key: 'approved', label: 'Status',
            render: row => (
              <button
                onClick={() => toggleApprove(row)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  row.approved
                    ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600'
                    : 'bg-yellow-100 text-yellow-700 hover:bg-green-100 hover:text-green-700'
                }`}
              >
                {row.approved ? '✓ Approved' : '⏳ Pending'}
              </button>
            ),
          },
        ]}
      />

      <Modal title={editing ? 'Edit Testimonial' : 'New Testimonial'} open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="space-y-4">
          <FormField label="Name" required><Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="John Smith" /></FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Title" required><Input value={form.title} onChange={e => set('title', e.target.value)} placeholder="CEO" /></FormField>
            <FormField label="Company" required><Input value={form.company} onChange={e => set('company', e.target.value)} placeholder="Acme Inc." /></FormField>
          </div>
          <FormField label="Comment" required><Textarea rows={3} value={form.comment} onChange={e => set('comment', e.target.value)} placeholder="Their feedback..." /></FormField>
          <FormField label="Photo (optional)">
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </FormField>
          {imagePreview && <img src={imagePreview} alt="preview" className="w-16 h-16 rounded-full object-cover border border-gray-200" />}
          <FormField label="Rating">
            <div className="flex gap-2 mt-1">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} type="button" onClick={() => set('rating', s)}
                  className={`text-2xl transition-colors ${s <= form.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</button>
              ))}
            </div>
          </FormField>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.approved} onChange={e => set('approved', e.target.checked)} className="w-4 h-4 accent-blue-600" />
            <span className="text-sm text-gray-700 font-medium">Approved (visible on site)</span>
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60">
              {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Testimonial'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
