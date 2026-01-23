"use client";

import Image from "next/image";
import { Phone, Mail, Printer, ChevronDown } from "lucide-react";
import { Montserrat } from "next/font/google";

// 1. Load the specific font weights from the design
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

export default function ContactSection() {
  return (
    <section 
      className={`w-full flex justify-center py-20 bg-[#E7EBF0] ${montserrat.variable} font-sans overflow-x-hidden`}
    >
      {/* MAIN CARD 
        Dimensions: 1369px x 900px 
        Radius: 10px 50px 50px 10px
      */}
      <div 
        className="relative bg-white shadow-[0px_141px_200px_-80px_rgba(25,58,75,0.3)] overflow-hidden shrink-0 hidden xl:block"
        style={{
          width: "1369px",
          height: "900px",
          borderRadius: "10px 50px 50px 10px",
        }}
      >
        {/* =======================
            1. RIGHT PINK PANEL 
            Rectangle 31
            w: 419px, h: 900px, left: 974px
           ======================= */}
        <div 
          className="absolute bg-[#DD5471]"
          style={{
            width: "419px",
            height: "900px",
            left: "974px",
            top: "0px",
          }}
        />

        {/* =======================
            2. MAP IMAGE
            Component 6
            w: 545px, h: 700px, left: 721px, top: 100px
           ======================= */}
        <div 
          className="absolute overflow-hidden shadow-lg"
          style={{
            width: "545px",
            height: "700px",
            left: "721px",
            top: "100px",
          }}
        >
          {/* Using a placeholder map image - replace src with your actual map image */}
          <iframe
  src="https://www.google.com/maps?q=Bangladesh%20Buddhist%20Monastery&output=embed"
  className="w-full h-full border-0"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
          
          {/* Map Marker (Red Pin) */}
          <div 
            className="absolute flex items-center justify-center drop-shadow-md"
            style={{
              left: "180px", 
              top: "376px",
              width: "50px",
              height: "50px",
            }}
          >
            <div className="w-[50px] h-[50px] bg-[#FF0004] rounded-full flex items-center justify-center relative">
               <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
               {/* Little triangle for pin effect if needed, otherwise circle as per design */}
            </div>
          </div>
        </div>

        {/* =======================
            3. LEFT CONTENT (FORM)
            Frame 3851 -> Left: 150px, Top: 148px
           ======================= */}
        <div 
          className="absolute flex flex-col items-start gap-[60px]"
          style={{
            left: "150px",
            top: "148px",
            width: "545px",
            height: "604px",
          }}
        >
          {/* HEADER SECTION */}
          <div className="flex flex-col gap-[20px] w-full">
            <h2 
              className="text-[54px] font-bold text-black leading-[66px]"
            >
              Get in <span className="text-[#39418E]">Touch</span>
            </h2>
            <p className="text-[14px] font-semibold text-black leading-[24px] tracking-[0.01em]">
              Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.
            </p>
          </div>

          {/* FORM SECTION */}
          <form className="flex flex-col gap-[20px] w-full">
            {/* Name Input */}
            <input 
              type="text" 
              placeholder="Name *" 
              className="w-full h-[50px] border border-[#E0E0E0] px-[20px] text-[14px] text-black placeholder-[#828282] outline-none focus:border-[#39418E] transition-colors"
            />

            {/* Email Input */}
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full h-[50px] border border-[#E0E0E0] px-[20px] text-[14px] text-black placeholder-[#828282] outline-none focus:border-[#39418E] transition-colors"
            />

            {/* Phone Input */}
            <input 
              type="tel" 
              placeholder="Phone number *" 
              className="w-full h-[50px] border border-[#E0E0E0] px-[20px] text-[14px] text-black placeholder-[#828282] outline-none focus:border-[#39418E] transition-colors"
            />

            {/* Dropdown */}
            <div className="relative w-full h-[50px]">
              <select 
                className="w-full h-full border border-[#E0E0E0] px-[20px] text-[14px] text-black outline-none appearance-none bg-white focus:border-[#39418E] transition-colors cursor-pointer"
              >
                <option value="" disabled selected>What product you want ?</option>
                <option value="jewellery">Jewellery</option>
                <option value="handicrafts">Handicrafts</option>
              </select>
              <div className="absolute right-[20px] top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown size={16} color="black" />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full h-[50px] bg-[#39418E] text-white text-[16px] font-bold uppercase tracking-wide hover:opacity-90 transition-opacity mt-2"
            >
              SEND
            </button>
          </form>

          {/* CONTACT INFO FOOTER */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-[80px]">

    {/* PHONE */}
    <div className="flex flex-col items-center text-center gap-2">
      <Phone size={32} className="text-black" />
      <span className="text-[16px] font-semibold tracking-wide text-black">
        PHONE
      </span>
      <span className="text-[16px] font-medium text-[#DD5471]">
        03 5432 1234
      </span>
    </div>

    {/* FAX */}
    <div className="flex flex-col items-center text-center gap-2">
      <Printer size={32} className="text-black" />
      <span className="text-[16px] font-semibold tracking-wide text-black">
        FAX
      </span>
      <span className="text-[16px] font-medium text-[#DD5471]">
        03 5432 1234
      </span>
    </div>

    {/* EMAIL */}
    <div className="flex flex-col items-center text-center gap-2">
      <Mail size={32} className="text-black" />
      <span className="text-[16px] font-semibold tracking-wide text-black">
        EMAIL
      </span>
      <span className="text-[16px] font-medium text-[#DD5471]">
        info@marcc.com.au
      </span>
    </div>

  </div>
        </div>
      </div>

      {/* =================================================================
          MOBILE RESPONSIVE FALLBACK 
          (Since specific pixels break on mobile, we use a standard layout 
           for screens smaller than 1369px)
         ================================================================= */}
      <div className="xl:hidden w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden mx-4">
         <div className="h-4 bg-[#DD5471] w-full" />
         <div className="p-8 space-y-8">
            <h2 className="text-3xl font-bold">Get in <span className="text-[#39418E]">Touch</span></h2>
            <p className="text-sm">Enim tempor eget pharetra facilisis sed maecenas adipiscing.</p>
            <form className="space-y-4">
                <input type="text" placeholder="Name *" className="w-full h-[50px] border border-[#E0E0E0] px-4" />
                <input type="email" placeholder="Email" className="w-full h-[50px] border border-[#E0E0E0] px-4" />
                <button className="w-full h-[50px] bg-[#39418E] text-white font-bold">SEND</button>
            </form>
         </div>
      </div>

    </section>
  );
}