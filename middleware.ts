import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('Authorization')
  
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
} 