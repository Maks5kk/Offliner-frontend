import { Box, Paper, Typography } from "@mui/material";
import { LinkComponent } from "../ui/Link";
import { routes } from "../../constants/path";
import { Categories as CategoryType } from "../../constants/categories";

interface CategoriesProps {
  categories: CategoryType[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
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
          to={routes.productList + `?category=${category.title}`}
        >
          <Paper
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
  );
}
