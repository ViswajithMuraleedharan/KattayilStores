import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdSearch, MdEdit, MdClose, MdSend, MdRefresh } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import StatusBadge from "../../components/StatusBadge";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api/api";

const STATUSES = ["PENDING", "CHECKING", "WAITING_FOR_PARTS", "REPAIRING", "COMPLETED", "DELIVERED"];
const statusLabel = { PENDING: "Pending", CHECKING: "Checking", WAITING_FOR_PARTS: "Waiting for Parts", REPAIRING: "Repairing", COMPLETED: "Completed", DELIVERED: "Delivered" };
const statusMsg = { PENDING: "Pending review", CHECKING: "Under inspection", WAITING_FOR_PARTS: "Waiting for parts", REPAIRING: "Repair in progress", COMPLETED: "Repair completed", DELIVERED: "Device delivered" };

export default function AdminRepairs() {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchRepairs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/repairs");
      setRepairs(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchRepairs(); }, []);

  const filtered = repairs.filter((r) =>
    (r.ticketId ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (r.customerName ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (r.phone ?? "").includes(search)
  );

  const updateStatus = async () => {
    setSaving(true);
    try {
      await api.put(`/api/repairs/${selected.id}`, { status: editStatus });
      setRepairs((prev) => prev.map((r) => r.id === selected.id ? { ...r, status: editStatus } : r));
      setSelected(null);
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Repair Tickets</h2>
          <div className="flex gap-3">
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                placeholder="Search tickets..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button onClick={fetchRepairs} className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 transition-colors">
              <MdRefresh size={18} />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-400 text-sm">Loading repairs...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              {search ? "No repairs match your search." : "No repair tickets yet."}
            </div>
          ) : (
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
                      <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">{r.ticketId}</td>
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">{r.customerName}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{r.phone}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">{r.deviceBrand} {r.deviceModel}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.issueCategory}</td>
                      <td className="px-4 py-3"><StatusBadge status={statusLabel[r.status] ?? r.status} /></td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{r.createdAt?.slice(0, 10)}</td>
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
                <h3 className="font-bold text-slate-900 dark:text-white">Repair — {selected.ticketId}</h3>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><MdClose size={22} /></button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                {[["Customer", selected.customerName], ["Phone", selected.phone], ["Device", `${selected.deviceBrand} ${selected.deviceModel}`], ["Issue", selected.issueCategory], ["Submitted", selected.createdAt?.slice(0, 10)], ["ETA", selected.estimatedCompletion ?? "TBD"]].map(([k, v]) => (
                  <div key={k}><div className="text-xs text-slate-400">{k}</div><div className="font-medium text-slate-900 dark:text-white">{v}</div></div>
                ))}
              </div>
              {selected.description && (
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-3 text-sm text-slate-600 dark:text-slate-300 mb-3">{selected.description}</div>
              )}
              {selected.technicianNotes && (
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-sm text-amber-700 dark:text-amber-300 mb-5">{selected.technicianNotes}</div>
              )}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Update Status</label>
                <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {STATUSES.map((s) => <option key={s} value={s}>{statusLabel[s]}</option>)}
                </select>
              </div>
              <div className="flex gap-3">
                <button onClick={updateStatus} disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors">
                  {saving ? "Saving..." : "Update Status"}
                </button>
                <a href={`https://wa.me/91${selected.phone}?text=${encodeURIComponent(`Hi ${selected.customerName}, your repair ticket *${selected.ticketId}* status is now: *${statusMsg[editStatus] ?? editStatus}*`)}`}
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
