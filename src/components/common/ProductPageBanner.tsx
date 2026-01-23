"use client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  category?: string;
  product?: string;
};

export default function ProductPageBanner({
  category = "Product",
  product = "Decore",
}: Props) {
  return (
    <div className="relative w-full h-[100px] ">

      {/* Background */}
      <Image
        src="/contact-banner.png" // Figma image
        alt="Product Banner"
        fill
        className="object-cover"
        priority
      />

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-[99px] flex items-center">
        <nav className="flex items-center gap-4 text-[16px] font-normal text-black">

          {/* Home */}
          <Link href="/" className="hover:underline">
            Home
          </Link>

          <span className="text-[#9F9F9F]">{">"}</span>

          {/* Product */}
          <Link href="/products" className="hover:underline">
            {category}
          </Link>

          <span className="text-[#9F9F9F]">{">"}</span>

          {/* Current */}
          <span className="font-medium">
            {product}
          </span>

        </nav>
      </div>
    </div>
  );
}
