import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const PAGE_SIZE = 4;

export default function BestSellers() {
  const [page, setPage] = useState(0);

  // Guard: if no products, render nothing
  if (!products || products.length === 0) return null;

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const visibleProducts = products.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section className="w-full px-4 md:px-10 py-10 bg-[#f7f1e8]">

      {/* Header */}
      <h2
        className="text-3xl md:text-4xl font-extrabold text-[#b85c1a] mb-6"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Our Best Sellers
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination — only show if more than one page */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            disabled={page === 0}
            className="p-2 rounded-full border border-[#c0aa90] text-[#6b4e2a] hover:bg-[#ede4d6] disabled:opacity-30 transition"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="text-sm font-medium text-[#6b4e2a]">
            {page + 1}/{totalPages}
          </span>

          <button
            onClick={next}
            disabled={page === totalPages - 1}
            className="p-2 rounded-full border border-[#c0aa90] text-[#6b4e2a] hover:bg-[#ede4d6] disabled:opacity-30 transition"
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}