import { Award, Heart, Leaf, ShieldCheck, Sun, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import story from "@/assets/story-village.jpg";

const values = [
  { icon: Heart, title: "Family Recipes", text: "Recipes remembered from home kitchens, measured by taste and patience." },
  { icon: Leaf, title: "Natural Ingredients", text: "Fresh produce, real spices, and oils chosen for flavor instead of shortcuts." },
  { icon: Sun, title: "Traditional Aging", text: "Pickles are given time to mature so the spice, oil, and fruit settle beautifully." },
];

const promises = [
  { icon: Award, title: "Heritage Taste", text: "Andhra flavors made for the people who miss food that tastes like home." },
  { icon: ShieldCheck, title: "Careful Batches", text: "Every batch is checked before packing so quality stays consistent." },
  { icon: Truck, title: "Packed Fresh", text: "Prepared, sealed, and shipped with care so jars reach your table ready to enjoy." },
];

const StoryPage = () => (
  <div className="min-h-screen bg-paper">
    <Navbar />

    <main>

      {/* HERO SECTION */}
      <section className="bg-ink text-paper">
        <div className="container py-12 md:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-12 items-center">

          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-secondary font-medium">
              Our Story
            </span>

            <h1 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-7xl mt-3 md:mt-4 leading-tight md:leading-[1.04] text-balance">
              Andhra flavor, carried from family kitchens to your table.
            </h1>

            <p className="mt-4 md:mt-7 max-w-2xl text-paper/80 text-sm sm:text-base md:text-lg leading-relaxed">
              Ram Pickel Mart began with the taste of home: mango pickle resting in oil, spice mixes roasted slowly, and recipes passed from one careful hand to another. We built this store to keep those flavors close for families who love honest Andhra food.
            </p>
          </div>

          {/* IMAGE */}
          <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-clay h-[280px] sm:h-[350px] md:h-auto">
            <img
              src={story}
              alt="Traditional Andhra kitchen preparation"
              className="h-full w-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* WHY SECTION */}
      <section className="container py-12 md:py-20 lg:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-8 md:gap-12">

          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium">
              Why We Started
            </span>

            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-ink mt-3 leading-tight">
              Food should feel remembered, not manufactured.
            </h2>
          </div>

          <div className="space-y-4 md:space-y-5 text-muted-foreground leading-relaxed text-sm md:text-lg">
            <p>
              Our jars are inspired by the food people carry in memory: summer avakaya, gongura with rice, podi with ghee, and snacks shared during evenings at home.
            </p>

            <p>
              We work in small batches so the food keeps its character. The goal is simple: real ingredients, patient preparation, and flavors that taste generous from the first spoon.
            </p>

            <p className="font-display text-xl md:text-2xl text-primary italic">
              "Pickle is not just a product. It is a memory."
            </p>
          </div>

        </div>
      </section>

      {/* VALUES */}
      <section className="bg-paper-warm border-y border-border">

        <div className="container py-10 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">

          {values.map((item) => (
            <div key={item.title} className="bg-card border border-border/70 rounded-lg p-5 md:p-7 shadow-soft">

              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-spice text-primary-foreground grid place-items-center mb-4 md:mb-5">
                <item.icon className="h-4 w-4 md:h-5 md:w-5" />
              </div>

              <h3 className="font-display text-lg md:text-xl text-ink">
                {item.title}
              </h3>

              <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                {item.text}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* PROMISE */}
      <section className="container py-12 md:py-20 lg:py-24">

        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium">
            Our Promise
          </span>

          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-ink mt-3">
            Made with patience, packed with care.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {promises.map((item) => (
            <div key={item.title} className="text-center px-2 md:px-6">

              <div className="mx-auto h-12 w-12 md:h-14 md:w-14 rounded-full bg-paper-warm text-primary grid place-items-center mb-3 md:mb-4">
                <item.icon className="h-5 w-5 md:h-6 md:w-6" />
              </div>

              <h3 className="font-display text-lg md:text-xl text-ink">
                {item.title}
              </h3>

              <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                {item.text}
              </p>

            </div>
          ))}

        </div>

      </section>

    </main>

    <Footer />
  </div>
);

export default StoryPage;