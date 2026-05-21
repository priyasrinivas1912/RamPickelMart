type Product = {
  id: string;
  name: string;
  price: number;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-xl p-4 hover:shadow-md transition bg-white">
      
      {/* No image used — intentional minimal design */}
      <div className="h-20 flex items-center justify-center text-gray-400 text-sm border-b mb-3">
        No Image Preview
      </div>

      <h3 className="font-semibold text-sm md:text-base">
        {product.name}
      </h3>

      <p className="text-gray-600 text-sm mt-1">
        ₹{product.price}
      </p>
    </div>
  );
}