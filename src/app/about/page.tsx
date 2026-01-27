"use client";

import PageBanner from "../../components/common/PageBanner";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "600"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "600"] });

export default function AboutPage() {
  return (
    <div className={`bg-[#fcfaf7] ${jost.className}`}>
      <PageBanner
        title="Our Heritage"
        breadcrumb="About"
        imageSrc="/contact-banner.png"
      />

      <section className="py-20 lg:py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* LEFT: STORYTELLING CONTENT */}
            <div className="lg:col-span-5 space-y-8">
              <header className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.5em] text-amber-700 font-bold">
                  Since 1984
                </span>
                <h2 className={`${cormorant.className} text-5xl lg:text-7xl text-stone-900 leading-[1.1]`}>
                  Preserving the <br /> 
                  <span className="italic">Sacred Craft</span>
                </h2>
              </header>

              <div className="space-y-6 text-stone-500 text-lg leading-relaxed font-light">
                <p>
                  Rooted in the high plateaus of Tibet, our collective was born from a desire to 
                  keep the ancient traditions of metalwork and sacred symbolism alive in a modern world.
                </p>
                <p>
                  Every piece in our collection is more than just an object; it is a vessel of 
                  spirituality, handcrafted by artisans who have spent decades perfecting the 
                  delicate balance between raw earth and divine form.
                </p>
              </div>

              <div className="pt-8">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-10 py-5 bg-stone-900 text-white text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-amber-800 transition-all duration-500 group shadow-xl"
                >
                  Explore the Collection
                  <motion.span 
                    animate={{ x: [0, 5, 0] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="ml-4"
                  >
                    →
                  </motion.span>
                </Link>
              </div>
            </div>

            {/* RIGHT: KINETIC IMAGE GRID */}
            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-12 gap-4">
                
                {/* Large Featured Image */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="col-span-8 relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl"
                >
                  <Image src="/decore.png" alt="Artisan Work" fill className="object-cover" />
                </motion.div>

                {/* Floating Secondary Image */}
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="col-span-4 self-end space-y-4"
                >
                  <div className="relative aspect-square rounded-sm overflow-hidden shadow-xl border-4 border-white">
                    <Image src="/Bowl.png" alt="Tibetan Bowl" fill className="object-cover" />
                  </div>
                  
                  {/* The "Experience" Card */}
                  <div className="bg-amber-700 p-8 text-white shadow-2xl">
                    <h4 className="text-4xl font-light mb-1 italic">40+</h4>
                    <p className="text-[9px] uppercase tracking-[0.3em] opacity-80">Years of Craft</p>
                  </div>
                </motion.div>

                {/* Wide Bottom Image */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="col-start-3 col-span-10 relative h-48 mt-4 rounded-sm overflow-hidden"
                >
                  <Image src="/Bowl.png" alt="Detail View" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-stone-900/20" />
                </motion.div>

              </div>

              {/* Decorative Background Element */}
              <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-stone-200/50 rounded-full blur-3xl" />
            </div>

          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="bg-stone-900 py-24 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <h3 className={`${cormorant.className} text-4xl md:text-5xl italic`}>
            "We do not just sell jewellery; we archive the soul of Tibet."
          </h3>
          <div className="w-20 h-[1px] bg-amber-500 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-2xl mb-2 font-light">Authenticity</p>
              <p className="text-stone-400 text-sm tracking-wide">Every stone and metal is ethically sourced from the Himalayan region.</p>
            </div>
            <div>
              <p className="text-2xl mb-2 font-light">Tradition</p>
              <p className="text-stone-400 text-sm tracking-wide">Using techniques passed down through four generations of artisans.</p>
            </div>
            <div>
              <p className="text-2xl mb-2 font-light">Impact</p>
              <p className="text-stone-400 text-sm tracking-wide">10% of all proceeds support Tibetan education and cultural preservation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}