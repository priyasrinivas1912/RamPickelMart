import { motion } from "framer-motion";
import story from "@/assets/story-village.jpg";

const Story = () => (
  <section
    id="story"
    className="
      relative
      overflow-hidden
      bg-[#1f130d]
      text-[#fffaf3]
      py-20
      lg:py-32
    "
  >

    {/* Background Grain */}
    <div className="absolute inset-0 opacity-20 grain" />

    <div
      className="
        relative
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
      "
    >

      {/* SAME VIEW FOR ALL DEVICES */}
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-12
          lg:gap-16
          items-center
        "
      >

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            relative
            w-full
            max-w-[650px]
            mx-auto
          "
        >

          <div
            className="
              aspect-[4/5]
              overflow-hidden
              rounded-[2rem]
              shadow-2xl
            "
          >

            <img
              src={story}
              alt="Grandmother grinding spices"
              loading="lazy"
              width={1200}
              height={1400}
              className="
                h-full
                w-full
                object-cover
              "
            />

          </div>

          {/* Floating Quote */}
          <div
            className="
              absolute
              bottom-4
              right-4
              sm:bottom-6
              sm:right-6
              max-w-[220px]
              sm:max-w-[240px]
              rounded-2xl
              bg-[#f4c27a]
              p-4
              sm:p-6
              shadow-2xl
            "
          >

            <p
              className="
                text-sm
                sm:text-base
                leading-snug
                text-[#2e1a10]
                font-semibold
              "
            >
              "My ammamma's avakaya, exactly as I remember it."
            </p>

            <p
              className="
                mt-2
                text-xs
                text-[#5c3b25]
              "
            >
              — Lakshmi, Hyderabad
            </p>

          </div>

        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            text-center
            lg:text-left
          "
        >

          <span
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-[#f4c27a]
              font-semibold
            "
          >
            Our Story
          </span>

          <h2
            className="
              mt-4
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              leading-[1.1]
              font-extrabold
            "
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            From{" "}
            <em className="not-italic text-[#f5cf68]">
              Ram Pickel Mart
            </em>{" "}
            kitchens to your table.
          </h2>

          <div
            className="
              mt-8
              space-y-5
              text-[#f8e7d8]/80
              leading-relaxed
              text-base
              sm:text-lg
            "
          >

            <p>
              Where traditional Andhra recipes meet modern love for authentic
              flavors. Ram Pickel Mart is a labor of love, born from a simple
              desire: to bring the soul of Andhra's village kitchens to homes
              across India.
            </p>

            <p>
              Ram Pickel Mart was born to carry these forgotten kitchens to your
              table. We work with small co-operatives of grandmothers across
              Krishna, Guntur and Godavari districts — paying them fairly for
              the recipes that have flavored generations.
            </p>

            <p
              className="
                text-xl
                sm:text-2xl
                italic
                text-[#f4c27a]
                font-semibold
              "
            >
              "Pickle is not a product. It's a memory."
            </p>

          </div>

        </motion.div>

      </div>

    </div>

  </section>
);

export default Story;