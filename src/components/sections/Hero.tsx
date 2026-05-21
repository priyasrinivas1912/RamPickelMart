import banner from "../../assets/banner.jpg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Background Image */}
      <img
        src={banner}
        alt="RamPickelMart Banner"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* HERO CONTENT */}
      <div
        className="
          relative
          z-10
          min-h-screen
          flex
          items-center
          justify-center
          px-4
          sm:px-6
          md:px-10
          py-20
        "
      >

        {/* SAME VIEW FOR MOBILE / TABLET / LAPTOP */}
        <div
          className="
            w-full
            max-w-5xl
            text-center
          "
        >

          {/* Welcome Text */}
          <h2
            className="
              text-xl
              sm:text-2xl
              md:text-3xl
              font-semibold
              tracking-[6px]
              sm:tracking-[8px]
              md:tracking-[10px]
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
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
              font-extrabold
              uppercase
              leading-none
              tracking-tight
              text-[#f5cf68]
              drop-shadow-[0_6px_18px_rgba(0,0,0,0.7)]
              break-words
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
              mx-auto
              mt-6
              max-w-3xl
              text-base
              sm:text-lg
              md:text-xl
              lg:text-2xl
              font-semibold
              leading-relaxed
              text-white
              drop-shadow-md
              px-2
            "
          >
            Authentic Andhra flavors, made in small batches and delivered with care.
          </p>

          {/* Buttons */}
          <div
            className="
              mt-10
              flex
              flex-row
              items-center
              justify-center
              gap-4
              flex-wrap
            "
          >

            {/* Shop Button */}
            <Link to="/shop">
              <button
                className="
                  h-14
                  rounded-full
                  bg-orange-500
                  px-6
                  sm:px-8
                  text-sm
                  sm:text-base
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:bg-orange-600
                  hover:scale-105
                "
              >
                <span className="flex items-center justify-center">
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
                  px-6
                  sm:px-8
                  text-sm
                  sm:text-base
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