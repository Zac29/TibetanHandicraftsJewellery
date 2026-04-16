// app/products/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { category?: string };
}): Promise<Metadata> {
  const category = searchParams?.category;
  const BASE_URL = "https://tibetandhammashop.com";

  const title = category
    ? `${category} | Tibetan Handicrafts Collection`
    : "All Products | Tibetan Handicrafts & Jewellery";

  const description = category
    ? `Browse our authentic collection of Tibetan ${category}. Handcrafted by Himalayan master artisans with traditional techniques.`
    : "Explore our complete collection of authentic Tibetan handicrafts, jewellery, statues, mandala art, and sacred artifacts.";

  return {
    title,
    description,
    alternates: {
      canonical: category
        ? `${BASE_URL}/products?category=${category}`
        : `${BASE_URL}/products`,
    },
    openGraph: {
      title,
      description,
      url: category
        ? `${BASE_URL}/products?category=${category}`
        : `${BASE_URL}/products`,
    },
  };
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsClient />
    </Suspense>
  );
}