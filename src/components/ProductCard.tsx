import { Link } from "react-router-dom";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number; // ✅ fixes "index does not exist on type IntrinsicAttributes & { product: Product }"
}

export default function ProductCard({ product }: ProductCardProps) {
  const href = `/products/${product.slug}`;

  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden border-2 border-[#d4c4b0] hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-64">

      {/* Product Image */}
      <Link to={href} className="block overflow-hidden bg-[#e8ddd0]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center text-[#b5a08a] text-sm bg-[#e8ddd0]">
            No Image
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3">
        <Link to={href}>
          <h3 className="font-bold text-[16px] text-[#2b1e0f] leading-snug hover:text-[#d4621a] transition-colors">
            {product.name}
          </h3>
          {product.teluguName && (
            <p className="text-xs text-[#8b7355] mt-1">{product.teluguName}</p>
          )}
        </Link>

        <p className="text-[#c85a16] font-bold text-[17px]">
          From Rs. {product.price.toFixed(2)}
        </p>

        <Link
          to={href}
          className="mt-auto block text-center border-2 border-[#c4a878] text-[#6b4f34] text-[14px] font-semibold py-3 rounded-lg hover:bg-[#c4a878] hover:text-white transition-all duration-200"
        >
          Choose options
        </Link>
      </div>
    </div>
  );
}
