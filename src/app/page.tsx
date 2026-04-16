// app/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import Hero from "../components/home/Hero";
import Catogery from "../components/home/catogery";
import ProductsGrid from "../components/products/ProductsGrid";
import ScaleWrapper from "../components/layout/ScaleWrapper";
import ProductShowcase from "../components/home/ProductShowcase";
import Testimonials from "../components/home/Testimonials";

const BASE_URL = "https://tibetandhammashop.com";

export const metadata: Metadata = {
  title: "Authentic Tibetan Handicrafts & Jewellery | Himalayan Art Online",
  description:
    "Shop authentic Tibetan handicrafts, jewellery, Buddha statues, mandala art, and singing bowls. Handcrafted by Himalayan master artisans with over 25 years of experience.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Authentic Tibetan Handicrafts & Jewellery | Himalayan Art Online",
    description:
      "Shop authentic Tibetan handicrafts, jewellery, Buddha statues, mandala art, and singing bowls.",
    url: BASE_URL,
    type: "website",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tibetan Handicrafts Jewellery",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Authentic Tibetan handicrafts, jewellery, and sacred artifacts handcrafted by Himalayan master artisans.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.instagram.com/tibetanhandicraft",
    "https://www.facebook.com/tibetanhandicraft",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: BASE_URL,
  name: "Tibetan Handicrafts Jewellery",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/products?category={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema]),
        }}
      />
      <ScaleWrapper>
        <Hero />
        <Catogery />
        <ProductsGrid />
        <ProductShowcase />
        <Testimonials />
      </ScaleWrapper>
    </>
  );
}