import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAdmin({ children }) {
  const { authed } = useAuth();
  return authed ? children : <Navigate to="/admin/login" replace />;
}
