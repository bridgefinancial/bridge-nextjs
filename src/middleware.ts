import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routePaths } from "./types/routes.enum";
import { User } from "./types/users.types";
import { fetchWithAuth } from "./services/authorized-request.service";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  let session: User | undefined;
  try {
    const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
    const url = `${baseUrl}/api/session/`;

    const response = await fetchWithAuth(
      url,
      {
        method: "GET",
        headers: {
          Cookie: cookies().toString(),
        },
      },
      cookies().toString()
    );
    if (!response.ok) {
      response.text().then((text) => {
        throw new Error(`Error: ${text}, Status: ${response.status}`);
      });
    }
    session = (await response.json()) as User;
  } catch (error) {
    console.log(error);
    session = undefined;
  }
  const pathname = request.nextUrl.pathname;

  // Check if the user is trying to access an auth-related route
  const isAuthRoute = pathname.startsWith("/auth");

  if (!session && !isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = routePaths.LOGIN;
    url.searchParams.set("navigateTo", encodeURIComponent(pathname));
    return NextResponse.redirect(url);
  }

  if (!!session && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = routePaths.DASHBOARD;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico|images|css|js|fonts|media|assets).*)", // Adjust to match all your asset directories
  ],
};
