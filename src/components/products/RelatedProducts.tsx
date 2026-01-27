"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, ArrowRight } from "lucide-react";
import { products } from "../../lib/products";
import { motion } from "framer-motion";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500"] });

export default function RelatedProducts() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  return (
    <section className="w-full bg-[#fcfaf7] py-24 border-t border-stone-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        
        {/* TITLE SECTION */}
        <div className="flex flex-col items-center mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.5em] text-amber-700 font-bold">
            Curated Selection
          </span>
          <h2 className={`${cormorant.className} text-4xl md:text-5xl text-stone-900`}>
            Pieces You May <span className="italic">Cherish</span>
          </h2>
          <div className="w-12 h-[1px] bg-stone-300 pt-4" />
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="group relative">
              <Link
                href={`/products/${product.id}`}
                className="block bg-transparent overflow-hidden relative focus:outline-none"
              >
                {/* TAG / BADGE (Minimalist) */}
                {product.tag && (
                  <div className="absolute top-4 left-4 z-20 bg-stone-900 text-white text-[9px] uppercase tracking-widest px-3 py-1">
                    {product.tag === "sale" ? "Offer" : "Archive"}
                  </div>
                )}

                {/* IMAGE CONTAINER */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#f3f1ee]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />

                  {/* Kinetic Overlay */}
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-all duration-500 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white text-stone-900 px-6 py-3 text-[10px] uppercase tracking-widest font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      View Details
                    </button>
                    
                    <div className="flex gap-6 mt-6 text-white transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-75">
                        <Share2 size={16} className="hover:text-amber-400 cursor-pointer" />
                        <Heart 
                          size={16} 
                          onClick={(e) => {
                            e.preventDefault();
                            setLiked(prev => ({ ...prev, [product.id]: !prev[product.id] }));
                          }}
                          className={`cursor-pointer transition-colors ${liked[product.id] ? "fill-amber-500 text-amber-500" : "hover:text-amber-400"}`} 
                        />
                    </div>
                  </div>
                </div>

                {/* INFO SECTION */}
                <div className="pt-6 space-y-2">
                  <h3 className="text-[14px] uppercase tracking-wider text-stone-900 font-medium">
                    {product.title}
                  </h3>
                  
                  <p className="text-[11px] text-stone-400 uppercase tracking-widest">
                    {product.category}
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-[15px] text-stone-900">
                      ₹ {product.price.toLocaleString()}
                    </span>
                    {product.oldPrice && (
                      <span className="text-[13px] line-through text-stone-300">
                        ₹ {product.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* VIEW ALL BUTTON (Solid Kinetic) */}
        <div className="flex justify-center mt-20">
          <Link
            href="/products"
            className="
              group relative
              inline-flex items-center justify-center
              px-12 h-[60px]
              bg-stone-900
              text-white text-[11px]
              font-bold uppercase tracking-[0.3em]
              transition-all duration-500
              hover:bg-amber-800
              hover:shadow-2xl
            "
          >
            <span className="relative z-10 flex items-center gap-3">
              View All Archive <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}