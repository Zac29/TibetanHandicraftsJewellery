"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Poppins } from "next/font/google";

// Setup Poppins Font
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

export default function StackedProductSlider() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect Mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    if (active < items.length - 1) setActive((prev) => prev + 1);
    else setActive(0);
  };

  const prev = () => {
    if (active > 0) setActive((prev) => prev - 1);
    else setActive(items.length - 1);
  };

  return (
    <section
      className={`${poppins.className} w-full min-h-screen bg-[#FFFBF7] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden`}
    >
      {/* Grid Change: lg:grid-cols-[45%_55%] 
        - Makes the 1st column (Text) smaller (~45%)
        - Makes the 2nd column (Slider) wider (~55%)
      */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center">

        {/* TEXT */}
        <div className="space-y-6 z-10 text-center lg:text-left order-1 pr-0 lg:pr-5">

          {/* MAIN HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[44px] font-bold text-[#333333] leading-tight"
          >
            50M+ Product Sold
          </motion.h1>

          {/* SUB HEADING */}
          <p className="text-[#666666] text-[18px] leading-relaxed max-w-md mx-auto lg:mx-0">
            Discover our curated collection of handcrafted artifacts.
            From ancient pottery to modern statues.
          </p>

          <button className="bg-[#485396] hover:bg-[#39427a] text-white px-8 py-3 md:py-4 rounded-sm font-semibold transition-colors shadow-lg text-sm md:text-base">
            Explore More
          </button>
        </div>

        {/* STACK SLIDER */}
        {/* Added pl-5 to move the slider column slightly right by approx 20px */}
        <div className="relative h-[450px] md:h-[650px] w-full flex flex-col items-center justify-center order-2 perspective-1000 lg:pl-5">
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start lg:pl-10">
            <AnimatePresence>
              {items.map((item, index) => {
                const offset = index - active;

                // EXIT ANIMATION (Going backwards/disappearing)
                if (offset < 0) {
                  return (
                    <motion.div
                      key={item.id}
                      // Increased width to 400px and height to 560px for main image size
                      className="absolute w-[80vw] max-w-[320px] md:w-[400px] h-[380px] md:h-[560px] overflow-hidden shadow-2xl"
                      initial={false}
                      animate={{
                        x: -500,
                        opacity: 0,
                        scale: 0.8,
                        zIndex: 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </motion.div>
                  );
                }

                // ACTIVE & NEXT SLIDES
                return (
                  <motion.div
                    key={item.id}
                    // Increased width to 400px and height to 560px for main image size
                    className="absolute top-1/2 left-1/2 lg:left-20 w-[80vw] max-w-[320px] md:w-[400px] h-[380px] md:h-[560px] overflow-hidden shadow-2xl bg-white"
                    style={{ transformOrigin: "center center" }}
                    initial={false}
                    animate={{
                      // X Calculation: Increased multiplier from 50 to 75 to make next images "more visible" (30px gap logic)
                      x: isMobile
                        ? `calc(-50% + ${offset * 15}px)`
                        : offset * 75, 
                      y: "-50%",
                      // Scale Calculation: 0.06 step down roughly equals 20px size reduction per step
                      scale: 1 - offset * (isMobile ? 0.05 : 0.06),
                      zIndex: items.length - offset,
                      opacity: offset > (isMobile ? 2 : 3) ? 0 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        priority={index === active}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* GLASS CARD */}
                    <motion.div
                      className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 p-5 text-white"
                      animate={{ opacity: offset === 0 ? 1 : 0 }}
                    >
                      {/* ID + CATEGORY */}
                      <div className="flex items-center gap-2 text-[16px] font-medium tracking-wide mb-2 text-white/80">
                        <span>{item.id}</span>
                        <span className="w-6 h-[1px] bg-white/60"></span>
                        <span>{item.category}</span>
                      </div>

                      {/* PRODUCT NAME */}
                      <h3 className="text-[28px] font-semibold">
                        {item.title}
                      </h3>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* DESKTOP BUTTONS */}
            {!isMobile && (
              <>
                <div className="absolute -left-4 z-50 h-full flex items-center">
                  <button
                    onClick={prev}
                    className="w-16 h-16 flex items-center justify-center rounded-full bg-[#EABFFF] text-[#4A1D5F] hover:scale-110 transition-transform shadow-lg"
                  >
                    <ChevronLeft size={28} />
                  </button>
                </div>

                <motion.div
                  className="absolute z-50 pointer-events-none"
                  animate={{
                    // Updated 360 to 400 to match new card width
                    // Updated multiplier 50 to 75 to match new gap logic
                    left: 400 + Math.min(items.length - 1 - active, 3) * 75 + 60,
                  }}
                  transition={{ type: "spring", stiffness: 100 }}
                  style={{ top: "50%", translateY: "-50%" }}
                >
                  <button
                    onClick={next}
                    className="pointer-events-auto w-16 h-16 flex items-center justify-center rounded-full bg-[#EABFFF] text-[#4A1D5F] hover:scale-110 transition-transform shadow-lg"
                  >
                    <ChevronRight size={28} />
                  </button>
                </motion.div>
              </>
            )}
          </div>

          {/* MOBILE BUTTONS */}
          {isMobile && (
            <div className="absolute -bottom-6 w-full flex items-center justify-center gap-8 z-50">
              <button
                onClick={prev}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#EABFFF] text-[#4A1D5F] active:scale-90 transition-transform shadow-lg"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#EABFFF] text-[#4A1D5F] active:scale-90 transition-transform shadow-lg"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}