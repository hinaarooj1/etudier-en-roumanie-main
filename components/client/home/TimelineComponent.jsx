"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const timelineItems = [
  {
    title: "Your home is unique",
    description: "We carry out a diagnosis to offer you suitable solutions.",
    color: "bg-gray-100",
  },
  {
    title: "Your renovation made easy",
    description:
      "Works, aid, financing: the best solutions for maximum comfort.",
    color: "bg-blue-100",
  },
  {
    title: "Savings for the long term",
    description:
      "Your bills are reduced thanks to our advice and solutions to control your consumption.",
    color: "bg-green-100",
  },
];

const TimelineComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % timelineItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    // <div className="w-full mx-auto p-6 bg-yellow-100 rounded-lg">
    //   <div className="grid grid-cols-2 gap-8"></div>

    //   </div>
    // </div>
    <div className="max-w-8xl mx-auto  mb-24 bg-[#fef06e] rounded-lg px-8 py-6 ">
      <div className="grid grid-cols-2 gap-4 items-center">
        <div>
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-blue-600">How</span> that works?
            </h1>
          </div>

          <div className="relative flex">
            {/* Timeline container */}
            <div className="relative w-1 flex-shrink-0 mx-8">
              {/* Background line */}
              <div className="absolute inset-0 w-full bg-gray-200 rounded-full" />
              {/* Animated progress line */}
              <motion.div
                className="absolute top-0 w-full bg-blue-500 rounded-full"
                initial={{ height: 0 }}
                animate={{
                  height: `${
                    ((activeIndex + 1) / timelineItems.length) * 100
                  }%`,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />

              {/* Timeline dots */}
              {timelineItems.map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-4 h-4 -left-1.5 rounded-full border-2 border-white"
                  style={{
                    top: `${(index / (timelineItems.length - 1)) * 100}%`,
                    transform: "translateY(-50%)",
                  }}
                  animate={{
                    backgroundColor: index <= activeIndex ? "#3B82F6" : "#fff",
                    scale: index === activeIndex ? 1.2 : 1,
                    boxShadow:
                      index === activeIndex
                        ? "0 0 0 4px rgba(59, 130, 246, 0.2)"
                        : "none",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Content cards */}
            <div className="flex-grow space-y-16">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`
                `}
                  animate={{
                    scale: index === activeIndex ? 1 : 0.95,
                    opacity: index === activeIndex ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.h2
                    className="text-xl font-semibold mb-3"
                    animate={{
                      color: index === activeIndex ? "#1E40AF" : "#4B5563",
                    }}
                  >
                    {item.title}
                  </motion.h2>
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <p className="text-gray-600">{item.description}</p>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <p className="text-xl font-bold">
              And your home becomes{" "}
              <span className="text-blue-600">efficient</span>.
            </p>
          </div>
          <Button
            className="
             w-80
             h-32,
             p-6
            bg-black
            text-white
             bold
             "
          >
            I Estimate My Project
          </Button>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          similique soluta provident atque, ex ea placeat accusantium optio
          commodi assumenda?
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;
