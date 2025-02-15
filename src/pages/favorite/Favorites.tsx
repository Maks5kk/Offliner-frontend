import {
  Grid2,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import useFavoriteStore from "../../store/useFavoriteStore";
import { useEffect } from "react";
import { LinkComponent } from "../../components/ui/Link";

const Favorites = () => {
  const { fetchFavoriteList, favorite, addToFavorite } = useFavoriteStore();
  const theme = useTheme();

  useEffect(() => {
    fetchFavoriteList();
  }, []);

  return (
    <Grid2 container spacing={3} padding={2}>
      {favorite.length > 0 ? (
        favorite.map((product) => (
          <Grid2
            sx={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            key={product.productId._id}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: "hidden",
                  border: `1px solid ${theme.palette.divider}`,
                  "&:hover": {
                    boxShadow: 10,
                    transform: "translateY(-5px)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.productId.image}
                  alt={product.productId.name}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                />

                <CardContent
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 120,
                  }}
                >
                  <LinkComponent
                    sx={{ textDecoration: "none", color: "black" }}
                    to={`/product/${product.productId._id}`}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      noWrap
                      sx={{ fontWeight: "bold" }}
                    >
                      {product.productId.name}
                    </Typography>
                  </LinkComponent>

                  <Typography variant="body2" color="text.secondary">
                    ${product.productId.price}
                  </Typography>
                </CardContent>

                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    onClick={() => addToFavorite(product.productId._id)}
                    sx={{
                      color: "red",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Card>
            </motion.div>
          </Grid2>
        ))
      ) : (
        <Grid2 sx={{ xs: 12 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Your favorites list is empty.
            </Typography>
          </Box>
        </Grid2>
      )}
    </Grid2>
  );
};

export default Favorites;
