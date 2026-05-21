
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function BestSellers() {
  return (
    <section className="w-full px-4 md:px-10 py-10">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Our Best Sellers
        </h2>

        <Link
          to="/products"
          className="flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      {/* Grid (no Shopify, no images required inside cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}