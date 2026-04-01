import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Contact } from '@/models'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const msg = await Contact.findById(params.id)
    if (!msg) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: msg })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch message' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await req.json()
    const msg = await Contact.findByIdAndUpdate(params.id, body, { new: true })
    if (!msg) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: msg })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update message' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const msg = await Contact.findByIdAndDelete(params.id)
    if (!msg) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, message: 'Message deleted' })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete message' }, { status: 500 })
  }
}
