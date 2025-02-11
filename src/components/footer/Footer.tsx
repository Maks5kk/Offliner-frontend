import { Box, Paper, Typography } from "@mui/material";
import Logo from "../ui/Logo";

export const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > :not(style)": {
          m: 2,
          mb: 0,
          width: "100%",
          maxWidth: "1440px",
        },
      }}
    >
      <Paper
        sx={{
          bgcolor: "#3e4753",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ display: "flex", mt: 2, color: "#f5f5f5" }}>
          2025 Наш Проект. Все права не защищены.
        </Typography>
        <Logo />
      </Paper>
    </Box>
  );
};
