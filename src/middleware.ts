import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("adminSession")?.value;

  if (!currentUser && request.nextUrl.pathname.startsWith("/admin")) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
