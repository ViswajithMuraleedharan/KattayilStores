import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdSearch, MdEdit, MdVisibility, MdClose, MdSend } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { repairs as initialRepairs } from "../../data/dummy";
import StatusBadge from "../../components/StatusBadge";
import AdminLayout from "../../components/AdminLayout";

const statuses = ["Pending", "Checking", "Waiting for Parts", "Repairing", "Completed", "Delivered"];

export default function AdminRepairs() {
  const [repairs, setRepairs] = useState(initialRepairs);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [editStatus, setEditStatus] = useState("");

  const filtered = repairs.filter((r) =>
    r.id.toLowerCase().includes(search.toLowerCase()) ||
    r.customer.toLowerCase().includes(search.toLowerCase()) ||
    r.phone.includes(search)
  );

  const updateStatus = () => {
    setRepairs((prev) => prev.map((r) => r.id === selected.id ? { ...r, status: editStatus } : r));
    setSelected(null);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Repair Tickets</h2>
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              placeholder="Search tickets..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                <tr>{["Ticket ID", "Customer", "Phone", "Device", "Issue", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filtered.map((r) => (
                  <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">{r.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">{r.customer}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{r.phone}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">{r.device}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.issue}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{r.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => { setSelected(r); setEditStatus(r.status); }}
                          className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 transition-colors">
                          <MdEdit size={16} />
                        </button>
                        <a href={`https://wa.me/91${r.phone}`} target="_blank" rel="noreferrer"
                          className="p-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 hover:bg-green-100 transition-colors">
                          <FaWhatsapp size={16} />
                        </a>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900 dark:text-white">Repair Details — {selected.id}</h3>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><MdClose size={22} /></button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                {[["Customer", selected.customer], ["Phone", selected.phone], ["Device", selected.device], ["Issue", selected.issue], ["Date", selected.date], ["ETA", selected.eta]].map(([k, v]) => (
                  <div key={k}><div className="text-xs text-slate-400">{k}</div><div className="font-medium text-slate-900 dark:text-white">{v}</div></div>
                ))}
              </div>
              {selected.notes && (
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-3 text-sm text-slate-600 dark:text-slate-300 mb-5">{selected.notes}</div>
              )}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Update Status</label>
                <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {statuses.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex gap-3">
                <button onClick={updateStatus} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors">
                  Update Status
                </button>
                <a href={`https://wa.me/91${selected.phone}?text=Hi ${selected.customer}, your repair ${selected.id} status is now: ${editStatus}`}
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors">
                  <MdSend size={16} /> WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
