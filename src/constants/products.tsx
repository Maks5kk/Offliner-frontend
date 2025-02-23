import { api } from "../lib/axios";

export interface Product {
  _id: string;
  name: string;
  brand: string;
  discount?: number;
  description: string;
  category: string;
  colors: string[];
  stock: number;
  price: number;
  image: string;
  rating: number;
  reviews: Review[];
}

export interface Review {
  userId: string;
  comment: string;
  rating: number;
}

async function fetchProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>("/products");
  return response.data;
}

export const products = await fetchProducts();
