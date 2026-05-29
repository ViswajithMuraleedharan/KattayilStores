import { useState, useEffect } from "react";
import { MdSearch, MdVisibility, MdClose } from "react-icons/md";
import AdminLayout from "../../components/AdminLayout";
import { AnimatePresence, motion } from "framer-motion";
import api from "../../api/api";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [allRepairs, setAllRepairs] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    Promise.all([api.get("/api/repairs"), api.get("/api/orders")]).then(([rRes, oRes]) => {
      const repairs = rRes.data;
      const orders = oRes.data;
      setAllRepairs(repairs);
      setAllOrders(orders);

      // Build unique customer map keyed by phone
      const map = {};
      repairs.forEach((r) => {
        if (!map[r.phone]) map[r.phone] = { phone: r.phone, name: r.customerName, repairs: 0, orders: 0 };
        map[r.phone].repairs += 1;
      });
      orders.forEach((o) => {
        if (!map[o.phone]) map[o.phone] = { phone: o.phone, name: o.customerName, repairs: 0, orders: 0 };
        map[o.phone].orders += 1;
      });
      setCustomers(Object.values(map));
    }).catch(() => {});
  }, []);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const customerRepairs = selected ? allRepairs.filter((r) => r.phone === selected.phone) : [];
  const customerOrders = selected ? allOrders.filter((o) => o.phone === selected.phone) : [];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Customers</h2>
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                <tr>{["Customer", "Phone", "Repairs", "Orders", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filtered.map((c) => (
                  <tr key={c.phone} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{c.phone}</td>
                    <td className="px-4 py-3"><span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold px-2 py-1 rounded-full">{c.repairs}</span></td>
                    <td className="px-4 py-3"><span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold px-2 py-1 rounded-full">{c.orders}</span></td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(c)} className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 transition-colors">
                        <MdVisibility size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900 dark:text-white">Customer Profile</h3>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><MdClose size={22} /></button>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {selected.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-lg">{selected.name}</div>
                  <div className="text-slate-400 text-sm">{selected.phone}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[["Repairs", selected.repairs, "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"], ["Orders", selected.orders, "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"]].map(([l, v, cls]) => (
                  <div key={l} className={`rounded-xl p-3 text-center ${cls}`}>
                    <div className="font-bold text-lg">{v}</div>
                    <div className="text-xs">{l}</div>
                  </div>
                ))}
              </div>
              {customerRepairs.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Repair History</div>
                  <div className="flex flex-col gap-2">
                    {customerRepairs.map((r) => (
                      <div key={r.id} className="flex justify-between items-center bg-slate-50 dark:bg-slate-700 rounded-xl px-3 py-2 text-sm">
                        <span className="text-slate-700 dark:text-slate-300">{r.ticketId} · {r.deviceBrand} {r.deviceModel}</span>
                        <span className="text-xs text-slate-400">{r.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {customerOrders.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Order History</div>
                  <div className="flex flex-col gap-2">
                    {customerOrders.map((o) => (
                      <div key={o.id} className="flex justify-between items-center bg-slate-50 dark:bg-slate-700 rounded-xl px-3 py-2 text-sm">
                        <span className="text-slate-700 dark:text-slate-300">{o.orderId} · ₹{o.total}</span>
                        <span className="text-xs text-slate-400">{o.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
