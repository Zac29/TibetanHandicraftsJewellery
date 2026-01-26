"use client";

import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { motion } from "framer-motion";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function SolidKineticFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full bg-[#fcfaf7] border-t border-stone-200 relative overflow-hidden ${jost.className}`}>
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-20 pb-10">
        
        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* BRAND BLOCK (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="relative w-[180px] h-[100px]">
              <Image
                src="/logoFooter.png"
                alt="Tibetan Arts"
                fill
                className="object-contain"
              />
            </div>
            <p className={`${cormorant.className} text-stone-500 text-lg leading-relaxed max-w-sm`}>
              Preserving the spirit of Tibetan heritage through meticulously crafted jewellery and sacred arts.
            </p>
            <div className="flex gap-6">
              {['Instagram', 'Pinterest', 'Twitter'].map((social) => (
                <Link 
                  key={social} 
                  href="#" 
                  className="text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-amber-700 transition-colors"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>

          {/* QUICK LINKS (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.4em] text-stone-900 font-semibold">Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-sm text-stone-500 hover:text-stone-900 transition-all hover:pl-2">Home</Link></li>
              <li><Link href="/products" className="text-sm text-stone-500 hover:text-stone-900 transition-all hover:pl-2">Products</Link></li>
              <li><Link href="/about" className="text-sm text-stone-500 hover:text-stone-900 transition-all hover:pl-2">Our Story</Link></li>
              <li><Link href="/contact" className="text-sm text-stone-500 hover:text-stone-900 transition-all hover:pl-2">Contact</Link></li>
            </ul>
          </div>

          {/* ASSISTANCE (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.4em] text-stone-900 font-semibold">Help</h4>
            <ul className="space-y-4">
              <li><Link href="/payment" className="text-sm text-stone-500 hover:text-stone-900 transition-all hover:pl-2">Payment Options</Link></li>
              <li><Link href="/returns" className="text-sm text-stone-500 hover:text-stone-900 transition-all hover:pl-2">Returns</Link></li>
              <li><Link href="/privacy" className="text-sm text-stone-500 hover:text-stone-900 transition-all hover:pl-2">Privacy Policies</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.4em] text-stone-900 font-semibold">Newsletter</h4>
            <div className="flex flex-col gap-6">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  className="w-full bg-transparent border-b border-stone-300 py-3 text-[11px] tracking-widest outline-none focus:border-stone-900 transition-colors placeholder:text-stone-400"
                />
                <button className="absolute right-0 bottom-3 text-[10px] font-bold tracking-[0.3em] text-stone-900 hover:text-amber-700 transition-colors uppercase">
                  Subscribe
                </button>
              </div>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest leading-loose">
                Join our collective for archival releases and artisan stories.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
            &copy; {currentYear} Tibetan Arts Atelier. All rights reserved.
          </p>
          <div className="flex gap-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 cursor-pointer hover:text-stone-900 transition-colors">
              The Cyber Loom PVT. LTD
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}