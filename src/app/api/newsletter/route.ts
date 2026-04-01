import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Newsletter } from '@/models'

export async function GET() {
  try {
    await connectDB()
    const subscribers = await Newsletter.find({}).sort({ subscribedAt: -1 })
    return NextResponse.json({ success: true, data: subscribers })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch subscribers' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const { email } = await req.json()
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 })
    }
    const existing = await Newsletter.findOne({ email })
    if (existing) {
      return NextResponse.json({ success: false, error: 'Already subscribed!' }, { status: 400 })
    }
    await Newsletter.create({ email })
    return NextResponse.json({ success: true, message: 'Subscribed successfully!' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to subscribe' }, { status: 500 })
  }
}
