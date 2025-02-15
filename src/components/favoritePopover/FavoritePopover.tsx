import { Box, Typography, List, ListItem, IconButton } from "@mui/material";
import styles from "./FavoritePopover.styles";
import { CSSProperties } from "react";
import { Delete } from "@mui/icons-material";
import useFavoriteStore from "../../store/useFavoriteStore";
import { LinkComponent } from "../ui/Link";

export default function FavoritePopover({
  anchorEl,
  onClose,
  onMouseEnter,
}: {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onMouseEnter: () => void;
}) {
  const { favorite, addToFavorite } = useFavoriteStore();
  const isOpen = Boolean(anchorEl);

  return (
    <Box
      sx={{ ...styles.popover, display: isOpen ? "block" : "none" }}
      onMouseLeave={onClose}
      onMouseEnter={onMouseEnter}
    >
      <Typography variant="h6" sx={styles.title}>
        Favorite
      </Typography>

      {favorite?.length ? (
        <List>
          {favorite.map((item) => (
            <ListItem key={item.productId._id} sx={styles.listItem}>
              <Box sx={styles.card}>
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  style={styles.image as CSSProperties}
                />
                <Box sx={styles.cardContent}>
                  <LinkComponent
                    to={`/product/${item.productId._id}`}
                    sx={{ textDecoration: "none" }}
                  >
                    <Typography sx={styles.cardText} color="text.primary">
                      {item.productId.name}
                    </Typography>
                  </LinkComponent>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${item.productId.price}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => addToFavorite(item.productId._id)}
                  sx={styles.deleteIcon}
                >
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>Your favorite list is empty</Typography>
      )}

      <Box sx={styles.footer}>
        <LinkComponent to="/favorite" sx={styles.goToFavoritesLink}>
          Go to favorite
        </LinkComponent>
      </Box>
    </Box>
  );
}
