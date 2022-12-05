import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header (can add in cors stuff for casino games here)
  if (request.nextUrl.pathname.startsWith('/api')) {
      if (!request.nextUrl.pathname.startsWith('/api/auth')) {
        const jwtFromCookie = request.cookies.get('token')?.value
        const requestHeaders = new Headers(request.headers)
        var bearer = 'Bearer ' + jwtFromCookie;
        requestHeaders.set('Authorization', bearer);
        const response = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        })
        return response
    }
  }

  if (!request.nextUrl.pathname.startsWith('/auth') && !request.nextUrl.pathname.startsWith('/api')) {
    if (!request.nextUrl.pathname.startsWith('/_next')) {
      if(!request.cookies.has('token')) {
        return NextResponse.redirect(new URL('/auth', request.url))
      }
    }
  }
}
