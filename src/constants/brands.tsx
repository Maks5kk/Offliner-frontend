export type Brands = {
  logo: string;
  name: string;
  filters?: string[];
};

export const brands = [
  {
    logo: "../../Brands/Apple.png",
    name: "Apple",
    filters: ["Laptop", "Smartphone", "Headphones", "Accessories"],
  },
  {
    logo: "../../Brands/Xiaomi.png",
    name: "Xiaomi",
    filters: [
      "Laptop",
      "Smartphone",
      "Computer",
      "Accessories",
      "TVs",
      "Other devices",
      "Speakers",
      "Vacuums",
    ],
  },
  {
    logo: "../../Brands/Huawei.png",
    name: "Huawei",
    filters: ["Laptop", "Smartphone", "Computer", "Accessories", "Watches"],
  },
  {
    logo: "../../Brands/Honor.png",
    name: "Honor",
    filters: ["Laptop", "Smartphone", "Computer"],
  },
  {
    logo: "../../Brands/Samsung.png",
    name: "Samsung",
    filters: [
      "Laptop",
      "Smartphone",
      "Computer",
      "Accessories",
      "TVs",
      "Fridges",
    ],
  },
  {
    logo: "../../Brands/Bosch.webp",
    name: "Bosch",
    filters: ["Vacuums", "Fridges", "TVs", "Accessories"],
  },
];
