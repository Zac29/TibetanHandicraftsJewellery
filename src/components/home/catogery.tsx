"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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

export default function Catogery() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const lockRef = useRef(false);
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

  // Detect if section is in viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll handler (ONLY when section is in view and mobile)
  useEffect(() => {
    if (!isMobile || !isInView) return;

    const onWheel = (e: WheelEvent) => {
      if (lockRef.current) return;

      lockRef.current = true;

      if (e.deltaY > 0) next();
      else prev();

      setTimeout(() => {
        lockRef.current = false;
      }, 700);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isMobile, isInView]);

  return (
    <section
      ref={sectionRef}
      className="pt-6 pb-8 sm:pt-8 sm:pb-10 md:pt-10 md:pb-12 lg:pt-12 lg:pb-14 xl:pt-14 xl:pb-16 2xl:pt-16 2xl:pb-18"
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
        
        {/* Left Button (Circular + Shiny) */}
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
            absolute left-0 sm:left-4
          "
        >
          <span className="relative z-10">
            <ChevronLeft size={28} />
          </span>
          {/* Shine Gradient */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
        </button>

        {/* Slides */}
        <div className="relative w-full h-[400px] sm:h-[420px] md:h-[440px] flex items-center justify-center">
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
                onClick={() => setActive(i)}
                animate={state}
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
                        // MOBILE VARIANTS: Tighter stack with minimal Y offset
                        center: { y: 0, scale: 1, opacity: 1, zIndex: 10 },
                        left: { y: -10, scale: 0.95, opacity: 0.8, zIndex: 5 },
                        right: { y: -20, scale: 0.9, opacity: 0.6, zIndex: 4 },
                        hidden: { y: -20, scale: 0.85, opacity: 0, zIndex: 0 },
                      }
                    : {
                        // DESKTOP VARIANTS: Spread out horizontally
                        center: { x: 0, scale: 1.15, opacity: 1, zIndex: 10 },
                        left: { x: -340, scale: 0.85, opacity: 0.9, zIndex: 1 },
                        right: { x: 340, scale: 0.85, opacity: 0.9, zIndex: 1 },
                        hidden: { opacity: 0, scale: 0.7, zIndex: 0 },
                      }
                }
                transition={
                  state === "center"
                    ? { type: "spring", stiffness: 260, damping: 18, bounce: 0.45 }
                    : { duration: 0.6, ease: "easeInOut" }
                }
                className="absolute cursor-pointer"
              >
                <div
                  className={`relative w-[260px] sm:w-[300px] h-[340px] sm:h-[380px] rounded-[10px] overflow-hidden transition-all duration-300 ${
                    state === "center"
                      ? "shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
                      : "shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                  } hover:shadow-[0_40px_100px_rgba(0,0,0,0.45)]`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.05]"
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

        {/* Right Button (Circular + Shiny) */}
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
            absolute right-0 sm:right-4
          "
        >
          <span className="relative z-10">
            <ChevronRight size={28} />
          </span>
          {/* Shine Gradient */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
        </button>
      </div>
    </section>
  );
}