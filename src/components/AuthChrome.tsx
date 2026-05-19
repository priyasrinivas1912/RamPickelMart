import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";

export const AuthHeader = () => (
  <header className="bg-[#141414] text-white">
    <div className="flex h-[68px] items-center justify-between px-5">
      <Link to="/" className="text-xl font-black tracking-tight">
        RAM <span className="text-[#d97706]">PICKEL</span>
      </Link>

      <nav className="hidden items-center gap-12 text-lg font-bold md:flex">
        <Link to="/" className="hover:text-[#d97706]">
          Home
        </Link>
        <Link to="/shop" className="hover:text-[#d97706]">
          Products
        </Link>
        <a href="/#story" className="hover:text-[#d97706]">
          About Us
        </a>
      </nav>

      <div className="flex items-center gap-8 text-lg font-bold">
        <Link to="/signup" className="hover:text-[#d97706]">
          Sign Up
        </Link>
        <Link to="/login" className="hover:text-[#d97706]">
          Login
        </Link>
      </div>
    </div>
  </header>
);

export const AuthFooter = () => (
  <footer className="bg-[#111] text-white">
    <div className="mx-auto grid max-w-7xl gap-10 px-8 py-14 md:grid-cols-4">
      <div>
        <div className="mb-1 text-xl font-black">
          RAM <span className="text-[#d97706]">PICKEL</span>
        </div>
        <p className="mb-6 text-sm">Authentic Andhra Flavors</p>
        <p className="max-w-xs text-sm leading-6 text-white/75">
          Curated pickles, sweets, oils and village-made essentials crafted with care.
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-bold">Company</h3>
        <div className="space-y-3 text-sm text-white/80">
          <Link to="/#story" className="block hover:text-[#d97706]">
            About Us
          </Link>
          <a href="#" className="block hover:text-[#d97706]">
            Contact
          </a>
          <a href="#" className="block hover:text-[#d97706]">
            Shipping & Delivery
          </a>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-bold">Policies</h3>
        <div className="space-y-3 text-sm text-white/80">
          <a href="#" className="block hover:text-[#d97706]">
            Privacy Policy
          </a>
          <a href="#" className="block hover:text-[#d97706]">
            Terms & Conditions
          </a>
          <a href="#" className="block hover:text-[#d97706]">
            Return / Cancellation
          </a>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
        <div className="mb-6 flex gap-3">
          {[Facebook, Instagram, Youtube].map((Icon) => (
            <a key={Icon.displayName} href="#" className="grid h-12 w-12 place-items-center rounded-md bg-white/10 hover:bg-[#d97706]">
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
        <p className="text-sm text-white/75">
          Developed by <span className="font-bold text-white">Ram Pickel Mart</span>
        </p>
      </div>
    </div>
  </footer>
);
