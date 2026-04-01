import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Service } from '@/models'
import { uploadFileToGridFS, deleteFileFromGridFS } from '@/lib/upload'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const service = await Service.findById(params.id)
    if (!service) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: service })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch service' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const contentType = req.headers.get('content-type') || ''
    let updateData: any = {}

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      updateData.title = formData.get('title') as string
      updateData.description = formData.get('description') as string
      updateData.order = Number(formData.get('order')) || 0
      const tagsRaw = formData.get('tags') as string
      updateData.tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : []
      updateData.imageUrl = formData.get('imageUrl') as string || undefined

      const file = formData.get('image') as File | null
      if (file) {
        const service = await Service.findById(params.id)
        if (service?.imageFileId) {
          await deleteFileFromGridFS(service.imageFileId)
        }
        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
        const fileId = await uploadFileToGridFS(buffer, filename, file.type) as any
        updateData.imageFileId = fileId.toString()
      }
    } else {
      const body = await req.json()
      updateData = body
    }

    const service = await Service.findByIdAndUpdate(params.id, updateData, { new: true, runValidators: true })
    if (!service) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: service })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const service = await Service.findById(params.id)
    if (service?.imageFileId) {
      await deleteFileFromGridFS(service.imageFileId)
    }
    const deleted = await Service.findByIdAndDelete(params.id)
    if (!deleted) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, message: 'Service deleted' })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete service' }, { status: 500 })
  }
}
