import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck } from "lucide-react";

type Order = {
  id: string;
  user_id: string;
  total_amount: number;
  currency: string;
  status: string;
  payment_provider: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    weight?: string;
  }>;
  shipping_address: {
    full_name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
  };
  created_at: string;
};

const formatMoney = (amount: number, currency = "INR") => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `₹${amount}`;
  }
};

const Orders = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const empty = useMemo(() => !loading && orders.length === 0, [loading, orders.length]);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        if (!cancelled) toast.error(error.message || "Failed to load orders");
        return;
      }

      if (!cancelled) setOrders((data ?? []) as Order[]);
      if (!cancelled) setExpandedOrderId((prev) => prev); // no-op to keep state stable
      if (!cancelled) setLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main className="container py-12 lg:py-20">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-ink">Your Orders</h1>
            <p className="text-muted-foreground mt-2">
              Track your past purchases and delivery status.
            </p>
          </div>
          <div className="hidden md:block text-muted-foreground">
            <Truck className="h-5 w-5" />
          </div>
        </div>

        {loading ? (
          <div className="py-14 text-muted-foreground">Loading orders…</div>
        ) : empty ? (
          <div className="py-14 text-center">
            <p className="font-display text-xl text-ink mb-1">No orders yet</p>
            <p className="text-sm text-muted-foreground">Place an order from the shop to see it here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => {
              const isOpen = expandedOrderId === o.id;
              return (
                <Card key={o.id} className="p-5 border border-border bg-card">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-paper-warm text-ink">
                          {o.status}
                        </Badge>
                        <Badge variant="outline" className="text-muted-foreground">
                          {o.payment_provider}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(o.created_at).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="font-display text-lg text-ink">
                        Total: {formatMoney(o.total_amount, o.currency)}
                      </div>
                    </div>

                    <Button
                      variant={isOpen ? "outline" : "default"}
                      className="rounded-full"
                      onClick={() => setExpandedOrderId(isOpen ? null : o.id)}
                    >
                      {isOpen ? "Hide details" : "View details"}
                    </Button>
                  </div>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-border space-y-4">
                      <div>
                        <p className="font-medium text-ink mb-2">Items</p>
                        <ul className="space-y-2">
                          {(o.items ?? []).map((it, idx) => (
                            <li key={`${it.id}-${idx}`} className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-ink truncate">{it.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  Qty {it.quantity}
                                  {it.weight ? ` · ${it.weight}` : ""}
                                </div>
                              </div>
                              <div className="text-sm font-medium text-ink">
                                {formatMoney((it.price ?? 0) * (it.quantity ?? 0), o.currency)}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-medium text-ink mb-2">Delivery address</p>
                        <div className="text-sm text-muted-foreground">
                          {o.shipping_address?.full_name}
                          <br />
                          {o.shipping_address?.phone}
                          <br />
                          {o.shipping_address?.email}
                          <br />
                          {o.shipping_address?.address}
                          <br />
                          {o.shipping_address?.city} - {o.shipping_address?.pincode}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Orders;

