import { categories } from "@/data/productData";

const CategoriesSection = () => (
  <section className="container py-24" id="categories">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Browse by category</span>
      <h2 className="font-display text-4xl md:text-5xl text-ink mt-4 leading-tight text-balance">
        Categories
      </h2>
      <p className="mt-4 text-sm text-muted-foreground">
        Explore our curated selections from pickles to honey, ghee, snacks and more.
      </p>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div key={category} className="rounded-[2rem] bg-card p-8 border border-border/60 shadow-soft hover:shadow-elegant transition-all duration-300">
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">{category}</span>
          <h3 className="font-display text-2xl text-ink mt-4 mb-3">{category}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{category}</p>
        </div>
      ))}
    </div>
  </section>
);

export default CategoriesSection;
