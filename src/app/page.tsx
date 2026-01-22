import Catogery from "../components/home/catogery";
import Hero from "../components/home/Hero";
import ProductsGrid from "../components/products/ProductsGrid";
import ScaleWrapper from "../components/layout/ScaleWrapper";
import ProductShowcase from "../components/home/ProductShowcase";
import Testimonials from "../components/home/Testimonials";
export default function Home() {
  return (
    <ScaleWrapper>
      <Hero />
      <Catogery />
      <ProductsGrid />
      <ProductShowcase />
      <Testimonials />
    </ScaleWrapper>
  );
}
