import { Box, TextField } from "@mui/material";
import { useFormatMessage } from "../../hooks/useFormatMessage";

export function Search() {
  const formattedMessage = useFormatMessage();
  return (
    <Box sx={{ width: 800, maxWidth: "60%", minWidth: 300 }}>
      <TextField
        sx={{ bgcolor: "white", borderRadius: 1 }}
        fullWidth
        placeholder={`${formattedMessage("navbar.searchPlaceholder")}...`}
        id="search"
      />
    </Box>
  );
}
