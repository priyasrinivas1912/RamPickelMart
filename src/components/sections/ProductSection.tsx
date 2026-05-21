import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Veg Pickles",
    link: "/collections/veg-pickles",
    color: "text-green-700",
  },
  {
    id: 2,
    name: "Non-Veg Pickles",
    link: "/collections/non-veg",
    color: "text-red-700",
  },
  {
    id: 3,
    name: "Honey",
    link: "/collections/honey",
    color: "text-amber-700",
  },
  {
    id: 4,
    name: "Ghee",
    link: "/collections/ghee",
    color: "text-yellow-700",
  },
  {
    id: 5,
    name: "Sweets",
    link: "/collections/sweets",
    color: "text-pink-700",
  },
  {
    id: 6,
    name: "Snacks",
    link: "/collections/snacks",
    color: "text-lime-700",
  },
];

export default function ProductSection() {
  return (
    <section className="bg-[#f7f1e7] py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-[#b14d1c] text-xs md:text-sm font-semibold">
            Explore
          </p>

          <h2 className="mt-2 text-5xl md:text-6xl font-extrabold text-[#b14d1c]">
            Our Collections
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Authentic flavors, handcrafted with love and tradition.
          </p>
        </div>

        {/* Full Background without image cards */}
        <div className="relative overflow-hidden rounded-[32px] shadow-2xl bg-gradient-to-r from-[#f6e7d5] via-[#fff6ea] to-[#f3e3cf] py-24 px-10">

          {/* Decorative Blur Circles */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#ffddb8] rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#ffe7c9] rounded-full blur-3xl opacity-40" />

          {/* Cards */}
          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-[#fffaf3] rounded-[26px] border border-[#ead8c3] shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between min-h-[260px]"
              >

                {/* Brand */}
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#7a4b2d]">
                    RamPickelMart
                  </p>
                </div>

                {/* Category */}
                <div className="flex-1 flex items-center justify-center text-center py-8">

                  <h3
                    className={`text-4xl leading-tight font-extrabold ${cat.color}`}
                    style={{ fontFamily: "cursive" }}
                  >
                    {cat.name}
                  </h3>

                </div>

                {/* Button */}
                <Link
                  to={cat.link}
                  className={`group flex items-center justify-center gap-2 rounded-full border border-[#ead8c3] bg-white py-3 px-5 font-semibold shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 ${cat.color}`}
                >
                  Explore Collection

                  <ChevronRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}