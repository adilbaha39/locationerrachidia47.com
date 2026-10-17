import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, isValidLocale } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and Next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // files like favicon.ico, images
  ) {
    return;
  }

  const segment = pathname.split("/")[1];
  if (isValidLocale(segment)) {
    return;
  }

  // Redirect root and non-locale paths to default locale
  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
