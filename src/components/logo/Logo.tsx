import { LinkComponent } from "../ui/Link";
import { Typography } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

export function Logo() {
  return (
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
  );
}
