import { Award, HeartHandshake, Leaf, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const reasons = [
  { icon: Award, title: "Heritage Recipes", text: "We keep Andhra flavors close to their roots with family-style recipes and patient preparation." },
  { icon: Leaf, title: "Natural Ingredients", text: "Fresh produce, real spices, and no unnecessary shortcuts in the food you bring home." },
  { icon: ShieldCheck, title: "Purity You Can Trust", text: "Every batch is prepared with care, checked for quality, and packed cleanly." },
  { icon: Truck, title: "Fresh Delivery", text: "Orders are packed safely so pickles, sweets, snacks, oils, honey, and ghee reach you well." },
  { icon: HeartHandshake, title: "Made With Care", text: "We focus on food that feels personal, generous, and worth sharing with family." },
  { icon: RefreshCw, title: "Customer First", text: "If something is not right, we help quickly and make the experience simple." },
];

const WhyUsPage = () => (
  <div className="min-h-screen bg-paper">
    <Navbar />
    <main>
      <section className="bg-ink text-paper">
        <div className="container py-20 lg:py-28 text-center max-w-4xl">
          <span className="text-xs uppercase tracking-[0.3em] text-secondary font-medium">Why Us</span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mt-4 leading-[1.04] text-balance">
            Tradition you can taste, trust you can feel.
          </h1>
          <p className="mt-7 text-paper/78 text-lg leading-relaxed">
            Ram Pickel Mart brings authentic Andhra foods to your table with honest ingredients, careful preparation, and the warmth of home-style flavor.
          </p>
        </div>
      </section>

      <section className="container py-20 lg:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item) => (
            <div key={item.title} className="bg-card border border-border/70 rounded-lg p-7 shadow-soft">
              <div className="h-12 w-12 rounded-full bg-gradient-spice text-primary-foreground grid place-items-center mb-5">
                <item.icon className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl text-ink">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default WhyUsPage;
