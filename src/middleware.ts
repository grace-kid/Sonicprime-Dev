import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    const auth = request.cookies.get('admin_auth')?.value
    const validToken = process.env.ADMIN_SECRET || 'sonicprime_admin_2025'

    if (auth !== validToken) {
      const loginUrl = new URL('/admin/login', request.url)
      // Don't redirect the login page itself
      if (pathname === '/admin/login') return NextResponse.next()
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
