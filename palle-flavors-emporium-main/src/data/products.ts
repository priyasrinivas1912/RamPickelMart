import avakaya from "@/assets/product-avakaya.jpg";
import gongura from "@/assets/product-gongura.jpg";

export type Category = "Pickles" | "Honey" | "Ghee" | "Sweets and Snacks" | "Organic Oils" | "Healthy Essentials";

export interface Product {
  id: string;
  slug: string;
  name: string;
  teluguName?: string;
  category: Category;
  price: number;
  weight: string;
  spiceLevel: 0 | 1 | 2 | 3 | 4 | 5;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  image: string;
  short: string;
  description: string;
  ingredients: string[];
  badges?: string[];
}

export const products: Product[] = [
  {
    id: "avakaya",
    slug: "avakaya-pickle",
    name: "Avakaya Pickle",
    teluguName: "ఆవకాయ",
    category: "Pickles",
    price: 229,
    weight: "500 g",
    spiceLevel: 5,
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    image: avakaya,
    short: "The legendary mango pickle of Andhra summers.",
    description:
      "Hand-cut raw mangoes from Banganapalle orchards, sun-soaked and stone-ground with red chili, mustard and cold-pressed sesame oil. Aged in clay jaadis the way Ammamma made it.",
    ingredients: ["Raw mango", "Red chili powder", "Mustard powder", "Sesame oil", "Fenugreek", "Rock salt"],
    badges: ["Best Seller", "Stone Ground"],
  },
  {
    id: "gongura",
    slug: "gongura-pickle",
    name: "Gongura Pickle",
    teluguName: "గోంగూర",
    category: "Pickles",
    price: 299,
    weight: "400 g",
    spiceLevel: 4,
    rating: 4.8,
    reviewCount: 218,
    inStock: true,
    image: gongura,
    short: "Tangy sorrel leaves, slow-cooked to perfection.",
    description:
      "Tender gongura leaves hand-picked at dawn, gently sautéed in groundnut oil with garlic, chilies and a whisper of jaggery. Tart, fiery, unforgettable.",
    ingredients: ["Gongura leaves", "Groundnut oil", "Garlic", "Red chili", "Jaggery", "Salt"],
    badges: ["Small Batch"],
  },
  
];

export const categories: { name: Category; description: string }[] = [
  { name: "Pickles", description: "Sun-aged in clay jaadis" },
  { name: "Honey", description: "Raw, unfiltered, straight from the hive" },
  { name: "Ghee", description: "Clarified butter, slow-cooked for depth" },
  { name: "Sweets and Snacks", description: "Delicious treats for every occasion" },
  { name: "Organic Oils", description: "Cold-pressed, single origin" },
  { name: "Healthy Essentials", description: "Millets, jaggery & more" },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
