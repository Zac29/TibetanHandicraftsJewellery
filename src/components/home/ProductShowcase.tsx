"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

const slides: Slide[] = [
  { id: 1, image: "/decore.png", title: "Sample", subtitle: "01 — Pot" },
  { id: 2, image: "/item.png", title: "Handmade", subtitle: "02 — Art" },
  { id: 3, image: "/Statues.png", title: "Classic", subtitle: "03 — Decor" },
  { id: 4, image: "/Pot.png", title: "Decor", subtitle: "04 — Pot" },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setActive((p) => (p + 1) % slides.length);
  };

  const prev = () => {
    setDirection(-1);
    setActive((p) => (p - 1 + slides.length) % slides.length);
  };

  const nextIndex = (active + 1) % slides.length;

  return (
    <section className="w-full bg-[#FCF8F3] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 items-center">

        {/* LEFT TEXT */}
        <div className="text-center lg:text-left">
          <h2 className="text-[36px] font-bold text-[#333333] mb-6 whitespace-nowrap">
            50M+ Product Sold
          </h2>
          <button className="bg-[#2F2F7E] text-white px-8 py-3 rounded-md hover:opacity-90 transition">
            Explore More
          </button>
        </div>

        {/* SLIDER */}
        <div className="relative w-full h-[520px] flex items-center">

          {/* ACTIVE SLIDE */}
          <div className="relative w-[70%] h-full z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[active].id}
                initial={{ x: direction === 1 ? 200 : -200, opacity: 0, scale: 0.95 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: direction === 1 ? -200 : 200, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full overflow-hidden shadow-2xl">

                  <Image
                    src={slides[active].image}
                    alt={slides[active].title}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Overlay Card */}
                  <div className="absolute bottom-8 left-8 right-8 bg-white/70 backdrop-blur-md p-6">
                    <p className="text-sm text-[#333333] opacity-70 mb-1">
                      {slides[active].subtitle}
                    </p>
                    <h3 className="text-2xl font-semibold text-[#333333]">
                      {slides[active].title}
                    </h3>
                  </div>

                  {/* Left Arrow */}
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center hover:scale-110 transition"
                  >
                    <ChevronLeft />
                  </button>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* NEXT PREVIEW */}
          <div className="relative w-[30%] h-[85%] ml-6 overflow-hidden shadow-xl">
            <Image
              src={slides[nextIndex].image}
              alt="Next"
              fill
              className="object-cover"
            />

            {/* Right Arrow */}
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center hover:scale-110 transition"
            >
              <ChevronRight />
            </button>
          </div>

          {/* DOTS */}
          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === active ? "bg-black scale-125" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
