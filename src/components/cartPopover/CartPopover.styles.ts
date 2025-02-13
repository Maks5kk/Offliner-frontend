import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

const styles: Record<string, SxProps<Theme>> = {
  popover: {
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    bgcolor: "white",
    maxHeight: "40vh",
    overflowY: "scroll",
    boxShadow: 3,
    borderRadius: 2,
    zIndex: 10,
    minWidth: 250,
    padding: 2,
  },
  title: {
    mb: 1,
    color: "black",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    color: "black",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
  } as CSSProperties,
  totalPrice: {
    fontWeight: 600,
    ml: "auto",
  },
  goToCart: {
    mt: 2,
    textAlign: "center",
    display: "block",
    color: "blue",
    textDecoration: "underline",
    cursor: "pointer",
  },
  deleteIcon: {
    width: "4px",
    height: "4px",
    position: "absolute",
    right: 2,
    top: 20,
  },
};

export default styles;
