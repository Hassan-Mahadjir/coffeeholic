export interface Coffee {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: any;
  category: string;
  origin: string;
  roast: "light" | "medium" | "dark";
  flavorNotes: string[];
}

export const coffeesData: Coffee[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    description:
      "Floral and citrus notes with a bright acidity. A single-origin coffee from the birthplace of coffee.",
    price: 12.99,
    rating: 4.8,
    image: require("../assets/images/coffee-1.webp"),
    category: "Single Origin",
    origin: "Ethiopia",
    roast: "light",
    flavorNotes: ["floral", "citrus", "bright acidity"],
  },
  {
    id: 2,
    name: "Colombian Supremo",
    description:
      "Rich and full-bodied with notes of chocolate and caramel. Perfect for morning brew.",
    price: 11.99,
    rating: 4.6,
    image: require("../assets/images/coffee-2.webp"),
    category: "Single Origin",
    origin: "Colombia",
    roast: "medium",
    flavorNotes: ["chocolate", "caramel", "full-bodied"],
  },
  {
    id: 3,
    name: "Jamaican Blue Mountain",
    description:
      "Smooth and mild with a unique flavor profile. One of the world's most expensive coffees.",
    price: 24.99,
    rating: 4.9,
    image: require("../assets/images/card-1.jpg"),
    category: "Premium",
    origin: "Jamaica",
    roast: "medium",
    flavorNotes: ["smooth", "mild", "unique"],
  },
  {
    id: 4,
    name: "Italian Espresso Blend",
    description:
      "Dark roasted blend perfect for espresso. Bold and intense with a rich crema.",
    price: 9.99,
    rating: 4.5,
    image: require("../assets/images/card-1.jpg"),
    category: "Blend",
    origin: "Italy",
    roast: "dark",
    flavorNotes: ["bold", "intense", "rich crema"],
  },
  {
    id: 5,
    name: "Hawaiian Kona",
    description:
      "Smooth and aromatic with a clean finish. Grown in volcanic soil for unique flavor.",
    price: 19.99,
    rating: 4.7,
    image: require("../assets/images/card-1.jpg"),
    category: "Single Origin",
    origin: "Hawaii",
    roast: "medium",
    flavorNotes: ["smooth", "aromatic", "clean finish"],
  },
  {
    id: 6,
    name: "Guatemalan Antigua",
    description:
      "Complex flavor with smoky undertones. Grown in the highlands of Guatemala.",
    price: 13.99,
    rating: 4.4,
    image: require("../assets/images/card-1.jpg"),
    category: "Single Origin",
    origin: "Guatemala",
    roast: "medium",
    flavorNotes: ["complex", "smoky", "highland"],
  },
  {
    id: 7,
    name: "Sumatra Mandheling",
    description:
      "Full-bodied with earthy and herbal notes. Low acidity with a heavy mouthfeel.",
    price: 10.99,
    rating: 4.3,
    image: require("../assets/images/card-1.jpg"),
    category: "Single Origin",
    origin: "Indonesia",
    roast: "dark",
    flavorNotes: ["earthy", "herbal", "full-bodied"],
  },
  {
    id: 8,
    name: "Costa Rican Tarrazú",
    description:
      "Bright and clean with citrus notes. Grown in the high-altitude region of Tarrazú.",
    price: 14.99,
    rating: 4.6,
    image: require("../assets/images/card-1.jpg"),
    category: "Single Origin",
    origin: "Costa Rica",
    roast: "light",
    flavorNotes: ["bright", "clean", "citrus"],
  },
  {
    id: 9,
    name: "French Roast",
    description:
      "Dark and bold with a smoky flavor. Perfect for those who love intense coffee.",
    price: 8.99,
    rating: 4.2,
    image: require("../assets/images/card-1.jpg"),
    category: "Blend",
    origin: "Various",
    roast: "dark",
    flavorNotes: ["dark", "bold", "smoky"],
  },
  {
    id: 10,
    name: "Kenyan AA",
    description:
      "Wine-like acidity with berry notes. One of Africa's finest coffee offerings.",
    price: 15.99,
    rating: 4.7,
    image: require("../assets/images/card-1.jpg"),
    category: "Single Origin",
    origin: "Kenya",
    roast: "medium",
    flavorNotes: ["wine-like", "berry", "bright acidity"],
  },
  {
    id: 11,
    name: "Brazilian Santos",
    description:
      "Nutty and sweet with low acidity. Great for everyday drinking.",
    price: 7.99,
    rating: 4.1,
    image: require("../assets/images/card-1.jpg"),
    category: "Single Origin",
    origin: "Brazil",
    roast: "medium",
    flavorNotes: ["nutty", "sweet", "low acidity"],
  },
  {
    id: 12,
    name: "Peruvian Organic",
    description:
      "Organic and fair-trade with a balanced flavor profile. Grown sustainably in the Andes.",
    price: 16.99,
    rating: 4.5,
    image: require("../assets/images/card-1.jpg"),
    category: "Organic",
    origin: "Peru",
    roast: "medium",
    flavorNotes: ["balanced", "organic", "sustainable"],
  },
];
