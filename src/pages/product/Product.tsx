import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Chip,
  Grid2 as Grid,
  Divider,
  TextField,
  ButtonGroup,
} from "@mui/material";
import { LaptopMac, ShoppingBag } from "@mui/icons-material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import useCartStore from "../../store/useCartStore";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

const similarProducts = [
  {
    title: "MacBook Air M2",
    price: 1199,
    image:
      "https://thinkapple.pl/wp-content/uploads/2022/06/D8F64411-55B3-4B91-8BED-20D976523AA4-e1683793669648.jpeg",
  },
  {
    title: "Dell XPS 15",
    price: 1899,
    image:
      "https://komputerydlafirm.pl/environment/cache/images/0_0_productGfx_18925/dell-xps-9510-screen.webp",
  },
  {
    title: "HP Spectre x360",
    price: 1499,
    image:
      "https://swiat-laptopow.pl/19653-medium_default/laptop-2w1-hp-spectre-x360-16-aa0055nw-9r850ea-intel-ultra-7-16gb-ssd-1tb-nvidia-rtx-4050-28k-dotyk-win-11.jpg",
  },
];

export interface Review {
  fullName: string;
  comment: string;
  rating: number;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Type {
  label: string;
  value: string;
}

export interface ProductById {
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
  specifications: Specification[];
}

const fetchProductById = async (id: string): Promise<ProductById> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

const ProductPage = () => {
  const [selectedType, setSelectedType] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [error, setError] = useState(false);

  const { addToCart } = useCartStore();

  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<ProductById>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
  });

  const handleTypeChange = (newType: { value: string; label: string }) => {
    setSelectedType(newType);
    setError(false);
  };

  const handleAddToCart = (productId: string, selectedType: string | null) => {
    if (!selectedType) {
      setError(true);
      return;
    }
    addToCart(productId, 1, selectedType);
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <ErrorMessage isError={isError} children="Error loading product" />

      <Box bgcolor="#f5f5f5">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          p={4}
        >
          {!isError && !isLoading && product && (
            <Card sx={{ width: 1200, p: 3, boxShadow: 3 }}>
              <Grid container spacing={4}>
                <Grid size={{ md: 6, xs: 12 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%",
                      height: 300,
                      borderRadius: 2,
                      objectFit: "contain",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                    image={product.image}
                    alt={product.name}
                  />
                </Grid>

                <Grid size={{ md: 6, xs: 12 }}>
                  <CardContent>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                      {product.name}
                    </Typography>
                    <Chip
                      icon={<LaptopMac />}
                      label={product.category}
                      sx={{
                        mb: 2,
                        p: 2,
                        fontSize: 16,
                        fontWeight: 400,
                        backgroundColor: "lightgray",
                      }}
                    />
                    <Rating
                      value={product.rating}
                      precision={0.2}
                      readOnly
                      sx={{
                        ml: 2,
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {product.description}
                    </Typography>
                    <Typography variant="h5" color="primary" fontWeight={700}>
                      ${product.price}
                    </Typography>

                    <Box mt={2}>
                      <Typography variant="h6">Available Colors:</Typography>
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                        sx={{
                          mt: 1,
                        }}
                      >
                        {product.types.map((type) => (
                          <Button
                            key={type.value}
                            onClick={() => handleTypeChange(type)}
                            sx={{
                              backgroundColor:
                                selectedType?.value === type.value
                                  ? "primary.main"
                                  : "transparent",
                              color:
                                selectedType?.value === type.value
                                  ? "white"
                                  : "black",
                              borderRadius: 2,
                              fontWeight:
                                selectedType?.value === type.value ? 600 : 400,
                              "&:hover": {
                                backgroundColor:
                                  selectedType?.value === type.value
                                    ? "primary"
                                    : "lightgray",
                              },
                            }}
                          >
                            {type.value}
                          </Button>
                        ))}
                      </ButtonGroup>
                      {error && (
                        <Typography
                          variant="body2"
                          color="error"
                          sx={{ mt: 1 }}
                        >
                          Please select a color!
                        </Typography>
                      )}
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingBag />}
                      sx={{ mt: 3 }}
                      onClick={() =>
                        handleAddToCart(
                          product._id,
                          selectedType?.value || null
                        )
                      }
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Grid>
              </Grid>

              <Box mt={4}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Specifications
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  {product.specifications.map((spec, index) => (
                    <Grid size={{ md: 6, xs: 12 }} key={index}>
                      <Typography variant="body1">
                        <strong>{spec.label}:</strong> {spec.value}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box mt={4}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Customer Reviews
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {product.reviews.map((review, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {review.fullName}
                    </Typography>
                    <Rating
                      value={review.rating}
                      precision={0.5}
                      readOnly
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2">{review.comment}</Typography>
                  </Box>
                ))}
                <TextField
                  fullWidth
                  label="Write a review..."
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary">
                  Submit Review
                </Button>
              </Box>
            </Card>
          )}

          <Box ml={4} width={250}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Similar Products
            </Typography>
            {similarProducts.map((item, index) => (
              <Card key={index} sx={{ mb: 2, p: 2, boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ height: 140, objectFit: "contain" }}
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="body1" fontWeight={500}>
                    {item.title}
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight={700}>
                    ${item.price}
                  </Typography>
                  <Button variant="contained" size="small" sx={{ mt: 1 }}>
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductPage;
