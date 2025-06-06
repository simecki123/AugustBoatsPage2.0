import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./routing";

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files
  if (pathname.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
    return NextResponse.next();
  }

  // Handle locale and all other routes using intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - _next (Next.js internals)
    // - Static files (handled above in middleware function)
    "/((?!api|_next|.*\\..*).*)",
  ],
};
