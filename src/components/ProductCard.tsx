import React, { useMemo, useState } from "react";
import type { Product } from "../data/productData";

type ProductCardProps = {
  product: Product;
  index?: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const defaultWeight = product.weights?.[0] ?? "";
  const [selectedWeight, setSelectedWeight] = useState<string>(defaultWeight);

  const filledStars = useMemo(() => Math.floor(product.rating), [product.rating]);
  const hasHalfStar = useMemo(
    () => product.rating % 1 >= 0.5,
    [product.rating]
  );

  return (
    <div style={styles.card}>
      <div style={styles.imageWrap}>
        {product.tag && <span style={styles.tag}>{product.tag}</span>}
        <img src={product.image} alt={product.name} style={styles.image} />
      </div>

      <div style={styles.cardBody}>
        {/* Rating */}
        <div style={styles.rating}>
          {Array.from({ length: 5 }).map((_, i) => {
            const isFilled =
              i < filledStars || (i === filledStars && hasHalfStar);

            return (
              <span key={i} style={{ color: "#f4a71d", fontSize: 16 }}>
                {isFilled ? "★" : "☆"}
              </span>
            );
          })}
        </div>

        <h3 style={styles.productName}>{product.name}</h3>

        {/* Weight Selector */}
        {product.weights?.length > 0 && (
          <select
            style={styles.select}
            value={selectedWeight}
            onChange={(e) => setSelectedWeight(e.target.value)}
            aria-label="Select product weight"
          >
            {product.weights.map((weight) => (
              <option key={weight} value={weight}>
                {weight}
              </option>
            ))}
          </select>
        )}

        <p style={styles.price}>{product.price}</p>

        <button
          style={styles.cartButton}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#ffffff",
    border: "1px solid #ece7df",
    borderRadius: 6,
    overflow: "hidden",
    transition: "transform 0.2s ease",
  },

  imageWrap: {
    position: "relative",
    height: 210,
    overflow: "hidden",
    background: "#f1ebe2",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  tag: {
    position: "absolute",
    top: 10,
    left: 0,
    background: "#ef9b37",
    color: "#fff",
    fontSize: 11,
    padding: "5px 10px",
    zIndex: 1,
  },

  cardBody: {
    padding: "10px 12px 12px",
    textAlign: "center",
  },

  rating: {
    display: "flex",
    justifyContent: "center",
    gap: 2,
    marginBottom: 8,
  },

  productName: {
    margin: "0 0 12px",
    fontSize: 15,
    fontWeight: 500,
    color: "#4c4035",
  },

  select: {
    width: "100%",
    height: 34,
    border: "1px solid #d9d4cd",
    borderRadius: 4,
    padding: "0 10px",
    marginBottom: 14,
    background: "#fff",
    color: "#5b534b",
    outline: "none",
  },

  price: {
    textAlign: "left",
    margin: "0 0 12px",
    fontSize: 15,
    color: "#3f342c",
  },

  cartButton: {
    width: "100%",
    height: 34,
    background: "#5a310f",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 14,
    transition: "background 0.2s ease",
  },
};

export default ProductCard;