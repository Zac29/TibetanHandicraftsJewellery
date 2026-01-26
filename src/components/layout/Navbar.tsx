"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ShoppingBag, Search, Plus } from "lucide-react";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "600"] });

export default function SolidKineticNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // High-end spring physics for "Heavy Luxury" feel
  const smoothY = useSpring(scrollY, { stiffness: 50, damping: 20 });

  // Physical transformations - No Transparency
  const headerHeight = useTransform(smoothY, [0, 100], ["120px", "80px"]);
  const logoScale = useTransform(smoothY, [0, 100], [1, 0.7]);
  const contentGap = useTransform(smoothY, [0, 100], ["40px", "20px"]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // UPDATED NAMES HERE
  const navLinks = [ "PRODUCTS", "About", "CONTACT"];

  return (
    <>
      <motion.header
        style={{ height: headerHeight }}
        className={`fixed top-0 left-0 w-full z-50 flex items-center shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-700 ${
          isScrolled ? "bg-[#fcfaf7]" : "bg-[#f3f1ee]"
        }`}
      >
        {/* Decorative Gold Lip at the very bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        <div className="container mx-auto px-8 md:px-16 flex items-center justify-between">
          
          {/* LEFT: MINIMAL UTILITY */}
          <div className="flex-1 flex items-center">
            <button className="group flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-stone-900 transition-all duration-500 bg-white">
                <Search size={16} strokeWidth={1} className="text-stone-400 group-hover:text-stone-950" />
              </div>
              <span className={`${jost.className} text-[9px] uppercase tracking-[0.6em] text-stone-400 hidden lg:block`}>Discover</span>
            </button>
          </div>

          {/* CENTER: THE PARALLEL MONOLITH */}
          <motion.div 
            style={{ scale: logoScale, gap: contentGap }} 
            className="flex items-center group cursor-pointer"
          >
            <Link href="/" className="flex items-center">
              <div className="relative w-14 h-14 md:w-16 md:h-16 transition-transform duration-1000 group-hover:rotate-[15deg]">
                <Image src="/Logo.png" alt="Logo" fill className="object-contain" priority />
              </div>
              
              {/* Vertical Solid Divider */}
              <motion.div 
                animate={{ rotate: isScrolled ? 0 : 25 }}
                className="w-[1px] h-10 bg-stone-300 mx-8 transition-all duration-700" 
              />

              <div className="flex flex-col">
                <h1 className={`${cormorant.className} text-3xl md:text-4xl leading-none text-stone-900`}>
                  Tibetan 
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="h-[1px] w-4 bg-amber-500" />
                  <span className={`${jost.className} text-[8px] uppercase tracking-[0.8em] text-amber-700 font-semibold`}>
                    Handicraft & Jewellery
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* RIGHT: THE NAVIGATION & CART */}
          <div className="flex-1 flex items-center justify-end gap-10">
            <nav className="hidden xl:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link 
    key={link} 
    // CHANGE THIS LINE:
    href={link === "HOME" ? "/" : `/${link.toLowerCase().replace(/\s+/g, '-')}`} 
    className={`${jost.className} text-[10px] uppercase tracking-[0.4em] text-stone-400 hover:text-stone-950 transition-all group relative`}
  >
    {link}
    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-500 transition-all duration-500 group-hover:w-full" />
  </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button className="relative w-12 h-12 flex items-center justify-center bg-white border border-stone-100 rounded-full shadow-sm group hover:bg-stone-900 transition-all duration-500">
                <ShoppingBag size={18} strokeWidth={1} className="text-stone-950 group-hover:text-white transition-colors" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 text-white text-[9px] flex items-center justify-center rounded-full font-bold">0</span>
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-stone-950 rounded-xl group hover:bg-amber-700 transition-all duration-500"
              >
                <div className="w-5 h-[1px] bg-white group-hover:w-3 transition-all" />
                <div className="w-5 h-[1px] bg-white group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* THE CINEMATIC SOLID OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 z-[100] bg-[#121212] flex flex-col"
          >
            {/* Top Bar inside Menu */}
            <div className="p-12 flex justify-between items-center">
              <Image src="/Logo.png" alt="Logo" width={40} height={40} className="brightness-200" />
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center gap-4 text-stone-500 hover:text-white transition-all"
              >
                <span className="text-[10px] uppercase tracking-[0.5em]">Close Vault</span>
                <div className="p-4 border border-stone-800 rounded-full group-hover:rotate-90 transition-all duration-700">
                  <Plus size={24} className="rotate-45" />
                </div>
              </button>
            </div>

            {/* Menu Links - UPDATED NAMES HERE */}
            <div className="flex-1 flex flex-col justify-center items-center gap-8">
              {["HOME", "PRODUCTS", "OUR STORY", "CONTACT"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link 
        // CHANGE THIS LINE:
        href={item === "HOME" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
        onClick={() => setIsMenuOpen(false)}
        className={`${cormorant.className} text-5xl md:text-8xl text-stone-700 hover:text-white hover:tracking-widest transition-all duration-1000`}
      >
        {item}
      </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer inside Menu */}
            <div className="p-20 flex justify-between items-end border-t border-stone-900">
               <div className="space-y-4">
                 <p className={`${jost.className} text-[10px] uppercase tracking-[0.5em] text-stone-500`}>Global Concierge</p>
                 <p className="text-white text-xl">studio@tibetanarts.com</p>
               </div>
               <div className="flex gap-10">
                 {["IG", "PN", "TW"].map(s => (
                   <span key={s} className="w-12 h-12 border border-stone-800 rounded-full flex items-center justify-center text-[10px] text-stone-400 hover:text-white hover:border-white transition-all cursor-pointer">{s}</span>
                 ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}