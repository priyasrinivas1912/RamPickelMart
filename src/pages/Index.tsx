import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../components/sections/Hero";
import ProductSection from "../components/sections/ProductSection";
import BestSellers from "../components/sections/BestSellers";
import WhyUs from "../components/sections/WhyUs";
import Newsletter from "../components/sections/Newsletter";
import Story from "../components/sections/Story";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      <main>
        {/* SEO HEADING */}
        <h1 className="sr-only">
          Ram Pickel Mart - Authentic Andhra pickles, podis & homemade foods
        </h1>

        {/* HERO SECTION */}
        <Hero />

        {/* PRODUCT SECTION */}
        <ProductSection />


        {/* BEST SELLERS SECTION */}
        <BestSellers />

        {/* WHY US SECTION */}
        <WhyUs />

        {/* STORY SECTION */}
        <Story />

        {/* NEWSLETTER SECTION */}
        <Newsletter />

        <div className="h-16 md:h-24" />
      </main>

      <Footer />
    </div>
  );
};

export default Index;