import { NextResponse } from "next/server";
import { i18n } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";
import { verifyToken } from "./lib/auth";

import { verifyTokenEdge } from "./lib/auth";
const publicRoutes = ["/", "/signin", "/signup", "/verify-email"];
const adminProtectedRoutes = [
  "/admin/dashboard", 
  "/admin/dashboard/contactDetails",
  "/admin/dashboard/representation",
  "/admin/dashboard/mandate",
  "/admin/dashboard/appointments",
  "/admin/dashboard/time-slots",
  "/admin/dashboard/users"
];
const userProtectedRoutes = [
   
  "/user/dashboard",
  "/user/dashboard/profile",
  "/user/dashboard/appointments",
  "/user/dashboard/password",
  "/settings",
  "/bookings"
];

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales;
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const localeMatch = pathname.match(/^\/([a-zA-Z-]+)(\/|$)/);
  const currentLocale = localeMatch ? localeMatch[1] : i18n.defaultLocale;

  // Reconstruct routes with locale prefix
  const adminRoutes = adminProtectedRoutes.map(route => `/${currentLocale}${route}`);
  const userRoutes = userProtectedRoutes.map(route => `/${currentLocale}${route}`);
  const publicRoutesWithLocale = publicRoutes.map(route => route === "/" ? `/${currentLocale}` : `/${currentLocale}${route}`);

  const isAdminRoute = adminRoutes.includes(pathname);
  const isUserRoute = userRoutes.includes(pathname);
  const isPublicRoute = publicRoutesWithLocale.includes(pathname) || publicRoutes.includes(pathname);

  // Check sessions
  const cookieStore = cookies();
  const adminSession = await decrypt(cookieStore.get("session")?.value);
  const userToken = cookieStore.get("auth-token")?.value;
  
  const userSession = userToken ? await verifyTokenEdge(userToken) : null;

  // Redirect logic
  if (isAdminRoute && (!adminSession?.userId || !adminSession?.isAdmin)) {
    return NextResponse.redirect(new URL(`/${currentLocale}/admin`, request.url));
  }

  if (isUserRoute && !userSession?.id) {
    return NextResponse.redirect(new URL(`/${currentLocale}/signin`, request.url));
  }

  if (isAdminRoute && userSession?.id) {
    return NextResponse.redirect(new URL(`/${currentLocale}`, request.url));
  }

  if ((pathname === `/${currentLocale}/admin` || pathname === `/${currentLocale}/signin`) && userSession?.id) {
    return NextResponse.redirect(new URL(`/${currentLocale}`, request.url));
  }

  if ((pathname === `/${currentLocale}/signin` || pathname === `/${currentLocale}/signup`) && adminSession?.userId) {
    return NextResponse.redirect(new URL(`/${currentLocale}/admin/dashboard`, request.url));
  }

  // Locale handling (keep your existing code)
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

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
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.png|bg_dark_logo.png).*)",
  ],
};