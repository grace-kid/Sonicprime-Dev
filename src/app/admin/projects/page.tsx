'use client'
import { useEffect, useState } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import Modal from '@/components/admin/Modal'
import { FormField, Input, Textarea } from '@/components/admin/FormField'

interface Project {
  _id: string
  title: string
  category: string
  description: string
  imageUrl?: string
  imageFileId?: string
  liveUrl?: string
  featured: boolean
}

const empty: Omit<Project, '_id'> = { title: '', category: '', description: '', imageUrl: '', liveUrl: '', featured: false }

export default function AdminProjects() {
  const [data, setData] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState<Omit<Project, '_id'>>(empty)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    fetch('/api/projects').then(r => r.json()).then(d => { setData(d.data || []); setLoading(false) })
  }
  useEffect(load, [])

  const openCreate = () => { setEditing(null); setForm(empty); setImageFile(null); setImagePreview(''); setError(''); setModalOpen(true) }
  const openEdit = (row: Project) => { setEditing(row); setForm({ title: row.title, category: row.category, description: row.description, imageUrl: row.imageUrl || '', liveUrl: row.liveUrl || '', featured: row.featured }); setImageFile(null); setImagePreview(row.imageFileId ? `/api/files/${row.imageFileId}` : row.imageUrl || ''); setError(''); setModalOpen(true) }

  const handleSave = async () => {
    if (!form.title || !form.category || !form.description || (!form.imageUrl && !imageFile && !editing?.imageFileId)) { setError('Title, category, description and image are required.'); return }
    setSaving(true); setError('')
    
    const url = editing ? `/api/projects/${editing._id}` : '/api/projects'
    const method = editing ? 'PUT' : 'POST'
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('category', form.category)
    formData.append('description', form.description)
    if (form.liveUrl) formData.append('liveUrl', form.liveUrl)
    formData.append('featured', String(form.featured))
    if (form.imageUrl) formData.append('imageUrl', form.imageUrl)
    if (imageFile) formData.append('image', imageFile)

    const res = await fetch(url, { method, body: formData })
    const d = await res.json()
    setSaving(false)
    if (d.success) { setModalOpen(false); load() } else setError(d.error || 'Failed')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await fetch(`/api/projects/${id}`, { method: 'DELETE' })
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

  const getImageUrl = (row: Project) => {
    if (row.imageFileId) return `/api/files/${row.imageFileId}`
    return row.imageUrl || ''
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Projects</h2>
        <button onClick={openCreate} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
          + Add Project
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
          { key: 'category', label: 'Category', render: row => <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{row.category}</span> },
          { key: 'featured', label: 'Featured', render: row => row.featured ? <span className="text-green-600 font-semibold">✓ Yes</span> : <span className="text-gray-400">No</span> },
        ]}
      />

      <Modal title={editing ? 'Edit Project' : 'New Project'} open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="space-y-4">
          <FormField label="Title" required><Input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Project title" /></FormField>
          <FormField label="Category" required><Input value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. e-commerce, saas" /></FormField>
          <FormField label="Description" required><Textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Project description..." /></FormField>
          <FormField label="Image" required hint="Upload an image file">
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </FormField>
          {imagePreview && <img src={imagePreview} alt="preview" className="w-32 h-24 object-cover rounded-lg border border-gray-200" />}
          <FormField label="Live URL"><Input value={form.liveUrl} onChange={e => set('liveUrl', e.target.value)} placeholder="https://..." /></FormField>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="w-4 h-4 accent-blue-600" />
            <span className="text-sm text-gray-700 font-medium">Mark as featured</span>
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60">
              {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
