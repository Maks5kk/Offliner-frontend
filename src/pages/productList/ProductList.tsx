import { Box } from "@mui/material";
import { api } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

import Sidebar from "../../components/sidebar/Sidebar";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../../components/productGrid/ProductGrid";

export interface Review {
  userId: string;
  comment: string;
  rating: number;
}

export interface Product {
  _id: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  colors: string[];
  stock: number;
  price: number;
  image: string;
  rating: number;
  reviews: Review[];
}

const fetchProducts = async (
  searchParams: URLSearchParams
): Promise<Product[]> => {
  try {
    const params = {
      search: searchParams.get("search") || "",
      price_from: searchParams.get("price_from"),
      price_to: searchParams.get("price_to"),
      category: searchParams.get("category"),
      brand: searchParams.get("brand"),
      rating: searchParams.get("rating"),
      sort: searchParams.get("sort"),
    };

    const response = await api.get("/products", { params });

    return response.data;
  } catch (error) {
    throw new Error("Error in fetching products" + error);
  }
};

export default function ProductList() {
  const [searchParams] = useSearchParams();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products", searchParams.toString()],
    queryFn: () => fetchProducts(searchParams),
  });

  return (
    <Box sx={{ display: "flex", marginTop: "32px", width: "100%" }}>
      <Sidebar />
      <ProductGrid
        products={products}
        isLoading={isLoading}
        isError={isError}
      />
    </Box>
  );
}
