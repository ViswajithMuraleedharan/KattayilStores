import { Link } from "react-router-dom";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MdPhone className="text-white text-lg" />
            </div>
            <span className="font-bold text-white text-lg">Kattayil Stores</span>
          </div>
          <p className="text-sm leading-relaxed">Fast, reliable mobile repairs with genuine parts and transparent pricing.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm">
            {[["Home", "/"], ["Repair Request", "/repair"], ["Track Repair", "/track"], ["Shop", "/shop"]].map(([l, t]) => (
              <Link key={t} to={t} className="hover:text-white transition-colors">{l}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Services</h4>
          <div className="flex flex-col gap-2 text-sm">
            {["Screen Repair", "Battery Replacement", "Water Damage", "Software Fix", "Accessories"].map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2"><MdLocationOn className="text-blue-400 shrink-0" /><span>123 Main Street, Kochi, Kerala</span></div>
            <div className="flex items-center gap-2"><MdPhone className="text-blue-400 shrink-0" /><span>+91 98765 43210</span></div>
            <div className="flex items-center gap-2"><FaWhatsapp className="text-green-400 shrink-0" /><span>+91 98765 43210</span></div>
            <div className="flex items-center gap-2"><MdEmail className="text-blue-400 shrink-0" /><span>hello@Kattayil Stores.in</span></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-slate-800 pt-6 text-sm text-center">
        © 2025 Kattayil Stores. All rights reserved.
      </div>
    </footer>
  );
}
