'use client'
import { useEffect, useState } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import Modal from '@/components/admin/Modal'
import { FormField, Input } from '@/components/admin/FormField'

interface TeamMember {
  _id: string
  name: string
  role: string
  imageUrl?: string
  imageFileId?: string
  linkedinUrl?: string
  twitterUrl?: string
  order: number
}

const empty = { name: '', role: '', imageUrl: '', linkedinUrl: '', twitterUrl: '', order: 0 }

export default function AdminTeam() {
  const [data, setData] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<TeamMember | null>(null)
  const [form, setForm] = useState(empty)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = () => { setLoading(true); fetch('/api/team').then(r => r.json()).then(d => { setData(d.data || []); setLoading(false) }) }
  useEffect(load, [])

  const openCreate = () => { setEditing(null); setForm(empty); setImageFile(null); setImagePreview(''); setError(''); setModalOpen(true) }
  const openEdit = (row: TeamMember) => { setEditing(row); setForm({ name: row.name, role: row.role, imageUrl: row.imageUrl || '', linkedinUrl: row.linkedinUrl || '', twitterUrl: row.twitterUrl || '', order: row.order }); setImageFile(null); setImagePreview(row.imageFileId ? `/api/files/${row.imageFileId}` : row.imageUrl || ''); setError(''); setModalOpen(true) }

  const handleSave = async () => {
    if (!form.name || !form.role || (!form.imageUrl && !imageFile && !editing?.imageFileId)) { setError('Name, role and image are required.'); return }
    setSaving(true); setError('')
    const url = editing ? `/api/team/${editing._id}` : '/api/team'
    const method = editing ? 'PUT' : 'POST'
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('role', form.role)
    if (form.linkedinUrl) formData.append('linkedinUrl', form.linkedinUrl)
    if (form.twitterUrl) formData.append('twitterUrl', form.twitterUrl)
    formData.append('order', String(form.order))
    if (form.imageUrl) formData.append('imageUrl', form.imageUrl)
    if (imageFile) formData.append('image', imageFile)

    const res = await fetch(url, { method, body: formData })
    const d = await res.json()
    setSaving(false)
    if (d.success) { setModalOpen(false); load() } else setError(d.error || 'Failed')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this team member?')) return
    await fetch(`/api/team/${id}`, { method: 'DELETE' })
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

  const getImageUrl = (row: TeamMember) => {
    if (row.imageFileId) return `/api/files/${row.imageFileId}`
    return row.imageUrl || ''
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Team Members</h2>
        <button onClick={openCreate} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
          + Add Member
        </button>
      </div>

      <AdminTable
        data={data}
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
        columns={[
          {
            key: 'image', label: 'Photo',
            render: row => (
              <img src={getImageUrl(row)} alt={row.name} className="w-10 h-10 rounded-full object-cover object-top border-2 border-gray-100" />
            ),
          },
          { key: 'name', label: 'Name' },
          { key: 'role', label: 'Role', render: row => <span className="text-blue-600 font-medium">{row.role}</span> },
          { key: 'order', label: 'Order' },
        ]}
      />

      <Modal title={editing ? 'Edit Team Member' : 'New Team Member'} open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="space-y-4">
          <FormField label="Full Name" required><Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="John Doe" /></FormField>
          <FormField label="Role / Title" required><Input value={form.role} onChange={e => set('role', e.target.value)} placeholder="CEO & Founder" /></FormField>
          <FormField label="Photo" required hint="Upload a photo file">
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </FormField>
          {imagePreview && <img src={imagePreview} alt="preview" className="w-20 h-20 rounded-full object-cover border border-gray-200" />}
          <FormField label="LinkedIn URL"><Input value={form.linkedinUrl} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/..." /></FormField>
          <FormField label="Twitter / X URL"><Input value={form.twitterUrl} onChange={e => set('twitterUrl', e.target.value)} placeholder="https://x.com/..." /></FormField>
          <FormField label="Display Order"><Input type="number" value={form.order} onChange={e => set('order', Number(e.target.value))} /></FormField>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60">
              {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
