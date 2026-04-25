import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Example: Protect a route
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Example: Simple logging (Edge-safe)
  console.log('Request path:', pathname);

  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
