import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "./src/components/ui/sonner";
import { Toaster } from "./src/components/ui/toaster";
import { TooltipProvider } from "./src/components/ui/tooltip";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import CartDrawer from "./src/components/CartDrawer";
import Index from "./src/pages/Index.tsx";
import Shop from "./src/pages/Shop.tsx";
import ProductDetail from "./src/pages/ProductDetail.tsx";
import Checkout from "./src/pages/Checkout.tsx";
import Login from "./src/pages/Login.tsx";
import Signup from "./src/pages/Signup.tsx";
import VerifyOtp from "./src/pages/VerifyOtp.tsx";
import Admin from "./src/pages/Admin.tsx";
import Story from "./src/pages/Story.tsx";
import WhyUs from "./src/pages/WhyUs.tsx";
import Orders from "./src/pages/Orders.tsx";
import NotFound from "./src/pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
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

export default App;
