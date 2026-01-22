"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2 } from "lucide-react";
import { products } from "../../lib/products";

export default function RelatedProducts() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  return (
    <section className="w-full bg-white py-[55px]">
      {/* CONTAINER – matches 1440px */}
      <div className="max-w-[1440px] mx-auto px-[100px]">

        {/* TITLE */}
        <h2 className="text-center text-[36px] leading-[54px] font-medium text-black mb-[55px]">
          Related Products
        </h2>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[32px]">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-[#F4F5F7] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative"
            >
              {/* TAG */}
              {product.tag && (
                <div
                  className={`absolute top-4 right-4 z-20 text-white text-xs px-3 py-1 rounded-full ${
                    product.tag === "sale" ? "bg-red-500" : "bg-emerald-500"
                  }`}
                >
                  {product.tag === "sale" ? "-30%" : "New"}
                </div>
              )}

              {/* IMAGE */}
              <div className="relative w-full h-[301px] bg-white overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />

                {/* HOVER ACTIONS */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="bg-white text-black px-6 py-2 text-sm font-medium rounded-md hover:scale-105 transition"
                  >
                    Contact Us
                  </button>

                  <div className="flex gap-8 text-white">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="flex items-center gap-1 hover:scale-110 transition"
                    >
                      <Share2 size={18} />
                      <span className="text-sm">Share</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setLiked((prev) => ({
                          ...prev,
                          [product.id]: !prev[product.id],
                        }));
                      }}
                      className="flex items-center gap-1 hover:scale-110 transition"
                    >
                      <Heart
                        size={18}
                        className={
                          liked[product.id]
                            ? "text-red-500 fill-red-500"
                            : "text-white"
                        }
                      />
                      <span className="text-sm">Like</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* INFO */}
              <div className="p-4 bg-[#F4F5F7]">
                <h3 className="text-[18px] font-semibold text-black mb-1">
                  {product.title}
                </h3>

                <p className="text-sm text-black/60 mb-2">
                  {product.category}
                </p>

                <div className="flex items-center gap-3">
                  <span className="text-[16px] font-semibold text-black">
                    ₹ {product.price.toLocaleString()}
                  </span>
                  <span className="text-sm line-through text-black/50">
                    ₹ {product.oldPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* SHOW MORE BUTTON – FIGMA EXACT */}
        <div className="flex justify-center mt-[65px]">
          <Link
  href="/products"
  target="_blank"
  className="
    flex items-center justify-center
    w-[245px] h-[48px]
    border border-[#B88E2F]
    text-[#B88E2F]
    text-[16px]
    font-semibold
    bg-white
    transition-all duration-300
    hover:bg-[#B88E2F]
    hover:text-white
  "
>
  Show More
</Link>

        </div>
      </div>
    </section>
  );
}
