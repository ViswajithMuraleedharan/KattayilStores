import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdPhone, MdLock, MdPerson, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username: form.username,
        password: form.password,
      });
      // Store JWT for subsequent API calls
      sessionStorage.setItem("mc_token", res.data.token);
      // Mark session as authenticated in AuthContext
      login(form.username, form.password);
      navigate("/admin");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.25),_transparent_60%)]" />
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4 }}
        className="relative w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/40 mb-4">
            <MdPhone size={30} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">MobileCare</h1>
          <p className="text-slate-400 text-sm mt-1">Admin Panel</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Sign In</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Enter your credentials to continue</p>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Username</label>
              <div className="relative">
                <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input className={inputCls} placeholder="admin" autoComplete="username"
                  value={form.username} onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))} required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input className={`${inputCls} pr-10`} type={showPass ? "text" : "password"} placeholder="••••••••"
                  autoComplete="current-password" value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required />
                <button type="button" onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  {showPass ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-1">
              {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</> : "Sign In"}
            </button>
          </form>
        </div>
        <p className="text-center text-slate-500 text-xs mt-6">© 2025 MobileCare. Restricted access.</p>
      </motion.div>
    </div>
  );
}
