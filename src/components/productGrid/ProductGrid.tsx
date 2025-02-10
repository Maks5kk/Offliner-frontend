// ProductGrid.tsx

import { Box, Grid2, Typography } from "@mui/material";
import useCartStore from "../../store/useCartStore";
import IsLoading from "../isLoading/IsLoading";
import IsError from "../isError/IsError";
import ProductCard from "../productCard/ProductCard";

interface ProductGridProps {
  isLoading: boolean;
  products: Product[] | undefined;
  isError: boolean;
}

interface Type {
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
  types: Type[];
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

  return (
    <>
      <IsLoading isLoading={isLoading} />
      <IsError isError={isError} />

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
                  <ProductCard product={product} addToCart={addToCart} />
                </Grid2>
              ))}
          </Grid2>
        </Box>
      )}
    </>
  );
}
