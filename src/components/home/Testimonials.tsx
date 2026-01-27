"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { Star, X, Quote } from "lucide-react";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600"] });
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "700"] });

const smoothSpring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.8,
};

const galleryImages = [
  { id: "t1", src: "/1.png", w: 280, h: 320, x: 0, y: 40, name: "Sarah J.", rating: 5, review: "The intricate details on the mandala are breathtaking." },
  { id: "t2", src: "/10.png", w: 240, h: 340, x: 300, y: 0, name: "Michael T.", rating: 4, review: "Exceptional weight and quality." },
  { id: "t3", src: "/8.png", w: 240, h: 300, x: 280, y: 360, name: "Emma W.", rating: 5, review: "Fast shipping and museum-grade packaging." },
  { id: "t4", src: "/4.png", w: 420, h: 280, x: 560, y: 20, name: "David B.", rating: 5, review: "A masterpiece of Tibetan craft." },
  { id: "t5", src: "/39.png", w: 340, h: 240, x: 540, y: 320, name: "Jessica L.", rating: 4, review: "Bridges the gap between tradition and modern decor." },
  { id: "t6", src: "/9.png", w: 320, h: 520, x: 900, y: 100, name: "Daniel K.", rating: 5, review: "The resonance lingers for minutes." },
  { id: "t7", src: "/4.png", w: 300, h: 300, x: 1240, y: 380, name: "Sophia M.", rating: 5, review: "The concierge team was helpful." },
  { id: "t8", src: "/5.png", w: 450, h: 320, x: 1240, y: 40, name: "James R.", rating: 5, review: "Exquisite silverwork." },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} className={i < rating ? "fill-amber-600 text-amber-600" : "fill-stone-200 text-stone-200"} />
    ))}
  </div>
);

export default function Testimonials() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Ref to keep modal inside this section
  const selectedImage = galleryImages.find((img) => img.id === selectedId);

  return (
    <section 
      ref={containerRef}
      className={`relative w-full py-12 md:py-24 ${jost.className} bg-white overflow-hidden min-h-screen`}
    >
      <div className="container mx-auto px-6 text-center mb-12 relative z-10">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-amber-700 text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">
          Community Voices
        </motion.span>
        <h2 className={`${cormorant.className} text-stone-900 text-3xl md:text-5xl lg:text-6xl`}>
          Shared <span className="italic font-light text-stone-500 text-2xl md:text-5xl">Journeys</span>
        </h2>
      </div>

      {/* MOBILE GALLERY */}
      <div className="lg:hidden px-4 columns-2 gap-4 space-y-4 relative z-20">
        {galleryImages.map((img) => (
          <motion.div
            key={`mob-${img.id}`}
            layoutId={`card-${img.id}`}
            onClick={() => setSelectedId(img.id)}
            className="relative break-inside-avoid overflow-hidden bg-stone-50 border border-stone-200 cursor-pointer rounded-sm"
          >
            <motion.div layoutId={`img-inner-${img.id}`} className="relative aspect-[4/5]">
              <Image src={img.src} alt={img.name} fill className="object-cover" sizes="50vw" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* DESKTOP GALLERY */}
      <div className="hidden lg:block relative w-full h-[750px] overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden">
        <div className="relative w-[1800px] h-full px-[5vw]">
          {galleryImages.map((img) => (
            <motion.div
              key={`desk-${img.id}`}
              layoutId={`card-${img.id}`}
              onClick={() => setSelectedId(img.id)}
              transition={smoothSpring}
              className="absolute overflow-hidden bg-stone-50 border border-stone-200 cursor-pointer group rounded-sm shadow-sm"
              style={{ width: img.w, height: img.h, left: img.x, top: img.y }}
              whileHover={{ y: -10, zIndex: 30, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            >
              <motion.div layoutId={`img-inner-${img.id}`} className="relative w-full h-full">
                <Image 
                    src={img.src} 
                    alt={img.name} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
                    sizes="400px"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL - Now absolute to section to stay in area */}
      <AnimatePresence>
        {selectedId && selectedImage && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-white/95 backdrop-blur-md cursor-zoom-out"
            />

            <motion.div
              layoutId={`card-${selectedId}`}
              transition={smoothSpring}
              className="relative bg-white w-full max-w-5xl h-auto flex flex-col lg:flex-row shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden rounded-xl z-10 border border-stone-100"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-50 p-2 text-stone-900 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <X size={20} />
              </button>

              <motion.div layoutId={`img-inner-${selectedId}`} className="relative w-full lg:w-1/2 h-[350px] lg:h-[650px]">
                <Image src={selectedImage.src} alt={selectedImage.name} fill className="object-cover" priority sizes="50vw" />
              </motion.div>

              <div className="p-10 lg:p-16 flex flex-col justify-center lg:w-1/2 bg-white">
                <Quote className="text-amber-700/10 mb-6" size={56} strokeWidth={1} />
                <StarRating rating={selectedImage.rating} />
                <p className={`${cormorant.className} text-2xl md:text-3xl text-stone-800 my-8 italic leading-relaxed`}>
                  "{selectedImage.review}"
                </p>
                <div>
                    <p className="font-bold text-stone-900 uppercase tracking-[0.2em] text-[10px]">{selectedImage.name}</p>
                    <p className="text-stone-400 uppercase tracking-[0.1em] text-[9px] mt-1">Verified Experience</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}