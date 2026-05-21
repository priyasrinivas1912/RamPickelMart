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
        <h1 className="sr-only">Ram Pickel Mart - Authentic Andhra pickles, podis & homemade foods</h1>

        {/* Hero carousel with products below */}
        <Hero />

        {/* Featured product image right after hero */}
        <ProductSection />

        {/* Carousel of category images */}
        <CarouselSection />

        {/* Why choose Ram Pickles (text under carousel) */}
        <WhyUs />

        {/* Small stats banner */}
        

        

        <Newsletter />
        <Story />

        <div className="h-16 md:h-24" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
