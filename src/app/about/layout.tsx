import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Tibetan Handicrafts — 25+ Years of Himalayan Artistry",
  description:
    "Learn about our 25+ year journey curating authentic Tibetan handicrafts and jewellery.",
  alternates: {
    canonical: "https://tibetandhammashop.com/about",
  },
  openGraph: {
    title: "About Us | Tibetan Handicrafts — 25+ Years of Himalayan Artistry",
    description:
      "25+ years curating authentic Tibetan handicrafts with Himalayan master artisans.",
    url: "https://tibetandhammashop.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}