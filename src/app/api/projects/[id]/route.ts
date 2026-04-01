import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Project } from '@/models'
import { uploadFileToGridFS, deleteFileFromGridFS } from '@/lib/upload'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const project = await Project.findById(params.id)
    if (!project) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: project })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch project' }, { status: 500 })
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
      updateData.category = formData.get('category') as string
      updateData.description = formData.get('description') as string
      updateData.liveUrl = formData.get('liveUrl') as string || undefined
      updateData.featured = formData.get('featured') === 'true'
      updateData.imageUrl = formData.get('imageUrl') as string || undefined

      const file = formData.get('image') as File | null
      if (file) {
        const project = await Project.findById(params.id)
        if (project?.imageFileId) {
          await deleteFileFromGridFS(project.imageFileId)
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

    const project = await Project.findByIdAndUpdate(params.id, updateData, { new: true, runValidators: true })
    if (!project) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: project })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const project = await Project.findById(params.id)
    if (project?.imageFileId) {
      await deleteFileFromGridFS(project.imageFileId)
    }
    const deleted = await Project.findByIdAndDelete(params.id)
    if (!deleted) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, message: 'Project deleted' })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 500 })
  }
}
