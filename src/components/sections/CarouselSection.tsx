import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import honey from "@/assets/honey.jpg";
import ghee from "@/assets/ghee.jpg";
import sweets from "@/assets/sweets.jpg";
import pickle from "@/assets/hero-pickle.jpg";

const items = [
  { src: pickle, title: "Pickles", subtitle: "Sun-aged Andhra pickles packed with spice and heritage." },
  { src: honey, title: "Honey", subtitle: "Raw forest honey with floral sweetness and authentic flavor." },
  { src: ghee, title: "Ghee", subtitle: "Golden, slow-cooked ghee for rich aroma and smooth texture." },
  { src: sweets, title: "Sweets", subtitle: "Traditional sweets made with care and balanced sweetness." },
];

const CAPTION_POSITION: "left" | "right" = "left";

const CarouselSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
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
    <section className="bg-paper border-t border-border">
      <div className="container py-24">
        <div className="space-y-10">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Explore our best sellers</span>
          <h2 className="font-display text-4xl md:text-5xl text-ink mt-4 leading-tight">
            Delicious Andhra flavors, shown side by side.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Pick the perfect jar for every craving: pickles, honey, ghee, sweets, and snacks. Tap a category to see the image above.
          </p>
        </div>

        <div className="space-y-8">
          <div className="relative rounded-[2rem] overflow-hidden border border-border/60 bg-white shadow-soft">
            <div className="p-4">
              <div className="embla overflow-hidden rounded-[1.75rem] bg-paper">
                <div className="embla__viewport" ref={emblaRef}>
                  <div className="embla__container flex">
                    {items.map((item) => (
                      <div key={item.title} className="embla__slide min-w-full">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-white shadow-sm">
                          <img src={item.src} alt={item.title} className="w-full h-full object-cover" loading="lazy" />

                          <div
                            className={`absolute bottom-3 ${
                              CAPTION_POSITION === "left" ? "left-3 text-left" : "right-3 text-right"
                            } max-w-[75%] bg-black/40 backdrop-blur-sm rounded-md px-3 py-2 text-white`}
                          >
                            <div className="text-sm font-semibold">{item.title}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === selectedIndex ? "bg-primary" : "bg-foreground/40"
                  }`}
                  aria-label={`Go to ${items[index].title}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
};

export default CarouselSection;
