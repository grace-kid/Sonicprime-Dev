'use client'
import { useEffect, useState } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import Modal from '@/components/admin/Modal'
import { FormField, Input, Textarea } from '@/components/admin/FormField'

interface Service {
  _id: string
  title: string
  description: string
  tags: string[]
  imageUrl?: string
  imageFileId?: string
  order: number
}

const empty = { title: '', description: '', tags: [] as string[], imageUrl: '', order: 0 }

export default function AdminServices() {
  const [data, setData] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState(empty)
  const [tagsInput, setTagsInput] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = () => { setLoading(true); fetch('/api/services').then(r => r.json()).then(d => { setData(d.data || []); setLoading(false) }) }
  useEffect(load, [])

  const openCreate = () => { setEditing(null); setForm(empty); setTagsInput(''); setImageFile(null); setImagePreview(''); setError(''); setModalOpen(true) }
  const openEdit = (row: Service) => { setEditing(row); setForm({ title: row.title, description: row.description, tags: row.tags, imageUrl: row.imageUrl || '', order: row.order }); setTagsInput(row.tags.join(', ')); setImageFile(null); setImagePreview(row.imageFileId ? `/api/files/${row.imageFileId}` : row.imageUrl || ''); setError(''); setModalOpen(true) }

  const handleSave = async () => {
    if (!form.title || !form.description || (!form.imageUrl && !imageFile && !editing?.imageFileId)) { setError('Title, description and image are required.'); return }
    setSaving(true); setError('')
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    const url = editing ? `/api/services/${editing._id}` : '/api/services'
    const method = editing ? 'PUT' : 'POST'
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('description', form.description)
    formData.append('tags', tags.join(','))
    formData.append('order', String(form.order))
    if (form.imageUrl) formData.append('imageUrl', form.imageUrl)
    if (imageFile) formData.append('image', imageFile)

    const res = await fetch(url, { method, body: formData })
    const d = await res.json()
    setSaving(false)
    if (d.success) { setModalOpen(false); load() } else setError(d.error || 'Failed')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return
    await fetch(`/api/services/${id}`, { method: 'DELETE' })
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

  const getImageUrl = (row: Service) => {
    if (row.imageFileId) return `/api/files/${row.imageFileId}`
    return row.imageUrl || ''
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Services</h2>
        <button onClick={openCreate} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
          + Add Service
        </button>
      </div>

      <AdminTable
        data={data}
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
        columns={[
          {
            key: 'image', label: 'Image',
            render: row => <img src={getImageUrl(row)} alt={row.title} className="w-14 h-10 object-cover rounded-lg" />,
          },
          { key: 'title', label: 'Title' },
          { key: 'description', label: 'Description', render: row => <span className="line-clamp-2 text-gray-500">{row.description}</span> },
          { key: 'tags', label: 'Tags', render: row => <div className="flex flex-wrap gap-1">{row.tags.slice(0, 3).map(t => <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{t}</span>)}</div> },
          { key: 'order', label: 'Order' },
        ]}
      />

      <Modal title={editing ? 'Edit Service' : 'New Service'} open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="space-y-4">
          <FormField label="Title" required><Input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Service title" /></FormField>
          <FormField label="Description" required><Textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Service description..." /></FormField>
          <FormField label="Image" required hint="Upload a service image">
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </FormField>
          {imagePreview && <img src={imagePreview} alt="preview" className="w-32 h-24 object-cover rounded-lg border border-gray-200" />}
          <FormField label="Tags" hint="Comma-separated: Node.js, React, Python">
            <Input value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="Node.js, React, JavaScript" />
          </FormField>
          <FormField label="Display Order"><Input type="number" value={form.order} onChange={e => set('order', Number(e.target.value))} /></FormField>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60">
              {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Service'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
