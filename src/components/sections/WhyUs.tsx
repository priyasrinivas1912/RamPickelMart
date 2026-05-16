import { Award, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Award, title: "Heritage Recipes", text: "Five-generation village recipes, tested in our own homes before they reach yours." },
  { icon: ShieldCheck, title: "Lab-Tested Purity", text: "Every batch tested for adulteration. FSSAI certified. Zero compromises." },
  { icon: Truck, title: "Fast & Fresh Delivery", text: "Pan-India shipping in temperature-stable packaging within 3-5 days." },
  { icon: RefreshCw, title: "Easy Returns", text: "Not in love? Full refund within 7 days, no questions asked." },
];

const WhyUs = () => (
  <section id="why-us" className="container py-24">
    <div className="text-center max-w-2xl mx-auto mb-16">
      <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Why Ram Pickel Mart</span>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink mt-3 text-balance">
        Tradition you can taste, trust you can feel.
      </h2>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
          className="bg-card p-8 rounded-3xl shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 border border-border/60"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-spice grid place-items-center text-primary-foreground mb-5 shadow-elegant">
            <it.icon className="h-6 w-6" />
          </div>
          <h3 className="font-display text-xl text-ink mb-2">{it.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default WhyUs;
