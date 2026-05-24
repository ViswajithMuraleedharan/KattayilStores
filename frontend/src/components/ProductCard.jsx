import { MdStar, MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden group">
      <Link to={`/shop/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      </Link>
      <div className="p-4">
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{product.category}</span>
        <Link to={`/shop/${product.id}`}>
          <h3 className="font-semibold text-slate-800 dark:text-white text-sm mt-1 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          <MdStar className="text-amber-400" size={16} />
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{product.rating}</span>
          <span className="text-xs text-slate-400">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900 dark:text-white">₹{product.price}</span>
          <button onClick={() => addToCart(product)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
            <MdAddShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
