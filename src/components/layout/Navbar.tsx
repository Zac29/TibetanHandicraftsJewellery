"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Search, Heart, Menu } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls down more than 50px, toggle state
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`w-full bg-white sticky top-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent ${
        isScrolled ? "shadow-sm border-gray-100" : ""
      } ${poppins.className}`}
    >
      {/* Container Height Transition: 
        100px (Default) -> 80px (Scrolled) for a sleeker look while reading 
      */}
      <div
        className={`w-full flex justify-center bg-white transition-all duration-300 ${
          isScrolled ? "h-[80px]" : "h-[100px]"
        }`}
      >
        <div className="w-full max-w-[1440px] flex items-center justify-between px-6 md:px-12 lg:px-[60px] xl:px-[100px] relative">
          
          {/* --- LEFT: Logo --- */}
          <Link href="/" className="flex-shrink-0 cursor-pointer z-10">
            {/* Logo scales down slightly when scrolled */}
            <div
              className={`relative transition-all duration-300 ${
                isScrolled ? "w-[60px] h-[60px]" : "w-[80px] h-[80px]"
              }`}
            >
              <Image
                src="/logo.png"
                alt="Tibetan Handicrafts Jewellery"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* --- CENTER: Dual Layer (Nav Links vs Brand Text) --- */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            
            {/* Layer 1: Navigation Links (Visible when at TOP) */}
            <nav
              className={`hidden lg:flex items-center gap-[45px] transition-all duration-300 transform ${
                isScrolled
                  ? "opacity-0 translate-y-4 pointer-events-none"
                  : "opacity-100 translate-y-0 pointer-events-auto"
              }`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[16px] font-medium text-black tracking-wide hover:text-gray-600 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Layer 2: Brand Name (Visible when SCROLLED) */}
            <span
              className={`text-[20px] font-semibold text-black tracking-tight whitespace-nowrap transition-all duration-300 transform absolute ${
                isScrolled
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              Tibetan Handicraft Jewellery
            </span>
          </div>

          {/* --- RIGHT: Icons --- */}
          <div className="flex items-center gap-[20px] md:gap-[28px] z-10">
            {/* User Icon */}
            <button className="group flex items-center gap-1 hover:opacity-70 transition-opacity">
              <User size={24} color="black" strokeWidth={2} />
              
            </button>

            {/* Other Icons - Optional: You can hide these on scroll if you ONLY want the user icon, 
                but standard UX suggests keeping them accessible. */}
            <button className="hover:opacity-70 transition-opacity hidden sm:block">
              <Search size={24} color="black" strokeWidth={2} />
            </button>

            <button className="hover:opacity-70 transition-opacity hidden sm:block">
              <Heart size={24} color="black" strokeWidth={2} />
            </button>

            {/* Mobile Menu Trigger (Hamburger) */}
            {/* If scrolled, we might want to show this on desktop too since the links are gone? 
                For now, kept as mobile-only based on request. */}
            <button className="lg:hidden ml-2 hover:opacity-70">
              <Menu size={24} color="black" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}