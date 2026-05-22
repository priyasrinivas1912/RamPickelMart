import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "./src/components/ui/sonner";
import { Toaster } from "./src/components/ui/toaster";
import { TooltipProvider } from "./src/components/ui/tooltip";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import CartDrawer from "./src/components/CartDrawer";
import Index from "./src/pages/Index";
import Shop from "./src/pages/Shop";
import ProductDetail from "./src/pages/ProductDetail";
import Checkout from "./src/pages/Checkout";
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";
import VerifyOtp from "./src/pages/VerifyOtp";
import Admin from "./src/pages/Admin";
import Story from "./src/pages/Story";
import WhyUs from "./src/pages/WhyUs";
import Orders from "./src/pages/Orders";
import NotFound from "./src/pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>          {/* ← ఇది తప్పనిసరి */}
        <AuthProvider>
          <CartProvider>
            <Toaster />            {/* ← toast కోసం */}
            <Sonner />             {/* ← sonner toast కోసం */}
            <BrowserRouter>
              <CartDrawer />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/story" element={<Story />} />
                <Route path="/why-us" element={<WhyUs />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}