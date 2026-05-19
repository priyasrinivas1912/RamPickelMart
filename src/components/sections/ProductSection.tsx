import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const ProductSection = () => (
  <section className="bg-background">
    <div className="container py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start">
        <div className="max-w-xl lg:sticky lg:top-24">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground shadow-soft">
            Shop authentic flavors
          </span>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl text-balance">
            A simple collection of our most loved jars.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            Traditional Andhra pickles, honey, ghee and snacks made in small batches with clear ingredients and careful preparation.
          </p>
          <div className="mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-colors hover:bg-primary-glow"
            >
              Browse full collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProductSection;
