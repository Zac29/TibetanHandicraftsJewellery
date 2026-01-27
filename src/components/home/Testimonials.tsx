"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Quote } from "lucide-react";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600"] });
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "700"] });

const galleryImages = [
  { id: 1, src: "/1.png", w: 280, h: 320, x: 0, y: 40, name: "Sarah J.", rating: 5, review: "The intricate details on the mandala are breathtaking. A true spiritual center for my home." },
  { id: 2, src: "/10.png", w: 240, h: 340, x: 300, y: 0, name: "Michael T.", rating: 4, review: "Exceptional weight and quality. You can feel the artisan's hand in the metalwork." },
  { id: 3, src: "/8.png", w: 240, h: 300, x: 280, y: 360, name: "Emma W.", rating: 5, review: "Fast shipping and the packaging was museum-grade. Safely arrived in London." },
  { id: 4, src: "/4.png", w: 420, h: 280, x: 560, y: 20, name: "David B.", rating: 5, review: "A masterpiece of Tibetan craft. The gold leafing is applied with incredible precision." },
  { id: 5, src: "/39.png", w: 340, h: 240, x: 540, y: 320, name: "Jessica L.", rating: 4, review: "Unique designs that bridge the gap between ancient tradition and modern decor." },
  { id: 6, src: "/9.png", w: 320, h: 520, x: 900, y: 100, name: "Daniel K.", rating: 5, review: "The resonance lingers for minutes. Truly high-grade bronze." },
  { id: 7, src: "/4.png", w: 300, h: 300, x: 1240, y: 380, name: "Sophia M.", rating: 5, review: "The concierge team helped me select the right Thangka for my meditation space." },
  { id: 8, src: "/5.png", w: 450, h: 320, x: 1240, y: 40, name: "James R.", rating: 5, review: "Exquisite silverwork. The turquoise inlay is vibrant and perfectly set." },
];

const smoothSpring = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.8,
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "fill-amber-600 text-amber-600" : "fill-stone-200 text-stone-200"}
      />
    ))}
  </div>
);

export default function Testimonials() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedImage = galleryImages.find((img) => img.src === selectedId);

  return (
    <section className={`relative w-full py-12 md:py-24 ${jost.className} bg-white overflow-hidden min-h-screen`}>
      
      {/* HEADER */}
      <div className="container mx-auto px-6 text-center mb-12 md:mb-16 relative z-10">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-amber-700 text-[10px] uppercase tracking-[0.5em] font-bold block mb-4"
        >
          Community Voices
        </motion.span>
        <h2 className={`${cormorant.className} text-stone-900 text-3xl md:text-5xl lg:text-6xl`}>
          Shared <span className="italic font-light text-stone-500 text-2xl md:text-5xl">Journeys</span>
        </h2>
      </div>

      {/* MOBILE GALLERY (Masonry Grid) */}
      <div className="lg:hidden px-4 md:px-8 columns-2 md:columns-3 gap-4 space-y-4">
        {galleryImages.map((img) => (
          <motion.div
            key={`mobile-${img.id}`}
            layoutId={`card-${img.src}`}
            onClick={() => setSelectedId(img.src)}
            className="relative break-inside-avoid overflow-hidden bg-stone-100 border border-stone-200 cursor-pointer will-change-transform"
            whileTap={{ scale: 0.98 }}
          >
             <motion.div layoutId={`img-container-${img.src}`} className="relative aspect-[4/5] w-full h-full">
                <Image 
                  src={img.src} 
                  alt={img.name} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
          </motion.div>
        ))}
      </div>

      {/* DESKTOP CANVAS (Kinetic scattered layout) */}
      <div className="hidden lg:block relative w-full overflow-x-auto pb-12 [&::-webkit-scrollbar]:hidden">
        <div className="relative shrink-0 px-[10vw]" style={{ width: "1800px", height: "700px" }}>
          {galleryImages.map((img) => (
            <motion.div
              key={`desktop-${img.id}`}
              layoutId={`card-${img.src}`}
              onClick={() => setSelectedId(img.src)}
              transition={smoothSpring}
              className="absolute overflow-hidden bg-stone-100 group border border-stone-200 cursor-pointer will-change-transform"
              style={{
                width: `${img.w}px`,
                height: `${img.h}px`,
                left: `${img.x}px`,
                top: `${img.y}px`,
              }}
              whileHover={{ y: -8, zIndex: 20, boxShadow: "0px 20px 40px rgba(0,0,0,0.08)" }}
            >
              <motion.div layoutId={`img-container-${img.src}`} className="relative w-full h-full">
                <Image 
                  src={img.src} 
                  alt={img.name} 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  sizes="400px"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RESPONSIVE MODAL */}
      <AnimatePresence>
        {selectedId && selectedImage && (
          <div className="fixed inset-0 lg:absolute z-[100] flex items-end lg:items-center justify-center p-0 lg:p-6 pointer-events-none">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-white/95 lg:bg-white/90 backdrop-blur-md pointer-events-auto"
            />

            <motion.div
              layoutId={`card-${selectedId}`}
              transition={smoothSpring}
              className="relative bg-white w-full h-[90vh] lg:h-auto max-w-4xl flex flex-col lg:flex-row shadow-2xl overflow-y-auto lg:overflow-hidden border-t lg:border border-stone-100 pointer-events-auto will-change-transform rounded-t-3xl lg:rounded-none"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="absolute top-6 right-6 z-50 p-2 bg-white/80 backdrop-blur-md rounded-full lg:bg-transparent text-stone-900 hover:text-amber-800 transition-colors"
              >
                <X strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <motion.div 
                layoutId={`img-container-${selectedId}`} 
                className="relative w-full lg:w-[45%] h-[40vh] lg:h-[600px] shrink-0"
              >
                <Image 
                  src={selectedImage.src} 
                  alt={selectedImage.name} 
                  fill 
                  className="object-cover" 
                  priority
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 }}
                className="w-full lg:w-[55%] p-8 md:p-10 lg:p-14 flex flex-col justify-center bg-white"
              >
                <Quote className="text-amber-700/20 mb-4 lg:mb-6" size={32} />
                <StarRating rating={selectedImage.rating} />
                <p className={`${cormorant.className} text-xl md:text-2xl lg:text-3xl text-stone-800 my-4 lg:my-6 italic leading-snug`}>
                  "{selectedImage.review}"
                </p>
                <div className="mt-2 lg:mt-4">
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-stone-900">
                    {selectedImage.name}
                  </p>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1">
                    Verified Collector
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}