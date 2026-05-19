import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories, products, Category } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const activeCat = (params.get("cat") as Category | null) ?? null;
  const qParam = params.get("q") ?? "";
  const [q, setQ] = useState(qParam);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (activeCat && p.category !== activeCat) return false;
      if (q && !`${p.name} ${p.teluguName ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [activeCat, q]);

  const setCat = (c: Category | null) => {
    if (!c) setParams({}); else setParams({ cat: c });
  };

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main className="container py-12 lg:py-20">
        <header className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Shop the harvest</span>
          <h1 className="font-display text-5xl md:text-6xl text-ink mt-3 text-balance">All our jars, in one place.</h1>
          <p className="mt-4 text-muted-foreground text-lg">Hand-poured, sun-aged, lovingly labeled. Filter by category to find your next obsession.</p>
        </header>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            <button onClick={() => setCat(null)}
              className={cn("px-5 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap",
                !activeCat ? "bg-ink text-paper border-ink" : "bg-card text-foreground border-border hover:border-ink")}>
              All
            </button>
            {categories.map((c) => (
              <button key={c.name} onClick={() => setCat(c.name)}
                className={cn("px-5 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap",
                  activeCat === c.name ? "bg-ink text-paper border-ink" : "bg-card text-foreground border-border hover:border-ink")}>
                {c.name}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jars..." className="pl-11 h-12 rounded-full bg-card border-border" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="font-display text-2xl text-ink mb-2">Nothing here yet</p>
            <p>We're constantly adding new jars. Check back soon!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
