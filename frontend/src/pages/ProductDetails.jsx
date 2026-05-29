import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdStar, MdAddShoppingCart, MdArrowBack, MdCheckCircle } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import PublicLayout from "../components/PublicLayout";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then((r) => {
        setProduct(r.data);
        return api.get("/api/products", { params: { category: r.data.category } });
      })
      .then((r) => setRelated(r.data.filter((p) => p.id !== Number(id)).slice(0, 4)))
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound || (!product && !notFound === false)) return (
    <PublicLayout>
      <div className="text-center py-20 text-slate-400">
        <div className="text-5xl mb-4">📦</div>
        <div>Product not found</div>
        <Link to="/shop" className="text-blue-600 mt-4 inline-block">Back to Shop</Link>
      </div>
    </PublicLayout>
  );

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/shop" className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 text-sm mb-6">
          <MdArrowBack /> Back to Shop
        </Link>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden aspect-square">
            <img src={product.imageUrl ?? product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{product.category}</span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-2 mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <MdStar key={i} className={i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"} size={18} />)}</div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{product.rating}</span>
              <span className="text-sm text-slate-400">({product.reviewCount ?? product.reviews} reviews)</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-4">₹{product.price}</div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{product.description}</p>
            <div className="mb-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Key Features</h3>
              <div className="flex flex-col gap-2">
                {product.features?.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <MdCheckCircle className="text-green-500 shrink-0" size={16} /> {f}
                  </div>
                ))}
              </div>
            </div>
            <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 ${product.stock > 10 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : product.stock > 0 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-amber-500" : "bg-red-500"}`} />
              {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => addToCart(product)} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
                <MdAddShoppingCart size={20} /> Add to Cart
              </button>
              <a href={`https://wa.me/919876543210?text=Hi, I'm interested in ${product.name}`} target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors">
                <FaWhatsapp size={18} /> WhatsApp Inquiry
              </a>
            </div>
          </div>
        </motion.div>

        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
