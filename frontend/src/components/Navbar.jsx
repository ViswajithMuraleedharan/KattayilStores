import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdMenu, MdClose, MdShoppingCart, MdPhone, MdDarkMode, MdLightMode } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Repair", to: "/repair" },
  { label: "Track", to: "/track" },
  { label: "Shop", to: "/shop" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count, darkMode, setDarkMode } = useCart();
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <MdPhone className="text-white text-lg" />
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white">Kattayil Stores</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === l.to ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
          </button>
          <Link to="/cart" className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <MdShoppingCart size={22} />
            {count > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">{count}</span>}
          </Link>
          <Link to="/repair" className="hidden md:inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Book Repair
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            {open ? <MdClose size={22} /> : <MdMenu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 py-3 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium ${pathname === l.to ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"}`}>
                {l.label}
              </Link>
            ))}
            <Link to="/repair" onClick={() => setOpen(false)} className="mt-2 bg-blue-600 text-white text-sm font-semibold px-4 py-3 rounded-lg text-center">
              Book Repair
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
