import {
  ComputerOutlined,
  LaptopMac,
  Smartphone,
  Star,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid2,
  Typography,
} from "@mui/material";

interface ProductGridProps {
  isLoading: boolean;
  products: Product[] | undefined;
  isError: boolean;
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
  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography color="error">Error loading products</Typography>
        </Box>
      )}

      {!isError && !isLoading && (
        <Box sx={{ width: "75%" }}>
          <Grid2 container spacing={2}>
            {products ? (
              products.map((product) => (
                <Grid2
                  sx={{ width: "20%", padding: "8px", xs: 12, sm: 6, md: 4 }}
                  key={product._id}
                  component="div"
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={product.name}
                      image={product.image}
                      sx={{
                        width: "100%",
                        height: "150px",
                        objectFit: "contain",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                    />

                    <Chip
                      icon={
                        product.category === "Laptop" ? (
                          <LaptopMac />
                        ) : product.category === "Smartphone" ? (
                          <Smartphone />
                        ) : (
                          <ComputerOutlined />
                        )
                      }
                      label={product.category}
                      sx={{
                        mt: 2,
                        ml: 2,
                        p: 1,
                        maxWidth: "60%",
                        fontSize: 14,
                        fontWeight: 500,
                        backgroundColor: "lightgray",
                        borderRadius: "5px",
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          textTransform: "capitalize",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#2196F3", mb: 1 }}
                      >
                        ${product.price}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            sx={{
                              color:
                                index < Math.floor(product.rating)
                                  ? "gold"
                                  : "rgba(0, 0, 0, 0.2)",
                              mr: 0.5,
                            }}
                          />
                        ))}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ ml: 1 }}
                        >
                          ({product.rating} / 5)
                        </Typography>
                      </Box>
                    </CardContent>
                    <Box sx={{ padding: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                          borderRadius: "5px",
                          textTransform: "capitalize",
                          fontWeight: "bold",
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Card>
                </Grid2>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">
                Products not found
              </Typography>
            )}
          </Grid2>
        </Box>
      )}
    </>
  );
}
