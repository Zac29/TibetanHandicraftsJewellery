"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

type Item = {
  id: string;
  category: string;
  title: string;
  image: string;
};

const items: Item[] = [
  { id: "01", category: "Pot", title: "Sample", image: "/Pot.png" },
  { id: "02", category: "Decor", title: "Statues", image: "/Statues.png" },
  { id: "03", category: "Tableware", title: "Bowl", image: "/Bowl.png" },
  { id: "04", category: "Art", title: "Mask", image: "/item.png" },
  { id: "05", category: "Vintage", title: "Bell", image: "/decore.png" },
];

// --- REUSABLE BUTTON COMPONENT ---
const ExploreButton = ({ className = "" }: { className?: string }) => (
  <button
    className={`
      group relative overflow-hidden
      inline-flex items-center justify-center
      w-[220px] h-[56px]
      bg-[#353F8C]
      text-white text-[13px]
      font-bold uppercase tracking-[2px]
      transition-all duration-500
      hover:tracking-[4px]
      hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
      active:scale-[0.97]
      rounded-sm
      ${className}
    `}
  >
    <span className="relative z-10">Explore More</span>

    {/* Shine sweep */}
    <span
      className="
        absolute inset-0
        bg-gradient-to-r from-transparent via-white/30 to-transparent
        -translate-x-[120%]
        group-hover:translate-x-[120%]
        group-active:translate-x-[120%]
        transition-transform duration-700
      "
    />
  </button>
);

export default function StackedSliderLoop() {
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // --- AUTO PLAY LOGIC ---
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, [active, isHovering]);

  // --- NAVIGATION ---
  const getIndex = (offset: number) => {
    return (active + offset + items.length) % items.length;
  };

  const handleCardClick = (index: number) => {
    setActive(index);
  };

  // --- ANIMATION VARIANTS ---
  const cardVariants = {
    active: {
      x: 0,
      opacity: 1,
      scale: 1,
      left: "0%",
      zIndex: 30,
      originY: 0,
    },
    next: {
      x: 0,
      opacity: 1,
      scale: 0.85,
      left: "45%", 
      zIndex: 20,
      originY: 0,
    },
    upcoming: {
      x: 0,
      opacity: 0.8,
      scale: 0.70,
      left: "75%",
      zIndex: 10,
      originY: 0,
    },
    enter: {
      x: 50,
      opacity: 0,
      scale: 0.6,
      left: "90%",
      originY: 0,
    },
    exit: {
      opacity: 0,
      zIndex: 0,
      originY: 0,
    },
  };

  return (
    <section
      className={`${poppins.className} w-full min-h-screen bg-[#FFFBF7] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden`}
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-12 items-center">
        
        {/* --- LEFT COLUMN: TEXT --- */}
        <div className="space-y-6 z-10 text-center lg:text-left order-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[44px] font-bold text-[#333333] leading-tight"
          >
            50M+ Product Sold
          </motion.h1>

          <p className="text-[#666666] text-[18px] leading-relaxed max-w-md mx-auto lg:mx-0">
            Discover our curated collection of handcrafted artifacts. From ancient pottery to modern statues.
          </p>

          {/* DESKTOP BUTTON: Hidden on Mobile (lg:inline-flex) */}
          <ExploreButton className="hidden lg:inline-flex" />
        </div>

        {/* --- RIGHT COLUMN: SLIDER --- */}
        <div 
          className="relative w-full flex flex-col items-center order-2 gap-8" // Added gap-8 for spacing
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Slider Container */}
          <div className="relative w-full h-[500px]">
            <AnimatePresence initial={false} mode="popLayout">
              {[0, 1, 2].map((offset) => {
                const itemIndex = getIndex(offset);
                const item = items[itemIndex];
                
                let variantState = "enter";
                if (offset === 0) variantState = "active";
                else if (offset === 1) variantState = "next";
                else if (offset === 2) variantState = "upcoming";

                return (
                  <motion.div
                    key={item.id}
                    layoutId={`card-${item.id}`}
                    variants={cardVariants}
                    initial="enter"
                    animate={variantState}
                    exit="exit"
                    transition={{ 
                      type: "spring", 
                      stiffness: 150, 
                      damping: 20,
                      opacity: { duration: 0.5 }
                    }}
                    onClick={() => handleCardClick(itemIndex)}
                    className={`absolute top-0 w-[280px] md:w-[360px] h-[380px] md:h-[500px] rounded-none overflow-hidden shadow-2xl border-[4px] border-white origin-top cursor-pointer bg-gray-100`}
                  >
                    {/* Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        priority={offset === 0}
                      />
                      <div className="absolute inset-0 bg-black/10" />
                      
                      {/* GLASSMORPHIC TEXT BOX (Only on Active) */}
                      {offset === 0 && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                          className="absolute bottom-[10px] left-0 right-0 flex justify-center z-40"
                        >
                          <div className="w-[90%] md:w-[85%] py-6 bg-white/70 backdrop-blur-[3px] border border-white/50 text-[#333] shadow-lg flex flex-col items-center justify-center text-center">
                            <div className="flex items-center gap-3 text-lg font-medium tracking-widest uppercase mb-1 text-[#444]">
                              <span>{item.id}</span>
                              <span className="w-8 h-[1px] bg-[#444]"></span>
                              <span>{item.category}</span>
                            </div>
                            <h3 className="text-4xl font-bold leading-tight drop-shadow-sm text-[#222]">
                              {item.title}
                            </h3>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* PAGINATION DOTS */}
            <div className="absolute bottom-[20px] left-[58%] flex items-center gap-3 z-40 h-[20px]">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCardClick(idx)}
                  className={`transition-all duration-500 rounded-full h-2 ${
                    active === idx 
                    ? "w-8 bg-[#485396]" 
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* MOBILE BUTTON: Hidden on Desktop (lg:hidden), positioned below slider */}
          <div className="w-full flex justify-center lg:hidden z-10">
             <ExploreButton />
          </div>

        </div>
      </div>
    </section>
  );
}