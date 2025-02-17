import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {Typography} from "@mui/material";
import { categories } from "../../constants/categories";
import Slider from "../../components/slider/SliderNovelty";
import { Swiper, SwiperSlide } from "swiper/react";
import { brands } from "../../constants/brands";
import { banners } from "../../constants/banners";
import { products } from "../../constants/products";
import { Autoplay } from "swiper/modules";
import { sortCardsByRating} from "./filter.ts";
import { ProductCard } from "../../components/ui/ProductCard.tsx";
import Banner from "../../components/ui/Banner.tsx";
import Categories from "../../components/categories/Categories.tsx";
import BrandsList from "../../components/brandsList/BrandsList.tsx";
import ModalPanel from "../../components/slidePanel/ModalPanel.tsx";

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
        <Categories categories={categories} />
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
          <BrandsList brands={brands} setModalBrand={setModalBrand} />
          {modalBrand.open && (
            <ModalPanel
              modalBrand={modalBrand}
              setModalBrand={setModalBrand}
              products={products}
            />
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
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Paper>
      <Paper sx={{ p: 2, mt: 1 }}>
        <Box>
          <Banner
            title="hello"
            newPrice="1000"
            oldPrice="2000"
            imageUrl={banners[0].imageUrl}
            installment="это ч"
          />
        </Box>
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
                  <ProductCard product={product} />
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
