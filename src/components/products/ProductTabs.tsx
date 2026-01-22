"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "../../lib/products";

export default function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<
    "description" | "info" | "reviews"
  >("description");

  return (
    <section className="w-full bg-white">
      {/* Line 8 */}
      <div className="w-full border-t border-[#D9D9D9]" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-[100px] pt-10 md:pt-[48px] pb-16 md:pb-[80px]">
        {/* ===== TABS ===== */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-[52px] mb-10 md:mb-[48px] text-center">
          {[
            { key: "description", label: "Description" },
            { key: "info", label: "Additional Information" },
            {
              key: "reviews",
              label: `Reviews [${product.reviewsCount}]`,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`text-[18px] md:text-[24px] leading-[30px] md:leading-[36px] transition ${
                activeTab === tab.key
                  ? "font-medium text-black"
                  : "font-normal text-[#9F9F9F]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== TAB CONTENT ===== */}
        {activeTab === "description" && (
          <>
            <p className="max-w-[1038px] mx-auto text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] text-[#9F9F9F] text-justify mb-12 md:mb-[72px]">
              {product.description}
            </p>

            {/* IMAGES */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-[29px]">
              {[1, 2].map((_, i) => (
                <div
                  key={i}
                  className="
                    w-full
                    md:w-[605px]
                    h-[240px]
                    md:h-[348px]
                    bg-[#F9F1E7]
                    rounded-[10px]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={584}
                    height={331}
                    className="rounded-[12px] object-cover w-[92%] h-[92%]"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "info" && (
          <div className="max-w-[1038px] mx-auto text-[14px] md:text-[16px] leading-[24px] md:leading-[28px] text-[#9F9F9F] space-y-3 md:space-y-4">
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Tags:</strong> {product.tags.join(", ")}</p>
            <p><strong>Available Sizes:</strong> {product.sizes.join(", ")}</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-[1038px] mx-auto text-[14px] md:text-[16px] leading-[24px] md:leading-[28px] text-[#9F9F9F]">
            <p>
              This product has {product.reviewsCount} customer reviews with an
              average rating of {product.rating}★.
            </p>
          </div>
        )}
      </div>

      {/* Line 9 */}
      <div className="w-full border-t-2 border-[#D9D9D9]" />
    </section>
  );
}
