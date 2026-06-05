import { products } from "@/data/productData";

export default function ProductsPage() {
  return (
    <section className="py-16 px-4 bg-[#fffaf5] min-h-screen">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-12">
          All Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded-xl"
              />

              <h2 className="text-xl font-bold mt-4">
                {product.name}
              </h2>

                <p className="text-[#b14d1c] font-semibold mt-2">
                Rs. {product.price.toFixed(2)}
              </p>

              <button className="w-full mt-4 bg-brown-700 text-white py-3 rounded-xl">
                Add to Cart
              </button>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}