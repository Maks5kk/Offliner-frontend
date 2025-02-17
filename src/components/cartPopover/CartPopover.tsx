import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import useCartStore from "../../store/useCartStore";
import styles from "./CartPopover.styles";
import { CSSProperties } from "react";
import { Delete } from "@mui/icons-material";
import { LinkComponent } from "../ui/Link";
import { routes } from "../../constants/path";

export default function CartPopover({
  anchorEl,
  onClose,
  onMouseEnter,
}: {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onMouseEnter: () => void;
}) {
  const { cart, removeFromCart } = useCartStore();
  const isOpen = Boolean(anchorEl);

  return (
    <Box
      sx={{ ...styles.popover, display: isOpen ? "block" : "none" }}
      onMouseLeave={onClose}
      onMouseEnter={onMouseEnter}
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
              <LinkComponent
                to={`/product/${item.productId._id}`}
                sx={{ textDecoration: "none" }}
              >
                <ListItemText
                  primary={item.productId.name}
                  secondary={`Quantity: ${item.quantity} | Price: $${item.productId.price}`}
                />
              </LinkComponent>
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

      <LinkComponent to={routes.basket}>
        <Typography sx={styles.goToCart}>Go to cart</Typography>
      </LinkComponent>
    </Box>
  );
}
