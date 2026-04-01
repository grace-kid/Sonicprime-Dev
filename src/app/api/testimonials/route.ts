import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Testimonial } from '@/models'
import { uploadFileToGridFS, deleteFileFromGridFS } from '@/lib/upload'

export async function GET(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const all = searchParams.get('all') === 'true'
    const query = all ? {} : { approved: true }
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: testimonials })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const contentType = req.headers.get('content-type') || ''
    let testimonialData: any = {}

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      testimonialData.name = formData.get('name') as string
      testimonialData.title = formData.get('title') as string
      testimonialData.company = formData.get('company') as string
      testimonialData.comment = formData.get('comment') as string
      testimonialData.rating = Number(formData.get('rating'))
      testimonialData.approved = false

      const file = formData.get('image') as File | null
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
        const fileId = await uploadFileToGridFS(buffer, filename, file.type) as any
        testimonialData.imageFileId = fileId.toString()
      }
    } else {
      const body = await req.json()
      testimonialData = body
    }

    const { name, title, company, comment, rating } = testimonialData
    if (!name || !title || !company || !comment || !rating) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 })
    }

    const testimonial = await Testimonial.create({ ...testimonialData, approved: false })
    return NextResponse.json({ success: true, data: testimonial, message: 'Review submitted for approval' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to submit review' }, { status: 500 })
  }
}
