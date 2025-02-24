// ProductCard.tsx
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import {
  ComputerOutlined,
  Favorite,
  FavoriteBorder,
  LaptopMac,
  Smartphone,
  Star,
} from "@mui/icons-material";
import { LinkComponent } from "../ui/Link";
import { useTranslation } from "react-i18next";

interface Type {
  label: string;
  value: string;
}

interface ProductCardProps {
  product: Product;
  addToCart: (
    productId: string,
    quantity: number,
    selectedColor: string
  ) => void;
  addToFavorite: (productId: string) => void;
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

export default function ProductCard({
  product,
  addToCart,
  addToFavorite,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setError(false);
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
      setError(true);
      return;
    }
    addToCart(product._id, 1, selectedColor);
    setSelectedColor("");
  };

  const handleFavoriteClick = async () => {
    try {
      await addToFavorite(product._id);
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Error with add to favorite: ", error);
    }
  };

  return (
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
        label={t(`productCard.category.${product.category.toLowerCase()}`)}
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
            fontWeight: "600",
            mb: 1,
            textTransform: "capitalize",
          }}
        >
          <LinkComponent
            sx={{ textDecoration: "none", color: "black" }}
            to={`/product/${product._id}`}
          >
            {product.name}
          </LinkComponent>
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#2196F3", mb: 1 }}
        >
          ${product.price}
        </Typography>
        <IconButton onClick={handleFavoriteClick}>
          {isFavorite ? (
            <Favorite sx={{ color: "black" }} />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
          <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
            ({product.rating} / 5)
          </Typography>
        </Box>
      </CardContent>

      <Box sx={{ padding: 1 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {t("productCard.colorTitle")}:
        </Typography>
        <Box sx={{ display: "flex", gap: "8px" }}>
          {product.types.map((type) => (
            <Button
              key={type.value}
              onClick={() => handleColorSelect(type.value)}
              sx={{
                height: "20px",
                backgroundColor: type.value,
                border:
                  selectedColor === type.value ? "2px solid black" : "none",
                "&:hover": {
                  border: "2px solid lightgray",
                },
              }}
            />
          ))}
        </Box>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {t("productCard.colorError")}
          </Typography>
        )}
      </Box>

      <Box sx={{ padding: 1 }}>
        <Button
          onClick={handleAddToCart}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            borderRadius: "5px",
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
        >
          {t("productCard.addButton")}
        </Button>
      </Box>
    </Card>
  );
}
