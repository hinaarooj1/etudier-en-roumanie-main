"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import hero_img from "../../../private-assets/Images/university_diploma.jpg";
import HomeContent from "@/components/client/home/HomeContent";
import { Card } from "@/components/ui/card";
import SparklesText from "@/components/ui/sparkles-text";
import BoxReveal from "@/components/ui/box-reveal";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motionVarients";

export default function Home() {
  return (
    <motion.div
      className="min-h-screen container"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="mb-20">
        <section className="relative py-10 overflow-hidden bg-black sm:py-16 lg:py-24 xl:py-32">
          <div className="absolute inset-0">
            <Image
              className="object-cover w-full h-full md:object-left md:scale-150 md:origin-top-left"
              src={hero_img}
              alt="hero image"
              objectPosition="center center"
              priority
            />
          </div>

          <div className="absolute inset-0 hidden bg-gradient-to-r md:block from-black to-transparent"></div>
          <div className="absolute inset-0 block bg-black/60 md:hidden"></div>
          <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center md:w-2/3 lg:w-1/2 xl:w-1/3 md:text-left">
              <BoxReveal boxColor={"#5046e6"} duration={0.3}>
                <h3 className="mt-12 text-5xl font-extrabold  font-oswald text-[#147be2]">
                  <SparklesText text="ETUDIER EN ROUMANIE" />
                </h3>
              </BoxReveal>
              <BoxReveal boxColor={"#5046e6"} duration={1}>
                <h6 className="mt-4 text-base text-5xl font-oswald text-white">
                  Promouvoir les universités roumaines à l’échelle mondiale et
                  accompagner les étudiants internationaux à chaque étape de
                  leur parcours.
                </h6>
              </BoxReveal>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
              >
                <div
                  className="mt-4 p-2 bg-[#147be2] rounded-md text-white w-full hover:bg-transparent hover:border transition-colors flex items-center justify-center gap-2"
                  // asChild
                >
                  <Link
                    href="/schedule"
                    className="flex items-center flex-row justify-center uppercase text-xl gap-1 "
                  >
                    <span className="bold">réserver un entretien gratuit</span>
                    <ChevronRight size={22} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* <TimelineComponent /> */}
        <section className="mt-20">
          <HomeContent />
        </section>
      </div>
    </motion.div>
  );
}
