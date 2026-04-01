import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Contact } from '@/models'

export async function GET() {
  try {
    await connectDB()
    const messages = await Contact.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: messages })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    const { name, email, subject, message } = body
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 })
    }
    const contact = await Contact.create(body)
    return NextResponse.json({ success: true, data: contact, message: 'Message sent successfully!' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 })
  }
}
