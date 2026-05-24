import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";

export default function PublicLayout({ children }) {
  const { darkMode } = useCart();
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
