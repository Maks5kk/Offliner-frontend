import { Box } from "@mui/material";
import { api } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

import Sidebar from "../../components/sidebar/Sidebar";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../../components/productGrid/ProductGrid";

export interface IReview {
  userId: string;
  comment: string;
  rating: number;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  category: string;
  colors: string[];
  stock: number;
  price: number;
  image: string;
  rating: number;
  reviews: IReview[];
}

const fetchProducts = async (
  searchParams: URLSearchParams
): Promise<IProduct[]> => {
  try {
    const search = searchParams.get("search") || "";
    const priceFrom = searchParams.get("price_from");
    const priceTo = searchParams.get("price_to");
    const category = searchParams.get("category");
    const rating = searchParams.get("rating");
    const sort = searchParams.get("sort");

    const params: any = {
      search,
      price_from: priceFrom,
      price_to: priceTo,
      category,
      rating,
      sort,
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
  } = useQuery<IProduct[]>({
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
