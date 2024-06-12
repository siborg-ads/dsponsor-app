import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Middleware request:", request);
  const url = new URL(request.nextUrl);
  const _rid = url.searchParams.get("_rid");
  console.log("Middleware _rid:", _rid);
  console.log("URL:", url.href);

  if (_rid) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    const response = NextResponse.next();
    response.cookies.set("_rid", _rid, {
      expires
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // All pages
  // Matcher ignoring `/_next/`, `/api/` '/images' and '/public' subpaths
  matcher: [
    "/((?!_next/static|_next/image|robots.txt|public|images|manifest.json|sw.js|favicon.ico|workbox-*).*)",
    "/"
  ]
};
