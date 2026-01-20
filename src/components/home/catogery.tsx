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
      className="w-full min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Title */}
      <div className="text-center mb-20 px-4">
        <h2 className="mb-4 text-[32px] font-bold text-[#333333]">Category</h2>
        <p className="max-w-xl text-[18px] font-medium text-[#333333]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
          luctus nec ullamcorper mattis.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative w-full max-w-6xl flex items-center justify-center translate-y-[10px]">

        {/* Left Button (Desktop Only) */}
        {!isMobile && (
          <button
            onClick={prev}
            className="absolute left-0 z-20 p-3 rounded-full bg-black/5 hover:bg-black/10 transition"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Slides */}
        <div className="relative w-full h-[440px] flex items-center justify-center">

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
                        center: {
                          y: 0,
                          scale: 1,
                          opacity: 1,
                          zIndex: 10,
                        },
                        left: {
                          y: -40,
                          scale: 0.95,
                          opacity: 0.75,
                          zIndex: 2,
                        },
                        right: {
                          y: -80,
                          scale: 0.9,
                          opacity: 0.55,
                          zIndex: 1,
                        },
                        hidden: {
                          opacity: 0,
                          scale: 0.7,
                        },
                      }
                    : {
                        center: {
                          x: 0,
                          scale: 1.15,
                          opacity: 1,
                          zIndex: 10,
                        },
                        left: {
                          x: -340,
                          scale: 0.85,
                          opacity: 0.9,
                          zIndex: 1,
                        },
                        right: {
                          x: 340,
                          scale: 0.85,
                          opacity: 0.9,
                          zIndex: 1,
                        },
                        hidden: {
                          opacity: 0,
                          scale: 0.7,
                        },
                      }
                }
                transition={
                  state === "center"
                    ? {
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                        bounce: 0.45,
                      }
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

        {/* Right Button (Desktop Only) */}
        {!isMobile && (
          <button
            onClick={next}
            className="absolute right-0 z-20 p-3 rounded-full bg-black/5 hover:bg-black/10 transition"
          >
            <ChevronRight size={32} />
          </button>
        )}
      </div>
    </section>
  );
}
