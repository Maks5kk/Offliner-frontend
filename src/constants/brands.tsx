export type Brands = {
  logo: string;
  name: string;
  filters?: string[];
};

export const brands = [
  {
    logo: "../../Brands/Apple.png",
    name: "Apple",
    filters: ["Laptops", "Phones", "Headphones", "Accessories"],
  },
  {
    logo: "../../Brands/Xiaomi.png",
    name: "Xiaomi",
    filters: [
      "Laptops",
      "Phones",
      "Headphones",
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
    filters: ["Laptops", "Phones", "Headphones", "Accessories", "Watches"],
  },
  {
    logo: "../../Brands/Honor.png",
    name: "Honor",
    filters: ["Phones", "Watches", "Accessories"],
  },
  {
    logo: "../../Brands/Samsung.png",
    name: "Samsung",
    filters: [
      "Laptops",
      "Phones",
      "Headphones",
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
