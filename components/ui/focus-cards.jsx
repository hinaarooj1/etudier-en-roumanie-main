"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

const cardVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  blur: { scale: 0.98 },
};

const overlayVariants = {
  initial: { opacity: 1 },
  hover: { opacity: 0 },
};

const hoverOverlayVariants = {
  initial: { opacity: 0, y: 20 },
  hover: { opacity: 1, y: 0 },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};
const Card = ({ card, index, hovered, setHovered, onCardClick }) => (
  <motion.div
    variants={cardVariants}
    initial="initial"
    animate={
      hovered === index ? "hover" : hovered !== null ? "blur" : "initial"
    }
    transition={{ duration: 0.3, ease: "easeOut" }}
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className="rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-45 w-full"
  >
    <Image
      src={card.src}
      alt={card.title}
      fill
      className="object-cover absolute inset-0"
    />

    {/* Default overlay */}
    <motion.div
      variants={overlayVariants}
      initial="initial"
      animate={hovered === index ? "hover" : "initial"}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 bg-black/50 flex flex-col justify-between p-4 text-white"
    >
      <div className="text-lg md:text-xl font-oswald bold">{card.title}</div>
      <div className="self-start">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="px-4 w-full py-2 bg-white text-black font-medium rounded-full shadow-md hover:bg-yellow-500 transition-colors duration-200"
        >
          →
        </motion.button>
      </div>
    </motion.div>

    {/* Hover overlay */}
    <motion.div
      variants={hoverOverlayVariants}
      initial="initial"
      animate={hovered === index ? "hover" : "initial"}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 bg-black/60 flex flex-col justify-between p-4 text-white"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={
          hovered === index ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
        }
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="text-xl md:text-2xl font-oswald bold text-[#147be2]">
          {card.title}
        </div>
      </motion.div>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => onCardClick(card.title)}
        className="px-6 py-2 bg-[#147be2]  bold font-medium rounded-full shadow-md hover:bg-transparent hover:text-white hover:border transition-colors duration-200 self-start mt-4"
      >
        En savoir plus →
      </motion.button>
    </motion.div>
  </motion.div>
);

export default function FocusCards({ data, onCardClick }) {
  const [hovered, setHovered] = useState(null); 
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 w-full mx-auto md:px-8 w-full">
      {data.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}
