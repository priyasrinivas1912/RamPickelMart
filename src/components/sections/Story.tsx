import { motion } from "framer-motion";
import story from "@/assets/story-village.jpg";

const Story = () => (
  <section id="story" className="bg-ink text-paper relative overflow-hidden">
    <div className="absolute inset-0 grain opacity-30" />
    <div className="container relative py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-clay">
          <img src={story} alt="Grandmother grinding spices" loading="lazy" width={1200} height={1400} className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-6 rounded-2xl max-w-[240px] hidden md:block shadow-elegant">
          <p className="font-display text-base leading-snug">"My ammamma's avakaya, exactly as I remember it."</p>
          <p className="text-xs mt-2 opacity-70">— Lakshmi, Hyderabad</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-secondary font-medium">Our Story</span>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 leading-[1.05] text-balance">
          From <em className="text-primary-glow not-italic">Ram Pickel Mart</em> kitchens to your table.
        </h2>
        <div className="mt-8 space-y-5 text-paper/80 leading-relaxed">
          <p>
            Where traditional Andhra recipes meet modern love for authentic flavors. 
            Ram Pickel Mart is a labor of love, born from a simple desire: to bring the soul of Andhra's village kitchens to homes across India.
          </p>
          <p>
            Ram Pickel Mart was born to carry these forgotten kitchens to your table. We work
            with small co-operatives of grandmothers across Krishna, Guntur and Godavari districts
            — paying them fairly for the recipes that have flavored generations.
          </p>
          <p className="font-display text-xl text-secondary italic">
            "Pickle is not a product. It's a memory."
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Story;
