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
  price: string;
  tag?: string;
  rating: number;
  weights: readonly string[];
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
    price: "Rs. 399.00",
    tag: "Top Selling",
    rating: 5,
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
    price: "Rs. 250.00",
    tag: "New Arrival",
    rating: 4.5,
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
    price: "Rs. 600.00",
    tag: "Best Seller",
    rating: 5,
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
    price: "Rs. 499.00",
    tag: "Premium",
    rating: 4.8,
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
    price: "Rs. 299.00",
    tag: "Natural",
    rating: 4.7,
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
    price: "Rs. 299.00",
    tag: "Fresh",
    rating: 4.6,
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
    price: "Rs. 399.00",
    tag: "Farm Fresh",
    rating: 4.9,
    weights: ["1kg", "500g", "250g"],
    isBestSeller: true,
    isNew: false,
  },

  
];

// GET SINGLE PRODUCT
export function getProduct(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}