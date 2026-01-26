"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, Search, Menu, X, ShoppingBag } from "lucide-react";
import { Poppins, Cormorant_Garamond } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: "italic",
});

export default function LuxuryNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) setScrollProgress((window.scrollY / totalScroll) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Our Story", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-stone-900 text-stone-100 py-2.5 text-center text-[9px] uppercase tracking-[0.4em] font-medium border-b border-stone-800 relative z-[60]">
        Artisanal Excellence Since 1994 • Global Concierge Shipping
      </div>

      <header
        className={`fixed left-0 z-50 w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isScrolled 
            ? "top-4 bg-transparent" 
            : "top-[37px] bg-stone-50 border-b border-stone-200 py-6"
        } ${poppins.className}`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between relative">
            
            {/* LOGO BUBBLE (Parallel Style) */}
            <motion.div 
              layout
              className={`flex items-center transition-all duration-700 ${
                isScrolled 
                  ? "bg-white/90 backdrop-blur-md shadow-xl border border-stone-200 p-2 rounded-2xl" 
                  : ""
              }`}
            >
              <Link href="/" className="flex items-center group">
                <div className={`relative transition-all duration-700 ${isScrolled ? "w-10 h-10" : "w-14 h-14"}`}>
                  <Image src="/Logo.png" alt="Logo" fill className="object-contain transition-transform group-hover:rotate-12" />
                </div>
                
                {/* Divider Line (Only visible when not scrolled or on large screens) */}
                <div className={`h-8 w-[1px] bg-stone-200 mx-4 rotate-[15deg] transition-opacity ${isScrolled ? "hidden lg:block" : "block"}`} />

                <div className={`flex flex-col transition-all duration-500 ${isScrolled ? "hidden lg:flex" : "flex"}`}>
                  <span className="text-[10px] uppercase tracking-[0.5em] text-amber-700 font-bold leading-none mb-1">Tibetan</span>
                  <span className={`${cormorant.className} text-xl tracking-tight text-stone-900 leading-none`}>
                    Handicrafts <span className="text-stone-300 font-light">&</span> Jewellery
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* NAVIGATION PILL */}
            <nav className={`absolute left-1/2 -translate-x-1/2 transition-all duration-700 ${
              isScrolled 
                ? "bg-white/90 backdrop-blur-md shadow-xl border border-stone-200 px-10 py-4 rounded-full" 
                : "hidden lg:block"
            }`}>
              <ul className="flex items-center gap-10">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="relative text-[11px] uppercase tracking-[0.25em] font-semibold text-stone-500 hover:text-amber-800 transition-colors group"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-600 transition-all duration-500 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
              {isScrolled && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[1px] bg-stone-100 overflow-hidden">
                   <div 
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${scrollProgress}%` }}
                   />
                </div>
              )}
            </nav>

            {/* ACTIONS BUBBLE */}
            <div className={`flex items-center gap-1 transition-all duration-700 ${
              isScrolled 
                ? "bg-white/90 backdrop-blur-md shadow-xl border border-stone-200 p-2 rounded-2xl" 
                : ""
            }`}>
              <div className="hidden sm:flex">
                <IconButton icon={<Search size={19} strokeWidth={1.5} />} />
                <IconButton icon={<User size={19} strokeWidth={1.5} />} />
              </div>
              
              <button className="relative p-3 hover:bg-stone-100 rounded-full transition-all group">
                <ShoppingBag size={19} strokeWidth={1.5} className="text-stone-800" />
                <span className="absolute top-2 right-2 w-4 h-4 bg-stone-900 text-white text-[8px] flex items-center justify-center rounded-full border border-stone-50 font-bold group-hover:bg-amber-800 transition-colors">
                  0
                </span>
              </button>
              
              <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-stone-800">
                <Menu size={26} strokeWidth={1.2} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-stone-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-stone-50 shadow-2xl p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-amber-800">Navigation</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 border border-stone-200 rounded-full hover:rotate-90 transition-all duration-300">
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <Link 
                      href={link.href}
                      className={`${cormorant.className} text-5xl font-light text-stone-900 hover:italic hover:text-amber-800 transition-all`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-10 border-t border-stone-200">
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-6 font-semibold">The Journal</p>
                <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-stone-900">
                  <span className="hover:text-amber-600 transition-colors cursor-pointer">Instagram</span>
                  <span className="hover:text-amber-600 transition-colors cursor-pointer">Pinterest</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function IconButton({ icon, onClick, className = "" }: { icon: React.ReactNode, onClick?: () => void, className?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-full text-stone-500 hover:text-stone-900 hover:bg-white transition-all duration-300 flex items-center justify-center ${className}`}
    >
      {icon}
    </button>
  );
}