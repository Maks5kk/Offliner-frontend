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
import {
  AddCircleOutline,
  Delete,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

export default function Basket() {
  const { fetchCart, cart, totalPrice, addToCart, removeFromCart } =
    useCartStore();

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
                  position: "relative",
                }}
              >
                <IconButton
                  onClick={() => removeFromCart(item.productId._id)}
                  sx={{ position: "absolute", top: 5, right: 5 }}
                >
                  <Delete sx={{ color: "lightgray" }} />
                </IconButton>
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
                  <Typography sx={{ color: "black", fontSize: "16px", mt: 1 }}>
                    Price: {item.productId.price}$
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
                <motion.div
                  key={item.productId._id}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "red", fontWeight: "bold", pr: 2 }}
                  >
                    {item.productId.price * item.quantity} $
                  </Typography>
                </motion.div>
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
            <AnimatePresence mode="popLayout">
              <motion.span
                key={totalPrice}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  display: "inline-block",
                  minWidth: "80px",
                  textAlign: "start",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "success.dark", fontWeight: "bold" }}
                >
                  Sum: <b>{totalPrice} $</b>
                </Typography>
              </motion.span>
            </AnimatePresence>

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
