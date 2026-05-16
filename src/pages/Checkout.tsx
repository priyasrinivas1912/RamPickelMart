import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, Lock } from "lucide-react";

const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Razorpay integration coming soon — order saved as draft.");
    clear();
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
                  <div className="space-y-2"><Label>Full name</Label><Input required /></div>
                  <div className="space-y-2"><Label>Phone</Label><Input required type="tel" /></div>
                  <div className="space-y-2 sm:col-span-2"><Label>Email</Label><Input required type="email" /></div>
                  <div className="space-y-2 sm:col-span-2"><Label>Address</Label><Input required /></div>
                  <div className="space-y-2"><Label>City</Label><Input required /></div>
                  <div className="space-y-2"><Label>Pincode</Label><Input required /></div>
                </div>
              </section>

              <section className="bg-card border border-border rounded-3xl p-6 lg:p-8">
                <h2 className="font-display text-xl text-ink mb-5">Payment</h2>
                <div className="flex items-start gap-3 p-5 rounded-2xl bg-paper-warm border border-border">
                  <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-ink">Razorpay (UPI · Cards · Netbanking)</div>
                    <div className="text-xs text-muted-foreground mt-1">Secure payment by Razorpay. Integration ready — connect your account in admin.</div>
                  </div>
                </div>
              </section>

              <Button type="submit" size="lg" className="w-full h-14 rounded-full bg-ink text-paper hover:bg-primary text-base">
                <Lock className="h-4 w-4 mr-2" /> Place order — ₹{total}
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
