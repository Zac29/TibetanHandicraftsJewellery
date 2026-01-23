"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Trophy,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";

import { products } from "../../lib/products";
import FeathersSection from "../../components/common/FeaturesStrip";
import PageBanner from "../../components/common/PageBanner";
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
    <>
      {/* HERO HEADER */}
      <PageBanner
        title="Products"
        breadcrumb="Products"
        imageSrc="/item.png"
        overlayOpacity={0.5}
      />

      {/* TOOLBAR */}
      <div className="bg-[#F9F1E7]">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="hidden md:block">
            <span className="text-sm text-[#555]">
              Showing {from}–{to} of {products.length} results
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm">Sort by</span>

            <div className="relative group">
              <select className="bg-white px-4 py-2 pr-10 text-sm rounded-md appearance-none shadow-[0_4px_12px_rgba(0,0,0,0.1)] border-none outline-none">
                <option>Default</option>
                <option>Price Low to High</option>
                <option>Price High to Low</option>
              </select>

              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <ChevronRight size={18} className="rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <section className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4">

          {/* ✅ ONLY CHANGE: grid-cols-1 -> grid-cols-2 */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {pageProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-[#e6e6e6] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 relative"
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
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[1.5px]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />

                  {/* Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="bg-white px-5 py-2 rounded-md text-sm">
                      Contact Us
                    </button>

                    <div className="flex gap-8 text-white">
                      <Share2 size={18} />
                      <Heart
                        size={18}
                        onClick={(e) => {
                          e.preventDefault();
                          setLiked((prev) => ({
                            ...prev,
                            [product.id]: !prev[product.id],
                          }));
                        }}
                        className={
                          liked[product.id]
                            ? "text-red-500 fill-red-500"
                            : "text-white"
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-[#e6e6e6] p-4 transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-[18px] font-semibold text-[#333333] mb-1">
                    {product.title}
                  </h3>
                  <p className="text-xs opacity-70 mb-2">
                    {product.category}
                  </p>

                  <div className="flex gap-2">
                    <span className="font-semibold">
                      ₹ {product.price.toLocaleString()}
                    </span>
                    <span className="line-through opacity-60">
                      ₹ {product.oldPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-6 mt-12 mb-10">
            <ShinyCircleButton
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={22} />
            </ShinyCircleButton>

            <div className="flex items-center gap-3">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`transition-all duration-500 ${
                    page === i + 1
                      ? "w-10 h-2 bg-[#C8A23A] rounded-full"
                      : "w-2 h-2 bg-[#C8A23A]/40 rounded-full hover:bg-[#C8A23A]"
                  }`}
                />
              ))}
            </div>

            <ShinyCircleButton
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight size={22} />
            </ShinyCircleButton>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <FeathersSection />
    </>
  );
}

/* SHINY PAGINATION BUTTON */
function ShinyCircleButton({ children, onClick, disabled }: any) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="
        group relative overflow-hidden
        w-[48px] h-[48px]
        rounded-full
        bg-[#353F8C]
        text-white
        flex items-center justify-center
        transition-all duration-500
        hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]
        active:scale-[0.95]
        disabled:opacity-40 disabled:cursor-not-allowed
      "
    >
      <span className="relative z-10">{children}</span>

      <span
        className="
          absolute inset-0
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          -translate-x-[120%]
          group-hover:translate-x-[120%]
          group-active:translate-x-[120%]
          transition-transform duration-700
        "
      />
    </button>
  );
}
