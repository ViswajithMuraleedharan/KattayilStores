import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "../data/dummy";
import ProductCard from "../components/ProductCard";
import PublicLayout from "../components/PublicLayout";

const categories = ["All", "Chargers", "Covers", "Screen Guards", "Headphones", "Accessories"];

export default function Shop() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    (active === "All" || p.category === active) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Shop Accessories</h1>
            <p className="text-slate-500 dark:text-slate-400">Premium accessories for your device</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button key={c} onClick={() => setActive(c)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${active === c ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-blue-300"}`}>
                  {c}
                </button>
              ))}
            </div>
            <input
              className="sm:ml-auto px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              placeholder="Search products..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <div className="text-5xl mb-4">🔍</div>
              <div className="font-medium">No products found</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </PublicLayout>
  );
}
