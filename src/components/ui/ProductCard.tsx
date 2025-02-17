import { Box, Paper, Typography, Rating } from "@mui/material";
import DiscountIcon from "@mui/icons-material/Discount";
import { Product } from "../../constants/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const discountedPrice = product.discount
    ? product.cost - product.cost * product.discount
    : product.cost;

  return (
    <Paper
      key={product.id}
      sx={{
        bgcolor: "background.paper",
        p: 2,
        width: 200,
        height: 320,
        borderRadius: 4,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          position: "relative",
        }}
      >
        {product.discount !== undefined && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              transform: "rotate(10deg)",
              background: "linear-gradient(45deg, #ff1744, #ff8a65)",
              color: "#fff",
              px: 2,
              py: 0.5,
              borderRadius: "0 0 8px 8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              zIndex: 10,
            }}
          >
            <DiscountIcon sx={{ color: "#fff", fontSize: 20 }} />
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", fontSize: 14 }}
            >
              -{product.discount * 100}%
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            width: 120,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <img
            src={product.img}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 1,
            color: "text.primary",
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textAlign: "center", mb: 1 }}
        >
          {product.brand} | {product.type}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating
            value={parseFloat(product.rating)}
            precision={0.5}
            readOnly
            sx={{ color: "#ffc107" }}
          />
          <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>
            ({product.rating})
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mb: 1,
          }}
        >
          {product.discount !== undefined && (
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", textDecoration: "line-through" }}
            >
              ${product.cost.toFixed(2)}
            </Typography>
          )}
          <Typography
            variant="h6"
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            ${discountedPrice.toFixed(2)}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "center",
            fontStyle: "italic",
            mt: 1,
          }}
        >
          {product.desk}
        </Typography>
      </Box>
    </Paper>
  );
};
