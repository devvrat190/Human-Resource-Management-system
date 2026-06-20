import { Navigate } from "react-router-dom";
import { isLoggedIn, getStoredRole } from "../services/authService";

export default function PublicRoute({ children }) {
  // If logged in → redirect to dashboard
  if (isLoggedIn()) {
    const role = getStoredRole();
    return <Navigate to={`/dashboard`} replace />;
  }

  // Otherwise show login/signup
  return children;
}
