import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

import logo from "../assets/logo.jpg";

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
    <header className="sticky top-0 z-50 border-b border-border bg-paper shadow-sm backdrop-blur-md">
      
      <div className="container mx-auto px-4">

        {/* NAVBAR */}
        <div className="flex items-center justify-between py-3 md:py-4">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-2 sm:gap-3 md:w-1/3 min-w-0">

            {/* LOGO */}
            <Link to="/" className="shrink-0">
              <img
                src={logo}
                alt="Ram Pickel Mart logo"
                className="
                  h-10
                  w-10
                  sm:h-12
                  sm:w-12
                  md:h-14
                  md:w-14
                  rounded-full
                  object-cover
                  border-2
                  border-[#8B4513]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:scale-105
                "
              />
            </Link>

            {/* MOBILE / TABLET BRAND */}
            <div className="md:hidden min-w-0">

              <h1
                className="
                  text-lg
                  sm:text-2xl
                  font-extrabold
                  text-[#8B4513]
                  truncate
                  leading-tight
                "
                style={{
                  fontFamily: "'Times New Roman', serif",
                }}
              >
                RamPickelMart
              </h1>

              <p
                className="
                  text-[9px]
                  sm:text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-muted-foreground
                  font-semibold
                "
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Flavors of Andhra
              </p>

            </div>

          </div>

          {/* DESKTOP BRAND */}
          <div className="hidden md:flex flex-col items-center md:w-1/3">

            <h1
              className="
                text-3xl
                lg:text-4xl
                font-extrabold
                text-[#8B4513]
                leading-none
              "
              style={{
                fontFamily: "'Times New Roman', serif",
                letterSpacing: "1px",
              }}
            >
              RamPickelMart
            </h1>

            <p
              className="
                text-xs
                uppercase
                tracking-[0.24em]
                text-muted-foreground
                font-semibold
                mt-1
              "
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Flavors of Andhra
            </p>

          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center justify-end gap-6 md:w-1/3">

            {/* NAV LINKS */}
            <nav className="flex items-center gap-6">

              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `
                      text-sm
                      font-bold
                      transition-colors
                      duration-300
                      hover:text-[#b14d1c]
                      ${
                        isActive
                          ? "text-[#b14d1c]"
                          : "text-foreground/80"
                      }
                    `
                  }
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {link.label}
                </NavLink>
              ))}

            </nav>

            {/* CART */}
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

            {/* LOGIN / LOGOUT */}
            {user ? (
              <Button
                type="button"
                variant="ghost"
                className="rounded-full px-4 text-sm font-bold text-ink hover:bg-muted"
                onClick={() => signOut().then(() => navigate("/"))}
              >
                Sign out
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                className="rounded-full px-4 text-sm font-bold text-ink hover:bg-muted"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}

          </div>

          {/* MOBILE RIGHT SIDE */}
          <div className="flex md:hidden items-center gap-2">

            {/* CART */}
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

            {/* MENU BUTTON */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-full text-ink hover:bg-muted"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

          </div>

        </div>

      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t border-border bg-paper md:hidden">

          <nav className="container flex flex-col gap-2 py-4 w-full">

            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  font-bold
                  text-foreground
                  hover:bg-muted
                  transition-colors
                "
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
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
                className="
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  font-bold
                  text-left
                  text-foreground
                  hover:bg-muted
                  transition-colors
                "
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  font-bold
                  text-foreground
                  hover:bg-muted
                  transition-colors
                "
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