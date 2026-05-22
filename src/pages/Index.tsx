import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/sections/Hero";
import ProductSection from "../components/sections/ProductSection";
import CarouselSection from "../components/sections/CarouselSection";
import WhyUs from "../components/sections/WhyUs";
import Newsletter from "../components/sections/Newsletter";
import Story from "../components/sections/Story";

const Index = () => {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      <main>
        <h1 className="sr-only">
          Ram Pickel Mart - Authentic Andhra pickles, podis & homemade foods
        </h1>

        {/* HERO */}
        <Hero />

        {/* PRODUCTS */}
        <ProductSection />

        {/* CATEGORY CAROUSEL */}
        <CarouselSection />

        {/* WHY US */}
        <WhyUs />

        {/* STORY (MOVED UP) */}
        <Story />

        {/* NEWSLETTER (MOVED DOWN) */}
        <Newsletter />

        <div className="h-16 md:h-24" />
      </main>

      <Footer />
    </div>
  );
};

export default Index;