import { Box, Typography } from "@mui/material";

interface IsErrorProps {
  isError: boolean;
}

export default function IsError({ isError }: IsErrorProps) {
  return (
    <>
      {isError && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography color="error">Error loading products</Typography>
        </Box>
      )}
    </>
  );
}
