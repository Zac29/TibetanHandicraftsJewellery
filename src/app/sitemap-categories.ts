import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tibetandhammashop.com";

  const categories = [
    "bracelets",
    "necklaces",
    "rings",
    "statues",
    "handicrafts",
  ];

  return categories.map(cat => ({
    url: `${baseUrl}/products?category=${cat}`,
    lastModified: new Date(),
    priority: 0.7,
  }));
}