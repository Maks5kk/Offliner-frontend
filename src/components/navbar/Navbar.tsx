import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { LinkComponent } from "../ui/Link";
import { routes } from "../../constants/path";
import { useAuthStore } from "../../store/useAuthStore";
import useCartStore from "../../store/useCartStore";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const settings = [
  { label: "Profile", route: routes.profile },
  { label: "Administrator", route: routes.admin },
  { label: "Logout", route: routes.logout },
];

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    color: "black",
    backgroundColor: "white",
  },
}));

function Navbar() {
  const [anchorUser, setAnchorUser] = React.useState<null | HTMLElement>(null);
  const [cartPopoverAnchor, setCartPopoverAnchor] =
    React.useState<null | HTMLElement>(null);

  const { authUser } = useAuthStore();
  const { cart, fetchCart, removeFromCart } = useCartStore();

  React.useEffect(() => {
    fetchCart();
  }, []);

  console.log("cart: ", cart);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorUser(null);
  };

  const handleCartMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setCartPopoverAnchor(event.currentTarget);
  };

  const handleCartMouseLeave = () => {
    setCartPopoverAnchor(null);
  };

  const isCartPopoverOpen = Boolean(cartPopoverAnchor);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <LinkComponent
            to="/"
            sx={{
              mr: "1",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                fontFamily: "monospace",
                fontWeight: 900,
                color: "#dc143c",
                textDecoration: "none",
              }}
            >
              <PowerSettingsNewIcon sx={{ fontSize: 40, fontWeight: "bold" }} />
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
              }}
            >
              liner
            </Typography>
          </LinkComponent>
          <Box sx={{ width: 800, maxWidth: "100%" }}>
            <TextField
              slotProps={{ input: { startAdornment: <SearchSharpIcon /> } }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
              fullWidth
              placeholder="Search"
              id="search"
            />
          </Box>
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            {authUser ? (
              <>
                <LinkComponent to="/favorite">
                  <IconButton aria-label="favorite" sx={{ mr: 2 }}>
                    <StyledBadge badgeContent={4} color="secondary">
                      <FavoriteIcon />
                    </StyledBadge>
                  </IconButton>
                </LinkComponent>
                <Box
                  sx={{ position: "relative", display: "inline-block" }}
                  onMouseEnter={handleCartMouseEnter}
                  onMouseLeave={handleCartMouseLeave}
                >
                  <LinkComponent to="/basket">
                    <IconButton aria-label="cart" sx={{ mr: 3 }}>
                      <StyledBadge
                        badgeContent={cart?.length}
                        color="secondary"
                      >
                        <ShoppingCartIcon />
                      </StyledBadge>
                    </IconButton>
                  </LinkComponent>

                  {isCartPopoverOpen && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        bgcolor: "white",
                        maxHeight: "40vh",
                        overflowY: "scroll",
                        boxShadow: 3,
                        borderRadius: 2,
                        zIndex: 10,
                        minWidth: 250,
                        padding: 2,
                      }}
                      onMouseEnter={handleCartMouseEnter}
                      onMouseLeave={handleCartMouseLeave}
                    >
                      <Typography variant="h6" sx={{ mb: 1, color: "black" }}>
                        Cart
                      </Typography>

                      {cart?.length ? (
                        <List>
                          {cart.map((item) => (
                            <ListItem
                              key={item.productId._id}
                              sx={{ display: "flex" }}
                            >
                              <img
                                src={item.productId.image}
                                alt={item.productId.name}
                                style={{
                                  width: 50,
                                  height: 50,
                                  marginRight: 16,
                                }}
                              />
                              <ListItemText
                                primary={item.productId.name}
                                secondary={`Quantity: ${item.quantity} | Price: $${item.productId.price}`}
                              />
                              <Typography
                                variant="subtitle2"
                                sx={{ ml: "auto" }}
                              >
                                ${item.productId.price * item.quantity}
                              </Typography>
                              <IconButton
                                onClick={() =>
                                  removeFromCart(item.productId._id)
                                }
                                color="error"
                              >
                                Delete
                              </IconButton>
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography>Your cart is empty</Typography>
                      )}
                    </Box>
                  )}
                </Box>
                <Typography sx={{ mr: 2, color: "white", fontWeight: "bold" }}>
                  {authUser.fullName}
                </Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={authUser.fullName}
                      src={
                        authUser.avatar || "/static/images/avatar/default.jpg"
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <LinkComponent
                      key={setting.label}
                      sx={{ textDecoration: "none" }}
                      to={`${setting.route}`}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography sx={{ textAlign: "center" }}>
                          {setting.label}
                        </Typography>
                      </MenuItem>
                    </LinkComponent>
                  ))}
                </Menu>
              </>
            ) : (
              <LinkComponent to="/login">
                <IconButton
                  aria-label="login"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Login
                </IconButton>
              </LinkComponent>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
