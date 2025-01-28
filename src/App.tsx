import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home'
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import Basket from './pages/basket/Basket';
import Auth from './pages/auth/Auth';
import Profile from './pages/profile/Profile';
import Admin from './pages/admin/Admin';
import History from './pages/history/History';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/basket" element={<Basket/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/administrator" element={<Admin/>}/>
        <Route path="/history" element={<History/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
