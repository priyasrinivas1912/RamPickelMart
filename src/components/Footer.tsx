import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, MessageSquare } from "lucide-react";
import logo from "@/assets/ram-pic.jpeg";

const Footer = () => (
  <footer className="bg-gradient-to-b from-[#3b170d] to-[#1a0b06] border-t border-border/20 text-white">
    <div className="container py-10">
      <div className="grid gap-6 md:grid-cols-3 md:items-start">
        <div className="flex flex-col gap-3 md:flex-row md:items-start">
          <img src={logo} alt="Ram Pickel Mart logo" className="h-12 w-12 rounded-full object-cover" />
          <div className="">
            <p className="font-display text-base text-white">Ram Pickel Mart</p>
            <p className="text-sm leading-5 text-white/80 max-w-sm">Handcrafted pickles, podis and cold-pressed oils made by village grandmothers across Andhra Pradesh. No factories. No preservatives.</p>

            <div className="mt-3 flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-foreground/80 hover:bg-primary/5 transition">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-foreground/80 hover:bg-primary/5 transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-foreground/80 hover:bg-primary/5 transition">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Contact" className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-foreground/80 hover:bg-primary/5 transition">
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium text-white mb-2">Shop</h3>
          <ul className="space-y-1 text-sm text-white/80">
            <li>
              <Link to="/shop/pickles" className="hover:text-primary transition-colors">Pickles</Link>
            </li>
            <li>
              <Link to="/shop/honey" className="hover:text-primary transition-colors">Honey</Link>
            </li>
            <li>
              <Link to="/shop/ghee" className="hover:text-primary transition-colors">Ghee</Link>
            </li>
            <li>
              <Link to="/shop/sweets" className="hover:text-primary transition-colors">Sweets</Link>
            </li>
            <li>
              <Link to="/shop/snacks" className="hover:text-primary transition-colors">Snacks</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-medium text-white mb-2">Company</h3>
          <ul className="space-y-1 text-sm text-white/80">
            <li>
              <Link to="/story" className="hover:text-primary transition-colors">Our Story</Link>
            </li>
            <li>
              <Link to="/sourcing" className="hover:text-primary transition-colors">Sourcing</Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-border/60">
      <div className="container py-4 text-xs text-white/70 flex flex-col gap-2 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Ram Pickel Mart. Made with love in Andhra.</p>
        <p>Privacy · Terms</p>
      </div>
    </div>
  </footer>
);

export default Footer;
