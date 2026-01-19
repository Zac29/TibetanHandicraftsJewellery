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
      
      {/* MOBILE + TABLET WRAPPER */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 py-10 lg:px-0 lg:py-0 lg:h-[720px]">

        {/* IMAGE */}
        <div
          className="
            relative
            w-full
            h-[260px]
            sm:h-[320px]
            md:h-[420px]
            lg:absolute
            lg:top-[10px]
            lg:left-[100px]
            lg:w-[1090px]
            lg:h-[667px]
          "
        >
          <Image
            src="/heroImage.jpg"
            alt="Tibetan Handicrafts Collection"
            fill
            priority
            className="object-cover rounded-lg lg:rounded-none"
          />
        </div>

        {/* CARD */}
        <div
          className="
            relative
            mt-6
            w-full
            bg-[#FFD6D1]
            rounded-[12px]
            shadow-md
            px-6
            py-8

            sm:px-8
            sm:py-10

            md:max-w-[620px]
            md:mx-auto

            lg:absolute
            lg:top-[170px]
            lg:right-[10px]
            lg:w-[620px]
            lg:h-[420px]
            lg:px-0
            lg:py-0
          "
        >
          <div className="h-full flex flex-col lg:pl-[40px] lg:pr-[50px] lg:pt-[60px]">

            {/* Subtitle */}
            <p className="text-[#333333] text-[12px] sm:text-[14px] font-semibold tracking-[2.5px] uppercase mb-3">
              New Arrival
            </p>

            {/* Heading */}
            <h1 className="
              text-[#354192]
              text-[28px]
              sm:text-[34px]
              md:text-[40px]
              lg:text-[48px]
              font-bold
              leading-tight
              mb-4
            ">
              Discover Our <br className="hidden sm:block" /> New Collection
            </h1>

            {/* Description */}
            <p className="
              text-[#333333]
              text-[14px]
              sm:text-[15px]
              lg:text-[16px]
              font-medium
              leading-[22px]
              lg:leading-[24px]
              max-w-[460px]
              mb-6
              
            ">
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
                w-full
                sm:w-[180px]
                h-[50px]
                lg:h-[56px]
                bg-[#353F8C]
                text-white
                text-[13px]
                lg:text-[14px]
                font-bold
                uppercase
                tracking-wide
                hover:bg-[#2c3475]
                transition-colors
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
