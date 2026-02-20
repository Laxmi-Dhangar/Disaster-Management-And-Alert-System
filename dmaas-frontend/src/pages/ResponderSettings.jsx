/*import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

const ResponderSettings = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        api
            .get("/responder/notification-settings")
            .then(res => setSettings(res.data))
            .catch(() => alert("Failed to load settings"));
    }, []);

    const toggle = (key) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    const saveSettings = async () => {
        try {
            await api.put("/responder/notification-settings", settings);
            alert("Notification settings updated");
        } catch {
            alert("Failed to save settings");
        }
    };

    if (!settings) return <p>Loading...</p>;

    return (
        <>
            <Navbar />
            <div style={page}>
                <div style={card}>
                    <h2 style={title}>🚨 Responder Notification Settings</h2>

                    <Toggle label="Email Alerts" desc="Receive alerts via email"
                        checked={settings.emailAlerts}
                        onChange={() => toggle("emailAlerts")}
                    />

                    <Toggle label="SMS Alerts" desc="Instant SMS for emergencies"
                        checked={settings.smsAlerts}
                        onChange={() => toggle("smsAlerts")}
                    />

                    <Toggle label="Critical Alerts Only" desc="Only high priority disasters"
                        checked={settings.criticalOnly}
                        onChange={() => toggle("criticalOnly")}
                    />

                    <Toggle label="System Updates" desc="System announcements"
                        checked={settings.systemUpdates}
                        onChange={() => toggle("systemUpdates")}
                    />

                    <button style={btn} onClick={saveSettings}>
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    );
};

export default ResponderSettings; */

/* ---------- Components ---------- */

/*const Toggle = ({ label, desc, checked, onChange }) => (
    <div style={row}>
        <div>
            <div style={labelStyle}>{label}</div>
            <div style={descStyle}>{desc}</div>
        </div>
        <input type="checkbox" checked={checked} onChange={onChange} />
    </div>
);*/

/* ---------- Styles ---------- */

/*const page = {
    padding: "32px",
    background: "#f8fafc",
    minHeight: "100vh"
};

const card = {
    maxWidth: "650px",
    margin: "auto",
    background: "#fff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.06)"
};

const title = {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "20px"
};

const row = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid #e5e7eb"
};

const labelStyle = { fontWeight: "600" };
const descStyle = { fontSize: "13px", color: "#64748b" };

const btn = {
    marginTop: "22px",
    width: "100%",
    padding: "12px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer"
};*/

import { useState } from "react";
import Navbar from "../components/Navbar";
import ResponderProfile from "./ResponderProfile";
import ResponderChangePassword from "./ResponderChangePassword";
import ResponderNotificationSettings from "./ResponderNotificationSettings";

const ResponderSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      <Navbar />

      <div style={page}>
        <h2 style={title}>⚙ Responder Settings</h2>

        <div style={tabBar}>
          <Tab label="Profile" value="profile" active={activeTab} setActive={setActiveTab} />
          <Tab label="Change Password" value="password" active={activeTab} setActive={setActiveTab} />
          <Tab label="Notifications" value="notifications" active={activeTab} setActive={setActiveTab} />
        </div>

        <div style={content}>
          {activeTab === "profile" && <ResponderProfile />}
          {activeTab === "password" && <ResponderChangePassword />}
          {activeTab === "notifications" && <ResponderNotificationSettings />}
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
      borderBottom: active === value ? "3px solid #ea580c" : "none",
      color: active === value ? "#ea580c" : "#475569",
    }}
  >
    {label}
  </button>
);

export default ResponderSettings;

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
const content = { background: "white", padding: "24px", borderRadius: "14px" };

