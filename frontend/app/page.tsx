import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import CategorySection from "@/components/home/category-section";
import FeaturedProducts from "@/components/home/featured-products";
import SmartFinderPreview from "@/components/home/smart-finder-preview";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <SmartFinderPreview />
      <Footer />
    </main>
  );
}
