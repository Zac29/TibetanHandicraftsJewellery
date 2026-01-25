
import { notFound } from "next/navigation";
import { products } from "../../../lib/products";
import ProductPageBanner from "../../../components/common/ProductPageBanner";
import ProductTabs from "../../../components/products/ProductTabs";
import RelatedProducts from "../../../components/products/RelatedProducts";
import { Facebook, Linkedin, Twitter, Star } from "lucide-react";
import Gallery from "./Gallery";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: String(product.id),
  }));
}

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
    <>
      <ProductPageBanner category="Product" product={product.title} />

      <section className="max-w-[1440px] mx-auto px-[20px] md:px-[100px] py-[35px] border-b border-[#D9D9D9]">
        <div className="flex flex-col md:flex-row gap-[30px] md:gap-[105px]">

          {/* ✅ Gallery */}
          <Gallery
            images={product.gallery ?? [product.image]}
            title={product.title}
          />

          {/* ✅ Details */}
          <div className="w-full md:max-w-[606px]">
            <h1 className="text-[28px] md:text-[42px] leading-tight md:leading-[63px]">
              {product.title}
            </h1>

            <p className="text-[20px] md:text-[24px] text-[#9F9F9F] mb-[15px]">
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
              <span className="text-[13px] text-[#9F9F9F]">
                {reviews} Customer Review
              </span>
            </div>

            <p className="text-[13px] leading-[20px] md:max-w-[424px] mb-[36px]">
              {product.description}
            </p>

            {/* Meta */}
            <div className="border-t border-[#D9D9D9] pt-[40px] space-y-[12px] text-[#9F9F9F] text-sm sm:text-base">
              <Meta label="SKU" value={product.sku} />
              <Meta label="Category" value={product.category} />
              <Meta
                label="Tags"
                value={product.tags?.join(", ") ?? product.category}
              />

              <div className="flex items-center gap-[25px] flex-wrap">
                <span className="w-[90px]">Share</span>:
                <Facebook size={20} />
                <Linkedin size={20} />
                <Twitter size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductTabs product={product} />
      <RelatedProducts />
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex">
      <span className="w-[90px]">{label}</span>: {value}
    </div>
  );
}
