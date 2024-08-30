import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routePaths } from './types/routes.enum';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const pathname = request.nextUrl.pathname;

  // Check if the user is trying to access an auth-related route
  const isAuthRoute = pathname.startsWith('/auth');

  // Bypass redirection in development mode
  // We can change this later, but the reason this is here is so we can visit other pages 
  // while developing the application without hooking up all the API responses to the backend.
  if (process.env.NODE_ENV !== 'development') {
    if (!token && !isAuthRoute) {
      const url = request.nextUrl.clone();
      url.pathname = routePaths.LOGIN;
      url.searchParams.set('navigateTo', encodeURIComponent(pathname));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|static|favicon.ico|images|css|js|fonts|media|assets).*)', // Adjust to match all your asset directories
  ],
};
