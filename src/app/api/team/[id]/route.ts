import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { TeamMember } from '@/models'
import { uploadFileToGridFS, deleteFileFromGridFS } from '@/lib/upload'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const member = await TeamMember.findById(params.id)
    if (!member) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: member })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch member' }, { status: 500 })
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
      updateData.role = formData.get('role') as string
      updateData.linkedinUrl = formData.get('linkedinUrl') as string || undefined
      updateData.twitterUrl = formData.get('twitterUrl') as string || undefined
      updateData.order = Number(formData.get('order')) || 0
      updateData.imageUrl = formData.get('imageUrl') as string || undefined

      const file = formData.get('image') as File | null
      if (file) {
        const member = await TeamMember.findById(params.id)
        if (member?.imageFileId) {
          await deleteFileFromGridFS(member.imageFileId)
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

    const member = await TeamMember.findByIdAndUpdate(params.id, updateData, { new: true, runValidators: true })
    if (!member) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: member })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update member' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const member = await TeamMember.findById(params.id)
    if (member?.imageFileId) {
      await deleteFileFromGridFS(member.imageFileId)
    }
    const deleted = await TeamMember.findByIdAndDelete(params.id)
    if (!deleted) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, message: 'Team member deleted' })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete member' }, { status: 500 })
  }
}
