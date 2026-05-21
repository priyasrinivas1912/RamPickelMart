import {
  Award,
  Truck,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

import { motion } from "framer-motion";

const items = [
  {
    icon: Award,
    title: "Heritage Recipes",
    text: "Five-generation village recipes, tested in our own homes before they reach yours.",
  },
  {
    icon: ShieldCheck,
    title: "Lab-Tested Purity",
    text: "Every batch tested for adulteration. FSSAI certified. Zero compromises.",
  },
  {
    icon: Truck,
    title: "Fast & Fresh Delivery",
    text: "Pan-India shipping in temperature-stable packaging within 3-5 days.",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    text: "Not in love? Full refund within 7 days, no questions asked.",
  },
];

const WhyUs = () => (
  <section
    id="why-us"
    className="py-20 md:py-24 overflow-hidden bg-[#fffaf5]"
  >

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">

        <span
          className="
            text-[11px]
            sm:text-xs
            uppercase
            tracking-[0.30em]
            text-[#b14d1c]
            font-semibold
          "
        >
          Why Ram Pickel Mart
        </span>

        <h2
          className="
            mt-4
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-extrabold
            text-[#3d2514]
            leading-tight
          "
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Why Choose Ram Pickles
        </h2>

      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-4 gap-6">

        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
            }}
            className="
              bg-white
              p-8
              rounded-[30px]
              shadow-xl
              hover:shadow-2xl
              transition-all
              duration-500
              hover:-translate-y-2
              border
              border-[#f0dfcb]
            "
          >

            {/* Icon */}
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-br
                from-[#b14d1c]
                to-[#e08a3d]
                grid
                place-items-center
                text-white
                mb-5
                shadow-lg
              "
            >
              <it.icon className="h-6 w-6" />
            </div>

            {/* Title */}
            <h3
              className="
                text-xl
                font-bold
                text-[#3d2514]
                mb-3
              "
            >
              {it.title}
            </h3>

            {/* Text */}
            <p
              className="
                text-sm
                leading-relaxed
                text-[#6b5b4b]
              "
            >
              {it.text}
            </p>

          </motion.div>
        ))}

      </div>

      {/* Mobile & Tablet Horizontal Scroll */}
      <div
        className="
          lg:hidden
          flex
          gap-5
          overflow-x-auto
          pb-4
          snap-x
          snap-mandatory
          scrollbar-hide
        "
      >

        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
            }}
            className="
              min-w-[280px]
              sm:min-w-[320px]
              bg-white
              p-7
              rounded-[28px]
              shadow-xl
              border
              border-[#f0dfcb]
              snap-center
              flex-shrink-0
            "
          >

            {/* Icon */}
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-br
                from-[#b14d1c]
                to-[#e08a3d]
                grid
                place-items-center
                text-white
                mb-5
                shadow-lg
              "
            >
              <it.icon className="h-6 w-6" />
            </div>

            {/* Title */}
            <h3
              className="
                text-xl
                font-bold
                text-[#3d2514]
                mb-3
              "
            >
              {it.title}
            </h3>

            {/* Text */}
            <p
              className="
                text-sm
                leading-relaxed
                text-[#6b5b4b]
              "
            >
              {it.text}
            </p>

          </motion.div>
        ))}

      </div>

    </div>

  </section>
);

export default WhyUs;