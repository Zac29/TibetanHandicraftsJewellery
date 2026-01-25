"use client";

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function Footer() {
  return (
    <footer
      className={`w-full bg-white border-t border-black/20 ${poppins.className}`}
    >
      {/* CONTAINER */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] pt-[60px] pb-[40px]">

        {/* TOP GRID */}
        <div className="
          grid
          grid-cols-1
          gap-12
          sm:grid-cols-2
          lg:grid-cols-4
        ">
          
          {/* LOGO */}
          <div>
            <div className="relative w-[196px] h-[131px] mb-4">
              <Image
                src="/logoFooter.png"
                alt="Tibetan Handicraft Jewellery"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* LINKS */}
          <div>
            <p className="text-[16px] font-medium text-[#9F9F9F] mb-6">
              Links
            </p>
            <ul className="space-y-4">
              <li><Link href="/" className="text-[16px] font-medium hover:opacity-70">Home</Link></li>
              <li><Link href="/products" className="text-[16px] font-medium hover:opacity-70">Product</Link></li>
              <li><Link href="/about" className="text-[16px] font-medium hover:opacity-70">About</Link></li>
              <li><Link href="/contact" className="text-[16px] font-medium hover:opacity-70">Contact</Link></li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <p className="text-[16px] font-medium text-[#9F9F9F] mb-6">
              Help
            </p>
            <ul className="space-y-4">
              <li className="text-[16px] font-medium">Payment Options</li>
              <li className="text-[16px] font-medium">Returns</li>
              <li className="text-[16px] font-medium">Privacy Policies</li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <p className="text-[16px] font-medium text-[#9F9F9F] mb-6">
              Newsletter
            </p>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
              {/* EMAIL */}
              <div className="w-full sm:w-[240px]">
                <p className="text-[14px] text-[#9F9F9F] mb-2">
                  Enter Your Email Address
                </p>
                <div className="w-full h-[1px] bg-black" />
              </div>

              {/* SUBSCRIBE */}
              <div className="cursor-pointer">
                <p className="text-[14px] font-medium mb-2">
                  SUBSCRIBE
                </p>
                <div className="w-[80px] h-[1px] bg-black" />
              </div>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="w-full h-[1px] bg-[#D9D9D9] my-10" />

        {/* COPYRIGHT */}
        <p className="text-[14px] sm:text-[16px] text-center sm:text-left">
          2026 The Cyber Loom PVT. LTD All rights received
        </p>

      </div>
    </footer>
  );
}
