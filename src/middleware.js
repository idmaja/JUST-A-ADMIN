import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // console.log("Middleware running on path:", pathname);

  // Ignore static files, Next.js chunks, and API requests
  if (
    pathname.startsWith("/_next/") || // Next.js internal chunks
    pathname.startsWith("/static/") || // Static assets folder
    pathname.startsWith("/public/") || // Public folder
    pathname.endsWith(".svg") || // Exclude SVG files
    pathname.endsWith(".png") || // Exclude PNG files
    pathname.endsWith(".jpg") || // Exclude JPG files
    pathname.endsWith(".jpeg") || // Exclude JPEG files
    pathname.endsWith(".css") || // Exclude CSS files
    pathname.endsWith(".js") // Exclude JS files
  ) {
    return NextResponse.next();
  }

  // Allow access to login page and authentication API routes
  if (pathname.startsWith("/auth/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Allow access to API
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Allow access to signout API
  if (pathname === "/api/auth/signout") {
    return NextResponse.next();
  }

  // If user is not authenticated and accessing a protected route, redirect to login
  if (!token) {
    console.log("User is not authenticated, redirecting to login. Current path:", pathname);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
