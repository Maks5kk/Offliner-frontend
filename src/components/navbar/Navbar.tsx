import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  TextField,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { LinkComponent } from "../ui/Link";
import { routes } from "../../constants/path";
import { useAuthStore } from "../../store/useAuthStore";
import CartPopover from "../cartPopover/CartPopover";

const settings = [
  { label: "Profile", route: routes.profile },
  { label: "Administrator", route: routes.admin },
  { label: "Logout", route: routes.logout },
];

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    color: "black",
    backgroundColor: "white",
  },
}));

function Navbar() {
  const [anchorUser, setAnchorUser] = React.useState<HTMLElement | null>(null);
  const [cartPopoverAnchor, setCartPopoverAnchor] =
    React.useState<HTMLElement | null>(null);

  const { authUser } = useAuthStore();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorUser(null);
  };

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
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
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
              sx={{
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

                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <IconButton
                    aria-label="cart"
                    sx={{ mr: 3 }}
                    onMouseEnter={(event) =>
                      setCartPopoverAnchor(event.currentTarget)
                    }
                  >
                    <StyledBadge badgeContent={4} color="secondary">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                  <CartPopover
                    anchorEl={cartPopoverAnchor}
                    onClose={() => setCartPopoverAnchor(null)}
                  />
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
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
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
