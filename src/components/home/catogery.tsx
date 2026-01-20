"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
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
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
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

      if (e.deltaY > 0) {
        next();
      } else {
        prev();
      }

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
      <div className="text-center mb-12 px-4">
        <h2 className="mb-4 text-[32px] font-bold text-[#333333]">
          Category
        </h2>
        <p className="max-w-xl text-[18px] font-medium text-[#333333]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
          luctus nec ullamcorper mattis.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative w-full max-w-6xl flex items-center justify-center">

        {/* Left Button (Desktop Only) */}
        <button
          onClick={prev}
          className="hidden md:block absolute left-0 z-20 p-3 rounded-full bg-black/5 hover:bg-black/10 transition"
        >
          <ChevronLeft size={32} />
        </button>

        {/* LEFT DOTS (MOBILE ONLY, NEXT TO IMAGE) */}
        {isMobile && (
          <div className="absolute left-1/2 -translate-x-[208px] sm:-translate-x-[248px] top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === active ? "bg-[#333333] scale-125" : "bg-[#999999]"
                }`}
              />
            ))}
          </div>
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
                animate={state}
                variants={
                  isMobile
                    ? {
                        center: {
                          y: 0,
                          scale: 1.05,
                          opacity: 1,
                          zIndex: 10,
                        },
                        left: {
                          y: 240,
                          scale: 0.9,
                          opacity: 0,
                          zIndex: 1,
                        },
                        right: {
                          y: -240,
                          scale: 0.9,
                          opacity: 0,
                          zIndex: 1,
                        },
                        hidden: {
                          opacity: 0,
                          scale: 0.8,
                        },
                      }
                    : {
                        center: {
                          x: 0,
                          scale: 1.1,
                          opacity: 1,
                          zIndex: 10,
                        },
                        left: {
                          x: -340,
                          scale: 0.85,
                          opacity: 0.5,
                          zIndex: 1,
                        },
                        right: {
                          x: 340,
                          scale: 0.85,
                          opacity: 0.5,
                          zIndex: 1,
                        },
                        hidden: {
                          opacity: 0,
                          scale: 0.7,
                        },
                      }
                }
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute"
              >
                <div className="relative w-[280px] sm:w-[320px] h-[360px] sm:h-[400px] rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority={i === active}
                  />
                </div>

                <p className="text-center mt-6 text-[24px] font-semibold text-[#333333]">
                  {item.title}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT UP/DOWN BUTTONS (MOBILE ONLY, NEXT TO IMAGE) */}
        {isMobile && (
          <div className="absolute right-1/2 translate-x-[208px] sm:translate-x-[248px] top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-black/5 active:bg-black/10 transition"
            >
              <ChevronUp size={26} />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full bg-black/5 active:bg-black/10 transition"
            >
              <ChevronDown size={26} />
            </button>
          </div>
        )}

        {/* Right Button (Desktop Only) */}
        <button
          onClick={next}
          className="hidden md:block absolute right-0 z-20 p-3 rounded-full bg-black/5 hover:bg-black/10 transition"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Dots (Desktop Only) */}
      <div className="hidden md:flex gap-3 mt-10">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === active ? "bg-[#333333] scale-125" : "bg-[#999999]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
