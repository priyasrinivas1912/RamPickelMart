import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const BestSellers = () => (
  <section className="container py-24" id="shop">
    <div className="flex items-end justify-between mb-12 gap-6">
      <div>
        <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">The Harvest</span>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink mt-3 max-w-2xl text-balance">
          Best-loved jars from <em className="text-accent not-italic">our kitchen</em>
        </h2>
      </div>
      <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-primary transition-colors group">
        View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
    </div>
  </section>
);

export default BestSellers;
