import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_NUMBER = "919999999999";

const CartDrawer = () => {
  const { isOpen, close, items, setQty, remove, subtotal } = useCart();

  const whatsappLink = () => {
    const lines = items.map((i) => `• ${i.product.name} × ${i.quantity} — ₹${i.product.price * i.quantity}`).join("%0A");
    const text = `Hi Ram Pickel Mart! I'd like to order:%0A${lines}%0A%0ATotal: ₹${subtotal}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-paper border-l-border p-0">
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-display text-2xl text-ink text-left">Your Basket</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full grid place-items-center text-center text-muted-foreground">
              <div>
                <p className="font-display text-lg text-ink mb-1">Your basket is empty</p>
                <p className="text-sm">Discover our handcrafted pickles & podis</p>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={i.product.id} className="flex gap-4 pb-4 border-b border-border/60 last:border-0">
                  <img src={i.product.image} alt="" className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <h4 className="font-display text-base text-ink leading-tight">{i.product.name}</h4>
                      <button onClick={() => remove(i.product.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">{i.product.weight}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border rounded-full">
                        <button onClick={() => setQty(i.product.id, i.quantity - 1)} className="h-8 w-8 grid place-items-center hover:text-primary">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-sm font-medium">{i.quantity}</span>
                        <button onClick={() => setQty(i.product.id, i.quantity + 1)} className="h-8 w-8 grid place-items-center hover:text-primary">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-display text-base text-primary font-semibold">₹{i.product.price * i.quantity}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-3 bg-paper-warm">
            <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="flex justify-between text-sm text-muted-foreground"><span>Shipping</span><span>Calculated at checkout</span></div>
            <div className="flex justify-between font-display text-xl text-ink pt-2 border-t border-border"><span>Total</span><span>₹{subtotal}</span></div>
            <Button asChild size="lg" className="w-full bg-ink text-paper hover:bg-primary mt-2">
              <Link to="/checkout" onClick={close}>Checkout</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full border-leaf text-leaf hover:bg-leaf hover:text-paper">
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" /> Order via WhatsApp
              </a>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
