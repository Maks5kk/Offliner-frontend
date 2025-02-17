import {
  Box,
  Button,
  Grid2 as Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { GreedItem as Item } from "./styled.ts";
import { SlidePanel } from "./styled.ts";
import { sortCards } from "./filters.ts";
import { Product } from "../../constants/products.tsx";

interface ModalPanelProps {
  modalBrand: {
    open: boolean;
    brand: string;
    filters: string[];
    type: string;
  };
  setModalBrand: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      brand: string;
      filters: string[];
      type: string;
    }>
  >;
  products: Product[];
}

export default function ModalPanel({
  setModalBrand,
  modalBrand,
  products,
}: ModalPanelProps) {
  const filteredProducts = sortCards(
    products,
    modalBrand.brand,
    modalBrand.type
  );
  return (
    <SlidePanel sx={{ mt: 3, p: 3, display: "flex", maxHeight: "700px" }}>
      <Box sx={{ overflowY: "auto", minWidth: "fit-content" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {modalBrand.brand} devices
        </Typography>
        <List>
          <ListItem>
            <IconButton
              onClick={() => {
                setModalBrand((prev) => ({
                  ...prev,
                  type: "",
                }));
                sortCards;
              }}
            >
              <ListItemText primary={"All"} />
            </IconButton>
          </ListItem>
          {modalBrand.filters.map((filter) => (
            <ListItem key={filter}>
              <IconButton
                onClick={() => {
                  setModalBrand((prev) => ({
                    ...prev,
                    type: filter,
                  }));
                  sortCards;
                }}
              >
                <ListItemText primary={filter} />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="error"
          onClick={() =>
            setModalBrand((prev) => ({
              open: !prev.open,
              brand: "",
              filters: [],
              type: "",
            }))
          }
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
      <Box sx={{ ml: 7, borderLeft: "2px solid #f5f5f5", pl: 3 }}>
        <Grid
          container
          spacing={2}
          sx={{
            overflowY: "auto",
            maxHeight: "600px",
          }}
        >
          {filteredProducts.map((product) => (
            <Grid sx={{ width: 250 }} key={product.id}>
              <Item sx={{ display: "flex" }}>
                <img src={product.img} alt="" width={50} height={100} />
                <Box sx={{ ml: 3 }}>
                  <Typography>{product.name}</Typography>
                  <Typography>{product.cost}$</Typography>
                </Box>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </SlidePanel>
  );
}
