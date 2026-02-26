import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tibetandhammashop.com";

  const res = await fetch(
    "https://thj-backend.onrender.com/api/products",
    { cache: "force-cache" } // important for static export
  );

  const products = await res.json();

  const productUrls = products.map((product: any) => ({
    url: `${baseUrl}/products/${product._id}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      priority: 0.6,
    },
    ...productUrls,
  ];
}