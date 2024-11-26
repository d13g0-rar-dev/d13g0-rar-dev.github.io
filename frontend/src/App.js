import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import CartPage from "./pages/CartPage";
import PayPage from "./pages/PayPage";
import ShippingForm from "./pages/ShippingForm";
import ReportPage from "./pages/ReportPage";
import AdminLogin from "./pages/AdminLogin";
import BuyPage from "./pages/BuyPage";

function App() {
  const location = useLocation();

  const hideHeaderRoutes = ["/report", "/login"];
  return (
    <div className="App">
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<PayPage />} />
        <Route path="/form" element={<ShippingForm />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/buy" element={<BuyPage />} />
      </Routes>
    </div>
  );
}

export default App;
