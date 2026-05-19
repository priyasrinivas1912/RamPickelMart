import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-pickle.jpg";
import honey from "@/assets/honey.jpg";
import ghee from "@/assets/ghee.jpg";
import sweets from "@/assets/sweet.jpg";

const slides = [
  { src: hero, alt: "Avakaya pickle in a clay pot", label: "Avakaya" },
  { src: honey, alt: "Honey jar", label: "Honey" },
  { src: ghee, alt: "Ghee jar", label: "Ghee" },
  { src: sweets, alt: "Sweets and snacks", label: "Sweets & Snacks" },
];

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    onSelect();

    const autoplay = window.setInterval(() => emblaApi.scrollNext(), 4000);
    return () => window.clearInterval(autoplay);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative overflow-hidden bg-paper-warm">
      <div className="absolute inset-0 grain" />
      <div className="container relative pt-12 pb-20 lg:pt-20 lg:pb-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper border border-border shadow-soft text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
            <Sparkles className="h-3 w-3 text-primary" />
            Handmade · Sun-Aged · Heritage
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] text-ink text-balance">
            The taste of <em className="text-primary not-italic font-medium">Andhra</em>,
            jarred with love.
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Stone-ground pickles, Honey, Ghee, oils, Sweet and snacks — crafted in
            village kitchens across Andhra Pradesh. No preservatives, no shortcuts.
            Just the recipes our grandmothers swore by.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild className="bg-primary hover:bg-primary-glow text-primary-foreground rounded-full h-14 px-8 text-base shadow-elegant group">
              <Link to="/shop">Shop the harvest <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
            <Button asChild className="rounded-full h-14 px-8 text-base border-ink/20 text-ink hover:bg-ink hover:text-paper">
              <a href="#story">Read our story</a>
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-8 text-sm">
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
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="embla overflow-hidden rounded-[2rem] shadow-clay">
            <div className="embla__viewport h-[520px]" ref={emblaRef}>
              <div className="embla__container flex h-full">
                {slides.map((slide, index) => (
                  <div key={index} className="embla__slide min-w-full relative">
                    <img src={slide.src} alt={slide.alt} className="object-cover w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 bg-paper/90 backdrop-blur rounded-3xl px-5 py-4 shadow-elegant">
                      <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Featured</p>
                      <h3 className="font-display text-2xl text-ink mt-2">{slide.label}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${index === selectedIndex ? "bg-primary" : "bg-paper/80"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute inset-x-0 top-1/2 flex justify-between px-6 -translate-y-1/2">
            <button onClick={scrollPrev} type="button" className="rounded-full bg-paper/90 p-3 shadow-elegant text-ink hover:bg-paper transition">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={scrollNext} type="button" className="rounded-full bg-paper/90 p-3 shadow-elegant text-ink hover:bg-paper transition">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute -bottom-6 -left-6 bg-paper rounded-2xl shadow-elegant p-5 max-w-[220px] hidden md:block">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Today's Harvest</div>
            <div className="font-display text-lg text-ink leading-tight">Banganapalle mangoes, hand-cut at dawn 🥭</div>
          </div>
          <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground rounded-full px-5 py-3 shadow-elegant font-display text-sm hidden md:block">
            ✦ Free shipping over ₹999
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
