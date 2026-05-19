import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const ProductSection = () => (
  <section className="container py-24" id="products">
    <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
      <div className="max-w-xl">
        <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Shop Authentic Flavors</span>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink mt-4 leading-tight text-balance">
          Discover the jars that make every meal feel like home.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Handpicked from our signature collection, each product is crafted using traditional Andhra techniques, raw ingredients, and small-batch care.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant hover:bg-primary-glow transition-colors">
            Browse full collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {products.slice(0, 4).map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default ProductSection;
