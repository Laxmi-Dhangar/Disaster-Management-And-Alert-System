// src/pages/admin/AdminSettings.jsx

import { useState } from "react";
import Navbar from "../components/Navbar";
import AdminProfile from "./AdminProfile";
import AdminChangePassword from "./AdminChangePassword";
import AdminNotificationSettings from "./AdminNotificationSettings";

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <>
            <Navbar />

            <div style={page}>
                <h2 style={title}>⚙️ Admin Settings</h2>

                {/* Tabs */}
                <div style={tabBar}>
                    <Tab label="Profile" value="profile" active={activeTab} setActive={setActiveTab} />
                    <Tab label="Change Password" value="password" active={activeTab} setActive={setActiveTab} />
                    <Tab label="Notifications" value="notifications" active={activeTab} setActive={setActiveTab} />
                </div>

                {/* Content */}
                <div style={content}>
                    {activeTab === "profile" && <AdminProfile />}
                    {activeTab === "password" && <AdminChangePassword />}
                    {activeTab === "notifications" && <AdminNotificationSettings />}
                </div>
            </div>
        </>
    );
};

const Tab = ({ label, value, active, setActive }) => (
    <button
        onClick={() => setActive(value)}
        style={{
            ...tab,
            borderBottom: active === value ? "3px solid #2563eb" : "none",
            color: active === value ? "#2563eb" : "#475569",
        }}
    >
        {label}
    </button>
);

export default AdminSettings;

/* styles */
const page = { padding: "32px", background: "#f8fafc", minHeight: "100vh" };
const title = { fontSize: "26px", fontWeight: "700", marginBottom: "20px" };
const tabBar = { display: "flex", gap: "24px", marginBottom: "24px" };
const tab = {
    background: "none",
    border: "none",
    padding: "10px 4px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
};
const content = {
    background: "white",
    padding: "24px",
    borderRadius: "14px",
};
