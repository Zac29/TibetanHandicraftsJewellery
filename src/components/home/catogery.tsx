"use client";

import { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type Item = {
  title: string;
  image: string;
};

const items: Item[] = [
  { title: "Bowl", image: "/Bowl.png" },
  { title: "Statues", image: "/Statues.png" },
  { title: "Pot", image: "/Pot.png" },
  { title: "Mask", image: "/item.png" },
  { title: "Bell", image: "/decore.png" },
];

export default function Category() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // We don't necessarily need isInView for swipe, but keeping ref for safety
  const sectionRef = useRef<HTMLElement | null>(null);

  // Detect screen size
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = () => setActive((p) => (p + 1) % items.length);
  const prev = () => setActive((p) => (p - 1 + items.length) % items.length);

  // Drag End Handler for Mobile Swipe
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Threshold for swipe (distance or speed)
    if (offset < -50 || velocity < -500) {
      next();
    } else if (offset > 50 || velocity > 500) {
      prev();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="pt-6 pb-8 sm:pt-8 sm:pb-10 md:pt-10 md:pb-12 lg:pt-12 lg:pb-14 xl:pt-14 xl:pb-16 2xl:pt-16 2xl:pb-18 overflow-hidden"
    >
      {/* Title */}
      <div className="text-center mb-10 sm:mb-12 md:mb-14 px-4">
        <h2 className="mb-4 text-[32px] font-bold text-[#333333]">Category</h2>
        <p className="max-w-xl mx-auto text-[18px] font-medium text-[#333333]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
          luctus nec ullamcorper mattis.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center">
        
        {/* Left Button - Hidden on Mobile */}
        {!isMobile && (
          <button
            onClick={prev}
            className="
              group relative z-20 overflow-hidden
              flex items-center justify-center
              w-14 h-14 rounded-full
              bg-[#2E2E2E] text-white
              transition-all duration-500
              hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
              active:scale-[0.97]
              absolute left-4
            "
          >
            <span className="relative z-10">
              <ChevronLeft size={28} />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
          </button>
        )}

        {/* Slides */}
        <div className="relative w-full h-[400px] sm:h-[420px] md:h-[440px] flex items-center justify-center touch-pan-y">
          {items.map((item, i) => {
            const prevIndex = (active - 1 + items.length) % items.length;
            const nextIndex = (active + 1) % items.length;

            let state: "center" | "left" | "right" | "hidden" = "hidden";

            if (i === active) state = "center";
            else if (i === prevIndex) state = "left";
            else if (i === nextIndex) state = "right";

            return (
              <motion.div
                key={i}
                onClick={() => {
                   // Allow clicking to select on desktop, or if it's the side item
                   if(state !== "hidden") setActive(i);
                }}
                animate={state}
                // Enable Drag only on Mobile and only on the active card (or all, but logic handles it)
                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={onDragEnd}
                whileHover={
                  !isMobile
                    ? {
                        scale: state === "center" ? 1.18 : 0.92,
                      }
                    : undefined
                }
                variants={
                  isMobile
                    ? {
                        // MOBILE VARIANTS: Sliding / Swapping
                        // Center is visible. Left/Right are off-screen (hidden "inside" or side).
                        center: { x: 0, scale: 1, opacity: 1, zIndex: 10 },
                        left: { x: "-100%", scale: 1, opacity: 0, zIndex: 5 }, 
                        right: { x: "100%", scale: 1, opacity: 0, zIndex: 4 },
                        hidden: { x: 0, scale: 0.8, opacity: 0, zIndex: 0 },
                      }
                    : {
                        // DESKTOP VARIANTS: Spread out
                        center: { x: 0, scale: 1.15, opacity: 1, zIndex: 10 },
                        left: { x: -340, scale: 0.85, opacity: 0.9, zIndex: 1 },
                        right: { x: 340, scale: 0.85, opacity: 0.9, zIndex: 1 },
                        hidden: { x: 0, opacity: 0, scale: 0.7, zIndex: 0 },
                      }
                }
                transition={
                  state === "center"
                    ? { type: "spring", stiffness: 260, damping: 18, bounce: 0.45 }
                    : { duration: 0.5, ease: "easeInOut" }
                }
                className={`absolute ${isMobile && state !== 'center' ? 'pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`}
                style={{
                    // Ensure the active slide is on top for dragging
                    zIndex: state === "center" ? 10 : 0
                }}
              >
                <div
                  className={`relative w-[260px] sm:w-[300px] h-[340px] sm:h-[380px] rounded-[10px] overflow-hidden transition-all duration-300 bg-white ${
                    state === "center"
                      ? "shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
                      : "shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover pointer-events-none" // prevent image drag conflicting with framer drag
                    priority={i === active}
                  />
                </div>

                {/* NAME: ALWAYS VISIBLE ON DESKTOP, ONLY CENTER ON MOBILE */}
                {(!isMobile || state === "center") && (
                  <p className="text-center mt-5 text-[20px] font-semibold text-[#333333]">
                    {item.title}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right Button - Hidden on Mobile */}
        {!isMobile && (
          <button
            onClick={next}
            className="
              group relative z-20 overflow-hidden
              flex items-center justify-center
              w-14 h-14 rounded-full
              bg-[#2E2E2E] text-white
              transition-all duration-500
              hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
              active:scale-[0.97]
              absolute right-4
            "
          >
            <span className="relative z-10">
              <ChevronRight size={28} />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
          </button>
        )}
      </div>
    </section>
  );
}