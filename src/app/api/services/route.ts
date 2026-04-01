import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Service } from '@/models'
import { uploadFileToGridFS, deleteFileFromGridFS } from '@/lib/upload'

export async function GET() {
  try {
    await connectDB()
    const services = await Service.find({}).sort({ order: 1 })
    return NextResponse.json({ success: true, data: services })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const contentType = req.headers.get('content-type') || ''
    let serviceData: any = {}

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      serviceData.title = formData.get('title') as string
      serviceData.description = formData.get('description') as string
      serviceData.order = Number(formData.get('order')) || 0
      const tagsRaw = formData.get('tags') as string
      serviceData.tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : []

      const file = formData.get('image') as File | null
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
        const fileId = await uploadFileToGridFS(buffer, filename, file.type) as any
        serviceData.imageFileId = fileId.toString()
      }
    } else {
      const body = await req.json()
      serviceData = body
    }

    const service = await Service.create(serviceData)
    return NextResponse.json({ success: true, data: service }, { status: 201 })
  } catch (error) {
    console.error('Service creation error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create service',
    }, { status: 500 })
  }
}
