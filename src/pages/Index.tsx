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
        <section className="container py-8">
          <div className="rounded-2xl bg-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="text-2xl font-display text-ink font-semibold">25k+ HAPPY FAMILIES</div>
              <div className="text-sm text-muted-foreground mt-1">40+ village recipes · 4.9★ avg rating</div>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-lg font-semibold">Slow-roasted podis · Sun-aged pickles · Cold-pressed oils</div>
              <div className="text-sm text-muted-foreground mt-1">Free shipping over ₹999</div>
            </div>
          </div>
        </section>

        {/* Categories above chart */}
        <section className="container py-12">
          <div className="mb-6 text-center">
            <h3 className="text-sm uppercase tracking-[0.28em] text-primary font-medium">Categories</h3>
            <p className="mt-2 text-muted-foreground">Pickles, Honey, Ghee, Sweets</p>
          </div>
          <div className="rounded-lg bg-card p-8 border border-border/60 shadow-soft">
            {/* Placeholder for chart or categories visualization */}
            <div className="h-48 grid place-items-center text-muted-foreground">[Categories chart / visualization here]</div>
          </div>
        </section>

        <Newsletter />
        <Story />

        <div className="h-16 md:h-24" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
