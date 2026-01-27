"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Cormorant_Garamond, Jost } from "next/font/google";

import { products } from "../../lib/products";
import FeaturesSection from "../../components/common/FeaturesStrip";
import PageBanner from "../../components/common/PageBanner";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "600"] });

const PER_PAGE = 16;

export default function ProductsPage() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(products.length / PER_PAGE);

  const pageProducts = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return products.slice(start, start + PER_PAGE);
  }, [page]);

  const from = (page - 1) * PER_PAGE + 1;
  const to = Math.min(page * PER_PAGE, products.length);

  return (
    <div className={`bg-[#fcfaf7] min-h-screen ${jost.className}`}>
      {/* HERO HEADER */}
      <PageBanner
        title="The Collection"
        breadcrumb="Archive"
        imageSrc="/item.png"
        overlayOpacity={0.4}
      />

      {/* TOOLBAR - Refined Aesthetic */}
      <div className="bg-[#f3f1ee] border-b border-stone-200 sticky top-[80px] z-30">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="hidden md:block">
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500">
              Curating {from} – {to} of {products.length} Masterpieces
            </span>
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400">Sort:</span>
              <select className="bg-transparent text-[10px] uppercase tracking-[0.2em] font-semibold outline-none cursor-pointer">
                <option>Newest First</option>
                <option>Price: Ascending</option>
                <option>Price: Descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {pageProducts.map((product) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={product.id}
              className="group cursor-pointer"
            >
              <Link href={`/products/${product.id}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f3f1ee] mb-6 shadow-sm">
                  {product.tag && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-amber-700/90 backdrop-blur-md text-white text-[8px] uppercase tracking-[0.2em] px-3 py-1 font-semibold">
                        {product.tag === "sale" ? "Special Edition" : "New Arrival"}
                      </span>
                    </div>
                  )}

                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Subtle Opaque Hover State */}
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-all duration-700" />
                  
                  {/* View Button Overlay */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="bg-white text-stone-900 text-[10px] uppercase tracking-[0.3em] px-6 py-3 shadow-xl whitespace-nowrap font-semibold">
                      View Piece
                    </button>
                  </div>
                </div>

                {/* Info Section */}
                <div className="text-center space-y-1 px-2">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-amber-700 font-semibold mb-2">
                    {product.category}
                  </p>
                  <h3 className={`${cormorant.className} text-xl text-stone-900 group-hover:text-amber-800 transition-colors`}>
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <span className="text-sm font-medium text-stone-800 tracking-tight">
                      ₹ {product.price.toLocaleString()}
                    </span>
                    {product.oldPrice && (
                      <span className="text-[11px] text-stone-400 line-through">
                        ₹ {product.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* REFINED PAGINATION */}
        <div className="mt-20 flex flex-col items-center gap-8">
          <div className="flex items-center gap-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="text-stone-400 hover:text-stone-900 disabled:opacity-20 transition-all flex items-center gap-2 group"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] uppercase tracking-[0.3em]">Previous</span>
            </button>

            <div className="flex gap-4">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`text-[12px] transition-all relative py-1 px-2 ${
                    page === i + 1 ? "text-amber-700 font-bold" : "text-stone-300 hover:text-stone-600"
                  }`}
                >
                  {i + 1}
                  {page === i + 1 && (
                    <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-700" />
                  )}
                </button>
              ))}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="text-stone-400 hover:text-stone-900 disabled:opacity-20 transition-all flex items-center gap-2 group"
            >
              <span className="text-[10px] uppercase tracking-[0.3em]">Next</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <FeaturesSection />
    </div>
  );
}