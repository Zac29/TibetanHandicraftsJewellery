"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageBannerProps {
  title: string;
  breadcrumb?: string;
  imageSrc: string;
   overlayOpacity?: number;
}

export default function PageBanner({
  title,
  breadcrumb,
  imageSrc,
  overlayOpacity,
}: PageBannerProps) {
  return (
    <section
      className="
        relative
        w-full
        h-[324px]
        overflow-hidden
        flex
        justify-center
      "
    >
      {/* IMAGE */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover"
        />
            {overlayOpacity && (
    <div
      className="absolute inset-0 bg-white"
      style={{ opacity: overlayOpacity }}
    />
  )}

      </div>

      {/* CONTENT WRAPPER (1440px CANVAS MATCH) */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-[1440px]
          h-full
          flex
          flex-col
          items-center
          justify-center
          text-black
          font-poppins
        "
      >
        {/* TITLE */}
        <h1
          className="
            font-poppins
            font-medium
            text-[48px]
            leading-[72px]
          "
        >
          {title}
        </h1>

        {/* BREADCRUMB */}
        {breadcrumb && (
          <div className="flex items-center gap-2 mt-2 text-[16px]">
            <Link
              href="/"
              className="font-medium hover:underline font-poppins"
            >
              Home
            </Link>

            {/* Arrow (matches dashicons rotated -90deg) */}
            <ChevronRight
              size={18}
              className="rotate-0"
            />

            <span className="font-light">{breadcrumb}</span>
          </div>
        )}
      </div>
    </section>
  );
}
