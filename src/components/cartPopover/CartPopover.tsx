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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <Box
      sx={{ ...styles.popover, display: isOpen ? "block" : "none" }}
      onMouseLeave={onClose}
      onMouseEnter={onMouseEnter}
    >
      <Typography variant="h6" sx={styles.title}>
        {t("cartPopover.title")}
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
                  secondary={`${t("cartPopover.quantity")}: ${
                    item.quantity
                  } | ${t("cartPopover.price")}: $${item.productId.price}`}
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
        <Typography>{t("cartPopover.emptyMessage")}</Typography>
      )}

      <LinkComponent to={routes.basket}>
        <Typography sx={styles.goToCart}>{t("cartPopover.link")}</Typography>
      </LinkComponent>
    </Box>
  );
}
