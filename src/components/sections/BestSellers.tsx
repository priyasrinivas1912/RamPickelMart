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
    <section className="w-full px-6 md:px-12 py-12 bg-[#f9f6f1]">

      {/* Header */}
      <h2
        className="text-4xl md:text-5xl font-bold text-[#c85a16] mb-8"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Our Best Sellers
      </h2>

      {/* Product Carousel Container */}
      <div className="flex items-center gap-6">
        {/* Left Arrow */}
        {totalPages > 1 && (
          <button
            onClick={prev}
            disabled={page === 0}
            className="p-2 rounded-full border-2 border-[#c4a878] text-[#8b6f47] hover:bg-[#e8ddd0] disabled:opacity-30 transition flex-shrink-0"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Product Grid */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {totalPages > 1 && (
          <button
            onClick={next}
            disabled={page === totalPages - 1}
            className="p-2 rounded-full border-2 border-[#c4a878] text-[#8b6f47] hover:bg-[#e8ddd0] disabled:opacity-30 transition flex-shrink-0"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Pagination — only show if more than one page */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <span className="text-base font-semibold text-[#c85a16]">
            {page + 1}/{totalPages}
          </span>
        </div>
      )}
    </section>
  );
}
