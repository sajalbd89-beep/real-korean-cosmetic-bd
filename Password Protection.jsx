// middleware.js (Next.js)
import { NextResponse } from "next/server";

export function middleware(req) {
  const isLoggedIn = req.cookies.get("admin-auth");

  if (!isLoggedIn && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}
