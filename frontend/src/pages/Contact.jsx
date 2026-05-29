import { useState } from "react";
import { motion } from "framer-motion";
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime, MdSend } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import PublicLayout from "../components/PublicLayout";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", phone: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Get In Touch</h1>
            <p className="text-slate-500 dark:text-slate-400">We're here to help. Reach out via any channel below.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Form */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8">
              <h2 className="font-bold text-slate-900 dark:text-white mb-5">Send a Message</h2>
              {sent && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 mb-4 text-green-700 dark:text-green-400 text-sm text-center">
                  ✓ Message sent! We'll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Name *</label>
                    <input className={inputCls} placeholder="John Doe" value={form.name} onChange={(e) => set("name", e.target.value)} required /></div>
                  <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Phone *</label>
                    <input className={inputCls} placeholder="+91 98765 43210" value={form.phone} onChange={(e) => set("phone", e.target.value)} required /></div>
                </div>
                <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Email</label>
                  <input className={inputCls} type="email" placeholder="you@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} /></div>
                <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Message *</label>
                  <textarea className={inputCls} rows={5} placeholder="How can we help you?" value={form.message} onChange={(e) => set("message", e.target.value)} required /></div>
                <button type="submit" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
                  <MdSend size={18} /> Send Message
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <h2 className="font-bold text-slate-900 dark:text-white mb-5">Shop Information</h2>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: MdLocationOn, label: "Address", value: "123 Main Street, MG Road, Kochi, Kerala 682001", color: "text-blue-500" },
                    { icon: MdPhone, label: "Phone", value: "+91 98765 43210", color: "text-blue-500" },
                    { icon: MdEmail, label: "Email", value: "hello@Kattayil Stores.in", color: "text-blue-500" },
                    { icon: MdAccessTime, label: "Business Hours", value: "Mon–Sat: 9:00 AM – 8:00 PM\nSunday: 10:00 AM – 6:00 PM", color: "text-blue-500" },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="flex gap-3">
                      <div className={`w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-medium">{label}</div>
                        <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <a href="https://wa.me/919074037326" target="_blank" rel="noreferrer"
                className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl p-5 transition-colors">
                <FaWhatsapp size={36} />
                <div>
                  <div className="font-bold text-lg">Chat on WhatsApp</div>
                  <div className="text-green-100 text-sm">Instant support — usually replies in minutes</div>
                </div>
              </a>

              {/* Map placeholder */}
              <div className="bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden h-48 flex items-center justify-center">
                <div className="text-center text-slate-500 dark:text-slate-400">
                  <MdLocationOn size={32} className="mx-auto mb-2" />
                  <div className="text-sm">123 Main Street, Kochi</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
