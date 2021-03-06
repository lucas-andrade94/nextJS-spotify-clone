import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie:
      process.env.NEXTAUTH_URL?.startsWith("https://") ??
      !!process.env.VERCEL_URL,
  });
  const { pathname } = req.nextUrl;

  // Allow the request if the following is true
  // 1) Its a request for next-auth session & provider fetching
  // 2) The token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect them to login if they don't have token AND are requesting a protected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
