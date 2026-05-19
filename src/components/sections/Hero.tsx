import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import honey from "@/assets/honey.jpg";
import ghee from "@/assets/ghee.jpg";
import sweet from "@/assets/sweet.jpg";
import snacks from "@/assets/snacks.jpg";
import pickle from "@/assets/hero-pickle.jpg";

const slides = [
  { src: pickle, label: "Pickles", description: "Sun-aged Andhra pickles with heritage flavor." },
  { src: honey, label: "Honey", description: "Raw honey with floral sweetness." },
  { src: ghee, label: "Ghee", description: "Slow-cooked ghee with rich aroma." },
  { src: sweet, label: "Sweets", description: "Traditional sweets made with care." },
  { src: snacks, label: "Snacks", description: "Savory snacks for every craving." },
];

const CAPTION_POSITION: "left" | "right" = "left";

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

    const timer = window.setInterval(() => emblaApi.scrollNext(), 5000);
    return () => window.clearInterval(timer);
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-paper">
      <div className="container py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground shadow-soft">
              Handmade · Sun-aged · Heritage
            </span>

            <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[0.95] text-ink sm:text-6xl lg:text-[5rem] text-balance">
              The taste of <span className="text-primary">Andhra</span>,
              <br />
              jarred with love.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Stone-ground pickles, slow-roasted podis and cold-pressed oils — crafted in village kitchens across Andhra Pradesh. No preservatives, no shortcuts. Just the recipes our grandmothers swore by.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild className="h-14 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-elegant hover:bg-primary-glow">
                <Link to="/shop">
                  Shop the harvest
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-14 rounded-full border-border bg-background px-8 text-base font-semibold text-foreground hover:bg-muted"
              >
                <a href="#story">Read our story</a>
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Authentic Andhra flavors, made in small batches and delivered with care.
            </p>
          </div>

          <div className="relative rounded-[2rem] border border-border/60 bg-white p-3 shadow-soft w-full lg:max-w-[440px] mx-auto lg:mx-0">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-paper">
              <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container flex">
                  {slides.map((slide) => (
                    <div key={slide.label} className="embla__slide min-w-full">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-white">
                        <img src={slide.src} alt={slide.label} className="w-full h-full object-cover" loading="lazy" />

                        <div
                          className={`absolute bottom-3 ${
                            CAPTION_POSITION === "left" ? "left-3 text-left" : "right-3 text-right"
                          } max-w-[70%] bg-black/40 backdrop-blur-sm rounded-md px-3 py-2 text-white`}
                        >
                          <div className="text-sm font-semibold">{slide.label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute inset-y-0 left-4 flex items-center">
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollPrev()}
                  className="rounded-full bg-paper/90 p-3 text-ink shadow-elegant hover:bg-paper transition"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-4 flex items-center">
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollNext()}
                  className="rounded-full bg-paper/90 p-3 text-ink shadow-elegant hover:bg-paper transition"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      index === selectedIndex ? "bg-primary" : "bg-foreground/40"
                    }`}
                    aria-label={`Go to ${slides[index].label}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`rounded-3xl border px-4 py-4 text-left transition ${
                    index === selectedIndex ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary"
                  }`}
                >
                  <span className="text-xs uppercase tracking-[0.28em] text-muted-foreground">{slide.label}</span>
                  <p className="mt-2 text-sm font-medium text-ink">{slide.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
