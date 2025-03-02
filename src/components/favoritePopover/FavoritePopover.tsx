import { Box, Typography, List, ListItem, IconButton } from "@mui/material";
import styles from "./FavoritePopover.styles";
import { CSSProperties } from "react";
import { Delete } from "@mui/icons-material";
import useFavoriteStore from "@store/useFavoriteStore";
import { LinkComponent } from "../ui/Link";
import { routes } from "../../constants/path";
import { useFormatMessage } from "@hooks/useFormatMessage";

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
  const formattedMessage = useFormatMessage();
  return (
    <Box
      sx={{ ...styles.popover, display: isOpen ? "block" : "none" }}
      onMouseLeave={onClose}
      onMouseEnter={onMouseEnter}
    >
      <Typography variant="h6" sx={styles.title}>
        {formattedMessage("favoritePopover.title")}
      </Typography>

      {favorite && favorite?.length ? (
        <List>
          {favorite.map((item) => (
            <ListItem key={item.productId._id} sx={styles.listItem}>
              <Box sx={styles.card}>
                <img
                  src={item.productId.image || ""}
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
                    {formattedMessage("favoritePopover.price")}: $
                    {item.productId.price}
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
        <Typography>
          {formattedMessage("favoritePopover.emptyMessage")}
        </Typography>
      )}

      <Box sx={styles.footer}>
        <LinkComponent to={routes.favorite} sx={styles.goToFavoritesLink}>
          {formattedMessage("favoritePopover.link")}
        </LinkComponent>
      </Box>
    </Box>
  );
}
