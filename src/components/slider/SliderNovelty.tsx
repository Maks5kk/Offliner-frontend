import { Navigation, A11y, Autoplay } from "swiper/modules";
import "../../../node_modules/swiper/swiper-bundle.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Paper, Typography } from "@mui/material";

export default function Slider() {
  return (
    <Swiper
      modules={[Navigation, A11y, Autoplay]}
      loop={true}
      autoplay={{
        delay: 8000,
      }}
      spaceBetween={50}
      slidesPerView={1}
      navigation
    >
      <SwiperSlide>
        <Paper
          sx={{
            p: 0,
            bgcolor: "#f5f5f5",
            mr: 7,
            ml: 7,
            display: "flex",
            pl: 4,
          }}
        >
          <img
            src="../../Novelty/iphone.png"
            alt=""
            width={"400px"}
            height={"200px"}
          />
          <Box sx={{ ml: 7 }}>
            <Typography sx={{ fontWeight: "bolder", fontSize: "45px" }}>
              New Iphone 16 Pro Max
            </Typography>
            <Typography sx={{ fontWeight: "bolder", fontSize: "25px" }}>
              From only 1299$
            </Typography>
            <Typography
              sx={{
                fontWeight: "bolder",
                fontSize: "25px",
                mt: 3,
                color: "red",
              }}
            >
              Check now
            </Typography>
          </Box>
        </Paper>
      </SwiperSlide>
      <SwiperSlide>
        <Paper
          sx={{
            p: 0,
            justifyContent: "space-between",
            bgcolor: "black",
            mr: 7,
            ml: 7,
            display: "flex",
            flexDirection: "row-reverse",
            color: "#f5f5f5",
            pl: 4,
          }}
        >
          <img
            src="../../Novelty/macbookPro.webp"
            alt=""
            width={"400px"}
            height={"200px"}
          />
          <Box sx={{ mr: 7 }}>
            <Typography sx={{ fontWeight: "bolder", fontSize: "45px" }}>
              New MacBook Pro on cheep M4!
            </Typography>
            <Typography sx={{ fontWeight: "bolder", fontSize: "25px" }}>
              From only 1799$
            </Typography>
            <Typography
              sx={{
                fontWeight: "bolder",
                fontSize: "25px",
                mt: 3,
                color: "red",
              }}
            >
              Check now
            </Typography>
          </Box>
        </Paper>
      </SwiperSlide>
    </Swiper>
  );
}
