import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  { name: "Lakshmi P.", city: "Bengaluru", text: "Tastes exactly like my grandmother's avakaya from Vijayawada. Got tears in my eyes with the first bite. Worth every rupee.", rating: 5 },
  { name: "Rohit K.", city: "Mumbai", text: "Bought the gongura for my wife — she's from Guntur and very picky. She said 'this is the real one'. Highest praise possible.", rating: 5 },
  { name: "Anjali Rao", city: "Dubai", text: "Living abroad, this is a piece of home in a jar. The karivepaku podi with hot rice and ghee = pure comfort.", rating: 5 },
  { name: "Srinivas M.", city: "Chennai", text: "Quality is unmatched. The clay-pot aroma comes through in every bite. Already ordered three times.", rating: 5 },
];

const Testimonials = () => (
  <section className="bg-paper-warm py-24 overflow-hidden">
    <div className="container text-center mb-14">
      <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Loved across India</span>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink mt-3 text-balance">
        Stories from our jaadi family.
      </h2>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 container">
      {reviews.map((r, i) => (
        <motion.figure
          key={r.name}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
          className="bg-card rounded-3xl p-7 shadow-soft border border-border/60"
        >
          <div className="flex gap-0.5 mb-4">
            {Array.from({ length: r.rating }).map((_, k) => (
              <Star key={k} className="h-4 w-4 fill-secondary text-secondary" />
            ))}
          </div>
          <blockquote className="font-display text-lg text-ink leading-snug">"{r.text}"</blockquote>
          <figcaption className="mt-5 pt-4 border-t border-border/60">
            <div className="text-sm font-semibold text-ink">{r.name}</div>
            <div className="text-xs text-muted-foreground">{r.city}</div>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  </section>
);

export default Testimonials;
