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
    link: "/products",
  },
  {
    image: "/heroImage2.jpg",
    tag: "Limited Edition",
    title: "Authentic\nTibetan Art",
    description:
      "Each item tells a story of culture, craftsmanship, and timeless beauty.",
    button: "Explore",
    link: "/products",
  },
  {
    image: "/heroImage3.jpg",
    tag: "Exclusive",
    title: "Spiritual\nHandicrafts",
    description:
      "Bring peace, positivity, and heritage into your space with our curated collection.",
    button: "View Collection",
    link: "/products",
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
      tl.current = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      /* IMAGE – cinematic slide + soft scale */
      tl.current.fromTo(
        imageRef.current,
        { x: -80, opacity: 0, scale: 1.04 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 2.8,
        },
        0
      );

      /* TEXT – exclude button from stagger */
      const textElements = Array.from(textRef.current!.children).slice(0, -1);

      tl.current.fromTo(
        textElements,
        { opacity: 0, y: 24, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.25,
          duration: 1.2,
        },
        0.6
      );

      /* BUTTON – clean single animation */
      tl.current.fromTo(
        textRef.current!.lastElementChild,
        { opacity: 0, y: 18, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power4.out",
        },
        1.4
      );

      /* PROGRESS BAR */
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

  /* AUTO SLIDE */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION * 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`w-full bg-white ${poppins.variable} font-sans`}>
      <div className="relative max-w-[1440px] mx-auto px-4 py-10 lg:h-[760px] overflow-hidden">

        {/* IMAGE */}
        <div className="relative w-full h-[300px] md:h-[440px] lg:absolute lg:left-[90px] lg:top-[20px] lg:w-[1100px] lg:h-[680px] overflow-hidden ">
          <div ref={imageRef} className="absolute inset-0">
            <Image
              src={currentSlide.image}
              alt="Luxury Hero"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/30" />
          </div>
        </div>

        {/* GLASS CARD */}
        <div
          className="
            relative
            backdrop-blur-xl
            bg-white/70
            border border-white/40
            rounded-[15px]
            shadow-[0_40px_80px_rgba(0,0,0,0.15)]
            px-8 py-10
            md:max-w-[640px]
            mx-auto

            -translate-y-[25%]
            sm:-translate-y-[22%]
            md:-translate-y-[20%]
            lg:translate-y-0

            lg:absolute
            lg:top-[200px]
            lg:right-[40px]
            lg:h-[440px]
            overflow-hidden
          "
        >
          {/* PROGRESS BAR */}
          <div
            ref={progressRef}
            className="
              absolute top-0 left-0 h-[3px] w-full
              bg-gradient-to-r from-[#C9A24D] via-[#F5D98B] to-[#C9A24D]
              scale-x-0
              rounded-t-[18px]
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

            {/* BUTTON */}
            <Link
              href={currentSlide.link}
              className="
                group relative overflow-hidden
                inline-flex items-center justify-center
                w-[220px] h-[56px]
                bg-[#2E2E2E]
                text-white text-[13px]
                font-bold uppercase tracking-[2px]
                transition-all duration-500
                hover:tracking-[4px]
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
                active:scale-[0.97]
              "
            >
              <span className="relative z-10">
                {currentSlide.button}
              </span>

              <span
                className="
                  absolute inset-0
                  bg-gradient-to-r from-transparent via-white/30 to-transparent
                  translate-x-[-120%]
                  group-hover:translate-x-[120%]
                  transition-transform duration-700
                "
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}