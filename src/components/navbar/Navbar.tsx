import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import { LinkComponent } from "../ui/Link";
import { useAuthStore } from "@store/useAuthStore";
import { Logo } from "@components/logo/Logo";
import { Search } from "@components/search/Search";
import UserMenu from "@components/userMenu/UserMenu";
import { useFormatMessage } from "@hooks/useFormatMessage";
import { CartAndFavorite } from "@components/cartAndFavorite/CartAndFavorite";
import LanguageMenu from "@components//languageMenu/LangMenu";

type NavbarProps = {
  onChangeLanguage: (code: "ru" | "en") => void;
};

const Navbar: React.FC<NavbarProps> = ({ onChangeLanguage }) => {
  const [anchorUser, setAnchorUser] = React.useState<HTMLElement | null>(null);
  const [anchorLang, setAnchorLang] = React.useState<HTMLElement | null>(null);
  const { authUser } = useAuthStore();

  const formattedMessage = useFormatMessage();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorUser(null);
  };

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorLang(event.currentTarget);
  };

  const handleChangeLanguage = (code: "en" | "ru") => {
    onChangeLanguage(code);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Logo />
          <Search />

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            {authUser ? (
              <>
                <Typography sx={{ mr: 2, color: "white", fontWeight: "bold" }}>
                  {authUser.fullName}
                </Typography>
                <CartAndFavorite />
                <UserMenu
                  onOpen={handleOpenUserMenu}
                  onClose={handleCloseUserMenu}
                  anchorEl={anchorUser}
                />
              </>
            ) : (
              <LinkComponent
                to="/login"
                sx={{ width: "140px", display: "flex", alignItems: "center" }}
              >
                <IconButton
                  aria-label="login"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  {formattedMessage("navbar.login")}
                </IconButton>
              </LinkComponent>
            )}
            <LanguageMenu
              onClick={handleOpenLangMenu}
              anchorEl={anchorLang}
              handleChangeLanguage={handleChangeLanguage}
              onClose={() => setAnchorLang(null)}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
