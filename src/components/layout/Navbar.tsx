"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Search, Heart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="h-[100px] flex justify-center">
        <div className="w-full max-w-[1440px] flex items-center justify-between px-4 sm:px-8 lg:px-[120px]">

          {/* LEFT — Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Tibetan Handicrafts Jewellery"
              width={50}
              height={53}
              priority
            />
          </div>

          {/* CENTER — Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-[40px] text-[16px] font-medium text-black leading-[24px]">
            <Link href="/" className="hover:opacity-70">Home</Link>
            <Link href="/shop" className="hover:opacity-70">Shop</Link>
            <Link href="/about" className="hover:opacity-70">About</Link>
            <Link href="/contact" className="hover:opacity-70">Contact</Link>
          </nav>

          {/* CENTER — Mobile Brand Name */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:hidden text-[15px] font-medium text-black whitespace-nowrap">
            Tibetan Handicrafts Jewellery
          </div>

          {/* RIGHT — Desktop Icons */}
          <div className="hidden lg:flex items-center gap-[24px]">
            <User size={22} strokeWidth={1.8} />
            <Search size={22} strokeWidth={1.8} />
            <Heart size={22} strokeWidth={1.8} />
          </div>

          {/* RIGHT — Mobile User Icon */}
          <div className="lg:hidden flex items-center">
            <User size={22} strokeWidth={1.8} />
          </div>

        </div>
      </div>
    </header>
  );
}
