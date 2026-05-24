import { motion } from "framer-motion";
import { MdBuild, MdCheckCircle, MdPending, MdShoppingBag, MdTrendingUp, MdPeople } from "react-icons/md";
import { repairs, orders, customers } from "../../data/dummy";
import StatusBadge from "../../components/StatusBadge";
import AdminLayout from "../../components/AdminLayout";

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AdminDashboard() {
  const pending = repairs.filter((r) => r.status === "Pending" || r.status === "Checking").length;
  const completed = repairs.filter((r) => r.status === "Completed" || r.status === "Delivered").length;
  const revenue = orders.reduce((s, o) => s + o.total, 0);

  const stats = [
    { label: "Total Repairs", value: repairs.length, icon: MdBuild, color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
    { label: "Pending Repairs", value: pending, icon: MdPending, color: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
    { label: "Completed", value: completed, icon: MdCheckCircle, color: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
    { label: "Total Orders", value: orders.length, icon: MdShoppingBag, color: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
    { label: "Revenue", value: `₹${revenue.toLocaleString()}`, icon: MdTrendingUp, color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
    { label: "Customers", value: customers.length, icon: MdPeople, color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Welcome back, Admin 👋</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Here's what's happening today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((s, i) => (
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Repairs */}
          <motion.div initial="hidden" animate="show" variants={fade} transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Recent Repairs</h3>
            <div className="flex flex-col gap-3">
              {repairs.slice(0, 5).map((r) => (
                <div key={r.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{r.customer}</div>
                    <div className="text-xs text-slate-400">{r.id} · {r.device}</div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div initial="hidden" animate="show" variants={fade} transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Recent Orders</h3>
            <div className="flex flex-col gap-3">
              {orders.map((o) => (
                <div key={o.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{o.customer}</div>
                    <div className="text-xs text-slate-400">{o.id} · ₹{o.total}</div>
                  </div>
                  <StatusBadge status={o.status} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
