"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "../../../lib/products";
import ProductPageBanner from "../../../components/common/ProductPageBanner";
import Footer from "../../../components/layout/Footer";
import ProductTabs from "../../../components/products/ProductTabs";
import { Facebook, Linkedin, Twitter, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import RelatedProducts from "../../../components/products/RelatedProducts";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = products.find((p) => p.id === Number(id));
  if (!product) return notFound();

  const rating = product.rating ?? 4.5;
  const reviews = product.reviewsCount ?? 0;

  return (
    <div className={poppins.className}>
      <ProductPageBanner category="Product" product={product.title} />

      <section className="max-w-[1440px] mx-auto px-[100px] py-[35px] border-b border-[#D9D9D9]">
        <div className="flex gap-[105px]">

          {/* ================= LEFT : GALLERY ================= */}
          <div className="flex gap-[30px]">

            {/* Thumbnails */}
            <div className="flex flex-col gap-[32px]">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="w-[76px] h-[80px] bg-[#F9F1E7] rounded-[10px] flex items-center justify-center"
                >
                  <Image
                    src={product.image}
                    alt="thumbnail"
                    width={55}
                    height={70}
                    className="object-cover mix-blend-multiply"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="w-[423px] h-[500px] bg-[#F9F1E7] rounded-[10px] flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.title}
                width={388}
                height={478}
                className="object-contain mix-blend-multiply"
                priority
              />
            </div>
          </div>

          {/* ================= RIGHT : DETAILS ================= */}
          <div className="max-w-[606px]">

            <h1 className="text-[42px] leading-[63px]">{product.title}</h1>

            <p className="text-[24px] text-[#9F9F9F] mb-[15px]">
              Rs. {product.price}.00
            </p>

            {/* Rating */}
            <div className="flex items-center gap-[18px] mb-[20px]">
              <div className="flex gap-[6px] text-[#FFC700]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i + 1 <= Math.floor(rating) ? "#FFC700" : "none"}
                    stroke="#FFC700"
                  />
                ))}
              </div>
              <div className="h-[30px] w-[1px] bg-[#9F9F9F]" />
              <span className="text-[13px] text-[#9F9F9F]">
                {reviews} Customer Review
              </span>
            </div>

            {/* Description */}
            <p className="text-[13px] leading-[20px] max-w-[424px] mb-[36px]">
              {product.description}
            </p>

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-[18px]">
                <p className="text-[14px] text-[#9F9F9F] mb-[12px]">Size</p>
                <div className="flex gap-[16px]">
                  {product.sizes.map((size, i) => (
                    <button
                      key={size}
                      className={`w-[30px] h-[30px] rounded-[5px] text-[13px]
                        ${i === 0 ? "bg-[#B88E2F] text-white" : "bg-[#F9F1E7]"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && (
              <div className="mb-[32px]">
                <p className="text-[14px] text-[#9F9F9F] mb-[12px]">Color</p>
                <div className="flex gap-[16px]">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="w-[30px] h-[30px] rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-[18px] mb-[60px]">
              <div className="w-[123px] h-[64px] border rounded-[10px] flex items-center justify-between px-[15px]">
                <span>-</span>
                <span>1</span>
                <span>+</span>
              </div>

              <button className="w-[215px] h-[64px] rounded-[15px] bg-[#353F8C] text-white text-[20px]">
                Contact Us
              </button>
            </div>

            {/* Meta */}
            <div className="border-t border-[#D9D9D9] pt-[40px] space-y-[12px] text-[#9F9F9F]">
              <Meta label="SKU" value={product.sku} />
              <Meta label="Category" value={product.category} />
              <Meta label="Tags" value={product.tags?.join(", ") ?? product.category} />

              <div className="flex items-center gap-[25px]">
                <span className="w-[90px]">Share</span>:
                <Facebook size={20} className="text-black" />
                <Linkedin size={20} className="text-black" />
                <Twitter size={20} className="text-black" />
              </div>
            </div>
          </div>
        </div>
      </section>

     <ProductTabs product={product} />
      <RelatedProducts />
      
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex">
      <span className="w-[90px]">{label}</span>: {value}
    </div>
  );
}
