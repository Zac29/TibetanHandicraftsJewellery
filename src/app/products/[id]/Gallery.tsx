"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  images: string[];
  title: string;
};

export default function Gallery({ images, title }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const index = Math.round(
      scrollRef.current.scrollLeft / scrollRef.current.clientWidth
    );
    setActiveIndex(index);
  };

  return (
    <div className="w-full max-w-[600px] md:max-w-none mx-auto">
      {/* ===== Mobile Slider ===== */}
      <div className="block md:hidden mb-6">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory aspect-square bg-[#F9F1E7] rounded-[10px] no-scrollbar"
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="min-w-full relative flex items-center justify-center snap-center p-8"
            >
              <Image
                src={img}
                alt={`${title}-${i}`}
                fill
                className="object-contain mix-blend-multiply p-6"
              />
            </div>
          ))}
        </div>

        {/* Mobile Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === i
                  ? "w-8 h-1.5 bg-[#B88E2F]"
                  : "w-2 h-1.5 bg-[#D9D9D9]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ===== Desktop View ===== */}
      <div className="hidden md:flex gap-8 items-start">
        {/* Thumbnails Column */}
        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-[80px] aspect-[1/1.1] bg-[#F9F1E7] rounded-lg overflow-hidden transition-all border-2 ${
                activeIndex === i ? "border-[#B88E2F]" : "border-transparent hover:border-[#B88E2F]/50"
              }`}
            >
              <Image
                src={img}
                alt={`thumb-${i}`}
                fill
                className="object-contain p-2 mix-blend-multiply"
              />
            </button>
          ))}
        </div>

        {/* Main Image Display */}
        <div className="relative flex-1 bg-[#F9F1E7] rounded-[10px] aspect-[4/5] md:w-[423px] md:h-[500px] overflow-hidden group">
          <Image
            src={images[activeIndex]}
            alt={title}
            fill
            priority
            className="object-contain mix-blend-multiply p-10 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}