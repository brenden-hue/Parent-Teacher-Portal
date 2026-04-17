import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPrefixes = ["/dashboard", "/children", "/families", "/attendance", "/classrooms", "/billing", "/messages", "/staff", "/reports", "/settings", "/portal"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isProtected) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get("sb-access-token")?.value);

  if (hasSession) {
    return NextResponse.next();
  }

  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("redirectTo", pathname);

  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/children/:path*", "/families/:path*", "/attendance/:path*", "/classrooms/:path*", "/billing/:path*", "/messages/:path*", "/staff/:path*", "/reports/:path*", "/settings/:path*", "/portal/:path*"]
};
