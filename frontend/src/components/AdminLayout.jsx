import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard, MdBuild, MdShoppingBag, MdPeople, MdInventory, MdMenu, MdClose, MdPhone, MdLogout } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Dashboard", to: "/admin", icon: MdDashboard },
  { label: "Repairs", to: "/admin/repairs", icon: MdBuild },
  { label: "Orders", to: "/admin/orders", icon: MdShoppingBag },
  { label: "Products", to: "/admin/products", icon: MdInventory },
  { label: "Customers", to: "/admin/customers", icon: MdPeople },
];

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useCart();
  const { logout } = useAuth();

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex h-screen bg-slate-100 dark:bg-slate-950 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${collapsed ? "w-16" : "w-60"} transition-all duration-300 bg-slate-900 flex flex-col shrink-0`}>
          <div className="flex items-center justify-between px-4 h-16 border-b border-slate-700">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MdPhone className="text-white text-sm" />
                </div>
                <span className="font-bold text-white text-sm">Kattayil Stores</span>
              </div>
            )}
            <button onClick={() => setCollapsed(!collapsed)} className="text-slate-400 hover:text-white p-1 rounded ml-auto">
              {collapsed ? <MdMenu size={20} /> : <MdClose size={20} />}
            </button>
          </div>
          <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
            {links.map(({ label, to, icon: Icon }) => (
              <Link key={to} to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === to ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
                <Icon size={20} className="shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            ))}
          </nav>
          <div className="px-2 pb-4 flex flex-col gap-1">
            <Link to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
              <MdPhone size={20} className="shrink-0" />
              {!collapsed && <span>View Site</span>}
            </Link>
            <button onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-900/40 hover:text-red-400 transition-colors w-full text-left">
              <MdLogout size={20} className="shrink-0" />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center px-6 justify-between shrink-0">
            <h1 className="font-semibold text-slate-800 dark:text-white">
              {links.find((l) => l.to === pathname)?.label ?? "Admin Panel"}
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
              <span className="text-sm text-slate-600 dark:text-slate-400 hidden sm:block">Admin</span>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
