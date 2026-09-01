import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing, type Locale } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const segment = pathname.split("/")[1] as Locale | undefined;
  const locale: string = routing.locales.includes(segment as Locale)
    ? segment!
    : routing.defaultLocale;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-locale", locale);

  const response = intlMiddleware(req);
  if (response instanceof NextResponse && (response.status === 307 || response.status === 308)) {
    return response;
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
    headers: response.headers
  });
}

export const config = {
  matcher: [
    // Skip API, admin, static files, and Next internals.
    "/((?!api|admin|_next|_vercel|.*\\..*).*)"
  ]
};
