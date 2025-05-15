import "../../../styles/globals.css";
import clsx from "clsx";
import { ThemeProvider } from "./providers";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
import { i18n } from "@/i18n-config";
import { fontNunito, fontOswald } from "@/config/fonts";
import { Toaster } from "@/components/ui/sonner";
export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/bg_dark_logo.png",
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
  keywords: siteConfig.keywords,
};
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
export default async function RootLayout({ children, params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";
  return (
    <html suppressHydrationWarning lang={lang}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Or if you have a PNG */}
        {/* <link rel="icon" href="/favicon.png" type="image/png" /> */}
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background antialiased", // Remove font classes here
          fontNunito.variable, // Apply the font variable directly
          fontOswald.variable // Apply the second font variable
        )}
        style={{
          fontFamily: "var(--font-nunito), sans-serif", // Apply Nunito as default font
        }}
      >
        <ThemeProvider
          themeProps={{ attribute: "class", defaultTheme: "light" }}
        >
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="mx-2">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
