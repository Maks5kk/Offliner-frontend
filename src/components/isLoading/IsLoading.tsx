import { Box, CircularProgress } from "@mui/material";

interface IsLoadingProps {
  isLoading: boolean;
}

export default function IsLoading({ isLoading }: IsLoadingProps) {
  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
