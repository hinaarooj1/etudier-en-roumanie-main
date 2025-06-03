 
import "../styles/globals.css";
import clsx from "clsx";
import { ThemeProvider } from "./[lang]/(client)/providers";
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

export default function RootLayout({ children, params }) {
  const lang = params?.lang || "en";

  return (
    <html suppressHydrationWarning lang={lang}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background antialiased",
          fontNunito.variable,
          fontOswald.variable
        )}
        style={{
          fontFamily: "var(--font-nunito), sans-serif",
        }}
      >
         <main>{children}</main>
      </body>
    </html>
  );
}