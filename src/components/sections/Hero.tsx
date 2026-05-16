import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-pickle.jpg";

const Hero = () => (
  <section className="relative overflow-hidden bg-paper-warm">
    <div className="absolute inset-0 grain" />
    <div className="container relative pt-12 pb-20 lg:pt-20 lg:pb-32 grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper border border-border shadow-soft text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8"
        >
          <Sparkles className="h-3 w-3 text-primary" />
          Handmade · Sun-Aged · Heritage
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] text-ink text-balance"
        >
          The taste of <em className="text-primary not-italic font-medium">Andhra</em>,
          jarred with love.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed"
        >
          Stone-ground pickles, slow-roasted podis and cold-pressed oils — crafted in
          village kitchens across Andhra Pradesh. No preservatives, no shortcuts.
          Just the recipes our grandmothers swore by.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground rounded-full h-14 px-8 text-base shadow-elegant group">
            <Link to="/shop">Shop the harvest <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-base border-ink/20 text-ink hover:bg-ink hover:text-paper">
            <a href="#story">Read our story</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
          className="mt-12 flex items-center gap-8 text-sm"
        >
          <div>
            <div className="font-display text-2xl text-ink font-semibold">25k+</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Happy Families</div>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <div className="font-display text-2xl text-ink font-semibold">40+</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Village Recipes</div>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <div className="font-display text-2xl text-ink font-semibold">4.9★</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Avg Rating</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-6 relative"
      >
        <div className="relative aspect-[5/6] rounded-[2rem] overflow-hidden shadow-clay">
          <img src={hero} alt="Avakaya pickle in a clay pot" width={1600} height={1200} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute -bottom-6 -left-6 bg-paper rounded-2xl shadow-elegant p-5 max-w-[220px] hidden md:block"
        >
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Today's Harvest</div>
          <div className="font-display text-lg text-ink leading-tight">Banganapalle mangoes, hand-cut at dawn 🥭</div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity }}
          className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground rounded-full px-5 py-3 shadow-elegant font-display text-sm hidden md:block"
        >
          ✦ Free shipping over ₹999
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
