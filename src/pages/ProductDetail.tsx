import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Star, ShoppingBag, MessageCircle, Check, Truck, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProduct, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { SpiceLevel } from "@/components/SpiceLevel";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <Navigate to="/shop" replace />;

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);
  const wa = `https://wa.me/919999999999?text=Hi! I'd like to order ${product.name} × ${qty}`;

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main className="container py-10 lg:py-16">
        <nav className="text-xs text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link> · <Link to="/shop" className="hover:text-primary">Shop</Link> · <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="aspect-square rounded-[2rem] overflow-hidden bg-paper-warm shadow-clay">
              <img src={product.image} alt={product.name} width={1024} height={1024} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">{product.category}</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink mt-3 leading-[1.05]">{product.name}</h1>
            {product.teluguName && <p className="font-telugu text-2xl text-muted-foreground mt-2">{product.teluguName}</p>}

            <div className="mt-5 flex items-center gap-5 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-secondary text-secondary" : "text-muted"}`} />
                  ))}
                </div>
                <span className="text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
              <SpiceLevel level={product.spiceLevel} />
            </div>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-display text-4xl text-primary font-semibold">₹{product.price}</span>
              <span className="text-muted-foreground">/ {product.weight}</span>
              {product.inStock ? (
                <span className="ml-3 inline-flex items-center gap-1 text-xs text-leaf font-medium">
                  <Check className="h-3.5 w-3.5" /> In stock
                </span>
              ) : (
                <span className="ml-3 text-xs text-destructive font-medium">Out of stock</span>
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center border border-border rounded-full bg-card">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-14 w-14 grid place-items-center hover:text-primary"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center font-display text-lg">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="h-14 w-14 grid place-items-center hover:text-primary"><Plus className="h-4 w-4" /></button>
              </div>
              <Button size="lg" onClick={() => add(product, qty)} className="flex-1 h-14 rounded-full bg-primary hover:bg-primary-glow text-primary-foreground shadow-elegant text-base">
                <ShoppingBag className="h-4 w-4 mr-2" /> Add to basket — ₹{product.price * qty}
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-leaf text-leaf hover:bg-leaf hover:text-paper">
                <a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4 mr-2" /> WhatsApp</a>
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-paper-warm">
                <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div><div className="font-medium text-ink">Free shipping</div><div className="text-xs text-muted-foreground">On orders over ₹999</div></div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-paper-warm">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div><div className="font-medium text-ink">Lab tested</div><div className="text-xs text-muted-foreground">FSSAI certified purity</div></div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <h2 className="font-display text-2xl text-ink mb-4">Ingredients</h2>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground/80">{i}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <section className="mt-24 lg:mt-32">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-10">You might also love</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
