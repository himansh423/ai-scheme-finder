import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  if (
    token &&
    (pathname.startsWith("/auth/login") ||
      pathname.startsWith("/auth/register") ||
      pathname.startsWith("/auth/verify-otp"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/recommendations",
    "/auth/:path*",
    "/compare",
    "/saved-schemes",
  ],
};
