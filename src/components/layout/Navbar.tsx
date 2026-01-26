"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, Search, Menu, X, ShoppingBag } from "lucide-react";
import { Poppins, Cormorant_Garamond } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: "italic",
});

export default function LuxuryParallelNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
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
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-stone-900 text-stone-100 py-2 text-center text-[9px] uppercase tracking-[0.4em] font-medium border-b border-stone-800">
        Artisanal Excellence Since 1994 • Global Concierge Shipping
      </div>

      <header
        className={`sticky top-0 left-0 z-50 w-full bg-stone-50 transition-all duration-500 ${
          isScrolled ? "py-3 shadow-sm border-b border-stone-200" : "py-8 border-b border-transparent"
        } ${poppins.className}`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            
            {/* LEFT NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-10 flex-1">
              {navLinks.slice(0, 2).map((link) => (
                <NavLink key={link.name} href={link.href} name={link.name} />
              ))}
            </nav>

            {/* CENTER: PARALLEL LOGO & TEXT */}
            <Link href="/" className="flex items-center group flex-none mx-4 md:mx-8">
              {/* Logo Image */}
              <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-700 group-hover:rotate-[5deg]">
                <Image 
                  src="/Logo.png" 
                  alt="Logo" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>

              {/* Decorative Vertical Divider */}
              <div className="h-10 w-[1px] bg-stone-200 mx-4 md:mx-6 rotate-[15deg]" />

              {/* Text Brand */}
              <div className="flex flex-col">
                <span className="text-[8px] md:text-[9px] uppercase tracking-[0.5em] text-amber-700 font-bold leading-none mb-1.5">
                  Tibetan
                </span>
                <h1 className={`${cormorant.className} text-xl md:text-2xl tracking-tight text-stone-900 leading-none whitespace-nowrap`}>
                  Handicrafts <span className="text-stone-300 font-light">&</span> Jewellery
                </h1>
              </div>
            </Link>

            {/* RIGHT NAVIGATION & ACTIONS */}
            <div className="flex items-center justify-end gap-2 flex-1">
              <div className="hidden md:flex items-center gap-10 mr-8">
                 {navLinks.slice(2).map((link) => (
                    <NavLink key={link.name} href={link.href} name={link.name} />
                  ))}
              </div>

              <div className="flex items-center gap-1">
                <IconButton icon={<Search size={18} strokeWidth={1.5} />} />
                <IconButton icon={<User size={18} strokeWidth={1.5} className="hidden sm:flex" />} />
                
                <button className="relative p-3 hover:bg-stone-100 rounded-full transition-all group">
                  <ShoppingBag size={18} strokeWidth={1.5} className="text-stone-800" />
                  <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-stone-900 text-white text-[7px] flex items-center justify-center rounded-full font-bold">
                    0
                  </span>
                </button>

                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="lg:hidden p-2 text-stone-800 ml-1"
                >
                  <Menu size={24} strokeWidth={1.2} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE MENU (Staggered Animation) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-stone-100">
              <div className="flex items-center gap-3">
                <Image src="/Logo.png" alt="Logo" width={32} height={32} />
                <span className={`${cormorant.className} text-xl italic`}>Menu</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-stone-50 rounded-full">
                <X size={24} strokeWidth={1} />
              </button>
            </div>
            
            <div className="flex-1 px-12 flex flex-col justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={link.href}
                    className={`${cormorant.className} text-5xl text-stone-900`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, name }: { href: string; name: string }) {
  return (
    <Link
      href={href}
      className="relative text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-500 hover:text-stone-900 transition-colors group whitespace-nowrap"
    >
      {name}
      <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-amber-800 transition-all duration-500 group-hover:w-full" />
    </Link>
  );
}

function IconButton({ icon, className = "" }: { icon: React.ReactNode, className?: string }) {
  return (
    <button className={`p-3 text-stone-400 hover:text-stone-900 hover:bg-stone-50 rounded-full transition-all ${className}`}>
      {icon}
    </button>
  );
}