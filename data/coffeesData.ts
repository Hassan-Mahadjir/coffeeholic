export interface Coffee {
  id: number;
  name: string;
  description: string;
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
    image: require("../assets/images/coffee-1.webp"),
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
    image: require("../assets/images/coffee-1.webp"),
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
    image: require("../assets/images/coffee-1.webp"),
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
    image: require("../assets/images/coffee-1.webp"),
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
    image: require("../assets/images/coffee-2.webp"),
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
    image: require("../assets/images/coffee-1.webp"),
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
    image: require("../assets/images/coffee-1.webp"),
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
    image: require("../assets/images/coffee-2.webp"),
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
    image: require("../assets/images/coffee-2.webp"),
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
    image: require("../assets/images/coffee-1.webp"),
    category: "Organic",
    origin: "Peru",
    roast: "medium",
    flavorNotes: ["balanced", "organic", "sustainable"],
  },
];
