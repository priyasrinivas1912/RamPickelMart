// src/components/sections/BestSeller.tsx

import React, { useMemo, useRef, useState } from "react";
import ProductCard from "../ProductCard";
import { products } from "../../data/productData";

const BestSeller: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"best" | "new">("best");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      activeTab === "best" ? p.isBestSeller : p.isNew
    );
  }, [activeTab]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = 300;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div style={styles.page}>
      <section style={styles.section}>
        <h1 style={styles.heading}>Shop Our Customers Favorite</h1>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "best" ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab("best")}
          >
            Best Sellers
          </button>

          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "new" ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab("new")}
          >
            New Arrivals
          </button>
        </div>

        <div style={styles.divider} />

        {/* Carousel */}
        <div style={styles.carouselWrap}>
          <button style={styles.arrowBtn} onClick={() => scroll("left")}>
            ‹
          </button>

          <div ref={scrollRef} style={styles.scrollRow}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={styles.cardWrap}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button
            style={{
              ...styles.arrowBtn,
              right: 0,
              background: "#4b250b",
              color: "#fff",
            }}
            onClick={() => scroll("right")}
          >
            ›
          </button>
        </div>

        <div style={styles.viewAllWrap}>
          <button style={styles.viewAllBtn}>VIEW ALL</button>
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    backgroundColor: "#f7f3ed",
    minHeight: "100vh",
    padding: "40px 24px 60px",
    fontFamily: "Arial, sans-serif",
  },

  section: {
    maxWidth: 1120,
    margin: "0 auto",
    position: "relative",
  },

  heading: {
    textAlign: "center",
    fontSize: 38,
    margin: "8px 0 14px",
    color: "#402412",
    fontFamily: "Georgia, serif",
    fontWeight: 700,
  },

  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: 28,
    marginBottom: 12,
  },

  tabButton: {
    border: "none",
    background: "transparent",
    color: "#9b9286",
    fontSize: 16,
    cursor: "pointer",
    paddingBottom: 8,
  },

  activeTab: {
    color: "#3e2a1b",
    borderBottom: "2px solid #5f4734",
  },

  divider: {
    height: 1,
    background: "#e2d9cf",
    marginBottom: 28,
  },

  carouselWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  scrollRow: {
    display: "flex",
    gap: 16,
    overflowX: "auto",
    scrollBehavior: "smooth",
    padding: "10px 4px",
  },

  cardWrap: {
    minWidth: 250,
    flexShrink: 0,
  },

  arrowBtn: {
    position: "absolute",
    top: "45%",
    transform: "translateY(-50%)",
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: "none",
    background: "#ddd2c4",
    color: "#8e7b67",
    fontSize: 26,
    cursor: "pointer",
    zIndex: 2,
  },

  viewAllWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: 40,
  },

  viewAllBtn: {
    background: "#5a310f",
    color: "#fff",
    border: "none",
    padding: "12px 34px",
    borderRadius: 6,
    letterSpacing: 1,
    fontSize: 13,
    cursor: "pointer",
  },
};

export default BestSeller;