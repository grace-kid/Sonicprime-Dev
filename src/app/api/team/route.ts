import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { TeamMember } from '@/models'
import { uploadFileToGridFS, deleteFileFromGridFS } from '@/lib/upload'

export async function GET() {
  try {
    await connectDB()
    const team = await TeamMember.find({}).sort({ order: 1 })
    return NextResponse.json({ success: true, data: team })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch team' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const contentType = req.headers.get('content-type') || ''
    let memberData: any = {}

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      memberData.name = formData.get('name') as string
      memberData.role = formData.get('role') as string
      memberData.linkedinUrl = formData.get('linkedinUrl') as string || undefined
      memberData.twitterUrl = formData.get('twitterUrl') as string || undefined
      memberData.order = Number(formData.get('order')) || 0

      const file = formData.get('image') as File | null
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
        const fileId = await uploadFileToGridFS(buffer, filename, file.type) as any
        memberData.imageFileId = fileId.toString()
      }
    } else {
      const body = await req.json()
      memberData = body
    }

    const member = await TeamMember.create(memberData)
    return NextResponse.json({ success: true, data: member }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create team member' }, { status: 500 })
  }
}
