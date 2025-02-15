import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

const styles: Record<string, SxProps<Theme>> = {
  popover: {
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    bgcolor: "white",
    maxHeight: "50vh",
    maxWidth: "660px",
    overflowY: "auto",
    boxShadow: 4,
    borderRadius: 2,
    zIndex: 10,
    padding: 2,
  },
  title: {
    color: "black",
    fontWeight: "bold",
  },
  cardText: {
    lineHeight: 1.1,
    mb: "4px",
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    borderBottom: "1px solid #e0e0e0",
    py: 1,
  },
  card: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    px: 2,
    py: 1,
    borderRadius: 1,
    border: "1px solid #e0e0e0",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
  },
  cardContent: {
    flexGrow: 1,
    ml: 2,
  },
  image: {
    width: 60,
    height: 60,
    objectFit: "cover",
    borderRadius: 1,
  } as CSSProperties,
  deleteIcon: {
    position: "absolute",
    right: 2,
    top: "50%",
    transform: "translateY(-50%)",
    color: "gray",
    borderRadius: "50%",
    width: 32,
    height: 32,
    "&:hover": {
      backgroundColor: "lightgray",
    },
  },
  footer: {
    marginTop: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  goToFavoritesLink: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1rem",
    transition: "color 0.3s",

    "&:hover": {
      color: "#0056b3",
      cursor: "pointer",
    },
  },
};

export default styles;
