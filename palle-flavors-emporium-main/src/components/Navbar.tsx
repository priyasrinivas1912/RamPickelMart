import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X, Search, User, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/ram-pic.jpeg";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop?cat=Pickles", label: "Pickles" },
  { to: "/shop?cat=Honey", label: "Honey" },
  { to: "/shop?cat=Ghee", label: "Ghee" },
  { to: "/shop?cat=Sweets and Snacks", label: "Sweets and Snacks" },
  { to: "/#story", label: "Our story" },
  
];

const Navbar = () => {
  const navigate = useNavigate();
  const { count, open } = useCart();
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled ? "bg-paper/85 backdrop-blur-xl shadow-soft border-b border-border/60" : "bg-transparent"
      )}
    >
      <div className="container grid grid-cols-[auto_1fr_auto] items-center h-20 gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Ram Pickel Mart logo" className="w-11 h-11 object-contain" />
          <span className="font-display text-lg sm:text-xl font-semibold text-ink tracking-tight">
            Ram Pickel Mart
          </span>
        </Link>

        <div className="justify-self-center flex flex-col items-center text-center">
          <div className="font-display text-lg sm:text-xl font-semibold text-ink tracking-tight">Ram Pickel Mart</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Flavors of Andhra</div>
        </div>

        <div className="flex items-center gap-1 justify-self-end">
          <div className="relative hidden sm:flex items-center">
            <Button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="relative"
            >
              <Search className="h-5 w-5" />
            </Button>

            {searchOpen && (
              <form
                className="absolute right-0 top-0 translate-y-2 w-[18rem]"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
                  setSearchOpen(false);
                }}
              >
                <Input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jars..."
                  className="h-11 rounded-full bg-card border-border pr-10"
                />
              </form>
            )}
          </div>

          <Button
            aria-label="Search"
            onClick={() => {
              navigate(`/shop`);
              setSearchOpen(true);
            }}
            className="sm:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button onClick={open} aria-label="Cart" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold grid place-items-center">
                {count}
              </span>
            )}
          </Button>

          {user ? (
            <div className="relative">
              <Button
                onClick={() => setShowUserMenu((s) => !s)}
                aria-label="Account"
                className="rounded-full"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-spice grid place-items-center text-primary-foreground text-xs font-bold">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </div>
              </Button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-2xl shadow-clay border border-border/60 py-2 z-50 animate-scale-in">
                  <div className="px-4 py-2 border-b border-border/40">
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { setShowUserMenu(false); signOut().then(() => navigate("/")); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium"
            >
              <User className="h-4 w-4" /> Login
            </Button>
          )}

          <Button className="lg:hidden" onClick={() => setMobile((m) => !m)} aria-label="Menu">
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="border-t border-border/60 hidden lg:block">
        <nav className="container flex items-center justify-center gap-8 py-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium relative py-2 transition-colors",
                  "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:bg-primary after:transition-all after:duration-300",
                  isActive ? "text-primary after:w-full" : "text-foreground/80 hover:text-primary after:w-0 hover:after:w-full"
                )
              }
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {mobile && (
        <div className="lg:hidden border-t border-border bg-paper">
          <nav className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobile(false)}
                className="py-3 px-2 rounded-md text-foreground/85 hover:bg-muted transition-colors font-medium"
              >
                {l.label}
              </Link>
            ))}
            <div className="border-t border-border my-2" />
            {user ? (
              <button
                onClick={() => { setMobile(false); signOut().then(() => navigate("/")); }}
                className="py-3 px-2 rounded-md text-foreground/85 hover:bg-muted transition-colors font-medium text-left flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobile(false)}
                  className="py-3 px-2 rounded-md text-foreground/85 hover:bg-muted transition-colors font-medium flex items-center gap-2"
                >
                  <User className="h-4 w-4" /> Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobile(false)}
                  className="py-3 px-2 rounded-md text-primary font-medium flex items-center gap-2"
                >
                  Create Account
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
