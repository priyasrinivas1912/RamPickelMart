import banner from "../../assets/banner.jpg";
import { ArrowRight } from "lucide-react";
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
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center">

        <div className="text-center px-6">

          {/* Welcome Text */}
          <h2
            className="
              text-xl
              md:text-2xl
              lg:text-3xl
              font-semibold
              tracking-[10px]
              uppercase
              text-white
              drop-shadow-lg
            "
          >
            Welcome To
          </h2>

          {/* Brand Name */}
          <h1
            className="
              mt-4
              text-5xl
              md:text-7xl
              lg:text-8xl
              font-extrabold
              uppercase
              leading-none
              tracking-tight
              text-[#f5cf68]
              drop-shadow-[0_6px_18px_rgba(0,0,0,0.7)]
            "
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Rampickelmart
          </h1>

          {/* Caption */}
          <p
            className="
              mt-6
              text-lg
              md:text-2xl
              font-semibold
              text-white
              max-w-2xl
              leading-relaxed
              drop-shadow-md
              mx-auto
            "
          >
            Authentic Andhra flavors, made in small batches and delivered with care.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">

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
                  transition-all
                  duration-300
                  hover:bg-orange-600
                  hover:scale-105
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
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-black
                  hover:scale-105
                "
              >
                Read our story
              </button>
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}