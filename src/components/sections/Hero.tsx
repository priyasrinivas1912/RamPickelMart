import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import honey from "@/assets/honey.jpg";
import ghee from "@/assets/ghee.jpg";
import sweets from "@/assets/sweets.jpg";
import pickle from "@/assets/hero-pickle.jpg";

const banners = [honey, ghee, sweets, pickle];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  return (
    <section
      className="
        relative overflow-hidden
        h-[60vh]
        sm:h-[75vh]
        md:h-[85vh]
        lg:h-screen
      "
    >

      {/* SLIDES */}
      {banners.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Banner ${index + 1}`}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/45" />

      {/* CONTENT WRAPPER */}
      <div
        className="
          relative z-10 h-full flex items-center justify-center
          px-4 sm:px-6 md:px-10 lg:px-16
        "
      >
        <div className="w-full max-w-6xl text-center">

          {/* TITLE */}
          <h2
            className="
              text-xs sm:text-sm md:text-xl lg:text-3xl
              font-semibold tracking-[4px] uppercase text-white
            "
            style={{ fontFamily: "'Times New Roman', serif" }}
          >
            Welcome To
          </h2>

          {/* BRAND */}
          <h1
            className="
              mt-2 sm:mt-3
              text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
              font-extrabold uppercase text-[#f5cf68]
              drop-shadow-[0_6px_18px_rgba(0,0,0,0.7)]
            "
            style={{ fontFamily: "'Times New Roman', serif" }}
          >
            RamPickelMart
          </h1>

          {/* CAPTION */}
          <p
            className="
              mx-auto mt-3 sm:mt-4
              max-w-3xl lg:max-w-4xl
              text-[11px] sm:text-base md:text-lg lg:text-xl
              text-white leading-relaxed
            "
          >
            Authentic Andhra flavors, made in small batches and delivered with care.
          </p>

          {/* BUTTONS (DEVICE ADAPTIVE) */}
          <div
            className="
              mt-6 sm:mt-8
              flex flex-col sm:flex-row
              items-center justify-center
              gap-3 sm:gap-4
            "
          >

            <Link to="/shop">
              <button
                className="
                  h-11 sm:h-12 md:h-14
                  px-6 sm:px-7 md:px-8
                  rounded-full
                  bg-orange-500 text-white
                  font-semibold
                  hover:bg-orange-600 hover:scale-105 transition
                "
              >
                <span className="flex items-center">
                  Shop the harvest
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </button>
            </Link>

            <a href="#story">
              <button
                className="
                  h-11 sm:h-12 md:h-14
                  px-6 sm:px-7 md:px-8
                  rounded-full
                  border border-white text-white
                  font-semibold
                  hover:bg-white hover:text-black transition
                "
              >
                Read our story
              </button>
            </a>

          </div>
        </div>
      </div>

      {/* ARROWS (HIDDEN ON MOBILE FOR CLEAN UI) */}
      <button
        onClick={prevSlide}
        className="
          hidden sm:flex
          absolute left-4 top-1/2 -translate-y-1/2 z-20
          rounded-full bg-white/20 p-3 text-white
          backdrop-blur-md hover:bg-white/40 transition
        "
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="
          hidden sm:flex
          absolute right-4 top-1/2 -translate-y-1/2 z-20
          rounded-full bg-white/20 p-3 text-white
          backdrop-blur-md hover:bg-white/40 transition
        "
      >
        <ChevronRight />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-5 sm:bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all ${
              current === index
                ? "bg-orange-400 scale-125"
                : "bg-white/60"
            }`}
          />
        ))}
      </div>

    </section>
  );
}