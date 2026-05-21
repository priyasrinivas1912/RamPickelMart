import { Link } from "react-router-dom";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number; // ✅ fixes "index does not exist on type IntrinsicAttributes & { product: Product }"
}

export default function ProductCard({ product }: ProductCardProps) {
  const href = `/products/${product.slug}`;

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#e8ddd0] hover:shadow-lg transition-shadow duration-300">

      {/* Product Image */}
      <Link to={href} className="block overflow-hidden bg-[#f5f0ea]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-56 flex items-center justify-center text-[#b5a08a] text-sm bg-[#f0ebe3]">
            No Image
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="flex flex-col flex-1 px-4 pt-3 pb-4 gap-2">
        <Link to={href}>
          <h3 className="font-semibold text-[15px] text-[#2b1e0f] leading-snug hover:text-[#b85c1a] transition-colors">
            {product.name}
          </h3>
          {product.teluguName && (
            <p className="text-xs text-[#a08060] mt-0.5">{product.teluguName}</p>
          )}
        </Link>

        <p className="text-[#b85c1a] font-bold text-[15px]">
          From Rs. {product.price.toFixed(2)}
        </p>

        <Link
          to={href}
          className="mt-auto block text-center border border-[#2b1e0f] text-[#2b1e0f] text-[13px] font-medium py-2.5 rounded-lg hover:bg-[#2b1e0f] hover:text-white transition-colors duration-200"
        >
          Choose options
        </Link>
      </div>
    </div>
  );
}