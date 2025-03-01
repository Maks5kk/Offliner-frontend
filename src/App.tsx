import { CircularProgress } from "@mui/material";
import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./constants/path";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./store/useAuthStore";
import { IntlProvider } from "react-intl";
import enLocale from "./public/locales/en";
import ruLocale from "./public/locales/ru";
import useFavoriteStore from "./store/useFavoriteStore";
import useCartStore from "./store/useCartStore";

function App() {
  const Home = lazy(() => import("./pages/home/Home"));
  const ProductList = lazy(() => import("./pages/productList/ProductList"));
  const Product = lazy(() => import("./pages/product/Product"));
  const Basket = lazy(() => import("./pages/basket/Basket"));
  const Profile = lazy(() => import("./pages/profile/Profile"));
  const Admin = lazy(() => import("./pages/admin/Admin"));
  const Favorite = lazy(() => import("./pages/favorite/Favorites"));
  const Login = lazy(() => import("./pages/login/Login"));
  const Register = lazy(() => import("./pages/register/Register"));
  const Logout = lazy(() => import("./pages/logout/Logout"));
  const ForgotPassword = lazy(
    () => import("./pages/forgotPassword/ForgotPassword")
  );
  const ResetPassword = lazy(
    () => import("./pages/resetPassword/ResetPassword")
  );

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
