import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdVisibility, MdClose, MdSearch, MdRefresh } from "react-icons/md";
import StatusBadge from "../../components/StatusBadge";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api/api";

const STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];
const statusLabel = { PENDING: "Pending", PROCESSING: "Processing", SHIPPED: "Shipped", DELIVERED: "Delivered" };

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [search, setSearch] = useState("");

  const fetchOrders = () => {
    setLoading(true);
    api.get("/api/orders").then((r) => setOrders(r.data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const filtered = orders.filter((o) =>
    (o.orderId ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (o.customerName ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = async () => {
    await api.put(`/api/orders/${selected.id}/status`, { status: editStatus });
    setOrders((prev) => prev.map((o) => o.id === selected.id ? { ...o, status: editStatus } : o));
    setSelected(null);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Orders</h2>
          <div className="flex gap-3">
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button onClick={fetchOrders} className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 transition-colors">
              <MdRefresh size={18} />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-400 text-sm">Loading orders...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                  <tr>{["Order ID", "Customer", "Phone", "Items", "Total", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filtered.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">{o.orderId}</td>
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{o.customerName}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{o.phone}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{o.items?.length ?? 0} item(s)</td>
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">₹{o.total}</td>
                      <td className="px-4 py-3"><StatusBadge status={statusLabel[o.status] ?? o.status} /></td>
                      <td className="px-4 py-3 text-slate-400">{o.createdAt?.slice(0, 10)}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => { setSelected(o); setEditStatus(o.status); }}
                          className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 transition-colors">
                          <MdVisibility size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900 dark:text-white">Order — {selected.orderId}</h3>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><MdClose size={22} /></button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                {[["Customer", selected.customerName], ["Phone", selected.phone], ["Date", selected.createdAt?.slice(0, 10)], ["Total", `₹${selected.total}`]].map(([k, v]) => (
                  <div key={k}><div className="text-xs text-slate-400">{k}</div><div className="font-medium text-slate-900 dark:text-white">{v}</div></div>
                ))}
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-3 mb-4">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Items</div>
                {selected.items?.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-slate-700 dark:text-slate-300">
                    <span>{item.productName} × {item.quantity}</span><span>₹{item.lineTotal}</span>
                  </div>
                ))}
              </div>
              <div className="mb-5">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Update Status</label>
                <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {STATUSES.map((s) => <option key={s} value={s}>{statusLabel[s]}</option>)}
                </select>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setSelected(null)} className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                <button onClick={updateStatus} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors">Update</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
