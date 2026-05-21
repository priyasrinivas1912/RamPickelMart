import collectionsBanner from "../../assets/collections-banner.jpg";

export default function ProductSection() {
  return (
    <section className="bg-[#f7f1e7] py-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-12">

          <h2 className="text-5xl md:text-6xl font-extrabold text-[#b14d1c]">
            Our Collections
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl leading-relaxed">
            Discover authentic Andhra homemade flavors crafted with tradition and care.
          </p>

        </div>

        {/* Banner Image */}
        <div className="overflow-hidden rounded-[32px] shadow-2xl">

          <img
            src={collectionsBanner}
            alt="RamPickelMart Collections"
            className="w-full object-cover"
          />

        </div>

      </div>

    </section>
  );
}