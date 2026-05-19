import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { SpiceLevel } from "@/components/SpiceLevel";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { add } = useCart();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-3xl bg-paper-warm aspect-square shadow-soft transition-all duration-500 group-hover:shadow-clay">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.badges?.[0] && (
            <span className="absolute top-4 left-4 bg-ink/90 backdrop-blur text-paper text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full">
              {product.badges[0]}
            </span>
          )}
          <Button
            size="icon"
            onClick={(e) => { e.preventDefault(); add(product); }}
            className="absolute bottom-4 right-4 rounded-full h-12 w-12 bg-primary hover:bg-primary-glow text-primary-foreground shadow-elegant translate-y-0 opacity-100 transition-all duration-300"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="pt-5 px-1">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{product.category}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-secondary text-secondary" /> {product.rating}
            </span>
          </div>
          <h3 className="font-display text-xl text-ink leading-tight">{product.name}</h3>
          {product.teluguName && (
            <p className="font-telugu text-sm text-muted-foreground mt-0.5">{product.teluguName}</p>
          )}
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="font-display text-lg text-primary font-semibold">₹{product.price}</span>
              <span className="text-xs text-muted-foreground ml-1.5">/ {product.weight}</span>
            </div>
            <SpiceLevel level={product.spiceLevel} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProductCard;
