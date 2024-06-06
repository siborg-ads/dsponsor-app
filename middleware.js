import {NextResponse} from "next/server";

export function middleware(request) {
  const url = new URL(request.nextUrl);
  const ref = url.searchParams.get("ref");

  if (ref) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    const response = NextResponse.next();
    response.cookies.set("_rid", ref, {
      expires
    });
    return response;
  }

  return NextResponse.next();
}
