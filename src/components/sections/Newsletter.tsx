import {
  MessageCircleHeart,
  ShoppingBag,
} from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-[#f7f1e7] py-20 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#7a2e0b] via-[#a14516] to-[#d97706] px-8 py-16 md:px-16 shadow-2xl">

          {/* Background Glow */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-yellow-200/20 blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10 text-center">

            {/* Heading */}
            <h2
              className="text-4xl md:text-5xl font-extrabold text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Stay Connected With RamPickelMart
            </h2>

            {/* Subtitle */}
            <p className="mt-6 text-lg md:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Loved our homemade Andhra flavors? Share your experience with us
              and connect for festive hampers, catering, and bulk orders.
            </p>

            {/* Subscribe Box */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

              {/* Email Input */}
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  h-14
                  w-full
                  sm:w-[380px]
                  rounded-full
                  border
                  border-white/20
                  bg-white/10
                  px-6
                  text-white
                  placeholder:text-orange-100
                  backdrop-blur-md
                  outline-none
                  shadow-lg
                  focus:ring-2
                  focus:ring-orange-200
                "
              />

              {/* Subscribe Button */}
              <button
                className="
                  h-14
                  rounded-full
                  bg-white
                  px-8
                  font-semibold
                  text-[#a14516]
                  shadow-xl
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-orange-50
                "
              >
                Subscribe
              </button>

            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">

              {/* Review Button */}
              <button
                className="
                  group
                  h-14
                  rounded-full
                  bg-white
                  px-8
                  font-semibold
                  text-[#a14516]
                  shadow-xl
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-orange-50
                "
              >
                <span className="flex items-center gap-3">

                  <MessageCircleHeart className="h-5 w-5" />

                  Share Your Taste Journey

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ✨
                  </span>

                </span>
              </button>

              {/* Bulk Orders Button */}
              <button
                className="
                  group
                  h-14
                  rounded-full
                  border
                  border-white
                  bg-transparent
                  px-8
                  font-semibold
                  text-white
                  shadow-xl
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-[#a14516]
                  hover:scale-105
                "
              >
                <span className="flex items-center gap-3">

                  <ShoppingBag className="h-5 w-5" />

                  Ping Us For Bulk Orders

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </span>
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}