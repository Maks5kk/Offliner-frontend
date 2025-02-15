// ProductGrid.tsx

import { Box, Grid2 } from "@mui/material";
import useCartStore from "../../store/useCartStore";
import ProductCard from "../productCard/ProductCard";
import Loader from "../Loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useFavoriteStore from "../../store/useFavoriteStore";
import { useState } from "react";

interface ProductGridProps {
  isLoading: boolean;
  products: Product[] | undefined;
  isError: boolean;
}

interface ProductType {
  label: string;
  value: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  colors: string[];
  stock: number;
  price: number;
  image: string;
  rating: number;
  reviews: Review[];
  types: ProductType[];
}

interface Review {
  userId: string;
  comment: string;
  rating: number;
}

export default function ProductGrid({
  isLoading,
  products,
  isError,
}: ProductGridProps) {
  const { addToCart } = useCartStore();
  const { addToFavorite } = useFavoriteStore();

  return (
    <>
      <Loader isLoading={isLoading} />
      <ErrorMessage isError={isError} children="Error loading products" />

      {!isError && !isLoading && (
        <Box sx={{ width: "75%" }}>
          <Grid2 container spacing={2}>
            {products &&
              products.map((product) => (
                <Grid2
                  sx={{ width: "20%", padding: "8px", xs: 12, sm: 6, md: 4 }}
                  key={product._id}
                  component="div"
                >
                  <ProductCard
                    product={product}
                    addToCart={addToCart}
                    addToFavorite={addToFavorite}
                  />
                </Grid2>
              ))}
          </Grid2>
        </Box>
      )}
    </>
  );
}
