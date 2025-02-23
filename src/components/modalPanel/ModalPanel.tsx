import {
  Box,
  Button,
  Grid2 as Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { GreedItem as Item } from "./styled.ts";
import { SlidePanel } from "./styled.ts";
import { sortCards } from "./filters.ts";
import { Product } from "../../constants/products.tsx";
import { LinkComponent } from "../ui/Link.tsx";
import { routes } from "../../constants/path.tsx";
import { useState } from "react";

interface ModalPanelProps {
  modalBrand: {
    open: boolean;
    brand: string;
    filters: string[];
    category: string;
  };
  setModalBrand: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      brand: string;
      filters: string[];
      category: string;
    }>
  >;
  products: Product[];
}

export default function ModalPanel({
  setModalBrand,
  modalBrand,
  products,
}: ModalPanelProps) {
  const filteredProducts = sortCards(
    products,
    modalBrand.brand,
    modalBrand.category
  );

  const [category, setCategory] = useState("");

  return (
    <SlidePanel sx={{ mt: 3, p: 3, display: "flex", maxHeight: "700px" }}>
      <Box sx={{ overflowY: "auto", minWidth: "fit-content" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {modalBrand.brand} devices
        </Typography>
        <List>
          <ListItem>
            <IconButton
              onClick={() => {
                setModalBrand((prev) => ({
                  ...prev,
                  category: "",
                }));
                sortCards;
              }}
            >
              <ListItemText primary={"All"} />
            </IconButton>
          </ListItem>
          {modalBrand.filters.map((filter) => (
            <ListItem key={filter}>
              <IconButton
                onClick={() => {
                  setModalBrand((prev) => ({
                    ...prev,
                    category: filter,
                  }));
                  sortCards;
                  setCategory(filter);
                }}
              >
                <ListItemText primary={filter} />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="error"
          onClick={() =>
            setModalBrand((prev) => ({
              open: !prev.open,
              brand: "",
              filters: [],
              category: "",
            }))
          }
          sx={{ mt: 2, mr: 2 }}
        >
          Close
        </Button>
        <LinkComponent
          to={
            category
              ? routes.productList +
                `?category=${category}` +
                `&brand=${modalBrand.brand}`
              : routes.productList + `?brand=${modalBrand.brand}`
          }
        >
          <Button variant="contained" color="info" sx={{ mt: 2 }}>
            Show all
          </Button>
        </LinkComponent>
      </Box>
      <Box sx={{ ml: 7, borderLeft: "2px solid #f5f5f5", pl: 3 }}>
        <Grid
          container
          spacing={5}
          sx={{
            overflowY: "auto",
            maxHeight: "600px",
            justifyContent: "center",
          }}
        >
          {filteredProducts.map((product) => (
            <Grid sx={{ width: 280 }} key={product._id}>
              <Item
                sx={{
                  p: 2,
                  borderRadius: 2,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease",
                  position: "relative",
                  bgcolor: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                  ":hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                {product.discount && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: -10,
                      bgcolor: "red",
                      color: "white",
                      px: 2,
                      py: 0.5,
                      fontSize: 14,
                      fontWeight: "bold",
                      borderRadius: "0 4px 4px 0",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                      transform: "rotate(-15deg)",
                    }}
                  >
                    -{product.discount * 100}%
                  </Box>
                )}
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      maxHeight: 150,
                      objectFit: "contain",
                      marginBottom: 10,
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
                >
                  {product.brand}
                </Typography>
                {product.discount ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        color: "gray",
                        mr: 2,
                      }}
                    >
                      {product.price}$
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "gray", mb: 2, textAlign: "center" }}
                    >
                      {product.price - product.price * product.discount}$
                    </Typography>
                  </Box>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{ color: "gray", mb: 2, textAlign: "center" }}
                  >
                    {product.price}$
                  </Typography>
                )}
                <LinkComponent to={routes.productList + `/${product._id}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      borderRadius: 4,
                      textTransform: "none",
                      fontWeight: "bold",
                      boxShadow: "0 4px 6px rgba(0, 123, 255, 0.3)",
                      ":hover": {
                        boxShadow: "0 6px 12px rgba(0, 123, 255, 0.5)",
                      },
                    }}
                  >
                    Bought
                  </Button>
                </LinkComponent>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </SlidePanel>
  );
}
