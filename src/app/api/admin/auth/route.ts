import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { password } = await req.json()
  const validPassword = process.env.ADMIN_PASSWORD || 'sonicprime2025'
  const validToken = process.env.ADMIN_SECRET || 'sonicprime_admin_2025'

  if (password !== validPassword) {
    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 })
  }

  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_auth', validToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.delete('admin_auth')
  return res
}
