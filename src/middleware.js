import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;




  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.startsWith("/public/") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js")
  ) {
    return NextResponse.next();
  }


  if (pathname.startsWith("/auth/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }


  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }


  if (pathname === "/api/auth/signout") {
    return NextResponse.next();
  }


  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
