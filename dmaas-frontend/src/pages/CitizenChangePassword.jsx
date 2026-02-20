// src/pages/admin/CitizenChangePassword.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CitizenChangePassword = () => {
    const [form, setForm] = useState({ current: "", newPass: "" });
    const navigate = useNavigate();

    const changePassword = async () => {
        try {
            await api.post("/citizen/change-password", {
                currentPassword: form.current,
                newPassword: form.newPass
            });

            alert("Password changed successfully. Please login again.");

            // 🔐 AUTO LOGOUT (SECURITY BEST PRACTICE)
            localStorage.removeItem("token");
            localStorage.removeItem("role");

            // Redirect to login
            navigate("/login");

        } catch (err) {
            alert(err.response?.data?.message || "Password change failed");
        }
    };

    return (
        <div>
            <h3>🔐 Change Password</h3>

            <input
                type="password"
                placeholder="Current Password"
                value={form.current}
                onChange={e => setForm({ ...form, current: e.target.value })}
                style={input}
            />

            <input
                type="password"
                placeholder="New Password"
                value={form.newPass}
                onChange={e => setForm({ ...form, newPass: e.target.value })}
                style={input}
            />

            <button style={btn} onClick={changePassword}>
                Update Password
            </button>
        </div>
    );
};

export default CitizenChangePassword;

/* styles */
const input = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1"
};

const btn = {
    padding: "10px 18px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
};
