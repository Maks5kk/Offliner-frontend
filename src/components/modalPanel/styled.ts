import { Paper } from "@mui/material";
import { styled, keyframes } from "@mui/material";
import { Box } from "@mui/system";

export const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;
export const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

export const GreedItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",

  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export const SlidePanel = styled(Box)(({ theme }) => ({
  bottom: 0,
  left: 0,
  right: 0,
  transform: "translateY(100%)",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  maxHeight: "90vh",
  overflowY: "auto",
  zIndex: 1000,
  animation: `${slideUp} 0.3s ease-out forwards`,
}));
