import { Navigate } from "react-router-dom";
import { isLoggedIn, getStoredRole } from "../services/authService";

export default function ProtectedRoute({ allowedRoles, children }) {
  // ❌ Not logged in → go to login
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  const role = getStoredRole();

  // ❌ Logged in but role not allowed → redirect to own dashboard
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={`/dashboard`} replace />;
  }

  // ✅ Allowed
  return children;
}
