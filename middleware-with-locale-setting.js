import { NextResponse } from "next/server";
import { i18n } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";

const publicRoutes = ["/"];
const baseProtectedRoutes = ["/admin/dashboard", "/admin/dashboard/contactDetails"
  , "/admin/dashboard/representation"
  , "/admin/dashboard/mandate"
  , "/admin/dashboard/reservation"
  , "/admin/dashboard/time-slotsyy"


];

function getLocale(request) {
  // Transform headers for Negotiator
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales;

  // Use Negotiator and intl-localematcher to get the best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );
  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Extract locale from pathname if present
  // Extract locale from pathname if present
  const localeMatch = pathname.match(/^\/([a-zA-Z-]+)(\/|$)/);
  const currentLocale = localeMatch ? localeMatch[1] : i18n.defaultLocale;

  // Reconstruct protected routes with locale prefix
  const protectedRoutes = baseProtectedRoutes.map(
    (route) => `/${currentLocale}${route}`
  );

  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  // Handle session cookie and user authentication
  // const cookie = await cookies().get("session")?.value;
  // const session = await decrypt(cookie);
  // Check if the session exists
  const cookieStore = await cookies();
  const temp = cookieStore.get("session");
  const session = await decrypt(temp?.value);
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/admin`, request.nextUrl)
    );
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(
      new URL(`/en/admin/dashboard`, request.nextUrl)
    );
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and other static assets
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.png|bg_dark_logo.png).*)",
  ],
};
