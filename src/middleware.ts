import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('hris_session')?.value
  const { pathname } = request.nextUrl

  // Define protected paths
  const isProtectedPath =
    pathname === '/' ||
    pathname.startsWith('/people') ||
    pathname.startsWith('/talent') ||
    pathname.startsWith('/workforce') ||
    pathname.startsWith('/compensation') ||
    pathname.startsWith('/analytics') ||
    pathname.startsWith('/administration') ||
    pathname.startsWith('/identity')

  const isLoginPage = pathname.startsWith('/login')

  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo-indocater.jpg|.*\\.jpg|.*\\.png|.*\\.svg).*)',
  ],
}
