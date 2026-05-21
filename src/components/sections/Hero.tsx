import banner from "../../assets/banner.jpg";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background Image */}
      <img
        src={banner}
        alt="RamPickelMart Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">

        {/* Left Side Text */}
        <div className="w-full md:w-2/3 px-8 md:px-20 text-white flex flex-col justify-center h-full">

          {/* Welcome Text */}
          <h2 className="text-2xl md:text-3xl font-light tracking-[8px] uppercase">
            Welcome To
          </h2>

          {/* Brand Name */}
          <h1
            className="
              mt-2
              text-3xl
              md:text-5xl
              lg:text-6xl
              font-extrabold
              uppercase
              leading-tight
              break-words
              bg-gradient-to-r
              from-yellow-300
              via-amber-400
              to-orange-500
              bg-clip-text
              text-transparent
              drop-shadow-2xl
            "
          >
            RamPickelMart
          </h1>

          {/* Caption */}
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed">
            Authentic Andhra flavors, made in small batches and delivered with care.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            {/* Shop Button */}
            <Link to="/shop">
              <button
                className="
                  h-14
                  rounded-full
                  bg-orange-500
                  px-8
                  text-base
                  font-semibold
                  text-white
                  shadow-lg
                  transition
                  hover:bg-orange-600
                "
              >
                <span className="flex items-center">
                  Shop the harvest
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </button>
            </Link>

            {/* Story Button */}
            <a href="#story">
              <button
                className="
                  h-14
                  rounded-full
                  border
                  border-white
                  bg-transparent
                  px-8
                  text-base
                  font-semibold
                  text-white
                  transition
                  hover:bg-white
                  hover:text-black
                "
              >
                Read our story
              </button>
            </a>

          </div>

        </div>

      </div>

      {/* Left Arrow */}
      <div className="absolute inset-y-0 left-4 flex items-center">
        <button
          type="button"
          className="rounded-full bg-white/80 p-3 text-black shadow-lg hover:bg-white transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Right Arrow */}
      <div className="absolute inset-y-0 right-4 flex items-center">
        <button
          type="button"
          className="rounded-full bg-white/80 p-3 text-black shadow-lg hover:bg-white transition"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom Dots */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">

        <div className="h-2.5 w-2.5 rounded-full bg-orange-400"></div>

        <div className="h-2.5 w-2.5 rounded-full bg-white/50"></div>

        <div className="h-2.5 w-2.5 rounded-full bg-white/50"></div>

      </div>

    </section>
  );
}