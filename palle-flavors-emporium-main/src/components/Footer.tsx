import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";
import logo from "@/assets/ram-pic.jpeg";

const Footer = () => (
  <footer className="bg-ink text-paper mt-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
    <div className="container relative py-20 grid gap-12 md:grid-cols-4">
      <div className="md:col-span-2 max-w-sm">
        <div className="flex items-center gap-3 mb-5">
          <img src={logo} alt="Ram Pickel Mart logo" className="w-12 h-12 object-contain rounded-full bg-paper" />
          <div>
            <div className="font-display text-xl">Ram Pickel Mart</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-paper/60">Flavors of Andhra</div>
          </div>
        </div>
        <p className="text-paper/70 leading-relaxed text-sm">
          Handcrafted pickles, Honey, Ghee, oils, Sweets and snacks made by villagers across Andhra Pradesh. No factories. No preservatives. Just heritage.
        </p>
        <div className="flex gap-3 mt-6">
          {[Instagram, Facebook, Youtube, MessageCircle].map((Icon, i) => (
            <a key={i} href="#" aria-label="social"
              className="w-10 h-10 rounded-full border border-paper/20 grid place-items-center hover:bg-primary hover:border-primary transition-all">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display text-lg mb-4 text-paper">Shop</h4>
        <ul className="space-y-2.5 text-sm text-paper/70">
          <li><Link to="/shop?cat=Pickles" className="hover:text-primary-glow transition-colors">Pickles</Link></li>
          <li><Link to="/shop?cat=Honey" className="hover:text-primary-glow transition-colors">Honey</Link></li>
          <li><Link to="/shop?cat=Ghee" className="hover:text-primary-glow transition-colors">Ghee</Link></li>
          <li><Link to="/shop?cat=Organic+Oils" className="hover:text-primary-glow transition-colors">Organic Oils</Link></li>
          <li><Link to="/shop?cat=Sweets" className="hover:text-primary-glow transition-colors">Sweets</Link></li>
          <li><Link to="/shop?cat=Snacks" className="hover:text-primary-glow transition-colors">Snacks</Link></li>
          <li><Link to="/shop?cat=Healthy+Essentials" className="hover:text-primary-glow transition-colors">Healthy Essentials</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display text-lg mb-4 text-paper">Company</h4>
        <ul className="space-y-2.5 text-sm text-paper/70">
          <li><Link to="/story" className="hover:text-primary-glow transition-colors">Our Story</Link></li>
          <li><a href="#" className="hover:text-primary-glow transition-colors">Sourcing</a></li>
          <li><a href="#" className="hover:text-primary-glow transition-colors">Shipping & Returns</a></li>
          <li><a href="#" className="hover:text-primary-glow transition-colors">Contact</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-paper/10">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-paper/50">
        <p>© {new Date().getFullYear()} Ram Pickel Mart. Made with love in Andhra.</p>
        <p>Privacy · Terms · Refund Policy</p>
      </div>
    </div>
  </footer>
);

export default Footer;
