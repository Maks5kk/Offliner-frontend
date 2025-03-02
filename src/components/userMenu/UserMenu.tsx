import React from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
  Tooltip,
} from "@mui/material";
import { useAuthStore } from "@store/useAuthStore";
import { LinkComponent } from "../ui/Link";
import { routes } from "../../constants/path";
import { useFormatMessage } from "@hooks/useFormatMessage";

type UserMenuProps = {
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  anchorEl: HTMLElement | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ onOpen, onClose, anchorEl }) => {
  const { authUser } = useAuthStore();
  const formattedMessage = useFormatMessage();

  const settings = [
    { label: `${formattedMessage("navbar.profile")}`, route: routes.profile },
    {
      label: `${formattedMessage("navbar.administrator")}`,
      route: routes.admin,
    },
    { label: `${formattedMessage("navbar.logout")}`, route: routes.logout },
  ];

  return (
    <>
      <Tooltip title={formattedMessage("navbar.settingsTooltip")}>
        <IconButton onClick={onOpen} sx={{ p: 0 }}>
          <Avatar
            alt={authUser?.fullName}
            src={authUser?.profilePic || "/static/images/avatar/default.jpg"}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        sx={{ mt: "45px" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {settings.map((setting) => (
          <LinkComponent
            key={setting.label}
            sx={{ textDecoration: "none" }}
            to={setting.route}
          >
            <MenuItem onClick={onClose}>
              <Typography sx={{ textAlign: "center" }}>
                {setting.label}
              </Typography>
            </MenuItem>
          </LinkComponent>
        ))}
      </Menu>
    </>
  );
};

export default UserMenu;
