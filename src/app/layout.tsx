// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SplashScreen from "../components/common/SplashScreen";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const BASE_URL = "https://tibetandhammashop.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Tibetan Handicrafts & Jewellery | Authentic Himalayan Art",
    template: "%s | Tibetan Handicrafts",
  },
  description:
    "Discover authentic Tibetan handicrafts, jewellery, statues, and sacred artifacts handcrafted by Himalayan master artisans. Shop mandala art, Buddha statues, singing bowls and more.",
  keywords: [
    "tibetan handicrafts",
    "tibetan jewellery",
    "himalayan art",
    "buddha statue",
    "mandala art",
    "singing bowl",
    "tibetan artifacts",
    "handcrafted jewellery india",
    "authentic tibetan decor",
    "sacred artifacts",
    "tibetan singing bowls",
    "handicraft online shop",
  ],
  authors: [{ name: "Tibetan Handicrafts Jewellery", url: BASE_URL }],
  creator: "Tibetan Handicrafts Jewellery",
  publisher: "Tibetan Handicrafts Jewellery",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Tibetan Handicrafts Jewellery",
    title: "Tibetan Handicrafts & Jewellery | Authentic Himalayan Art",
    description:
      "Authentic Tibetan handicrafts, jewellery, and sacred artifacts by Himalayan master artisans. Mandala art, Buddha statues, singing bowls and more.",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`, // Create a 1200x630 image
        width: 1200,
        height: 630,
        alt: "Tibetan Handicrafts & Jewellery — Authentic Himalayan Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tibetan Handicrafts & Jewellery | Authentic Himalayan Art",
    description:
      "Authentic Tibetan handicrafts, jewellery, and sacred artifacts by Himalayan master artisans.",
    images: [`${BASE_URL}/og-image.jpg`],
    creator: "@tibetanhandicraft", // your Twitter handle
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/logo.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE", // replace
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <SplashScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}