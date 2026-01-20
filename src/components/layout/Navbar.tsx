"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Search, Heart, Menu, X, ShoppingBag } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Handle Sticky State
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 60);

      // 2. Handle Progress Bar Calculation
      // Formula: (Scrolled Amount / (Total Page Height - Viewport Height)) * 100
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Prevent division by zero
      const totalScrollableDistance = documentHeight - windowHeight;
      
      let progress = 0;
      if (totalScrollableDistance > 0) {
        progress = (scrollTop / totalScrollableDistance) * 100;
      }

      // Cap at 100%
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount to set initial state
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled ? "py-2 md:py-4" : "py-0"
        } ${poppins.className}`}
      >
        <div className="flex justify-center">
          <div className="w-full max-w-[1440px] px-4 md:px-6">

            {/* ===== TOP STATE (Standard) ===== */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                isScrolled
                  ? "opacity-0 invisible h-0 pointer-events-none"
                  : "opacity-100 visible h-[70px] md:h-[100px]"
              } flex items-center justify-between`}
            >
              {/* Logo */}
              <Link href="/" className="relative w-[60px] h-[60px] md:w-[80px] md:h-[80px]">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex gap-[48px]">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-[16px] font-medium hover:text-gray-600 transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Icons */}
              <div className="flex items-center gap-3 md:gap-5">
                <Link href="/account" className="hover:opacity-70 transition">
                   <User size={22} className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]" />
                </Link>
                <Search size={22} className="hidden sm:block cursor-pointer hover:opacity-70 transition" />
                <Heart size={22} className="hidden sm:block cursor-pointer hover:opacity-70 transition" />
                <button 
                  className="lg:hidden p-1" 
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="Open Menu"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>

            {/* ===== SCROLLED STATE (Floating Bubbles) ===== */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                isScrolled
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-10 h-0 pointer-events-none"
              } flex items-center justify-between gap-2 md:gap-6`}
            >
              {/* 1. Left Bubble: Logo */}
              <Link
                href="/"
                className="flex items-center justify-center bg-white/90 backdrop-blur-xl shadow-lg rounded-2xl w-[56px] h-[56px] md:w-[72px] md:h-[72px] shrink-0 hover:scale-105 transition-transform"
              >
                <div className="relative w-[32px] h-[32px] md:w-[44px] md:h-[44px]">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>

              {/* 2. Middle Bubble: Brand Name + Progress Bar */}
              <div className="hidden md:flex relative overflow-hidden items-center justify-center bg-white/90 backdrop-blur-xl shadow-lg rounded-2xl h-[72px] px-6 shrink-0 flex-1 max-w-[400px]">
                
                {/* PROGRESS BAR BACKGROUND */}
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#C9A24D] via-[#F5D98B] to-[#C9A24D] transition-all duration-150 ease-out opacity-20"
                  style={{ width: `${scrollProgress}%` }}
                />

                {/* PROGRESS LINE (Optional accent at bottom for visibility) */}
                <div 
                  className="absolute left-0 bottom-0 h-[3px] bg-gradient-to-r from-[#C9A24D] via-[#F5D98B] to-[#C9A24D] transition-all duration-150 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                />

                <span className="relative z-10 text-[16px] lg:text-[20px] font-semibold text-gray-800 whitespace-nowrap">
                  Tibetan Handicraft Jewellery
                </span>
              </div>

              {/* 3. Right Bubble: Icons */}
              <div className="flex flex-1 md:flex-none items-center justify-end md:justify-center gap-4 md:gap-5 bg-white/90 backdrop-blur-xl shadow-lg rounded-2xl h-[56px] md:h-[72px] px-4 md:px-6 min-w-[120px]">
                <User size={22} className="hidden sm:block cursor-pointer hover:text-yellow-600 transition" />
                <Search size={22} className="hidden lg:block cursor-pointer hover:text-yellow-600 transition" />
                {/* <ShoppingBag size={22} className="cursor-pointer hover:text-yellow-600 transition" /> */}
                
                <div className="w-[1px] h-[24px] bg-gray-300 mx-1 hidden sm:block"></div>
                
                <button 
                    onClick={() => setIsMenuOpen(true)} 
                    className="hover:scale-110 transition-transform"
                    aria-label="Open Menu"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed inset-0 z-[100] transition-visibility duration-500 ${
          isMenuOpen ? "visible" : "invisible delay-500"
        }`}
      >
        {/* Dark Overlay */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Side Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-[300px] bg-white shadow-2xl
          transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="p-6 flex justify-between items-center border-b border-gray-100">
            <span className="font-semibold text-lg text-gray-800">Menu</span>
            <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col h-full">
            <nav className="flex flex-col gap-2 p-4">
                {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[18px] font-medium text-gray-600 hover:text-black hover:bg-gray-50 px-4 py-3 rounded-xl transition"
                >
                    {link.name}
                </Link>
                ))}
            </nav>

            {/* Mobile Footer Area */}
            <div className="mt-auto p-6 bg-gray-50 border-t border-gray-100 mb-20">
                <p className="text-sm text-gray-400 mb-4">Follow us</p>
                <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}