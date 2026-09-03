import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoryShowcase from "@/components/CategoryShowcase";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <HeroSection />

      <FeaturedProducts />

      <CategoryShowcase />

      <TrustSection />

      <CTASection />

      <Footer />
    </main>
  );
}