import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, Lock, Truck } from "lucide-react";

const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const orderType = (fd.get("order_type") as string) || "online";
    setSubmitting(true);
    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      total_amount: total,
      currency: "INR",
      status: orderType === "cod" ? "confirmed" : "pending",
      payment_provider: orderType === "cod" ? "cod" : "razorpay",
      items: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
        weight: i.product.weight,
      })),
      shipping_address: {
        full_name: String(fd.get("full_name") || ""),
        phone: String(fd.get("phone") || ""),
        email: String(fd.get("email") || ""),
        address: String(fd.get("address") || ""),
        city: String(fd.get("city") || ""),
        pincode: String(fd.get("pincode") || ""),
      },
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Order placed! Redirecting to your orders…");
    clear();
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main className="container py-12 lg:py-20">
        <h1 className="font-display text-4xl md:text-5xl text-ink mb-10">Checkout</h1>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-ink mb-3">Your basket is empty</p>
            <Button asChild className="rounded-full"><Link to="/shop">Browse jars</Link></Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-12">
            <form onSubmit={placeOrder} className="lg:col-span-3 space-y-8">
              <section className="bg-card border border-border rounded-3xl p-6 lg:p-8">
                <h2 className="font-display text-xl text-ink mb-5">Delivery Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Full name</Label><Input name="full_name" required /></div>
                  <div className="space-y-2"><Label>Phone</Label><Input name="phone" required type="tel" /></div>
                  <div className="space-y-2 sm:col-span-2"><Label>Email</Label><Input name="email" required type="email" /></div>
                  <div className="space-y-2 sm:col-span-2"><Label>Address</Label><Input name="address" required /></div>
                  <div className="space-y-2"><Label>City</Label><Input name="city" required /></div>
                  <div className="space-y-2"><Label>Pincode</Label><Input name="pincode" required /></div>
                </div>
              </section>

              <section className="bg-card border border-border rounded-3xl p-6 lg:p-8">
                <h2 className="font-display text-xl text-ink mb-5">Payment</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <label className="flex items-start gap-3 p-5 rounded-2xl bg-paper-warm border border-border cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary/20 transition">
                    <input type="radio" name="order_type" value="online" defaultChecked className="mt-1 accent-primary" />
                    <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-ink">Online — Razorpay</div>
                      <div className="text-xs text-muted-foreground mt-1">UPI · Cards · Netbanking</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-5 rounded-2xl bg-paper-warm border border-border cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary/20 transition">
                    <input type="radio" name="order_type" value="cod" className="mt-1 accent-primary" />
                    <Truck className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-ink">Cash on Delivery</div>
                      <div className="text-xs text-muted-foreground mt-1">Pay in cash when your jars arrive.</div>
                    </div>
                  </label>
                </div>
              </section>

              <Button type="submit" disabled={submitting} className="w-full h-14 rounded-full bg-ink text-paper hover:bg-primary text-base">
                <Lock className="h-4 w-4 mr-2" /> {submitting ? "Placing…" : `Place order — ₹${total}`}
              </Button>
            </form>

            <aside className="lg:col-span-2">
              <div className="bg-card border border-border rounded-3xl p-6 lg:p-8 sticky top-28">
                <h2 className="font-display text-xl text-ink mb-5">Order Summary</h2>
                <ul className="space-y-4 mb-6">
                  {items.map((i) => (
                    <li key={i.product.id} className="flex gap-3">
                      <img src={i.product.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1 text-sm">
                        <div className="font-medium text-ink">{i.product.name}</div>
                        <div className="text-xs text-muted-foreground">Qty {i.quantity} · {i.product.weight}</div>
                      </div>
                      <div className="text-sm font-medium">₹{i.product.price * i.quantity}</div>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 text-sm pt-5 border-t border-border">
                  <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹{subtotal}</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
                  <div className="flex justify-between font-display text-xl text-ink pt-3 border-t border-border mt-2"><span>Total</span><span>₹{total}</span></div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
