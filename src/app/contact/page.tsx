import Footer from "@/src/components/layout/Footer";
import PageBanner from "../../components/common/PageBanner";
import ContactSection from "../../components/contact/ContactSection";
import FeaturesStrip from "../../components/common/FeaturesStrip";
export default function ContactPage() {
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Contact"
        breadcrumb="Contact"
        imageSrc="/contact-banner.png"
      />

      {/* Page Content */}
      {/* <section className="w-full max-w-[1440px] mx-auto px-4 md:px-6 py-16">
        <div className="max-w-[720px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Get in Touch
          </h2>
          <p className="mt-4 text-gray-600">
            Have questions about our Tibetan handicrafts or jewellery?
            We’d love to hear from you.
          </p>
        </div> */}

        {/* You can add form / contact details here later */}
      {/* </section> */}

       <ContactSection />
        <FeaturesStrip />
       
    </>
  );
}
