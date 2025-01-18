import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import getSessionData from "./lib/iron-session";

export default async function middlware(req: NextRequest) {
  const session = await getSessionData();
  if (["/signin", "/signup"].includes(req.nextUrl.pathname)) {
    if (session.userId) return NextResponse.redirect(new URL("/", req.url));
    else return NextResponse.next();
  }
  if (!session.userId)
    return NextResponse.redirect(new URL("/signin", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!public|_next).*)"],
};
