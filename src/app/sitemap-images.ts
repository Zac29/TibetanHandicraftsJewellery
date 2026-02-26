import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tibetandhammashop.com";

  const res = await fetch(
    "https://thj-backend.onrender.com/api/products",
    { cache: "force-cache" }
  );

  const products = await res.json();

  return products.map((product: any) => ({
    url: `${baseUrl}/products/${product._id}`,
    images: [
      {
        url: product.image,
        title: product.title,
      },
    ],
  }));
}