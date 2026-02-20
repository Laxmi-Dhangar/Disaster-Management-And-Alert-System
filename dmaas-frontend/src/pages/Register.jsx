import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaUserShield,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    role: "CITIZEN",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", formData);

      alert("Registration successful! Please login.");

      // Small UX delay so user sees alert
      setTimeout(() => {
        navigate("/login");
      }, 300);

    } catch (err) {
      alert(
        err.response?.data || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-glass">
        <h2>Create Account</h2>
        <p>Disaster Management & Alert System</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser />
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaPhone />
            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaMapMarkerAlt />
            <input
              name="location"
              placeholder="Location"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <FaUserShield />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="CITIZEN">Citizen</option>
              <option value="ADMIN">Admin</option>
              <option value="RESPONDER">Responder</option>
            </select>
          </div>

          <button type="submit">Register</button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
