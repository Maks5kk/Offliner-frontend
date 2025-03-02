import {
  Box,
  Typography,
  Slider,
  List,
  ListItem,
  TextField,
  Grid2,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import { MAX_PRICE, MIN_PRICE } from "../../constants/price";
import { useFormatMessage } from "@hooks/useFormatMessage";
import { COLORS } from "shared/constants";

const categories = [
  {
    label: "laptop",
    value: "Laptop",
  },
  {
    label: "smartphone",
    value: "Smartphone",
  },
  {
    label: "notebook",
    value: "Notebook",
  },
  {
    label: "tv",
    value: "TV",
  },
] as const;

const Sidebar = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    MIN_PRICE,
    MAX_PRICE,
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const formattedMessage = useFormatMessage();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set("search", e.target.value);
    setSearchParams(searchParams);
  };

  const handleSliderChange = _.debounce(
    (event: Event, newValue: number | number[]) => {
      if (Array.isArray(newValue)) {
        setPriceRange(newValue as [number, number]);
        searchParams.set("price_from", String(newValue[0]));
        searchParams.set("price_to", String(newValue[1]));
        setSearchParams(searchParams);
      }
    },
    1000
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    searchParams.set("category", category);
    setSearchParams(searchParams);
  };

  const handleButtonSortChange = (sortType: string) => {
    const currentSort = searchParams.get("sort");
    if (currentSort === sortType) {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", sortType);
    }
    setSearchParams(searchParams);
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      searchParams.set("rating", String(rating));
      setSearchParams(searchParams);
    } else {
      searchParams.delete("rating");
      setSearchParams(searchParams);
    }
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setPriceRange([0, 5000]);
    setSelectedCategory("");
  };

  const handleApplyFilters = () => {
    setSearchParams(searchParams);
  };

  return (
    <Box
      sx={{
        width: "360px",
        maxHeight: "calc(100vh - 64px)",
        padding: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        backgroundColor: "#fff",
        mr: "48px",
        ml: "24px",
        position: "sticky",
        top: 4,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {formattedMessage("sidebar.search")}
      </Typography>
      <TextField
        fullWidth
        label={formattedMessage("sidebar.search") + "..."}
        variant="outlined"
        onChange={handleSearchChange}
        sx={{ mb: 4 }}
      />

      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {formattedMessage("sidebar.filterTitle")}
      </Typography>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 sx={{ xs: 6 }}>
          <Typography variant="body2">
            <b>{formattedMessage("sidebar.from")}:</b> ${priceRange[0]}
          </Typography>
        </Grid2>
        <Grid2 sx={{ xs: 6 }}>
          <Typography variant="body2">
            <b>{formattedMessage("sidebar.to")}:</b> ${priceRange[1]}
          </Typography>
        </Grid2>
      </Grid2>
      <Slider
        defaultValue={[MIN_PRICE, MAX_PRICE]}
        valueLabelDisplay="auto"
        onChange={handleSliderChange}
        step={100}
        marks
        min={MIN_PRICE}
        max={MAX_PRICE}
        sx={{ mb: 4 }}
      />

      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {formattedMessage("sidebar.categories")}
      </Typography>
      <RadioGroup
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        {categories.map((category) => (
          <ListItem key={category.label} disablePadding>
            <FormControlLabel
              control={<Radio />}
              label={formattedMessage(`sidebar.${category.label}`)}
              value={category.value}
              sx={{ width: "100%" }}
            />
          </ListItem>
        ))}
      </RadioGroup>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2 }}>
        {formattedMessage("sidebar.sortTitle")}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box
          component="button"
          sx={{
            flex: 1,
            p: 1.5,
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "4px",
            backgroundColor:
              searchParams.get("sort") === "asc" ? COLORS.primary : COLORS.gray,
            color: searchParams.get("sort") === "asc" ? "#fff" : "#000",
            border: "none",
            fontSize: "16px",
          }}
          onClick={() => handleButtonSortChange("asc")}
        >
          {formattedMessage("sidebar.asc")}
        </Box>
        <Box
          component="button"
          sx={{
            flex: 1,
            p: 1.5,
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "4px",
            backgroundColor:
              searchParams.get("sort") === "desc"
                ? COLORS.primary
                : COLORS.gray,
            color: searchParams.get("sort") === "desc" ? "#fff" : "#000",
            border: "none",
            fontSize: "16px",
          }}
          onClick={() => handleButtonSortChange("desc")}
        >
          {formattedMessage("sidebar.desc")}
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mb: 2, mt: 2 }}>
        {formattedMessage("sidebar.ratingTitle")}
      </Typography>
      <List dense>
        {[5, 4, 3, 2].map((stars, index) => (
          <ListItem disablePadding key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => handleRatingChange(stars, e.target.checked)}
                />
              }
              label={"⭐".repeat(stars)}
              sx={{ width: "100%" }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", gap: 2, marginTop: 3 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleApplyFilters}
        >
          {formattedMessage("sidebar.apply")}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleResetFilters}
        >
          {formattedMessage("sidebar.reset")}
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
