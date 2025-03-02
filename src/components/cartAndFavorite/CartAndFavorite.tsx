import { Badge, Box, IconButton, styled } from "@mui/material";
import { LinkComponent } from "../ui/Link";
import { routes } from "../../constants/path";
import useFavoriteStore from "@store/useFavoriteStore";
import useCartStore from "@store/useCartStore";
import FavoritePopover from "@components/favoritePopover/FavoritePopover";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartPopover from "@components/cartPopover/CartPopover";
import React from "react";

const StyledBadge = styled(Badge)`
  & .MuiBadge-badge {
    color: black;
    background-color: white;
  }
`;

export function CartAndFavorite() {
  const { favorite } = useFavoriteStore();
  const { cart } = useCartStore();

  const [cartPopoverAnchor, setCartPopoverAnchor] =
    React.useState<HTMLElement | null>(null);
  const [favoritePopoverAnchor, setFavoritePopoverAnchor] =
    React.useState<HTMLElement | null>(null);

  return (
    <>
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <LinkComponent to={routes.favorite}>
          <IconButton
            aria-label="favorite"
            sx={{ mr: 2 }}
            onMouseEnter={(event) =>
              setFavoritePopoverAnchor(event.currentTarget)
            }
            onMouseLeave={() => setFavoritePopoverAnchor(null)}
          >
            <StyledBadge badgeContent={favorite.length} color="secondary">
              <FavoriteIcon />
            </StyledBadge>
          </IconButton>
        </LinkComponent>
        <FavoritePopover
          anchorEl={favoritePopoverAnchor}
          onClose={() => setFavoritePopoverAnchor(null)}
          onMouseEnter={() => setFavoritePopoverAnchor(favoritePopoverAnchor)}
        />
      </Box>

      <Box sx={{ position: "relative", display: "inline-block" }}>
        <LinkComponent to={routes.basket}>
          <IconButton
            aria-label="cart"
            sx={{ mr: 3 }}
            onMouseEnter={(event) => setCartPopoverAnchor(event.currentTarget)}
            onMouseLeave={() => setCartPopoverAnchor(null)}
          >
            <StyledBadge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </LinkComponent>
        <CartPopover
          anchorEl={cartPopoverAnchor}
          onClose={() => setCartPopoverAnchor(null)}
          onMouseEnter={() => setCartPopoverAnchor(cartPopoverAnchor)}
        />
      </Box>
    </>
  );
}
