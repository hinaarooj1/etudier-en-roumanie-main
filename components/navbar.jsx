// "use client";
// import { useEffect, useReducer, useState } from "react";
// import {
//   Navbar as NextUINavbar,
//   NavbarContent,
//   NavbarMenu,
//   NavbarMenuToggle,
//   NavbarBrand,
//   NavbarItem,
//   NavbarMenuItem,
// } from "@nextui-org/navbar";
// import { Button } from "@nextui-org/button";
// import { Link } from "@nextui-org/link";
// import { link as linkStyles } from "@nextui-org/theme";
// import NextLink from "next/link";
// import clsx from "clsx";
// import { useTheme } from "next-themes";
// import Image from "next/image";
// import {
//   ChevronDown,
//   EarthIcon,
//   LogIn,
//   LogInIcon,
//   LogOut,
//   Mail,
//   MapIcon,
//   Phone,
// } from "lucide-react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
// import { IoLogoPinterest } from "react-icons/io";

// import { ThemeSwitch } from "@/components/theme-switch";
// import { siteConfig } from "@/config/site";
// import { Separator } from "./ui/separator";

// export const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useReducer((current) => !current, false);
//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const { scrollY } = useScroll();
//   const bannerHeight = 40;

//   const bannerOpacity = useTransform(scrollY, [0, bannerHeight], [1, 0]);
//   const bannerY = useTransform(scrollY, [0, bannerHeight], [0, -bannerHeight]);
//   const navbarY = useTransform(scrollY, [0, bannerHeight], [bannerHeight, 0]);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <>
//       <motion.div
//         className="fixed top-0 left-0 right-0 h-10 bg-gray-600 text-white z-50"
//         style={{
//           opacity: bannerOpacity,
//           y: bannerY,
//         }}
//       >
//
//       <motion.nav
//         className="fixed top-0 left-0 right-0 h-16 border-b bg-background z-40 "
//         style={{ y: navbarY }}
//       >
//         <NextUINavbar
//           isMenuOpen={isMenuOpen}
//           maxWidth="xl"
//           style={{ position: "fixed" }}
//           onMenuOpenChange={setIsMenuOpen}
//         >

//       <div className="mb-24" />
//     </>
//   );
// };

"use client";
import { useEffect, useReducer, useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import bg_dark_logo from "../public/bg_dark_logo.png";
import bg_white_logo from "../public/bg_white_logo.jpg";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useReducer((current) => !current, false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const bannerHeight = 40;
  const [hasScrolled, setHasScrolled] = useState(false);

  const bannerOpacity = useTransform(scrollY, [0, bannerHeight], [1, 0]);
  const bannerY = useTransform(scrollY, [0, bannerHeight], [0, -bannerHeight]);
  const navbarY = useTransform(scrollY, [0, bannerHeight], [bannerHeight, 0]);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClassName = clsx(
    "fixed top-0 left-0 right-0 h-16 border-b z-20 transition-all duration-100",
    {
      "bg-white/95 shadow-sm backdrop-blur-sm":
        hasScrolled && theme === "light",
      "bg-background": !hasScrolled || theme === "dark",
    }
  );

  return (
    <>
      <motion.nav className={navbarClassName}>
        <NextUINavbar
          isMenuOpen={isMenuOpen}
          maxWidth="xl"
          style={{ position: "fixed" }}
          onMenuOpenChange={setIsMenuOpen}
        >
          <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
            <NavbarBrand as="li" className="gap-3 max-w-fit">
              <NextLink
                className="flex justify-start items-center gap-1"
                href="/"
              >
                {mounted && (
                  <Image
                    alt="Logo For etudier"
                    height={80}
                    src={theme === "light" ? bg_dark_logo : bg_white_logo}
                    width={80}
                  />
                )}
              </NextLink>
              <NavbarItem className="hidden sm:flex gap-2">
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                  {siteConfig.navItems.map((item) => (
                    <NavbarItem key={item.href}>
                      <NextLink
                        className={clsx(
                          linkStyles({ color: "foreground" }),
                          "data-[active=true]:text-primary data-[active=true]:font-medium"
                        )}
                        color="foreground"
                        href={item.href}
                      >
                        <span className="bold">{item.label}</span>
                      </NextLink>
                    </NavbarItem>
                  ))}
                  <motion.div
                    whileHover={{ scale: 1.09 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <NavbarItem
                      className="p-1 px-3 bg-[#147be2] rounded-md text-white w-full hover:text-[#147be2] hover:bg-transparent hover:border transition-colors flex items-center justify-center gap-2"
                      asChild
                    >
                      <Link
                        href="/contact"
                        className="flex items-center flex-row justify-center uppercase data-[active=true]:text-primary data-[active=true]:font-medium gap-1 "
                      >
                        <span className="bold">Contactez-nous</span>
                      </Link>
                    </NavbarItem>
                  </motion.div>
                </ul>
              </NavbarItem>
            </NavbarBrand>
          </NavbarContent>

          <NavbarItem className="hidden md:flex">
            <ThemeSwitch />
          </NavbarItem>

          <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
            <ThemeSwitch />
            <NavbarMenuToggle />
          </NavbarContent>

          <NavbarMenu>
            <div className="mx-4 mt-10 flex flex-col gap-2">
              {siteConfig.navMenuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                    }
                    href={item.href}
                    size="lg"
                    onPress={() => setIsMenuOpen()}
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
              <NavbarItem
                className="p-1 px-3 bg-[#147be2] rounded-md text-white w-full hover:text-[#147be2] hover:bg-transparent hover:border transition-colors flex items-center justify-center gap-2"
                asChild
              >
                <Link
                  href="/contact"
                  className="flex items-center flex-row justify-center uppercase data-[active=true]:text-primary data-[active=true]:font-medium gap-1 "
                >
                  <span className="bold">Contactez-nous</span>
                </Link>
              </NavbarItem>
            </div>
          </NavbarMenu>
        </NextUINavbar>
      </motion.nav>
      <div className="mb-24" />
    </>
  );
};
