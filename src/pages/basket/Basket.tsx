import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid2,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import useCartStore from "../../store/useCartStore";
import React from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

export default function Basket() {
  const { fetchCart, cart, totalPrice, addToCart } = useCartStore();

  React.useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      <Grid2 container spacing={3} gap={36}>
        <Grid2 sx={{ xs: 8 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 2 }}
            gutterBottom
          >
            Cart ({cart.length} items)
          </Typography>
          {cart.length > 0 ? (
            cart.map((item) => (
              <Card
                key={item.productId._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  p: 3,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  width: "100%",
                }}
              >
                <Box
                  component="img"
                  src={item.productId.image}
                  alt={item.productId.name}
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ flex: "1 1 auto", pl: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {item.productId.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <IconButton
                      size="small"
                      sx={{ color: "primary.main" }}
                      onClick={() => addToCart(item.productId._id, -1, null)}
                      disabled={item.quantity === 1}
                    >
                      <RemoveCircleOutline />
                    </IconButton>
                    <Typography
                      sx={{ mx: 1, fontSize: "18px", fontWeight: "bold" }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{ color: "primary.main" }}
                      onClick={() => addToCart(item.productId._id, 1, null)}
                    >
                      <AddCircleOutline />
                    </IconButton>
                  </Box>
                </CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: "red", fontWeight: "bold", pr: 2 }}
                >
                  {item.productId.price * item.quantity} $
                </Typography>
              </Card>
            ))
          ) : (
            <Typography variant="h6" color="text.secondary">
              Your cart is empty
            </Typography>
          )}
        </Grid2>

        <Grid2 sx={{ xs: 4 }}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              mt: 24,
              borderRadius: 3,
              backgroundColor: "#f9f9f9",
              width: "100%",
              minHeight: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Total price:{" "}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography
              variant="h5"
              sx={{ color: "success.dark", fontWeight: "bold" }}
            >
              Sum: <b>{totalPrice} $</b>
            </Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2, fontSize: "16px", py: 1.5 }}
            >
              Order
            </Button>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
}
