import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Please enter a valid email");
    toast.success("Welcome to the Ram Pickel Mart family! 🌶️");
    setEmail("");
  };

  return (
    <section className="container py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-clay text-paper p-10 md:p-16 lg:p-20 shadow-clay">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/40 blur-3xl" />

        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper/15 backdrop-blur text-xs uppercase tracking-[0.2em] mb-6">
            <Mail className="h-3 w-3" /> Join the family
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
            Recipes, harvest news & 10% off your first jar.
          </h2>
          <p className="mt-5 text-paper/80 text-lg max-w-lg">
            One thoughtful letter a month. Stories from the village, seasonal launches and the occasional ammamma recipe.
          </p>
          <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg">
            <Input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="h-14 bg-paper/95 border-0 text-ink placeholder:text-muted-foreground rounded-full px-6 text-base"
            />
            <Button type="submit" size="lg" className="h-14 rounded-full bg-ink text-paper hover:bg-paper hover:text-ink px-8">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
