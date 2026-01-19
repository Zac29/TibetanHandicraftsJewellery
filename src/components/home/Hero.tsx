"use client";

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

export default function Hero() {
  return (
    <section className={`w-full bg-white ${poppins.variable} font-sans`}>
      <div className="relative w-[1440px] h-[720px] mx-auto">

        {/* IMAGE — EXACT FIGMA POSITION */}
        <Image
          src="/heroImage.jpg"
          alt="Tibetan Handicrafts Collection"
          width={1090}
          height={667}
          priority
          className="
            absolute
            top-[10px]
            left-[100px]
            opacity-100
            // object-cover
          "
        />

        {/* CARD — EXACT OVERLAY POSITION */}
        <div
          className="
            absolute
            top-[170px]
            right-[10px]
            w-[620px]
            h-[420px]
            bg-[#FFD6D1]
            rounded-[12px]
            shadow-md
          "
        >
          <div className="h-full flex flex-col pl-[40px] pr-[50px] pt-[60px]">

            {/* Subtitle */}
            <p className="text-[#333333] text-[14px] font-semibold tracking-[2.5px] uppercase mb-[14px]">
              New Arrival
            </p>

            {/* Heading */}
            <h1 className="text-[#354192] text-[48px] font-bold leading-[58px] mb-[16px]">
              Discover Our <br /> New Collection
            </h1>

            {/* Description */}
            <p className="text-[#333333] text-[16px] font-medium leading-[24px] max-w-[460px] mb-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>

            {/* Button */}
            <Link
              href="/shop"
              className="
                inline-flex
                items-center
                justify-center
                w-[180px]
                h-[56px]
                bg-[#353F8C]
                text-white
                text-[14px]
                font-bold
                uppercase
                tracking-wide
                hover:bg-[#2c3475]
                transition-colors
                mb-[40px]
              "
            >
              Buy Now
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
