// src/data/productData.ts

// LOCAL IMAGE IMPORTS
// LOCAL IMAGE IMPORTS

import avakayaImg from "../assets/Avakayya.jpg";
import gonguraImg from "../assets/Gongura.jpg";
import chickenImg from "../assets/Chicken.jpg";
import prawnsImg from "../assets/Prawns.jpg";

import honeyImg from "../assets/Honey (2).jpg";
import sweetsImg from "../assets/Laddu.jpg";
import gheeImg from "../assets/Cowghee.jpg";

// CATEGORY LIST
export const categories = [
  "Veg Pickels",
  "Non-Veg Pickels",
  "Honey",
  "Sweets",
  "Ghee",
  "Snacks",
] as const;

// CATEGORY TYPE
export type Category = (typeof categories)[number];

// PRODUCT TYPE
export type Product = {
  id: number;
  name: string;
  teluguName?: string;
  category: Category;
  image: string;
  price: number;
  tag?: string;
  rating: number;
  weights: readonly string[];
  reviewCount?: number;
  spiceLevel?: number;
  description?: string;
  inStock?: boolean;
  ingredients?: readonly string[];
  isBestSeller?: boolean;
  isNew?: boolean;
};

// PRODUCT DATA
export const products: readonly Product[] = [
  {
    id: 1,
    name: "Avakaya Pickle",
    teluguName: "ఆవకాయ పచ్చడి",
    category: "Veg Pickels",
    image: avakayaImg,
    price: 399,
    tag: "Top Selling",
    rating: 5,
    reviewCount: 42,
    spiceLevel: 5,
    description: "Classic Andhra mango pickle made with bold spices and cold-pressed oil.",
    inStock: true,
    ingredients: ["Mango", "Mustard powder", "Chilli powder", "Fenugreek", "Oil", "Salt"],
    weights: ["1kg", "500g", "250g"],
    isBestSeller: true,
    isNew: false,
  },

  {
    id: 2,
    name: "Gongura Pickle",
    teluguName: "గోంగూర పచ్చడి",
    category: "Veg Pickels",
    image: gonguraImg,
    price: 250,
    tag: "New Arrival",
    rating: 4.5,
    reviewCount: 28,
    spiceLevel: 4,
    description: "Tangy gongura pickle with a deep leafy bite and homestyle spice balance.",
    inStock: true,
    ingredients: ["Gongura leaves", "Chilli powder", "Garlic", "Tamarind", "Oil", "Salt"],
    weights: ["1kg", "500g", "250g"],
    isBestSeller: true,
    isNew: true,
  },

  {
    id: 3,
    name: "Chicken Pickle",
    teluguName: "చికెన్ పచ్చడి",
    category: "Non-Veg Pickels",
    image: chickenImg,
    price: 600,
    tag: "Best Seller",
    rating: 5,
    reviewCount: 35,
    spiceLevel: 5,
    description: "Rich chicken pickle cooked in aromatic spices for a hearty non-veg treat.",
    inStock: true,
    ingredients: ["Chicken", "Chilli powder", "Garam masala", "Garlic", "Oil", "Salt"],
    weights: ["1kg", "500g", "250g"],
    isBestSeller: true,
    isNew: false,
  },

  {
    id: 4,
    name: "Prawns Pickle",
    teluguName: "రొయ్యల పచ్చడి",
    category: "Non-Veg Pickels",
    image: prawnsImg,
    price: 499,
    tag: "Premium",
    rating: 4.8,
    reviewCount: 31,
    spiceLevel: 4,
    description: "Premium prawns pickle with coastal flavors and a spicy masala finish.",
    inStock: true,
    ingredients: ["Prawns", "Chilli powder", "Ginger garlic", "Spices", "Oil", "Salt"],
    weights: ["1kg", "500g", "250g"],
    isBestSeller: true,
    isNew: true,
  },

  {
    id: 5,
    name: "Pure Honey",
    teluguName: "స్వచ్ఛమైన తేనె",
    category: "Honey",
    image: honeyImg,
    price: 299,
    tag: "Natural",
    rating: 4.7,
    reviewCount: 19,
    spiceLevel: 0,
    description: "Pure honey with natural sweetness, packed for everyday use.",
    inStock: true,
    ingredients: ["Honey"],
    weights: ["1kg", "500g", "250g"],
    isBestSeller: false,
    isNew: false,
  },

  {
    id: 6,
    name: "Traditional Sweets",
    teluguName: "సాంప్రదాయ స్వీట్స్",
    category: "Sweets",
    image: sweetsImg,
    price: 299,
    tag: "Fresh",
    rating: 4.6,
    reviewCount: 24,
    spiceLevel: 0,
    description: "Traditional sweets prepared fresh with familiar festive flavors.",
    inStock: true,
    ingredients: ["Gram flour", "Ghee", "Sugar", "Cardamom", "Nuts"],
    weights: ["1kg", "500g", "250g"],
    isBestSeller: false,
    isNew: true,
  },

  {
    id: 7,
    name: "Pure Ghee",
    teluguName: "నెయ్యి",
    category: "Ghee",
    image: gheeImg,
    price: 399,
    tag: "Farm Fresh",
    rating: 4.9,
    reviewCount: 33,
    spiceLevel: 0,
    description: "Farm-fresh cow ghee with a rich aroma and smooth texture.",
    inStock: true,
    ingredients: ["Cow ghee"],
    weights: ["1kg", "500g", "250g"],
    isBestSeller: true,
    isNew: false,
  },

  
];

// GET SINGLE PRODUCT
export function getProduct(id: number | string): Product | undefined {
  const numericId = typeof id === "number" ? id : Number(id);

  return products.find((product) => product.id === numericId);
}
