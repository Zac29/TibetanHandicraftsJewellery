// app/sitemap.ts
import type { MetadataRoute } from "next";

export const dynamic = "force-static"; // ✅ MUST be static

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://tibetandhammashop.com";

  let productUrls: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch("https://thj-backend.onrender.com/api/products", {
      cache: "force-cache", // ✅ required for static export
    });

    const products = await res.json();

    productUrls = products.map((product: any) => ({
      url: `${BASE_URL}/product?id=${product._id}`, // ✅ correct route
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      images: product.image
        ? [
            {
              url: product.image,
              title: product.title,
            },
          ]
        : undefined,
    }));
  } catch (err) {
    console.error("Sitemap fetch failed", err);
  }

  // ✅ categories (SEO boost)
  const categories = [
    "bracelets",
    "necklaces",
    "rings",
    "statues",
    "handicrafts",
    "jewellery",
    "art",
    "decor",
    "utensils",
  ];

  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/products?category=${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...categoryUrls,
    ...productUrls,
  ];
}