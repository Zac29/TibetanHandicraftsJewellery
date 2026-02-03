"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring 
} from "framer-motion";
import { 
  Search, 
  Plus, 
  User, 
  Facebook,
  Instagram,
  X 
} from "lucide-react";
import { Cormorant_Garamond, Jost } from "next/font/google";

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
  </svg>
);

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "600"] });

export default function SolidKineticNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null); // Ref for click-outside detection

  // High-end spring physics
  const smoothY = useSpring(scrollY, { stiffness: 50, damping: 20 });

  // Physical transformations
  const headerHeight = useTransform(smoothY, [0, 100], ["120px", "80px"]);
  const logoScale = useTransform(smoothY, [0, 100], [1, 0.7]);
  const contentGap = useTransform(smoothY, [0, 100], ["40px", "20px"]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Click Outside Search to Close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isSearchOpen]);

  const navLinks = ["PRODUCTS", "About", "CONTACT"];

  return (
    <>
      <motion.header
        style={{ height: headerHeight }}
        className={`fixed top-0 left-0 w-full z-50 flex items-center shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-700 ${
          isScrolled ? "bg-[#fcfaf7]" : "bg-[#f3f1ee]"
        }`}
      >
        {/* Decorative Gold Lip */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        {/* Responsive Container */}
        <div className="container mx-auto px-4 md:px-16 flex items-center justify-between">
          
          {/* LEFT: MINIMAL UTILITY & SEARCH */}
          <div className="flex-1 flex items-center relative z-20">
            <div 
              ref={searchContainerRef} // Attached Ref here to detect clicks
              className="flex items-center gap-2"
            >
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="group flex items-center gap-4 focus:outline-none"
              >
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 bg-white ${isSearchOpen ? 'border-amber-500 text-amber-600' : 'border-stone-200 group-hover:border-stone-900 text-stone-400 group-hover:text-stone-950'}`}>
                   {isSearchOpen ? <X size={16} /> : <Search size={16} strokeWidth={1} />}
                </div>
                {/* Text Hidden on Search Open */}
                <AnimatePresence>
                  {!isSearchOpen && (
                    <motion.span 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className={`${jost.className} text-[9px] uppercase tracking-[0.6em] text-stone-400 hidden lg:block whitespace-nowrap overflow-hidden`}
                    >
                      Discover
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* EXPANDING SEARCH BAR */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0, x: -10 }}
                    animate={{ opacity: 1, width: "160px", x: 0 }}
                    exit={{ opacity: 0, width: 0, x: -10 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="overflow-hidden"
                  >
                    <input 
                      ref={inputRef}
                      type="text" 
                      placeholder="Search..." 
                      className={`${jost.className} w-full h-8 bg-transparent border-b border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-amber-500 placeholder:text-stone-300 px-2`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CENTER: THE PARALLEL MONOLITH */}
          <motion.div 
            style={{ scale: logoScale, gap: contentGap }} 
            className="flex items-center group cursor-pointer justify-center"
          >
            <Link href="/" className="flex items-center">
              <div className="relative w-10 h-10 md:w-16 md:h-16 transition-transform duration-1000 group-hover:rotate-[15deg] flex-shrink-0">
                <Image src="/Logo.png" alt="Logo" fill className="object-contain" priority />
              </div>
              
              {/* Vertical Solid Divider */}
              <motion.div 
                animate={{ rotate: isScrolled ? 0 : 25 }}
                className="w-[1px] h-8 md:h-10 bg-stone-300 mx-3 md:mx-8 transition-all duration-700" 
              />

              <div className="flex flex-col">
                <h1 className={`${cormorant.className} text-xl md:text-3xl lg:text-4xl leading-none text-stone-900 whitespace-nowrap`}>
                  Tibetan 
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="h-[1px] w-2 md:w-4 bg-amber-500" />
                  <span className={`${jost.className} text-[6px] md:text-[8px] uppercase tracking-[0.4em] md:tracking-[0.8em] text-amber-700 font-semibold whitespace-nowrap`}>
                  Handicraft & Jewellery
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* RIGHT: THE NAVIGATION & USER */}
          <div className="flex-1 flex items-center justify-end gap-4 md:gap-10">
            <nav className="hidden xl:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link} 
                  href={link === "HOME" ? "/" : `/${link.toLowerCase().replace(/\s+/g, '-')}`} 
                  className={`${jost.className} text-[10px] uppercase tracking-[0.4em] text-stone-400 hover:text-stone-950 transition-all group relative`}
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-500 transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
              <button className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border border-stone-100 rounded-full shadow-sm group hover:bg-stone-900 transition-all duration-500">
                <User size={18} strokeWidth={1} className="text-stone-950 group-hover:text-white transition-colors" />
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="w-10 h-10 md:w-12 md:h-12 flex flex-col items-center justify-center gap-1.5 bg-stone-950 rounded-xl group hover:bg-amber-700 transition-all duration-500"
              >
                <div className="w-5 h-[1px] bg-white group-hover:w-3 transition-all" />
                <div className="w-5 h-[1px] bg-white group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* SOCIAL ICONS */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-4">
          <Link href="#" className="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-stone-800 hover:bg-[#E1306C] hover:text-white transition-all duration-300">
            <Instagram size={18} />
          </Link>
          <Link href="#" className="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-stone-800 hover:bg-[#1877F2] hover:text-white transition-all duration-300">
            <Facebook size={18} />
          </Link>
          <Link href="#" className="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-stone-800 hover:bg-[#25D366] hover:text-white transition-all duration-300">
            <WhatsAppIcon className="w-[18px] h-[18px]" />
          </Link>
          <div className="h-8 w-[1px] bg-stone-300/50 mt-2"></div>
      </div>

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
            <div className="p-8 md:p-12 flex justify-between items-center">
              <div className="relative w-16 h-16 md:w-24 md:h-24">
                 <Image src="/Logo.png" alt="Logo" fill className="object-contain brightness-200" />
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center gap-4 text-stone-500 hover:text-white transition-all"
              >
                <span className="text-[10px] uppercase tracking-[0.5em] hidden md:block">Close Vault</span>
                <div className="p-3 md:p-4 border border-stone-800 rounded-full group-hover:rotate-90 transition-all duration-700">
                  <Plus size={24} className="rotate-45" />
                </div>
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 flex flex-col justify-center items-center gap-6 md:gap-8">
              {["HOME", "PRODUCTS", "ABOUT", "CONTACT"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link 
                    href={item === "HOME" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${cormorant.className} text-4xl md:text-8xl text-stone-700 hover:text-white hover:tracking-widest transition-all duration-1000`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer inside Menu */}
            <div className="p-8 md:p-20 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-stone-900 gap-6">
               <div className="space-y-4 text-center md:text-left">
                 <p className={`${jost.className} text-[10px] uppercase tracking-[0.5em] text-stone-500`}>Global Sailor/Exporter</p>
                 <p className="text-white text-lg md:text-xl">sidbodhgaya@gmail.com</p>
               </div>
               
               <div className="flex gap-10">
                 {[
                   { id: "IG", icon: <Instagram size={16}/> }, 
                   { id: "FB", icon: <Facebook size={16}/> }, 
                   { id: "WA", icon: <WhatsAppIcon className="w-4 h-4"/> }
                 ].map(s => (
                   <span key={s.id} className="w-12 h-12 border border-stone-800 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all cursor-pointer">
                     {s.icon}
                   </span>
                 ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}