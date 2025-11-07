import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Allow access to /admin and /admin/setup without authentication
  if (pathname === '/admin' || pathname === '/admin/setup') {
    return NextResponse.next()
  }
  
  // Protect /admin/dashboard route
  if (pathname.startsWith('/admin/dashboard')) {
    const adminSession = request.cookies.get('admin_session')
    
    if (!adminSession || adminSession.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}

