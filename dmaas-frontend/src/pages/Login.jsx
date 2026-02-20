import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        alert("Invalid login credentials");
        return;
      }

      const data = await response.json();

      // ✅ Save JWT
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // ✅ Show success message
      alert("Login successful!");

      // ✅ Smooth role-based redirect (after short delay)
      setTimeout(() => {
        if (data.role === "ADMIN") {
          navigate("/admin");
        } else if (data.role === "CITIZEN") {
          navigate("/citizen");
        } else if (data.role === "RESPONDER") {
          navigate("/responder");
        }
      }, 500);

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-glass">
        <h2>Login</h2>
        <p>Disaster Management & Alert System</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <div className="register-link">
          New user? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
