import { useState } from "react";
import Navbar from "../components/Navbar";
import CitizenProfile from "./CitizenProfile";
import CitizenChangePassword from "./CitizenChangePassword";
import CitizenNotificationSettings from "./CitizenNotificationSettings";

const CitizenSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      <Navbar />

      <div style={page}>
        <h2 style={title}>⚙ Citizen Settings</h2>

        {/* Tabs */}
        <div style={tabBar}>
          <Tab label="Profile" value="profile" active={activeTab} setActive={setActiveTab} />
          <Tab label="Change Password" value="password" active={activeTab} setActive={setActiveTab} />
          <Tab label="Notifications" value="notifications" active={activeTab} setActive={setActiveTab} />
        </div>

        {/* Content */}
        <div style={content}>
          {activeTab === "profile" && <CitizenProfile />}
          {activeTab === "password" && <CitizenChangePassword />}
          {activeTab === "notifications" && <CitizenNotificationSettings />}
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
      borderBottom: active === value ? "3px solid #16a34a" : "none",
      color: active === value ? "#16a34a" : "#475569",
    }}
  >
    {label}
  </button>
);

export default CitizenSettings;

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
