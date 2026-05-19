import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ram-pic.jpeg";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/story", label: "Our Story" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { count, open } = useCart();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-border bg-paper">
      <div className="container grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Ram Pickel Mart logo" className="h-12 w-12 rounded-full object-cover" />
        </Link>

        <div className="text-center">
          <div className="font-display text-xl font-semibold text-ink">Ram Pickel Mart</div>
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Flavors of Andhra</div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <nav className="hidden md:flex items-center gap-6 mr-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-foreground/75"}`
                }
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Cart"
              onClick={open}
              className="relative rounded-full text-ink hover:bg-muted"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {count}
                </span>
              )}
            </Button>

            {user ? (
              <Button
                type="button"
                variant="ghost"
                className="rounded-full px-4 text-sm font-medium text-ink hover:bg-muted"
                onClick={() => signOut().then(() => navigate("/"))}
              >
                Sign out
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                className="rounded-full px-4 text-sm font-medium text-ink hover:bg-muted"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-full text-ink hover:bg-muted md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-paper md:hidden">
          <nav className="container flex flex-col gap-2 py-4 w-full">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  signOut().then(() => navigate("/"));
                }}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground text-left hover:bg-muted"
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-muted"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
