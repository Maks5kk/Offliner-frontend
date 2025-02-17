import { Box, IconButton } from "@mui/material";
import { Brands as BrandsType } from "../../constants/brands";

interface BrandProps {
  brands: BrandsType[];
  setModalBrand: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      brand: string;
      filters: string[];
      type: string;
    }>
  >;
}

export default function BrandsList({ brands, setModalBrand }: BrandProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: 1100,
        mr: "auto",
        ml: "auto",
      }}
    >
      {brands.map((brand) => (
        <IconButton
          key={brand.name}
          onClick={() => {
            setModalBrand((prev) => ({
              ...prev,
              open: prev.brand === brand.name ? false : true,
              brand: prev.brand === brand.name ? "" : brand.name,
              filters: brand.filters ?? [],
              type: "",
            }));
          }}
          aria-label="apple"
          sx={{
            color: "black",
            fontSize: "15px",
            fontWeight: "bold",
            display: "flex",
            mr: 5,
            ml: 5,
            flexDirection: "column",
          }}
        >
          {brand.logo && <img src={brand.logo} alt="" height={"30px"} />}
          {brand.name}
        </IconButton>
      ))}
    </Box>
  );
}
