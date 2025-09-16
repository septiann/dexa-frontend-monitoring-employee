import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null;

  const { pathname } = req.nextUrl;

  // Daftar halaman yang butuh login
  const protectedRoutes = ["/dashboard", "/employee", "/profile", "/submit-attendance", "history-attendance"];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      // kalau belum login → redirect ke login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Kalau sudah login dan akses /login atau /register → redirect ke dashboard
  if (["/login", "/register"].includes(pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/employee/:path*", "/login", "/register"],
};
