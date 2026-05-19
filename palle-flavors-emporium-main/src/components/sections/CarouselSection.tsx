import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import avakaya from "@/assets/product-avakaya.jpg";
import gongura from "@/assets/product-gongura.jpg";
import hero from "@/assets/hero-pickle.jpg";
import story from "@/assets/story-village.jpg";

const items = [
  { src: hero, title: "Sun-Aged Avakaya", subtitle: "Mango pickle in clay jars" },
  { src: avakaya, title: "Legendary Andhra", subtitle: "Spicy, tangy, unforgettable" },
  { src: gongura, title: "Gongura Magic", subtitle: "Sour leaf pickle with a kick" },
  { src: story, title: "Village Kitchen", subtitle: "Every jar is made by hand" },
];

const CarouselSection = () => {
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
    <section className="bg-paper border-t border-border">
      <div className="container py-24">
        <div className="relative">
          <div className="embla overflow-hidden rounded-[2rem] border border-border/60 shadow-soft">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container flex">
                {items.map((item) => (
                  <div key={item.title} className="embla__slide min-w-full p-6">
                    <article className="rounded-[2rem] overflow-hidden bg-card shadow-soft">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={item.src} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-6">
                        <p className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3">Featured</p>
                        <h3 className="font-display text-2xl text-ink leading-tight mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <button onClick={() => emblaApi?.scrollPrev()} type="button" className="rounded-full bg-paper/90 p-3 shadow-elegant text-ink hover:bg-paper transition">
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <button onClick={() => emblaApi?.scrollNext()} type="button" className="rounded-full bg-paper/90 p-3 shadow-elegant text-ink hover:bg-paper transition">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${index === selectedIndex ? "bg-primary" : "bg-foreground/30"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
