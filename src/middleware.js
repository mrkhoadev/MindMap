import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { isNanoID } from "./helpers/regex";

export default async function middleware(request) {
  const { pathname } = request.nextUrl;
  const jwt = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: process.env.NEXT_PUBLIC_SESSION,
  });
  if (pathname.startsWith(`/login`) || pathname.startsWith(`/register`)) {
    if (jwt) {
      return NextResponse.redirect(new URL(`/`, request.url));
    }
  };
  if (pathname.startsWith(`/mindmap`)) {
    if (pathname.split("/")[2] && isNanoID(pathname.split("/")[2])) {
      return NextResponse.next();
    } else if (!jwt) {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
    return NextResponse.next();
  }
}
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};