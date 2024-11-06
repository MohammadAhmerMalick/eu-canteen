import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const token = request.cookies.get('token')
  if (!token?.value) return NextResponse.redirect(new URL('/', request.url))

  return response
}

export const config = {
  matcher: '/admin/:path*',
}
