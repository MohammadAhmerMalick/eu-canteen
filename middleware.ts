import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'

const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  })

  if (token)
    switch (token.role) {
      case 'student': // student login
        // secure admin path from students
        if (req.nextUrl.pathname.startsWith('/admin'))
          return NextResponse.rewrite(new URL('/404', req.url))
        break

      case 'admin': // admin login
        // restrict student path from admin
        if (req.nextUrl.pathname.startsWith('/student'))
          return NextResponse.rewrite(new URL('/404', req.url))
        break

      default:
        return NextResponse.redirect(new URL('/', req.url))
    }
  // when user is not logged in
  else if (req.nextUrl.pathname.startsWith('/student || /admin'))
    return NextResponse.rewrite(new URL('/404', req.url))

  return NextResponse.next()
}

const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
}

export { middleware, config }
