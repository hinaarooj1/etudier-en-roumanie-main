"use client";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaClock,
} from "react-icons/fa";
import { IoLogoPinterest } from "react-icons/io";
import bg_dark_logo from "../public/bg_dark_logo.png";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";
export default function Footer() {
  const { data, error, isLoading } = useSWR("/api/contactDetails", fetcher);
  console.log(data?.data);
  return (
    // <footer className="bg-gradient-to-br from-red-700 via-gray-600 to-slate-800">
    <footer className="bg-gray-600">
      {/* Decorative top border */}
      {/* <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600" /> */}

      {/* Upper Section */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Company Info Section */}
          <div className="lg:col-span-4 space-y-6">
            <Link className="block" href="/">
              <Image
                alt="etudier logo"
                height={50}
                src={bg_dark_logo}
                width={150}
                // className="brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 max-w-md"></p>
            <div className="flex gap-4">
              {[
                {
                  icon: <FaInstagram size={20} />,
                  href: "",
                  label: "Instagram",
                },
                {
                  icon: <FaFacebook size={20} />,
                  href: "",
                  label: "Facebook",
                },
                {
                  icon: <FaLinkedin size={20} />,
                  href: "",
                  label: "LinkedIn",
                },
                {
                  icon: <IoLogoPinterest size={20} />,
                  href: "",
                  label: "Pinterest",
                },
                {
                  icon: <FaYoutube size={20} />,
                  href: "",
                  label: "Youtube",
                },
              ].map((social) => (
                <Link
                  key={social.label}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
                  href={social.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Sections */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#147be2]  text-lg font-semibold mb-6">
                Quick Links
              </h3>
              <ul className="space-y-4">
                {siteConfig.navItems.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                      href={link.href}
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-secondary mr-0 group-hover:mr-2 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[#147be2]  text-lg font-semibold mb-6">
                Contact Us
              </h3>
              {isLoading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error.message}</div>
              ) : (
                <>
                  {data?.data.map((item, index) => (
                    <address
                      key={index}
                      className="not-italic space-y-4 text-gray-300"
                    >
                      <div className="flex items-start">
                        <div className="flex-1">
                          {item.companyName}
                          {item.address} Code postal : {item.postalCode} Numéro
                          Fiscal: {item.fiscalCode}
                          Numéro d’enregistrement : {item.registrationNumber}
                        </div>
                      </div>
                      <div>
                        <a
                          className="hover:text-white transition-colors duration-300 block"
                          href={`tel:${process.env.phone}`} // Use {} and proper backticks
                        >
                          {item.phone}
                        </a>

                        <a
                          className="hover:text-white transition-colors duration-300 block"
                          href={`mailto:${item.email}`}
                        >
                          {item.email}
                        </a>
                      </div>
                    </address>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Business Hours Section */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <FaClock className="text-red-500" size={24} />
                <h3 className="text-[#147be2]  text-lg font-semibold">
                  Business Hours
                </h3>
              </div>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>{data?.data[0].businessHours}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>Closed</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-blue-400">Closed</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4" />
                <div className="text-sm text-gray-400">
                  Available 24/7 for online inquiries at {data?.data[0]?.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} {data?.data[0]?.email} All
              rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
