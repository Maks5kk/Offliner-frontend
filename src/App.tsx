import { CircularProgress } from "@mui/material";
import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./constants/path";
import Navbar from "./components/navbar/Navbar";

function App() {
  const Home = lazy(() => import("./pages/home/Home"));
  const ProductList = lazy(() => import("./pages/productList/ProductList"));
  const Product = lazy(() => import("./pages/product/Product"));
  const Basket = lazy(() => import("./pages/basket/Basket"));
  const Auth = lazy(() => import("./pages/auth/Auth"));
  const Profile = lazy(() => import("./pages/profile/Profile"));
  const Admin = lazy(() => import("./pages/admin/Admin"));
  const Favorite = lazy(() => import("./pages/favorite/Favorite"));

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<CircularProgress size="3rem" />}>
        <Navbar/>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.fallback} element={<Home />} />
            <Route path={routes.admin} element={<Admin />} />
            <Route path={routes.favorite} element={<Favorite />} />
            <Route path={routes.profile} element={<Profile />} />
            <Route path={routes.auth} element={<Auth />} />
            <Route path={routes.basket} element={<Basket />} />
            <Route path={routes.productList} element={<ProductList />} />
            <Route path={routes.product} element={<Product />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
