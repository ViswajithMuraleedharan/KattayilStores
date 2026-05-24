import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import RequireAdmin from "./components/RequireAdmin";

import Home from "./pages/Home";
import RepairRequest from "./pages/RepairRequest";
import TrackRepair from "./pages/TrackRepair";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRepairs from "./pages/admin/Repairs";
import AdminOrders from "./pages/admin/Orders";
import AdminProducts from "./pages/admin/Products";
import AdminCustomers from "./pages/admin/Customers";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/repair" element={<RepairRequest />} />
            <Route path="/track" element={<TrackRepair />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin auth */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected admin routes */}
            <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
            <Route path="/admin/repairs" element={<RequireAdmin><AdminRepairs /></RequireAdmin>} />
            <Route path="/admin/orders" element={<RequireAdmin><AdminOrders /></RequireAdmin>} />
            <Route path="/admin/products" element={<RequireAdmin><AdminProducts /></RequireAdmin>} />
            <Route path="/admin/customers" element={<RequireAdmin><AdminCustomers /></RequireAdmin>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
