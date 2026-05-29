import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdCheckCircle, MdLocalShipping, MdStorefront, MdCreditCard, MdMoney } from "react-icons/md";
import { useCart } from "../context/CartContext";
import PublicLayout from "../components/PublicLayout";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [delivery, setDelivery] = useState("pickup");
  const [payment, setPayment] = useState("cod");
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const tax = Math.round(total * 0.18);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/orders", {
        customerName: form.name,
        phone: form.phone.replace(/\D/g, "").slice(-10),
        address: form.address,
        deliveryType: delivery.toUpperCase(),
        paymentMethod: payment.toUpperCase(),
        items: cart.map((i) => ({ productId: i.id, quantity: i.qty })),
      });
      setPlaced(true);
      clearCart();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Checkout</h1>
        <form onSubmit={handleOrder} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Customer Info */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-4">Customer Information</h2>
              <div className="flex flex-col gap-4">
                <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Full Name *</label>
                  <input className={inputCls} placeholder="John Doe" value={form.name} onChange={(e) => set("name", e.target.value)} required /></div>
                <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Mobile Number *</label>
                  <input className={inputCls} placeholder="+91 98765 43210" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} required /></div>
                <div><label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Address</label>
                  <textarea className={inputCls} rows={3} placeholder="Delivery address..." value={form.address} onChange={(e) => set("address", e.target.value)} /></div>
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-4">Delivery Option</h2>
              <div className="grid grid-cols-2 gap-3">
                {[{ v: "pickup", icon: MdStorefront, label: "Store Pickup", sub: "Ready in 2 hours" }, { v: "delivery", icon: MdLocalShipping, label: "Local Delivery", sub: "1-2 business days" }].map(({ v, icon: Icon, label, sub }) => (
                  <button key={v} type="button" onClick={() => setDelivery(v)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors text-left ${delivery === v ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-700"}`}>
                    <Icon size={24} className={delivery === v ? "text-blue-600" : "text-slate-400"} />
                    <div><div className={`font-semibold text-sm ${delivery === v ? "text-blue-600" : "text-slate-700 dark:text-slate-300"}`}>{label}</div>
                      <div className="text-xs text-slate-400">{sub}</div></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-4">Payment Method</h2>
              <div className="grid grid-cols-2 gap-3">
                {[{ v: "cod", icon: MdMoney, label: "Cash on Delivery", sub: "Pay when received" }, { v: "online", icon: MdCreditCard, label: "Online Payment", sub: "UPI / Card / Net Banking" }].map(({ v, icon: Icon, label, sub }) => (
                  <button key={v} type="button" onClick={() => setPayment(v)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors text-left ${payment === v ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-700"}`}>
                    <Icon size={24} className={payment === v ? "text-blue-600" : "text-slate-400"} />
                    <div><div className={`font-semibold text-sm ${payment === v ? "text-blue-600" : "text-slate-700 dark:text-slate-300"}`}>{label}</div>
                      <div className="text-xs text-slate-400">{sub}</div></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 h-fit">
            <h2 className="font-bold text-slate-900 dark:text-white mb-4">Order Summary</h2>
            <div className="flex flex-col gap-3 mb-5">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 truncate mr-2">{item.name} × {item.qty}</span>
                  <span className="font-medium text-slate-900 dark:text-white shrink-0">₹{item.price * item.qty}</span>
                </div>
              ))}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-slate-500 dark:text-slate-400"><span>Subtotal</span><span>₹{total}</span></div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400"><span>Tax (18%)</span><span>₹{tax}</span></div>
                <div className="flex justify-between font-bold text-slate-900 dark:text-white text-base mt-1"><span>Total</span><span>₹{total + tax}</span></div>
              </div>
            </div>
            <button type="submit" disabled={loading || cart.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing...</> : "Place Order"}
            </button>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {placed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdCheckCircle className="text-green-500" size={36} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Order Placed!</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Your order has been confirmed. You'll receive a WhatsApp update shortly.</p>
              <Link to="/shop" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
                Continue Shopping
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PublicLayout>
  );
}
