"use client";
import { motion } from "framer-motion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/data";
import { pageTransition } from "@/lib/motionVarients";
import { Accordion } from "@radix-ui/react-accordion";
import React from "react";

export default function page() {
  return (
    <motion.div
      className="min-h-screen container"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="p-4 font-sans  dark:bg-black">
        <h2 className="mt-12 text-5xl font-extrabold text-[#147be2] font-oswald text-secondary text-center">
          FAQ's
        </h2>

        <div className="max-w-6xl mx-auto mt-20 mb-24">
          <div className="grid lg:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bol text-[#147be2]">
                Questions fréquemment posées
              </h2>
              <p className="text-sm  mt-6">
                La curiosité est le moteur de la connaissance. – Si vous avez
                des questions, nous avons les réponses.
              </p>
            </div>

            <div className="space-y-8 lg:col-span-2 max-lg:mt-6">
              {faqs.map((data, index) => (
                <Accordion type="single" collapsible key={index}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      {" "}
                      <h3 className="text-lg font-semibold ">{data.title}</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm  mt-4">{data.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
