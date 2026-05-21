import avakaya from "@/assets/product-avakaya.jpg";
import gongura from "@/assets/product-gongura.jpg";

export type Category =
  | "Pickles"
  | "Honey"
  | "Ghee"
  | "Sweets and Snacks"
  | "Organic Oils"
  | "Healthy Essentials";

// ✅ categories typed as { id: string; name: Category }[] — fixes "string not assignable to Category"
export const categories: { id: string; name: Category }[] = [
  { id: "1", name: "Pickles" },
  { id: "2", name: "Sweets and Snacks" },
  { id: "3", name: "Healthy Essentials" },
];

export interface Product {
  id: string;
  slug: string;
  name: string;
  teluguName?: string;          // ✅ fixes "teluguName does not exist on type Product"
  price: number;
  category: Category;
  image: string;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "homemade-gongura-pickle",
    name: "Homemade Gongura Pickle",
    teluguName: "ఇంటిలో తయారు గోంగూర పచ్చడి",
    price: 189,
    category: "Pickles",
    image: gongura,
    isBestSeller: true,
  },
  {
    id: "2",
    slug: "chicken-boneless",
    name: "Chicken Boneless",
    teluguName: "చికెన్ బోన్‌లెస్",
    price: 349,
    category: "Pickles",
    image: avakaya,
    isBestSeller: true,
  },
  {
    id: "3",
    slug: "dryfruit-laddu",
    name: "Dry Fruit Laddu",
    teluguName: "ఎండు పండ్ల లడ్డూ",
    price: 375,
    category: "Sweets and Snacks",
    image: avakaya,
    isBestSeller: true,
  },
  {
    id: "4",
    slug: "prawn-pickle",
    name: "Prawn Pickle",
    teluguName: "రొయ్యల పచ్చడి",
    price: 479,
    category: "Pickles",
    image: gongura,
    isBestSeller: true,
  },
  {
    id: "5",
    slug: "kandi-podi",
    name: "Kandi Podi",
    teluguName: "కండి పొడి",
    price: 215,
    category: "Pickles",
    image: avakaya,
    isBestSeller: true,
  },
  {
    id: "6",
    slug: "avakaya-pickle",
    name: "Avakaya Pickle",
    teluguName: "అవకాయ పచ్చడి",
    price: 199,
    category: "Pickles",
    image: avakaya,
    isBestSeller: true,
  },
];

export const bestSellers = products.filter((p) => p.isBestSeller);

// ✅ fixes "does not provide an export named 'getProduct'" in ProductDetail.tsx
export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
