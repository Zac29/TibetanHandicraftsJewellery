"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Search, Heart, Menu, X } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
          isScrolled ? "py-4" : "py-0"
        } ${poppins.className}`}
      >
        <div className="flex justify-center">
          <div className="w-full max-w-[1440px] px-6">

            {/* ===== TOP STATE ===== */}
            {!isScrolled && (
              <div className="h-[100px] flex items-center justify-between">
                <Link href="/" className="relative w-[80px] h-[80px]">
                  <Image src="/logo.png" alt="Logo" fill priority className="object-contain" />
                </Link>

                <nav className="hidden lg:flex gap-[48px]">
                  {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="text-[16px] font-medium hover:text-gray-600 transition">
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="flex items-center gap-5">
                  <User size={22} />
                  <Search size={22} className="hidden sm:block" />
                  <Heart size={22} className="hidden sm:block" />
                  <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
                    <Menu size={24} />
                  </button>
                </div>
              </div>
            )}

            {/* ===== SCROLLED STATE ===== */}
            {isScrolled && (
              <div className="h-[76px] flex items-center gap-6">

                {/* LOGO */}
                <Link
                  href="/"
                  className="flex items-center justify-center bg-white/80 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.12)] rounded-[18px] w-[72px] h-[72px]"
                >
                  <div className="relative w-[44px] h-[44px]">
                    <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                </Link>

                {/* BRAND */}
                <div className="flex-1 flex items-center justify-center bg-white/80 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.12)] rounded-[18px] h-[72px] px-6">
                  <span className="text-[18px] md:text-[20px] font-semibold whitespace-nowrap">
                    Tibetan Handicraft Jewellery
                  </span>
                </div>

                {/* ICONS */}
                <div className="flex items-center gap-5 bg-white/80 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.12)] rounded-[18px] h-[72px] px-6">
                  <User size={22} />
                  <Search size={22} className="hidden sm:block" />
                  <Heart size={22} className="hidden sm:block" />
                  <button onClick={() => setIsMenuOpen(true)}>
                    <Menu size={24} />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* OVERLAY */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* DRAWER */}
        <div
          className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-[0_0_60px_rgba(0,0,0,0.25)]
          transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="p-6 flex justify-between items-center">
            <span className="font-semibold text-lg">Menu</span>
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 px-6 mt-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-[18px] font-medium hover:text-gray-600 transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
