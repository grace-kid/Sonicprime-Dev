import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Project } from '@/models'
import { uploadFileToGridFS, deleteFileFromGridFS } from '@/lib/upload'

export async function GET() {
  try {
    await connectDB()
    const projects = await Project.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: projects })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const contentType = req.headers.get('content-type') || ''
    let projectData: any = {}

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      projectData.title = formData.get('title') as string
      projectData.category = formData.get('category') as string
      projectData.description = formData.get('description') as string
      projectData.liveUrl = formData.get('liveUrl') as string || undefined
      projectData.featured = formData.get('featured') === 'true'

      const file = formData.get('image') as File | null
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
        const fileId = await uploadFileToGridFS(buffer, filename, file.type) as any
        projectData.imageFileId = fileId.toString()
        console.log(`✓ Uploaded image for project "${projectData.title}" with fileId: ${projectData.imageFileId}`)
      }
    } else {
      const body = await req.json()
      projectData = body
    }

    const project = await Project.create(projectData)
    console.log(project);
    return NextResponse.json({ success: true, data: project }, { status: 201 })
  } catch (error) {
    console.error('Project creation error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create project',
    }, { status: 500 })
  }
}
