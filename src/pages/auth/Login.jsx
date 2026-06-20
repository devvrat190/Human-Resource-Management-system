import { useState } from "react";
import { signIn } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const role = await signIn(email, password);   // ~ get role

      // route based on role
      if (role === "employee") {
        navigate("/employee/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>HRMS Login</h2>
        <p className="auth-subtitle">Sign in to continue</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-note">
          Restricted to authorised government personnel only
        </p>
      </div>
    </div>
  );
}
