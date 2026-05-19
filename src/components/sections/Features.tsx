import { Leaf, Wheat, Sun, Heart } from "lucide-react";

const items = [
  { icon: Leaf, title: "100% Natural", text: "No preservatives, ever." },
  { icon: Sun, title: "Sun-Aged", text: "Traditionally clay-jar matured." },
  { icon: Wheat, title: "Farm Sourced", text: "Direct from Andhra fields." },
  { icon: Heart, title: "Made by Ammammas", text: "Real village grandmothers." },
];

const Features = () => (
  <section className="border-y border-border bg-paper">
    <div className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
      {items.map((it) => (
        <div key={it.title} className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-paper-warm grid place-items-center text-primary shrink-0">
            <it.icon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-base text-ink">{it.title}</div>
            <div className="text-xs text-muted-foreground">{it.text}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Features;
