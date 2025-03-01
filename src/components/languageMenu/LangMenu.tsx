import React from "react";
import { Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useFormatMessage } from "../../hooks/useFormatMessage";

const languages = [
  { code: "en", label: "English", flag: "EN" },
  { code: "ru", label: "Русский", flag: "RUS" },
] as const;

type LanguageMenuProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleChangeLanguage: (code: "ru" | "en") => void;
  onClose: () => void;
};

const LanguageMenu: React.FC<LanguageMenuProps> = ({
  anchorEl,
  onClick,
  handleChangeLanguage,
  onClose,
}) => {
  const formattedMessage = useFormatMessage();
  return (
    <>
      <Tooltip title={formattedMessage("navbar.language")}>
        <IconButton onClick={onClick} sx={{ color: "lightgray", ml: "15px" }}>
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "10px" }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleChangeLanguage(lang.code)}
          >
            {lang.flag} {lang.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageMenu;
