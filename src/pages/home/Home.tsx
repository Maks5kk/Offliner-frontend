import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Grid2 as Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import { categories } from "../../constants/categories";
import Slider from "../../components/slider/SliderNovelty";
import { Swiper, SwiperSlide } from "swiper/react";
import { brands } from "../../constants/brands";
import { LinkComponent } from "../../components/ui/Link";
import { routes } from "../../constants/path";
import { Button } from "@mui/material";
import { products } from "../../constants/products";
import { Autoplay } from "swiper/modules";
import DiscountIcon from "@mui/icons-material/Discount";
import { greedItem as Item, SlidePanel } from "./styled.ts";
import { sortCards, sortCardsByRating, handleCategory } from "./filter.ts";

type modalBrand = {
  open: boolean;
  brand: string;
  filters: string[];
  type: string;
};

export default function Home() {
  const [modalBrand, setModalBrand] = React.useState<modalBrand>({
    open: false,
    brand: "",
    type: "",
    filters: [],
  });

  const filteredProductsByRating = sortCardsByRating(products);

  const filteredProducts = sortCards(
    products,
    modalBrand.brand,
    modalBrand.type
  );

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > :not(style)": {
          m: 2,
          mb: 0,
          width: "100%",
          maxWidth: "1440px",
        },
      }}
    >
      <Paper sx={{ p: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#1976d2", mb: 3 }}
        >
          Categories
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "auto",
            pb: 1,
          }}
        >
          {categories.map((category) => (
            <LinkComponent
              key={category.id}
              sx={{ textDecoration: "none" }}
              to={routes.productList}
            >
              <Paper
                onClick={() => {
                  handleCategory(category.title);
                }}
                key={category.title}
                sx={{
                  width: "100%",
                  maxWidth: "fit-content",
                  p: 2,
                  transition: "0.5s",
                  ":hover": {
                    bgcolor: "rgba(255, 245, 230, 0.5)",
                  },
                }}
              >
                <img src={category.imgSrc} width={100} height={80} />
                <Typography sx={{ textAlign: "center", pt: 1 }}>
                  {category.title}
                </Typography>
              </Paper>
            </LinkComponent>
          ))}
        </Box>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 3 }}
          >
            Novelty
          </Typography>
          <Slider />
        </Box>
        <Box sx={{ mt: 5, pt: 5, borderTop: "5px solid #f5f5f5" }}>
          <Typography
            variant={"h5"}
            sx={{
              fontWeight: "bold",
              color: "#1976d2",
              mb: 3,
              textAlign: "center",
            }}
          >
            Popular brands
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {brands.map((brand) => (
              <IconButton
                key={brand.name}
                onClick={() => {
                  setModalBrand((prev) => ({
                    ...prev,
                    open: prev.brand === brand.name ? false : true,
                    brand: prev.brand === brand.name ? "" : brand.name,
                    filters: brand.filters,
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
                {brand.logo && (
                  <img src={brand.logo} alt="" width={"30px"} height={"30px"} />
                )}
                {brand.name}
              </IconButton>
            ))}
          </Box>
          {modalBrand.open && (
            <SlidePanel
              sx={{ mt: 3, p: 3, display: "flex", maxHeight: "700px" }}
            >
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
          )}
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#1976d2", mb: 3, mt: 3 }}
            >
              Popular products
            </Typography>
            <Swiper
              modules={[Autoplay]}
              loop={true}
              speed={5000}
              autoplay={{ delay: 1 }}
              spaceBetween={200}
              slidesPerView={8}
              style={{ padding: 10 }}
            >
              {filteredProductsByRating.map((product) => (
                <SwiperSlide key={product.id} style={{}}>
                  <Paper
                    sx={{
                      bgcolor: "#f5f5f5",
                      p: 2,
                      width: 150,
                      height: 250,
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <img src={product.img} alt="" width={50} height={100} />
                      {product.discount ? (
                        <Box
                          sx={{
                            position: "absolute",
                            right: -10,
                            top: -10,
                            bgcolor: "rgba(0,0,0,0.2)",
                            p: 2,
                            borderRadius: "50%",
                          }}
                        >
                          <DiscountIcon
                            sx={{ color: "#ffd700", fontSize: 30 }}
                          />
                          <Typography sx={{ color: "red" }}>
                            {product?.discount * 100}%
                          </Typography>
                        </Box>
                      ) : (
                        false
                      )}
                      <Typography sx={{ fontWeight: "bold" }}>
                        {product.name}
                      </Typography>

                      {product.discount ? (
                        <>
                          <Typography sx={{ textDecoration: "line-through" }}>
                            {product.cost}$
                          </Typography>
                          <Typography>
                            {product.cost - product.cost * product.discount}$
                          </Typography>
                        </>
                      ) : (
                        <Typography>{product.cost}</Typography>
                      )}
                      <Typography>
                        <Rating max={1} />
                        {product.rating}
                      </Typography>
                      <Typography>{product?.desk}</Typography>
                    </Box>
                  </Paper>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Paper>
      <Paper sx={{ p: 2, mt: 1 }}>
        <Box></Box>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#1976d2",
              mb: 3,
            }}
          >
            Products on discount!
          </Typography>
          <Swiper
            modules={[Autoplay]}
            loop={true}
            speed={3500}
            autoplay={{ delay: 0.5 }}
            spaceBetween={200}
            slidesPerView={8}
            style={{ padding: 10 }}
          >
            {products.map((product) =>
              product.discount ? (
                <SwiperSlide key={product.id}>
                  <Paper
                    sx={{
                      bgcolor: "#f5f5f5",
                      p: 2,
                      width: 150,
                      height: 250,
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <img src={product.img} alt="" width={50} height={100} />
                      {product.discount ? (
                        <Box
                          sx={{
                            position: "absolute",
                            right: -10,
                            top: -10,
                            bgcolor: "rgba(0,0,0,0.2)",
                            p: 2,
                            borderRadius: "50%",
                          }}
                        >
                          <DiscountIcon
                            sx={{ color: "#ffd700", fontSize: 30 }}
                          />
                          <Typography sx={{ color: "red" }}>
                            {product?.discount * 100}%
                          </Typography>
                        </Box>
                      ) : (
                        false
                      )}
                      <Typography sx={{ fontWeight: "bold" }}>
                        {product.name}
                      </Typography>
                      <Typography sx={{ textDecoration: "line-through" }}>
                        {product.cost}$
                      </Typography>
                      <Typography>
                        {product.cost - product.cost * product?.discount}$
                      </Typography>
                      <Typography>
                        <Rating max={1} />
                        {product.rating}
                      </Typography>
                      <Typography>{product.desk}</Typography>
                    </Box>
                  </Paper>
                </SwiperSlide>
              ) : (
                ""
              )
            )}
          </Swiper>
        </Box>
      </Paper>
    </Box>
  );
}
