import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

interface BannerProps {
  title: string;
  installment: string;
  oldPrice: string;
  newPrice: string;
  imageUrl: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  installment,
  oldPrice,
  newPrice,
  imageUrl,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: "16px",
        padding: "16px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {installment}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Typography
            sx={{ textDecoration: "line-through", color: "#888" }}
            variant="body2"
          >
            {oldPrice}
          </Typography>
          <Typography
            sx={{ fontWeight: "bold", fontSize: "2em", color: "#000" }}
          >
            {newPrice}
          </Typography>
        </Box>
        <Button variant="contained" color="primary">
          Купить
        </Button>
      </CardContent>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{ maxWidth: "150px", borderRadius: "8px" }}
        />
      </Box>
    </Card>
  );
};

export default Banner;
