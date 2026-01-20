"use client";

import Image from "next/image";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice: number;
  tag?: "sale" | "new";
};

const products: Product[] = [
  { id: 1, title: "Ganesha Statue", image: "/Bowl.png", price: 2500, oldPrice: 3500, tag: "sale" },
  { id: 2, title: "POT", image: "/decore.png", price: 2500, oldPrice: 3500, tag: "sale" },
  { id: 3, title: "Mandala", image: "/item.png", price: 2500, oldPrice: 3500, tag: "sale" },
  { id: 4, title: "Buddha", image: "/Pot.png", price: 2500, oldPrice: 3500, tag: "sale" },
  { id: 5, title: "Mandala Pendent", image: "/Statues.png", price: 2500, oldPrice: 3500, tag: "sale" },
  { id: 6, title: "Bronze Mandla", image: "/Pot.png", price: 2500, oldPrice: 3500, tag: "sale" },
  { id: 7, title: "Bowl", image: "/Bowl.png", price: 2500, oldPrice: 3500, tag: "new" },
  { id: 8, title: "POT", image: "/Pot.png", price: 2500, oldPrice: 3500, tag: "sale" },
];

export default function ProductsGrid() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-center text-[32px] font-bold text-[#333333] mb-12">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-[#e6e6e6] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative"
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

              {/* Image Container */}
              <div className="relative w-full h-[260px] overflow-hidden bg-white">

                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-[1.5px]"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="bg-white text-[#333333] px-5 py-2 rounded-md text-sm font-medium hover:scale-105 transition">
                    Contact Us
                  </button>
                  <div className="flex gap-6 text-white text-sm">
                    <span className="cursor-pointer hover:underline">Share</span>
                    <span className="cursor-pointer hover:underline">Like</span>
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

        <div className="flex justify-center mt-12">
          <button className="border border-[#e0b26f] text-[#e0b26f] px-8 py-2 rounded-md hover:bg-[#e0b26f] hover:text-white transition">
            Show More
          </button>
        </div>
      </div>
    </section>
  );
}
