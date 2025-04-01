import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Redirect to login if not authenticated
  if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Redirect to appropriate dashboard if authenticated
  if (token) {
    if (pathname === '/auth/login' || pathname === '/auth/register') {
      return NextResponse.redirect(new URL(token.role === 'STUDENT' ? '/dashboard' : '/admin', request.url));
    }

    // Prevent students from accessing instructor routes and vice versa
    if (
      (token.role === 'STUDENT' && pathname.startsWith('/admin')) ||
      (token.role === 'INSTRUCTOR' && pathname.startsWith('/dashboard'))
    ) {
      return NextResponse.redirect(new URL(token.role === 'STUDENT' ? '/dashboard' : '/admin', request.url));
    }
  }

  return NextResponse.next();
}