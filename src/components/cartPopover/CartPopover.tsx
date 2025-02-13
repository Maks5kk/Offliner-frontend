import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import styles from "./CartPopover.styles";
import { CSSProperties } from "react";
import { Delete } from "@mui/icons-material";

export default function CartPopover({
  anchorEl,
  onClose,
}: {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) {
  const { cart, removeFromCart } = useCartStore();
  const isOpen = Boolean(anchorEl);

  return (
    <Box
      sx={{ ...styles.popover, display: isOpen ? "block" : "none" }}
      onMouseLeave={onClose}
    >
      <Typography variant="h6" sx={styles.title}>
        Cart
      </Typography>

      {cart?.length ? (
        <List>
          {cart.map((item) => (
            <ListItem key={item.productId._id} sx={styles.listItem}>
              <img
                src={item.productId.image}
                alt={item.productId.name}
                style={styles.image as CSSProperties}
              />
              <ListItemText
                primary={item.productId.name}
                secondary={`Quantity: ${item.quantity} | Price: $${item.productId.price}`}
              />
              <Typography variant="subtitle2" sx={styles.totalPrice}>
                ${item.productId.price * item.quantity}
              </Typography>
              <IconButton
                onClick={() => removeFromCart(item.productId._id)}
                sx={styles.deleteIcon}
              >
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>Your cart is empty</Typography>
      )}

      <Link to="/basket">
        <Typography sx={styles.goToCart}>Go to cart</Typography>
      </Link>
    </Box>
  );
}
