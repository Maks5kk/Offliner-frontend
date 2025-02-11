import { Box, Typography } from "@mui/material";

interface ErrorMessageProps {
  isError: boolean;
  children: string;
}

export default function ErrorMessage({ isError, children }: ErrorMessageProps) {
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
          <Typography color="error">{children}</Typography>
        </Box>
      )}
    </>
  );
}
