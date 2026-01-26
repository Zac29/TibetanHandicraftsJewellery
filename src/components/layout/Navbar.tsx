"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Search, Menu, X, ShoppingBag } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const totalScrollableDistance = documentHeight - windowHeight;
      if (totalScrollableDistance > 0) {
        setScrollProgress((window.scrollY / totalScrollableDistance) * 100);
      }
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
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? "py-4 bg-transparent" : "py-6 bg-stone-50 border-b border-stone-200"
        } ${poppins.className}`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between relative">
            
            {/* 1. LOGO BUBBLE */}
            <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled 
                ? "bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-amber-200/50 p-2 rounded-2xl scale-110" 
                : "bg-transparent p-0 rounded-none scale-100"
            }`}>
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border border-amber-100 bg-white">
                  <Image src="/Logo.png" alt="Logo" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                {!isScrolled && (
                  <div className="flex flex-col opacity-100 transition-opacity duration-500">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-amber-700 font-bold leading-none mb-1">Tibetan</span>
                    <span className="text-lg font-light tracking-tighter text-stone-900 italic leading-none">Handicrafts & Jewellery</span>
                  </div>
                )}
              </Link>
            </div>

            {/* 2. NAVIGATION BUBBLE */}
            <nav className={`absolute left-1/2 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled 
                ? "bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-amber-200/50 px-10 py-4 rounded-full opacity-100 visible translate-y-0" 
                : "bg-transparent px-0 py-0 border-transparent opacity-100 visible"
            }`}>
              <ul className="flex items-center gap-10">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="relative text-[11px] md:text-[13px] uppercase tracking-[0.2em] font-semibold text-stone-700 hover:text-amber-800 transition-colors group whitespace-nowrap"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-amber-600 transition-all duration-500 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Progress Line - Hidden within the nav pill when scrolled */}
              {isScrolled && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-stone-100">
                   <div 
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${scrollProgress}%` }}
                   />
                </div>
              )}
            </nav>

            {/* 3. ICONS BUBBLE */}
            <div className={`flex items-center gap-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled 
                ? "bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-amber-200/50 p-2 rounded-2xl" 
                : "bg-transparent p-0 rounded-none"
            }`}>
               <div className={`${isScrolled ? "hidden md:flex" : "flex"}`}>
                <IconButton icon={<Search size={18} />} />
                <IconButton icon={<User size={18} />} />
               </div>
               
               <div className="relative group">
                 {/* <button 
                   onClick={() => setIsMenuOpen(true)}
                   className="p-3 bg-stone-900 text-white rounded-xl shadow-lg hover:bg-amber-800 transition-all duration-500"
                 >
                   <ShoppingBag size={18} strokeWidth={2} />
                 </button> */}
                 {/* <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                   0
                 </span> */}
               </div>
               
               <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-stone-800">
                 <Menu size={24} />
               </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 z-[100] ${isMenuOpen ? "visible" : "invisible"} transition-all duration-500`}>
        <div 
          className={`absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity duration-700 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-stone-50 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="p-10 flex flex-col h-full">
               <div className="flex justify-between items-center mb-16">
                 <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-amber-800">Menu</span>
                 <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                    <X size={24} />
                 </button>
               </div>
               <nav className="flex flex-col gap-8">
                  {navLinks.map((link, i) => (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      className="text-4xl font-light tracking-tighter text-stone-900 hover:text-amber-700 transition-colors"
                      style={{ transitionDelay: `${i * 50}ms` }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
               </nav>
               <div className="mt-auto pt-10 border-t border-stone-200">
                  <p className="text-xs uppercase tracking-widest text-stone-400 mb-4 font-semibold">Follow our journey</p>
                  <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-stone-900">
                    <span className="cursor-pointer hover:text-amber-600">Instagram</span>
                    <span className="cursor-pointer hover:text-amber-600">Pinterest</span>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </>
  );
}

function IconButton({ icon, onClick }: { icon: React.ReactNode, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-3 rounded-xl text-stone-600 hover:text-amber-800 hover:bg-stone-100 transition-all duration-300 flex items-center justify-center"
    >
      {icon}
    </button>
  );
}