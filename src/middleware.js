import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow access to the login page and authentication API routes
  if (pathname.startsWith("/auth/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Allow access to the signout API
  if (pathname === "/api/auth/signout") {
    return NextResponse.next();
  }

//   // If the user is not authenticated and trying to access a protected route
//   if (!token) {
//     console.log("User is not authenticated, redirecting to login");
    
//     // Using URL constructor properly
//     const loginUrl = req.nextUrl.clone();
//     loginUrl.pathname = '/auth/login';
    
//     return NextResponse.redirect(loginUrl);
//   }

  // If the user is authenticated, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/:path*'], // Adjust based on your routes
};




// import { NextResponse } from 'next/server';
// import { getToken } from "next-auth/jwt";

// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   const { pathname } = req.nextUrl;

//   // Allow access to the login page and authentication API
//   if (pathname.startsWith("/auth/login") || pathname.startsWith("/api/auth")) {
//     return NextResponse.next();
//   }

//   // Allow access to the signout API
//   if (pathname === "/api/auth/signout") {
//     return NextResponse.next();
//   }

//   // Redirect if the user is not authenticated
//   if (!token) {
//     return NextResponse.redirect(new URL('/auth/login', req.url));
//   }

//   return NextResponse.next(); // Allow the request to proceed if authenticated
// }

// export const config = {
//   matcher: ['/', '/:path*'], // Adjust based on your routes
// };

// export { default } from "next-auth/middleware"

// export const config = { matcher : ["/, /:path*"] }