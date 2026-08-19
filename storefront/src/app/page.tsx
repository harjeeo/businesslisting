import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import CategoryGrid from "@/components/CategoryGrid";
import CityGrid from "@/components/CityGrid";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import HowItWorks from "@/components/HowItWorks";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <CategoryGrid />
        <CityGrid />
        <FeaturedBusinesses />
        <HowItWorks />
        <CtaBanner />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
