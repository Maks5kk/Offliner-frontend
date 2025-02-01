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

const settings = ["Profile", "Administrator", "Logout"];

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    color: "black",
    backgroundColor: "white",
  },
}));

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ height: 100 }}>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between", height: 100 }}
        >
          <LinkComponent to={"/"} sx={{ mr: "1", textDecoration: "none" }}>
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
              FF
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
          <Box sx={{ flexGrow: 0 }}>
            <LinkComponent to={"/favorite"}>
              <IconButton aria-label="favorite" sx={{ mr: 2 }}>
                <StyledBadge badgeContent={4} color="secondary">
                  <FavoriteIcon />
                </StyledBadge>
              </IconButton>
            </LinkComponent>
            <LinkComponent to={"/basket"}>
              <IconButton aria-label="cart" sx={{ mr: 3 }}>
                <StyledBadge badgeContent={4} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </LinkComponent>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <LinkComponent
                  sx={{ textDecoration: "none" }}
                  to={`/${setting.toLocaleLowerCase()}`}
                >
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                </LinkComponent>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
