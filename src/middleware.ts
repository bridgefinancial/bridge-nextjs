import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routePaths } from './types/routes.enum';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const pathname = request.nextUrl.pathname;

  // Check if the user is trying to access an auth-related route
  const isAuthRoute = pathname.startsWith('/auth');

  // TODO: Must add login functionality before uncommenting this, or else no other routes will work!
  // if (!token && !isAuthRoute) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = routePaths.LOGIN
  //   url.searchParams.set('navigateTo', encodeURIComponent(pathname));
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|static|favicon.ico|images|css|js|fonts|media|assets).*)', // Adjust to match all your asset directories
  ],
};
