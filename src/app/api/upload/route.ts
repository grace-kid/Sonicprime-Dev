import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { uploadFileToGridFS } from '@/lib/upload'

export async function POST(req: Request) {
  try {
    await connectDB()
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const mimeType = file.type

    const fileId = await uploadFileToGridFS(buffer, filename, mimeType) as any

    return NextResponse.json({
      success: true,
      data: { fileId: fileId.toString(), filename, mimeType },
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload file',
    }, { status: 500 })
  }
}
