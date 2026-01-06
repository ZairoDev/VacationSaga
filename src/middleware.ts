import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/" ||
    path.startsWith("/listing-stay") ||
    path.startsWith("/listing-experiences") ||
    path.startsWith("/listing-car") ||
    path.startsWith("/listing-flights") ||
    path.startsWith("/listing-real-estate") ||
    path.startsWith("/listing-stay-detail") ||
    path.startsWith("/listing-experiences-detail") ||
    path.startsWith("/listing-car-detail") ||
    path.startsWith("/allproperties") ||
    path.startsWith("/allgreeceproperties") ||
    path.startsWith("/blog") ||
    path.startsWith("/about") ||
    path.startsWith("/contact") ||
    path.startsWith("/traveller-help") ||
    path.startsWith("/owners-help") ||
    path.startsWith("/termsandconditions") ||
    path.startsWith("/privacy-policy");

  // Protected paths that require authentication (only booking/payment related)
  const isProtectedPath =
    path.startsWith("/checkout") ||
    path.startsWith("/payment") ||
    path.startsWith("/bookings") ||
    path.startsWith("/profile") ||
    path.startsWith("/account") ||
    path.startsWith("/editproperty") ||
    path.startsWith("/add-listing") ||
    path.startsWith("/author");

  const token = request.cookies.get("token")?.value || "";

  // Always allow access to public paths
  if (isPublicPath) {
    // If user is logged in and tries to access login/signup, redirect to home
    if ((path === "/login" || path === "/signup") && token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Protect booking/payment/profile routes - require login
  if (isProtectedPath && !token) {
    // Store the intended destination to redirect after login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Middleware will run on these routes
// Using proper Next.js matcher patterns
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};










