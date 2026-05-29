import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdCheckCircle, MdAddPhotoAlternate, MdClose } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import PublicLayout from "../components/PublicLayout";

const API = "http://localhost:8080";
const WHATSAPP = "919074037326"; // change to your number

const categories = ["Screen Damage", "Battery Problem", "Charging Problem", "Camera Issue", "Speaker Issue", "Water Damage", "Software Issue", "Other"];
const brands = ["Apple", "Samsung", "OnePlus", "Xiaomi / Redmi", "Realme", "Vivo", "Oppo", "Nokia", "Other"];

export default function RepairRequest() {
  const [form, setForm] = useState({ name: "", phone: "", brand: "", model: "", category: "", description: "" });
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [ticket, setTicket] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    setImages((p) => [...p, ...previews].slice(0, 5));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      // Backend expects a JSON part named "data"
      const data = {
        customerName: form.name,
        phone: form.phone.replace(/\D/g, "").slice(-10), // strip non-digits, keep last 10
        deviceBrand: form.brand,
        deviceModel: form.model,
        issueCategory: form.category,
        description: form.description,
      };
      formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
      images.forEach((img) => formData.append("images", img.file));

      const res = await axios.post(`${API}/api/repairs`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const ticketId = res.data.ticketId;
      setTicket(ticketId);
      setSubmitted(true);

      const customerMsg = encodeURIComponent(
        `Hi ${form.name}! 👋\n\nYour repair request has been received at *Kattayil Stores*.\n\n📋 *Ticket ID:* ${ticketId}\n📱 *Device:* ${form.brand} ${form.model}\n🔧 *Issue:* ${form.category}\n\nWe'll update you as soon as we start working on it. You can track your repair at any time using your Ticket ID.\n\nThank you for choosing us! 🙏`
      );
      const adminMsg = encodeURIComponent(
        `🔔 *New Repair Request*\n\n📋 *Ticket:* ${ticketId}\n👤 *Customer:* ${form.name}\n📞 *Phone:* ${form.phone}\n📱 *Device:* ${form.brand} ${form.model}\n🔧 *Issue:* ${form.category}\n📝 *Description:* ${form.description || "—"}`
      );
      window.open(`https://wa.me/91${form.phone.replace(/\D/g, "").slice(-10)}?text=${customerMsg}`, "_blank");
      window.open(`https://wa.me/${WHATSAPP}?text=${adminMsg}`, "_blank");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  return (
    <PublicLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Request a Repair</h1>
            <p className="text-slate-500 dark:text-slate-400">Fill in the details and we'll get back to you shortly</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Full Name *</label>
                  <input className={inputCls} placeholder="John Doe" value={form.name} onChange={(e) => set("name", e.target.value)} required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Phone Number *</label>
                  <input className={inputCls} placeholder="9876543210" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Device Brand *</label>
                  <select className={inputCls} value={form.brand} onChange={(e) => set("brand", e.target.value)} required>
                    <option value="">Select Brand</option>
                    {brands.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Device Model *</label>
                  <input className={inputCls} placeholder="e.g. iPhone 13, Galaxy S22" value={form.model} onChange={(e) => set("model", e.target.value)} required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Issue Category *</label>
                <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)} required>
                  <option value="">Select Issue</option>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Problem Description *</label>
                <textarea className={inputCls} rows={4} placeholder="Describe the issue in detail..." value={form.description} onChange={(e) => set("description", e.target.value)} required />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Device Photos <span className="text-slate-400 font-normal">(optional, up to 5)</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20">
                      <img src={img.url} alt="preview" className="w-20 h-20 object-cover rounded-xl border border-slate-200 dark:border-slate-600" />
                      <button type="button" onClick={() => setImages((p) => p.filter((_, i) => i !== idx))}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
                        <MdClose size={12} />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <button type="button" onClick={() => fileRef.current.click()}
                      className="w-20 h-20 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-500 rounded-xl text-slate-400 hover:text-blue-500 transition text-xs">
                      <MdAddPhotoAlternate size={24} />
                      <span>Add</span>
                    </button>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                  : "Submit Repair Request"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdCheckCircle className="text-green-500" size={36} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Request Submitted!</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Your repair request has been received.</p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Your Ticket ID</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{ticket}</div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Save this ticket ID to track your repair. You can also chat with us on WhatsApp.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi! I just submitted a repair request. My Ticket ID is *${ticket}*. Device: ${form.brand} ${form.model}. Issue: ${form.category}.`)}`}
                  target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors">
                  <FaWhatsapp size={18} /> Send via WhatsApp
                </a>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", brand: "", model: "", category: "", description: "" }); setImages([]); }}
                  className="text-slate-500 dark:text-slate-400 text-sm py-2 hover:text-slate-700 dark:hover:text-white transition-colors">
                  Submit Another Request
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PublicLayout>
  );
}
