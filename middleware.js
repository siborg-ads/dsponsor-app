import { NextResponse } from "next/server";

export function middleware(request) {
  const url = new URL(request.nextUrl);
  const _rid = url.searchParams.get("_rid");

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
