"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

const SLIDE_DURATION = 8;

const slides = [
  {
    image: "/heroImage.jpg",
    tag: "New Arrival",
    title: "Discover Our\nNew Collection",
    description:
      "Handcrafted Tibetan pieces designed to elevate your lifestyle with tradition and elegance.",
    button: "Buy Now",
    link: "/shop",
  },
  {
    image: "/heroImage2.jpg",
    tag: "Limited Edition",
    title: "Authentic\nTibetan Art",
    description:
      "Each item tells a story of culture, craftsmanship, and timeless beauty.",
    button: "Explore",
    link: "/shop",
  },
  {
    image: "/heroImage3.jpg",
    tag: "Exclusive",
    title: "Spiritual\nHandicrafts",
    description:
      "Bring peace, positivity, and heritage into your space with our curated collection.",
    button: "View Collection",
    link: "/shop",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const currentSlide = slides[index % slides.length];

  useEffect(() => {
    if (!imageRef.current || !textRef.current || !progressRef.current) return;

    tl.current?.kill();

    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ defaults: { ease: "expo.out" } });

      // IMAGE CINEMATIC PAN
      tl.current.fromTo(
        imageRef.current,
        { scale: 1.15, x: -20, opacity: 0 },
        { scale: 1, x: 0, opacity: 1, duration: 3 },
        0
      );

      // TEXT REVEAL
      tl.current.fromTo(
        textRef.current.children,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.35,
          duration: 1.4,
        },
        0.8
      );

      // PROGRESS BAR
      tl.current.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: SLIDE_DURATION,
          ease: "none",
          transformOrigin: "left",
        },
        0
      );
    });

    return () => ctx.revert();
  }, [index]);

  // AUTO SLIDE (SAFE)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION * 1000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className={`w-full bg-[#00000] ${poppins.variable} font-sans`}>
      <div className="relative max-w-[1440px] mx-auto px-4 py-10 lg:h-[760px] overflow-hidden">

        {/* IMAGE */}
        <div className="relative w-full h-[300px] md:h-[440px] lg:absolute lg:left-[90px] lg:top-[20px] lg:w-[1100px] lg:h-[680px] overflow-hidden">
          <div ref={imageRef} className="absolute inset-0">
            <Image
              src={currentSlide.image}
              alt="Luxury Hero"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30" />
          </div>
        </div>

        {/* GLASS CARD */}
        <div className="
          relative
          backdrop-blur-xl
          bg-white/70
          border border-white/40
          rounded-[18px]
          shadow-[0_40px_80px_rgba(0,0,0,0.15)]
          px-8 py-10
          md:max-w-[640px]
          md:mx-auto
          lg:absolute
          lg:top-[200px]
          lg:right-[40px]
          lg:h-[440px]
        ">

          {/* PROGRESS */}
          <div
            ref={progressRef}
            className="
              absolute top-0 left-0 h-[2px] w-full
              bg-gradient-to-r from-[#C9A24D] via-[#E8C872] to-[#C9A24D]
              scale-x-0
            "
          />

          {/* TEXT */}
          <div ref={textRef} className="h-full flex flex-col justify-center">
            <p className="text-[13px] font-semibold tracking-[3px] uppercase text-[#8A6B2F] mb-3">
              {currentSlide.tag}
            </p>

            <h1 className="text-[#2E2E2E] text-[32px] md:text-[42px] lg:text-[50px] font-bold leading-tight mb-4 whitespace-pre-line">
              {currentSlide.title}
            </h1>

            <p className="text-[#444] text-[15px] md:text-[16px] leading-[24px] max-w-[480px] mb-8">
              {currentSlide.description}
            </p>

            <Link
              href={currentSlide.link}
              className="
                relative overflow-hidden
                inline-flex items-center justify-center
                w-[220px] h-[56px]
                bg-[#2E2E2E]
                text-white text-[13px]
                font-bold uppercase tracking-[2px]
                transition-all duration-500
                hover:tracking-[4px]
              "
            >
              <span className="relative z-10">
                {currentSlide.button}
              </span>
              <span className="
                absolute inset-0
                bg-gradient-to-r from-transparent via-white/30 to-transparent
                translate-x-[-120%]
                hover:translate-x-[120%]
                transition-transform duration-700
              " />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
