import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import logo from "../assets/ram-pic.jpeg";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SAME LAYOUT FOR ALL DEVICES */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-10
            mb-12
          "
        >

          {/* Brand */}
          <div>

            <div className="flex items-center gap-3 mb-5">

              <img
                src={logo}
                alt="RamPickelMart"
                className="w-12 h-12 rounded-full object-cover"
              />

              <span
                className="
                  text-2xl
                  font-bold
                  text-white
                "
                style={{
                  fontFamily: "'Pacifico', cursive",
                }}
              >
                RamPickelMart
              </span>

            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-[250px]">
              “A Taste That Feels Like Home.”
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h4 className="font-semibold text-white mb-5 text-lg">
              Quick Links
            </h4>

            <div className="space-y-3 text-sm text-gray-400">

              <a
                href="#story"
                className="block hover:text-amber-300 transition-colors duration-200"
              >
                About Us
              </a>

              <a
                href="#sourcing"
                className="block hover:text-amber-300 transition-colors duration-200"
              >
                Sourcing
              </a>

              <a
                href="#shipping"
                className="block hover:text-amber-300 transition-colors duration-200"
              >
                Shipping
              </a>

              <a
                href="#returns"
                className="block hover:text-amber-300 transition-colors duration-200"
              >
                Returns
              </a>

            </div>

          </div>

          {/* Shop */}
          <div>

            <h4 className="font-semibold text-white mb-5 text-lg">
              Shop
            </h4>

            <div className="space-y-3 text-sm text-gray-400">

              <p>Pickles</p>
              <p>Honey</p>
              <p>Ghee</p>
              <p>Sweets & Snacks</p>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h4 className="font-semibold text-white mb-5 text-lg">
              Contact Us
            </h4>

            <div className="space-y-4 text-sm text-gray-400">

              <p className="flex items-center gap-3">

                <Mail className="w-4 h-4 text-amber-300 flex-shrink-0" />

                support@rampickelmart.com

              </p>

              <p className="flex items-center gap-3">

                <Phone className="w-4 h-4 text-amber-300 flex-shrink-0" />

                +91 9876543210

              </p>

              <p className="flex items-center gap-3">

                <MapPin className="w-4 h-4 text-amber-300 flex-shrink-0" />

                Andhra Pradesh, India

              </p>

            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="
            border-t
            border-gray-800
            pt-6
            text-center
            text-xs
            sm:text-sm
            text-gray-500
          "
        >
          © 2026, RamPickelMart All Rights Reserved | Developed By Mayishatech
        </div>

      </div>

    </footer>
  );
}