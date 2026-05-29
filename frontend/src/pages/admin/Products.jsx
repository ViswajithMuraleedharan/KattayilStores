import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdAdd, MdEdit, MdDelete, MdClose, MdSearch } from "react-icons/md";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api/api";

const empty = { name: "", category: "Chargers", price: "", stock: "", description: "", imageUrl: "" };
const categories = ["Chargers", "Covers", "Screen Guards", "Headphones", "Accessories"];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const fetchProducts = () =>
    api.get("/api/products/admin/all").then((r) => setProducts(r.data)).catch(() => {});

  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => { setForm(empty); setModal("add"); };
  const openEdit = (p) => {
    setForm({ name: p.name, category: p.category, price: p.price, stock: p.stock, description: p.description ?? "", imageUrl: p.imageUrl ?? "" });
    setEditId(p.id);
    setModal("edit");
  };

  const save = async () => {
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
    if (modal === "add") {
      await api.post("/api/products", payload);
    } else {
      await api.put(`/api/products/${editId}`, payload);
    }
    setModal(null);
    fetchProducts();
  };

  const confirmDelete = async () => {
    await api.delete(`/api/products/${deleteId}`);
    setDeleteId(null);
    fetchProducts();
  };

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Products</h2>
          <div className="flex gap-3">
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-52"
                placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
              <MdAdd size={18} /> Add Product
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                <tr>{["Product", "Category", "Price", "Stock", "Rating", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                        <span className="font-medium text-slate-900 dark:text-white">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{p.category}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">₹{p.price}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.stock > 10 ? "bg-green-100 text-green-700" : p.stock > 0 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">⭐ {p.rating ?? "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 transition-colors"><MdEdit size={16} /></button>
                        <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 transition-colors"><MdDelete size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900 dark:text-white">{modal === "add" ? "Add Product" : "Edit Product"}</h3>
                <button onClick={() => setModal(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><MdClose size={22} /></button>
              </div>
              <div className="flex flex-col gap-4">
                <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Product Name</label>
                  <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Category</label>
                    <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)}>
                      {categories.map((c) => <option key={c}>{c}</option>)}
                    </select></div>
                  <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Price (₹)</label>
                    <input className={inputCls} type="number" value={form.price} onChange={(e) => set("price", e.target.value)} /></div>
                </div>
                <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Stock</label>
                  <input className={inputCls} type="number" value={form.stock} onChange={(e) => set("stock", e.target.value)} /></div>
                <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Image URL</label>
                  <input className={inputCls} value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} /></div>
                <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Description</label>
                  <textarea className={inputCls} rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} /></div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setModal(null)} className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                <button onClick={save} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors">Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center">
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdDelete className="text-red-500" size={28} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Delete Product?</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
