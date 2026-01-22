"use client";


import { useState } from "react";
import Image from "next/image";
import { Heart, Share2 } from "lucide-react";
import Link from "next/link";
import { products } from "../../lib/products";

export default function ProductsGrid() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-[32px] font-bold text-[#333333] mb-12">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
               href={`/products/${product.id}`}
              
              className="group bg-[#e6e6e6] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative focus:outline-none"
            >
              {/* Badge */}
              {product.tag && (
                <div
                  className={`absolute top-3 right-3 z-20 text-white text-xs px-3 py-1 rounded-full ${
                    product.tag === "sale" ? "bg-red-500" : "bg-emerald-500"
                  }`}
                >
                  {product.tag === "sale" ? "-30%" : "New"}
                </div>
              )}

              {/* Image */}
              <div className="relative w-full h-[260px] overflow-hidden bg-white">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-[1.5px] group-focus-within:scale-110 group-focus-within:blur-[1.5px]"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 group-focus-within:bg-black/50 transition-all duration-500" />

                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-500">
                 <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
  }}
  className="bg-white text-[#333333] px-5 py-2 rounded-md text-sm font-medium hover:scale-105 transition"
>
  Contact Us
</button>


                  {/* Icons */}
                  <div className="flex gap-8 text-white">
                    <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
  }}
  className="flex items-center gap-1 active:scale-125 md:hover:scale-125 transition-transform duration-300"
>
  <Share2 size={18} />
  <span className="text-sm">Share</span>
</button>


                    <button
                      onClick={() =>
                        setLiked((prev) => ({
                          ...prev,
                          [product.id]: !prev[product.id],
                        }))
                      }
                      className="flex items-center gap-1 active:scale-125 md:hover:scale-125 transition-transform duration-300"
                    >
                      <Heart
                        size={18}
                        className={`transition ${
                          liked[product.id]
                            ? "text-red-500 fill-red-500"
                            : "text-white"
                        }`}
                      />
                      <span className="text-sm">Like</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="bg-[#e6e6e6] p-4 transition-transform duration-500 group-hover:-translate-y-2 group-focus-within:-translate-y-2">
                <h3 className="text-[18px] font-semibold text-[#333333] mb-1">
                  {product.title}
                </h3>
                <p className="text-xs text-[#333333] opacity-70 mb-2">Rare</p>

                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-semibold text-[#333333]">
                    ₹ {product.price.toLocaleString()}
                  </span>
                  <span className="text-sm line-through text-[#333333] opacity-60">
                    ₹ {product.oldPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* SHOW MORE BUTTON */}
        <div className="flex justify-center mt-12">
        <Link
  href="/products"
   target="_blank"
  className="
    group relative overflow-hidden
    inline-flex items-center justify-center
    w-[220px] h-[56px]
    bg-[#353F8C]
    text-white text-[13px]
    font-bold uppercase tracking-[2px]
    transition-all duration-500
    hover:tracking-[4px]
    hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
    active:scale-[0.97]
  "
>
  <span className="relative z-10">Show More</span>

  <span
    className="
      absolute inset-0
      bg-gradient-to-r from-transparent via-white/30 to-transparent
      -translate-x-[120%]
      group-hover:translate-x-[120%]
      transition-transform duration-700
    "
  />
</Link>

        </div>
      </div>
    </section>
  );
}
