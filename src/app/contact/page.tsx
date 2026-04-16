import PageBanner from "../../components/common/PageBanner";
import ContactSection from "../../components/contact/ContactSection";
import FeaturesStrip from "../../components/common/FeaturesStrip";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Tibetan Handicrafts Concierge Service",
  description:
    "Get in touch with our concierge team for inquiries about authentic Tibetan handicrafts, custom orders, and wholesale. Direct artisan consultation available.",
  alternates: { canonical: "https://tibetandhammashop.com/contact" },
  openGraph: {
    title: "Contact | Tibetan Handicrafts Concierge Service",
    description:
      "Inquire about authentic Tibetan handicrafts, custom orders, and wholesale with our expert concierge team.",
    url: "https://tibetandhammashop.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-[#fcfaf7]">
      <PageBanner
        title="Concierge"
        breadcrumb="Contact"
        imageSrc="/contact-banner.png"
      />

      {/* The redesigned section handles its own spacing and responsiveness */}
      <ContactSection />

      {/* <div className="pb-20"> */}
        <FeaturesStrip />
      {/* </div> */}
    </main>
  );
}