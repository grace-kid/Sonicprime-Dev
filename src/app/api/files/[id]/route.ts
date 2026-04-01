import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { getFileFromGridFS } from '@/lib/upload'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const { buffer, metadata } = await getFileFromGridFS(params.id)
    const mimeType = metadata?.mimeType || 'application/octet-stream'
    return new NextResponse(buffer as unknown as ReadableStream, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return NextResponse.json({ success: false, error: 'File not found' }, { status: 404 })
  }
}
