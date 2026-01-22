"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
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

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice: number;
  tag?: "sale" | "new";
};

/* 🔁 DUMMY PRODUCTS (32 ITEMS) */
const products: Product[] = Array.from({ length: 32 }).map((_, i) => ({
  id: i + 1,
  title: [
    "Ganesha Statue",
    "POT",
    "Mandala",
    "Buddha",
    "Mandala Pendant",
    "Bronze Mandala",
    "Bowl",
    "POT",
  ][i % 8],
  image: [
    "/Bowl.png",
    "/decore.png",
    "/item.png",
    "/Pot.png",
    "/Statues.png",
    "/Pot.png",
    "/Bowl.png",
    "/Pot.png",
  ][i % 8],
  price: 2500,
  oldPrice: 3500,
  tag: i % 7 === 0 ? "new" : "sale",
}));

const PER_PAGE = 16;

export default function ProductPage() {
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
      <section className="relative h-[260px] w-full">
        <Image src="/item.png" alt="Products" fill className="object-cover" />
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-[#222]">Products</h1>
          <p className="text-sm mt-2 text-[#555]">Home &nbsp;›&nbsp; Products</p>
        </div>
      </section>

      {/* TOOLBAR */}
      <div className="bg-[#F9F1E7]">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">

          {/* LEFT: SHOWING RESULT (DESKTOP ONLY) */}
          <div className="hidden md:block">
            <span className="text-sm text-[#555]">
              Showing {from}–{to} of {products.length} results
            </span>
          </div>

          {/* SORT BY */}
          <div className="flex items-center gap-3 ml-0 md:ml-auto">
            <span className="text-sm">Sort by</span>

            <div className="relative group">
              <select
                className="
                  bg-white
                  px-4 py-2 pr-10
                  text-sm
                  rounded-md
                  appearance-none
                  cursor-pointer
                  
                  /* SHADOW EFFECT */
                  shadow-[0_4px_12px_rgba(0,0,0,0.1)]
                  
                  /* TRANSITIONS */
                  transition-all duration-300
                  hover:-translate-y-[1px]
                  hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)]
                  
                  /* REMOVE BORDERS & OUTLINES STRICTLY */
                  border-none
                  outline-none
                  focus:border-none
                  focus:ring-0
                  focus:outline-none
                  active:border-none
                "
              >
                <option className="bg-white text-gray-700 border-none outline-none">Default</option>
                <option className="bg-white text-gray-700 border-none outline-none">Price Low to High</option>
                <option className="bg-white text-gray-700 border-none outline-none">Price High to Low</option>
              </select>

              {/* DROPDOWN ICON (SAME AS PAGINATION, ROTATED) */}
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 transition-transform duration-300 group-hover:rotate-180">
                <ChevronRight size={18} className="rotate-90" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* PRODUCTS */}
      <section className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4">

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {pageProducts.map((product) => (
              <div
                key={product.id}
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
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-[1.5px]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />

                  {/* Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="bg-white text-[#333333] px-5 py-2 rounded-md text-sm font-medium hover:scale-105 transition">
                      Contact Us
                    </button>

                    <div className="flex gap-8 text-white">
                      <button className="hover:scale-125 transition">
                        <Share2 size={18} />
                      </button>

                      <button
                        onClick={() =>
                          setLiked((prev) => ({
                            ...prev,
                            [product.id]: !prev[product.id],
                          }))
                        }
                        className="hover:scale-125 transition"
                      >
                        <Heart
                          size={18}
                          className={`${
                            liked[product.id]
                              ? "text-red-500 fill-red-500"
                              : "text-white"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-[#e6e6e6] p-4 transition-transform duration-500 group-hover:-translate-y-2">
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
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-6 mt-12 mb-10">

            <ShinyCircleButton
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
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
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            >
              <ChevronRight size={22} />
            </ShinyCircleButton>

          </div>
        </div>
      </section>

      {/* 🔥 FEATURES SECTION (NEW) */}
      <section className="bg-[#FAF3EA] py-10 md:py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Feature 1 */}
          <div className="flex items-center gap-4">
            <Trophy size={52} strokeWidth={1} className="text-[#242424]" />
            <div>
              <h3 className="font-bold text-xl text-[#242424] mb-1">High Quality</h3>
              <p className="text-[#898989] text-base font-medium">crafted from top materials</p>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="flex items-center gap-4">
            <ShieldCheck size={52} strokeWidth={1} className="text-[#242424]" />
            <div>
              <h3 className="font-bold text-xl text-[#242424] mb-1">Protection</h3>
              <p className="text-[#898989] text-base font-medium">Over 2 years</p>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="flex items-center gap-4">
            <Truck size={52} strokeWidth={1} className="text-[#242424]" />
            <div>
              <h3 className="font-bold text-xl text-[#242424] mb-1">Free Shipping</h3>
              <p className="text-[#898989] text-base font-medium">Order over ₹10000</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-4">
            <Headphones size={52} strokeWidth={1} className="text-[#242424]" />
            <div>
              <h3 className="font-bold text-xl text-[#242424] mb-1">24 / 7 Support</h3>
              <p className="text-[#898989] text-base font-medium">Dedicated support</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

/* 🔥 SHINY PAGINATION BUTTON */
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

      {/* SHINE SWEEP */}
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