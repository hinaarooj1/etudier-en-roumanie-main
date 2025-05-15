"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function page() {
  return (
    <div>
      <h2 className="mt-12 text-5xl font-extrabold  font-oswald text-secondary text-center">
        About US
      </h2>

      <h2 className="text-6xl font-bold text-center mb-10 text-[#AA1E22] dark:text-red-400 ">
        What are we upto
      </h2>
      {/* Custom Hurricane Recovery Services Section */}
      <div className="px-4 dark:bg-black bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 -mb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#AA1E22] dark:text-red-400">
            Hurricane Recovery Services
          </h2>

          {/* Emergency Banner */}
          <div className="bg-orange-100 dark:bg-orange-900 border-l-4 border-orange-500 p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-orange-500 mr-3" />
              <p className="text-orange-700 dark:text-orange-300">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Provident, possimus. Eius vel harum debitis aliquam facere ad
                nostrum ab odio. Explicabo odio voluptate consequatur.
                Distinctio voluptates animi delectus neque illo.
              </p>
            </div>
          </div>

          {/* Flex Container for Content and Carousel */}
          <div className="flex flex-col md:flex-row md:space-x-8 mb-36 py-3">
            <div className="space-y-6 md:flex-1 mt-24">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Helping Homeowners Rebuild with Confidence
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis totam reiciendis dolorem veniam molestiae, eos
                tempora repudiandae blanditiis sed ad recusandae cum quidem
                consequuntur dolor repellat eligendi odio. Iure iusto, tenetur
                culpa ab numquam, soluta earum nemo nostrum quibusdam tempora ea
                hic accusantium consectetur doloremque aliquid, ut itaque
                assumenda vitae? Cupiditate quod ad corrupti modi earum
                nesciunt, molestias repellendus tempora, vel reiciendis alias id
                rem ex repellat aut fugit expedita libero! Accusantium eius,
              </p>
              <div className="flex ">
                <Link
                  className="text-secondary hover:underline "
                  href="https://dr.archiwiz.com/"
                >
                  Website Link for Hurricane Damage Services
                </Link>
                <ArrowUpRight className="ml-2 mt-1 w-4 h-4 text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
