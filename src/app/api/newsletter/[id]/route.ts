import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Newsletter } from '@/models'

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const sub = await Newsletter.findByIdAndDelete(params.id)
    if (!sub) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, message: 'Subscriber removed' })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete subscriber' }, { status: 500 })
  }
}
