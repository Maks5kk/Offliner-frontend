import { Typography } from "@mui/material";
import { LinkComponent } from "./Link";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

export default function Logo() {
  return (
    <LinkComponent to="/" sx={{ mr: "1", textDecoration: "none" }}>
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
  );
}
