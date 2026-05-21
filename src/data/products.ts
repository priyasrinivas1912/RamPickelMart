import avakaya from "@/assets/product-avakaya.jpg";
import gongura from "@/assets/product-gongura.jpg";

export const categories = [
  { id: "1", name: "Pickles" },
  { id: "2", name: "Snacks" },
  { id: "3", name: "Laddu" }
];

export type Category =
  | "Pickles"
  | "Honey"
  | "Ghee"
  | "Sweets and Snacks"
  | "Organic Oils"
  | "Healthy Essentials";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  isBestSeller?: boolean;
}

/* ✅ PRODUCTS DATA */
export const products: Product[] = [
  {
    id: "1",
    slug: "avakaya-pickle",
    name: "Avakaya Pickle",
    price: 199,
    category: "Pickles",
    image: avakaya,
    isBestSeller: true
  },
  {
    id: "2",
    slug: "gongura-pickle",
    name: "Gongura Pickle",
    price: 189,
    category: "Pickles",
    image: gongura,
    isBestSeller: true
  }
];

/* ✅ DERIVED BEST SELLERS (no mismatch risk anymore) */
export const bestSellers = products.filter(p => p.isBestSeller);