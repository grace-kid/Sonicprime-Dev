import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Testimonial } from '@/models'
import { uploadFileToGridFS, deleteFileFromGridFS } from '@/lib/upload'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const t = await Testimonial.findById(params.id)
    if (!t) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: t })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonial' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const contentType = req.headers.get('content-type') || ''
    let updateData: any = {}

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      updateData.name = formData.get('name') as string
      updateData.title = formData.get('title') as string
      updateData.company = formData.get('company') as string
      updateData.comment = formData.get('comment') as string
      updateData.rating = Number(formData.get('rating'))
      updateData.approved = formData.get('approved') === 'true'
      updateData.imageUrl = formData.get('imageUrl') as string || undefined

      const file = formData.get('image') as File | null
      if (file) {
        const t = await Testimonial.findById(params.id)
        if (t?.imageFileId) {
          await deleteFileFromGridFS(t.imageFileId)
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

    const t = await Testimonial.findByIdAndUpdate(params.id, updateData, { new: true, runValidators: true })
    if (!t) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: t })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update testimonial' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const t = await Testimonial.findById(params.id)
    if (t?.imageFileId) {
      await deleteFileFromGridFS(t.imageFileId)
    }
    const deleted = await Testimonial.findByIdAndDelete(params.id)
    if (!deleted) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, message: 'Testimonial deleted' })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete testimonial' }, { status: 500 })
  }
}
