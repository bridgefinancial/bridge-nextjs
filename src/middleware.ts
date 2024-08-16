import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const pathname = request.nextUrl.pathname;

  // Check if the user is trying to access an auth-related route
  const isAuthRoute = pathname.startsWith('/auth');

  if (!token && !isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('navigateTo', encodeURIComponent(pathname));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'], // Adjust this to match your protected routes
};
