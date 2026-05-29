import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdBuild, MdCheckCircle, MdPending, MdShoppingBag, MdTrendingUp, MdRefresh } from "react-icons/md";
import StatusBadge from "../../components/StatusBadge";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api/api";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const statusLabel = { PENDING: "Pending", CHECKING: "Checking", WAITING_FOR_PARTS: "Waiting for Parts", REPAIRING: "Repairing", COMPLETED: "Completed", DELIVERED: "Delivered", PROCESSING: "Processing", SHIPPED: "Shipped" };

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [repairs, setRepairs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [statsRes, repairsRes, ordersRes] = await Promise.all([
        api.get("/api/admin/dashboard"),
        api.get("/api/repairs"),
        api.get("/api/orders"),
      ]);
      setStats(statsRes.data);
      setRepairs(repairsRes.data.slice(0, 5));
      setOrders(ordersRes.data.slice(0, 5));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const statCards = stats ? [
    { label: "Total Repairs", value: stats.totalRepairs, icon: MdBuild, color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
    { label: "Pending Repairs", value: stats.pendingRepairs, icon: MdPending, color: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
    { label: "Completed", value: stats.completedRepairs, icon: MdCheckCircle, color: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
    { label: "Total Orders", value: stats.totalOrders, icon: MdShoppingBag, color: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
    { label: "Revenue", value: `₹${Number(stats.totalRevenue ?? 0).toLocaleString()}`, icon: MdTrendingUp, color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
    { label: "Unread Messages", value: stats.unreadMessages, icon: MdShoppingBag, color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" },
  ] : [];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Welcome back, Admin 👋</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Here's what's happening today.</p>
          </div>
          <button onClick={fetchAll} className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors">
            <MdRefresh size={18} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 animate-pulse h-24" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {statCards.map((s, i) => (
              <motion.div key={s.label} initial="hidden" animate="show" variants={fade} transition={{ delay: i * 0.07 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                  <s.icon size={22} />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div initial="hidden" animate="show" variants={fade} transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Recent Repairs</h3>
            {repairs.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-4">No repairs yet</p>
            ) : (
              <div className="flex flex-col gap-3">
                {repairs.map((r) => (
                  <div key={r.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">{r.customerName}</div>
                      <div className="text-xs text-slate-400">{r.ticketId} · {r.deviceBrand} {r.deviceModel}</div>
                    </div>
                    <StatusBadge status={statusLabel[r.status] ?? r.status} />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fade} transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Recent Orders</h3>
            {orders.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-4">No orders yet</p>
            ) : (
              <div className="flex flex-col gap-3">
                {orders.map((o) => (
                  <div key={o.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">{o.customerName}</div>
                      <div className="text-xs text-slate-400">{o.orderId} · ₹{o.total}</div>
                    </div>
                    <StatusBadge status={statusLabel[o.status] ?? o.status} />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
