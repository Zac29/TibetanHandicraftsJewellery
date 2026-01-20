import Catogery from "../components/layout/home/catogery";
import Hero from "../components/layout/home/Hero";
import ProductsGrid from "../components/products/ProductsGrid";
import ScaleWrapper from "../components/layout/ScaleWrapper";
import ProductShowcase from "../components/layout/home/ProductShowcase";
import Footer from "../components/layout/Footer";
import Testimonials from "../components/layout/home/Testimonials";
export default function Home() {
  return (
    <ScaleWrapper>
      <Hero />
      <Catogery />
      <ProductsGrid />
      <ProductShowcase />
      <Testimonials />
      <Footer />
    </ScaleWrapper>
  );
}
