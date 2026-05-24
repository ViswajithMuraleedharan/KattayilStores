import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdDelete, MdAdd, MdRemove, MdShoppingBag } from "react-icons/md";
import { useCart } from "../context/CartContext";
import PublicLayout from "../components/PublicLayout";

export default function Cart() {
  const { cart, removeFromCart, updateQty, total } = useCart();
  const tax = Math.round(total * 0.18);

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <MdShoppingBag size={64} className="text-slate-200 dark:text-slate-700 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Your cart is empty</h2>
            <p className="text-slate-400 mb-6">Add some products to get started</p>
            <Link to="/shop" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div key={item.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">{item.category}</div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm mt-0.5 truncate">{item.name}</div>
                      <div className="font-bold text-slate-900 dark:text-white mt-1">₹{item.price}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        <MdRemove size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold text-slate-900 dark:text-white text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        <MdAdd size={16} />
                      </button>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-slate-900 dark:text-white">₹{item.price * item.qty}</div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 mt-1 transition-colors">
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 h-fit">
              <h2 className="font-bold text-slate-900 dark:text-white mb-5">Order Summary</h2>
              <div className="flex flex-col gap-3 text-sm mb-5">
                <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Subtotal</span><span>₹{total}</span></div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Tax (18%)</span><span>₹{tax}</span></div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Delivery</span><span className="text-green-600 font-medium">Free</span></div>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between font-bold text-slate-900 dark:text-white text-base">
                  <span>Total</span><span>₹{total + tax}</span>
                </div>
              </div>
              <Link to="/checkout" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-center transition-colors mb-3">
                Proceed to Checkout
              </Link>
              <Link to="/shop" className="block w-full text-center text-slate-500 dark:text-slate-400 text-sm hover:text-blue-600 transition-colors py-2">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
