import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import authConfig from "./auth.config";

const intlMiddleware = createMiddleware(routing);
const { auth } = NextAuth(authConfig);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const session = await auth();
    const isLogin = pathname === "/admin/login";

    if (isLogin) {
      if (session?.user?.email) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    if (!session?.user?.email) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
