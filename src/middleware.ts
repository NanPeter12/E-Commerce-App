import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (token) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/cart:path*", "/orders", "/whichlist"],
};
