"use client";

import { useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const galleryImages = [
  { src: "/1.png", w: 274, h: 312, x: 0, y: 0, name: "Sarah J.", rating: 5, review: "Absolutely love the intricate details. The craftsmanship is top-notch!" },
  { src: "/10.png", w: 225, h: 300, x: 109, y: 27, name: "Michael T.", rating: 4, review: "Great quality, fits perfectly in my living room." },
  { src: "/8.png", w: 232, h: 295, x: 165, y: 448, name: "Emma W.", rating: 5, review: "Fast shipping and the packaging was beautiful." },
  { src: "/4.png", w: 426, h: 300, x: 313, y: 52, name: "David B.", rating: 5, review: "A true masterpiece. Highly recommended!" },
  { src: "/39.png", w: 344, h: 242, x: 397, y: 398, name: "Jessica L.", rating: 4, review: "Unique designs that you can't find anywhere else." },
  { src: "/9.png", w: 310, h: 511, x: 746, y: 143, name: "Daniel K.", rating: 5, review: "Exceeded my expectations. Will buy again." },
  { src: "/4.png", w: 302, h: 300, x: 995, y: 442, name: "Sophia M.", rating: 5, review: "Customer service was very helpful and kind." },
  { src: "/5.png", w: 452, h: 300, x: 1068, y: 69, name: "James R.", rating: 5, review: "Simply stunning art work." },
  { src: "/3.png", w: 418, h: 300, x: 1294, y: 471, name: "Olivia P.", rating: 4, review: "Good value for money. Looks great." },
  { src: "/6.png", w: 452, h: 300, x: 1391, y: 156, name: "William H.", rating: 5, review: "The colors are so vibrant in person!" },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export default function Testimonials() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedImage = galleryImages.find((img) => img.src === selectedId);

  return (
    <section className={`relative w-full py-16 ${poppins.className} bg-white overflow-hidden min-h-[900px]`}>
      
      {/* HEADER */}
      <div className="container mx-auto px-4 text-center mb-10 relative z-10">
        <p className="text-[#616161] text-lg sm:text-xl font-semibold mb-2">
          Share your love to the Art & Craft
        </p>
        <h2 className="text-[#3A3A3A] text-3xl sm:text-[40px] font-bold">
          #Happy Customers
        </h2>
      </div>

      {/* MOBILE VIEW */}
      <div className="block lg:hidden px-4">
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, index) => (
            <motion.div
              key={`mobile-${index}`}
              layoutId={`image-${img.src}-mobile`}
              onClick={() => setSelectedId(img.src)}
              className="relative w-full overflow-hidden rounded-lg break-inside-avoid shadow-sm cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              <Image src={img.src} alt={img.name} width={img.w} height={img.h} className="w-full h-auto object-cover" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* DESKTOP VIEW */}
      {/* UPDATED CLASSNAMES BELOW:
         [&::-webkit-scrollbar]:hidden -> Hides scrollbar on Chrome/Safari/Webkit
         [-ms-overflow-style:none] -> Hides scrollbar on IE/Edge
         [scrollbar-width:none] -> Hides scrollbar on Firefox
      */}
      <div className="hidden lg:flex w-full overflow-x-auto justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="relative shrink-0 origin-top" style={{ width: "1843px", height: "771px" }}>
          {galleryImages.map((img, index) => (
            <motion.div
              key={`desktop-${index}`}
              layoutId={`image-${img.src}`}
              onClick={() => setSelectedId(img.src)}
              className="absolute overflow-hidden rounded-sm shadow-sm cursor-pointer bg-gray-100"
              style={{
                width: `${img.w}px`,
                height: `${img.h}px`,
                left: `${img.x}px`,
                top: `${img.y}px`,
                zIndex: 1,
              }}
              whileHover={{ 
                scale: 1.1, 
                zIndex: 20, 
                boxShadow: "0px 20px 50px rgba(0,0,0,0.3)",
                rotateX: 5,
                rotateY: 5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image src={img.src} alt={img.name} fill className="object-cover" sizes={`${img.w}px`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* CONSTRAINED OVERLAY */}
      <AnimatePresence>
        {selectedId && selectedImage && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-white/80 backdrop-blur-md"
            />

            {/* The Card */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row max-h-[700px] border border-gray-100"
              layoutId={`card-container-${selectedId}`}
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="absolute top-4 right-4 z-50 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={20} className="text-gray-800" />
              </button>

              <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-gray-50">
                <motion.div layoutId={`image-${selectedId}`} className="w-full h-full relative">
                  <Image src={selectedImage.src} alt={selectedImage.name} fill className="object-cover" />
                </motion.div>
              </div>

              <motion.div 
                className="w-full md:w-1/2 p-8 flex flex-col justify-center text-left"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.15 }}
              >
                <div className="mb-4">
                  <span className="text-blue-600 text-xs font-bold uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
                    Verified Purchase
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.name}</h3>
                <StarRating rating={selectedImage.rating} />
                <p className="text-gray-600 text-lg mt-4 italic leading-relaxed">"{selectedImage.review}"</p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}