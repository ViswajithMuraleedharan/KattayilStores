import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdBolt, MdVerified, MdWhatsapp, MdAttachMoney, MdStar, MdArrowForward, MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { testimonials, products } from "../data/dummy";
import ProductCard from "../components/ProductCard";
import PublicLayout from "../components/PublicLayout";

const features = [
  { icon: MdBolt, title: "Same Day Repair", desc: "Most repairs completed within 2-4 hours", color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  { icon: MdVerified, title: "Genuine Parts", desc: "Only OEM and certified replacement parts", color: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
  { icon: MdWhatsapp, title: "WhatsApp Updates", desc: "Real-time status updates on WhatsApp", color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { icon: MdAttachMoney, title: "Affordable Pricing", desc: "Transparent pricing with no hidden fees", color: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
];

const steps = [
  { n: "01", title: "Submit Request", desc: "Fill out our quick repair form online or walk in" },
  { n: "02", title: "Device Inspection", desc: "Our technician diagnoses your device thoroughly" },
  { n: "03", title: "Repair Process", desc: "We fix your device using genuine parts" },
  { n: "04", title: "Collect Device", desc: "Pick up your repaired device or get it delivered" },
];

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.3),_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial="hidden" animate="show" variants={fade} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Trusted by 5000+ customers
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
              Fast & Reliable<br /><span className="text-blue-400">Mobile Repair</span><br />Services
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Screen replacement, battery replacement, software issues, charging problems and accessories — all under one roof.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/repair" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-blue-600/30">
                Request Repair <MdArrowForward />
              </Link>
              <Link to="/shop" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                Shop Accessories
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10">
              {[["5000+", "Repairs Done"], ["4.9★", "Rating"], ["90 Day", "Warranty"]].map(([v, l]) => (
                <div key={l}>
                  <div className="text-xl font-bold text-white">{v}</div>
                  <div className="text-xs text-slate-400">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:flex justify-center">
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-3xl" />
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-8 shadow-2xl border border-slate-600 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <MdPhone size={40} className="text-white" />
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-lg">Expert Repairs</div>
                  <div className="text-slate-400 text-sm">All brands & models</div>
                </div>
                <div className="flex gap-2">
                  {["🔧", "🔋", "📱", "💧"].map((e) => (
                    <span key={e} className="w-9 h-9 bg-slate-600 rounded-xl flex items-center justify-center text-lg">{e}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" variants={fade} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Why Choose Kattayil Stores?</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">We combine expertise, genuine parts, and transparent pricing to deliver the best repair experience.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="show" variants={fade} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon size={24} />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" variants={fade} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">How It Works</h2>
            <p className="text-slate-500 dark:text-slate-400">Simple 4-step process to get your device repaired</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.n} initial="hidden" whileInView="show" variants={fade} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg mx-auto mb-4">{s.n}</div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{s.desc}</p>
                {i < 3 && <div className="hidden lg:block absolute top-10 -right-3 w-6 h-0.5 bg-blue-200 dark:bg-blue-800" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" variants={fade} viewport={{ once: true }} className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Popular Products</h2>
              <p className="text-slate-500 dark:text-slate-400">Top-rated accessories for your device</p>
            </div>
            <Link to="/shop" className="hidden sm:inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline">
              View All <MdArrowForward />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 4).map((p, i) => (
              <motion.div key={p.id} initial="hidden" whileInView="show" variants={fade} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" variants={fade} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">What Customers Say</h2>
            <p className="text-slate-500 dark:text-slate-400">Trusted by thousands of happy customers</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} initial="hidden" whileInView="show" variants={fade} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => <MdStar key={j} className="text-amber-400" size={18} />)}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">{t.avatar}</div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" variants={fade} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Fix Your Device?</h2>
            <p className="text-blue-100 mb-8">Book a repair online or chat with us on WhatsApp for instant support.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/repair" className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                Book Repair Now
              </Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
                <FaWhatsapp size={20} /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
