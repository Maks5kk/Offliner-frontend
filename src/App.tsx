import { CircularProgress } from "@mui/material";
import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./constants/path";
import Navbar from "@components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { IntlProvider } from "react-intl";
import enLocale from "./public/locales/en";
import ruLocale from "./public/locales/ru";
import { useAuthStore } from "@store/useAuthStore";
import useFavoriteStore from "@store/useFavoriteStore";
import useCartStore from "@store/useCartStore";

const Home = lazy(() => import("@pages/home/Home.tsx"));
const ProductList = lazy(() => import("@pages/productList/ProductList.tsx"));
const Product = lazy(() => import("@pages/product/Product.tsx"));
const Basket = lazy(() => import("@pages/basket/Basket.tsx"));
const Profile = lazy(() => import("@pages/profile/Profile.tsx"));
const Admin = lazy(() => import("@pages/admin/Admin.tsx"));
const Favorite = lazy(() => import("@pages/favorite/Favorites.tsx"));
const Login = lazy(() => import("@pages/login/Login.tsx"));
const Register = lazy(() => import("@pages/register/Register.tsx"));
const Logout = lazy(() => import("@pages/logout/Logout.tsx"));
const ForgotPassword = lazy(
  () => import("@pages/forgotPassword/ForgotPassword.tsx")
);
const ResetPassword = lazy(
  () => import("@pages/resetPassword/ResetPassword.tsx")
);

function App() {
  const { checkAuth } = useAuthStore();
  const { fetchFavoriteList } = useFavoriteStore();
  const { fetchCart } = useCartStore();
  const messages = { en: enLocale, ru: ruLocale };

  const [locale, setLocale] = useState<"ru" | "en">("ru");

  useEffect(() => {
    checkAuth();
    fetchFavoriteList();
    fetchCart();
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale === "en" || storedLocale === "ru") setLocale(storedLocale);
  }, [checkAuth, fetchFavoriteList, fetchCart]);

  const handleChangeLanguage = (code: "ru" | "en") => {
    setLocale(code);
    localStorage.setItem("locale", code);
  };

  return (
    <>
      <IntlProvider locale={locale} messages={messages[locale]} key={locale}>
        <BrowserRouter>
          <Suspense fallback={<CircularProgress size="3rem" />}>
            <Navbar onChangeLanguage={handleChangeLanguage} />
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
              <Route
                path={routes.forgotPassword}
                element={<ForgotPassword />}
              />
              <Route path={routes.resetPassword} element={<ResetPassword />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </IntlProvider>
    </>
  );
}

export default App;
