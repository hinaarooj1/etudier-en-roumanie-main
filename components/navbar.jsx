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

import { getCookie } from 'cookies-next';
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useReducer((current) => !current, false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const bannerHeight = 40;
  const [hasScrolled, setHasScrolled] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  useEffect(() => {
    // Client-side check
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth-token='))
      ?.split('=')[1];
     
    if (token) {
      setIsLoggedIn(true);
      return;
    }

    // Fallback to API check
    fetch('/api/auth/status')
      .then(res => res.json())
      .then(({ isLoggedIn }) => setIsLoggedIn(isLoggedIn));
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
            <NavbarBrand as="div" className="gap-3 max-w-fit">
              <NextLink className="flex justify-start items-center gap-1" style={{ width: "max-content" }} href="/">
                {/* Simple img tag as fallback */}
                {mounted && (
                  <img

                    style={{ width: "120px", height: "auto" }}
                    src={"/bg_dark_logo.png"}
                    alt="Logo" // Adjust height as needed
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
                          "data-[active=true]:text-primary data-[active=true]:font-medium text-sm"
                        )}
                        color="foreground"
                        href={item.href}
                      >
                        {item.label}
                      </NextLink>
                    </NavbarItem>
                  ))}
                </ul>
              </NavbarItem>
            </NavbarBrand>
          </NavbarContent>

          {/* Rest of your navbar content... */}
          <NavbarContent className="hidden md:flex gap-2" justify="end">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <NavbarItem>
                <Button
                  as={Link}
                  href="/contact"
                  className="bg-[#147be2] text-white text-sm h-8 min-w-fit px-3"
                  variant="solid"
                >
                  Contact
                </Button>
              </NavbarItem>
            </motion.div>

            {isLoggedIn ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <NavbarItem>
                    <Button
                      as={Link}
                      href="/user/dashboard"
                      className="text-foreground text-sm h-8 min-w-fit px-3"
                      variant="light"
                      startContent={<User size={14} />}
                    >
                      Dashboard
                    </Button>
                  </NavbarItem>
                </motion.div>

                
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <NavbarItem>
                    <Button
                      as={Link}
                      href="/signin"
                      className="text-foreground text-sm h-8 min-w-fit px-3"
                      variant="light"
                      startContent={<LogIn size={14} />}
                    >
                      Sign In
                    </Button>
                  </NavbarItem>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <NavbarItem>
                    <Button
                      as={Link}
                      href="/signup"
                      className="bg-primary text-sm h-8 min-w-fit px-3"
                      variant="solid"
                      startContent={<UserPlus size={14} />}
                    >
                      Register
                    </Button>
                  </NavbarItem>
                </motion.div>
              </>
            )}

            <NavbarItem>
              <ThemeSwitch />
            </NavbarItem>
          </NavbarContent>

          <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
            <ThemeSwitch />
            <NavbarMenuToggle />
          </NavbarContent>

          <NavbarMenu>
            <div className="mx-4 mt-6 flex flex-col gap-3">
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
                    size="md"
                    className="text-sm"
                    onPress={() => setIsMenuOpen()}
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}

              <NavbarMenuItem>
                <Button
                  as={Link}
                  href="/contact"
                  className="w-full bg-[#147be2] text-white text-sm h-9"
                  variant="solid"
                  onPress={() => setIsMenuOpen()}
                >
                  Contactez-nous
                </Button>
              </NavbarMenuItem>


              {isLoggedIn ? (
                <>
                  <NavbarMenuItem>
                    <Button
                      as={Link}
                      href="/user/dashboard"
                      className="w-full text-foreground text-sm h-9"
                      variant="light"
                      startContent={<User size={14} />}
                      onPress={() => setIsMenuOpen()}
                    >
                      Dashboard
                    </Button>
                  </NavbarMenuItem>
 
                </>
              ) : (
                <>
                  <NavbarMenuItem>
                    <Button
                      as={Link}
                      href="/signin"
                      className="w-full text-foreground text-sm h-9"
                      variant="light"
                      startContent={<LogIn size={14} />}
                      onPress={() => setIsMenuOpen()}
                    >
                      Sign In
                    </Button>
                  </NavbarMenuItem>

                  <NavbarMenuItem>
                    <Button
                      as={Link}
                      href="/signup"
                      className="w-full bg-primary text-sm h-9"
                      variant="solid"
                      startContent={<UserPlus size={14} />}
                      onPress={() => setIsMenuOpen()}
                    >
                      Register
                    </Button>
                  </NavbarMenuItem>
                </>
              )}
            </div>
          </NavbarMenu>
        </NextUINavbar>
      </motion.nav>
      <div className="mb-24" />
    
    </>
  );
};