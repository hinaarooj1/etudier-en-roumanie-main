"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Component({
  title,
  description,
  primaryImage,
  secondaryImage,
  position,
  unoptimized,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[500px]">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl">
        {position === "left" ? (
          <>
            {/* Image Content */}
            <div className="w-full lg:w-1/3 lg:ml-10 mb-10">
              <div
                className="relative aspect-[4/3] w-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.div
                  animate={{
                    scale: isHovered ? 0.95 : 1,
                    zIndex: isHovered ? 10 : 20,
                  }}
                  className="absolute inset-0"
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    fill
                    alt="Primary Image"
                    blurDataURL="data:..."
                    className="rounded-lg shadow-lg object-cover"
                    placeholder="blur"
                    src={primaryImage}
                    unoptimized={unoptimized}
                  />
                </motion.div>

                {secondaryImage && (
                  <motion.div
                    animate={
                      isHovered
                        ? { scale: 1.1, x: "0%", y: "0%", zIndex: 30 }
                        : { scale: 0.85, x: "-20%", y: "20%", zIndex: 10 }
                    }
                    className="absolute inset-0"
                    initial={{ scale: 0.85, x: "-20%", y: "20%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <Image
                      fill
                      alt="Secondary Image"
                      blurDataURL="data:..."
                      className="rounded-lg shadow-lg object-cover"
                      placeholder="blur"
                      src={secondaryImage}
                    />
                  </motion.div>
                )}
              </div>
            </div>
            {/* Text Content */}
            <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {title}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base mb-10">
                {description}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Text Content */}
            <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {title}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base mb-10">
                {description}
              </p>
            </div>

            {/* Image Content */}
            <div className="w-full lg:w-1/3 lg:ml-10 mb-10">
              <div
                className="relative aspect-[4/3] w-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.div
                  animate={{
                    scale: isHovered ? 0.95 : 1,
                    zIndex: isHovered ? 10 : 20,
                  }}
                  className="absolute inset-0"
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    fill
                    alt="Primary Image"
                    blurDataURL="data:..."
                    className="rounded-lg shadow-lg object-cover"
                    placeholder="blur"
                    src={primaryImage}
                    unoptimized={unoptimized}
                  />
                </motion.div>

                {secondaryImage && (
                  <motion.div
                    animate={
                      isHovered
                        ? { scale: 1.1, x: "0%", y: "0%", zIndex: 30 }
                        : { scale: 0.85, x: "-20%", y: "20%", zIndex: 10 }
                    }
                    className="absolute inset-0"
                    initial={{ scale: 0.85, x: "-20%", y: "20%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <Image
                      fill
                      alt="Secondary Image"
                      blurDataURL="data:..."
                      className="rounded-lg shadow-lg object-cover"
                      placeholder="blur"
                      src={secondaryImage}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
