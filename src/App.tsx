import { CircularProgress } from "@mui/material";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./constants/path";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const Home = lazy(() => import("./pages/home/Home"));
  const ProductList = lazy(() => import("./pages/productList/ProductList"));
  const Product = lazy(() => import("./pages/product/Product"));
  const Basket = lazy(() => import("./pages/basket/Basket"));
  const Profile = lazy(() => import("./pages/profile/Profile"));
  const Admin = lazy(() => import("./pages/admin/Admin"));
  const Favorite = lazy(() => import("./pages/favorite/Favorite"));
  const Login = lazy(() => import("./pages/login/Login"));
  const Register = lazy(() => import("./pages/register/Register"));
  const Logout = lazy(() => import("./pages/logout/Logout"));

  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<CircularProgress size="3rem" />}>
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.fallback} element={<Home />} />
            <Route path={routes.admin} element={<Admin />} />
            <Route path={routes.favorite} element={<Favorite />} />
            <Route path={routes.profile} element={<Profile />} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.logout} element={<Logout />} />
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
