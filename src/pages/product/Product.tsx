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

const product = {
  title: "Apple MacBook Pro 16",
  description:
    "The most powerful MacBook Pro ever, supercharged by the M1 Max chip.",
  price: 2499,
  image:
    "https://pclider.pl/environment/cache/images/500_500_productGfx_10749/macbookpro.webp",
  rating: 4.6,
  category: "Laptops",
  specifications: [
    { label: "Processor", value: "M1 Max 10-core CPU" },
    { label: "RAM", value: "32GB Unified Memory" },
    { label: "Storage", value: "1TB SSD" },
    { label: "Display", value: "16-inch Retina Display" },
  ],
  colors: ["Space Gray", "Silver", "Midnight"],
};

const reviews = [
  {
    name: "John Doe",
    rating: 5,
    comment: "Amazing performance and battery life!",
  },
  {
    name: "Jane Smith",
    rating: 4,
    comment: "Great laptop, but a bit expensive.",
  },
  { name: "Alex Johnson", rating: 5, comment: "Best laptop I've ever owned!" },
];

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

const ProductPage = () => {
  const [selectedColor, setSelectedColor] = useState("Space Gray");
  const [hovered, setHovered] = useState(false);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <Box bgcolor="#f5f5f5">
      <Box display="flex" justifyContent="center" alignItems="flex-start" p={4}>
        <Card sx={{ maxWidth: 1200, p: 3, boxShadow: 3 }}>
          <Grid container spacing={4}>
            <Grid size={{ md: 6, xs: 12 }}>
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  transition: "transform 0.3s ease-in-out",
                  transform: hovered ? "scale(1.1)" : "scale(1)",
                }}
                image={product.image}
                alt={product.title}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              />
            </Grid>

            <Grid size={{ md: 6, xs: 12 }}>
              <CardContent>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  {product.title}
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
                    {product.colors.map((color) => (
                      <Button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        sx={{
                          backgroundColor:
                            selectedColor === color ? "blue" : "transparent",
                          color: selectedColor === color ? "white" : "black",
                          borderRadius: 2,
                          fontWeight: selectedColor === color ? 600 : 400,
                          "&:hover": {
                            backgroundColor:
                              selectedColor === color ? "primary" : "lightgray",
                          },
                        }}
                      >
                        {color}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingBag />}
                  sx={{ mt: 3 }}
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
            {reviews.map((review, index) => (
              <Box key={index} mb={2}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {review.name}
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
  );
};

export default ProductPage;
