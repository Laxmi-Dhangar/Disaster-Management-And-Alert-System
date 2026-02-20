// src/pages/admin/AdminNotificationSettings.jsx

import { useEffect, useState } from "react";
import api from "../services/api";

const AdminNotificationSettings = () => {
    const [settings, setSettings] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get("/admin/notification-settings"); // ✅ FIX
            setSettings(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
            alert("Failed to load notification settings");
        }
    };

    const toggle = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const saveSettings = async () => {
        try {
            setSaving(true);
            await api.put("/admin/notification-settings", settings); // ✅ FIX
            alert("Notification settings updated");
        } catch (err) {
            console.error("Save error:", err);
            alert("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    if (!settings) return <p>Loading settings...</p>;

    return (
        <div style={box}>
            <h3 style={heading}>🔔 Notification Preferences</h3>

            <Toggle
                label="Email Alerts"
                desc="Receive disaster alerts via email"
                value={settings.emailAlerts}
                onChange={() => toggle("emailAlerts")}
            />

            <Toggle
                label="SMS Alerts"
                desc="Get SMS for urgent situations"
                value={settings.smsAlerts}
                onChange={() => toggle("smsAlerts")}
            />

            <Toggle
                label="Critical Alerts Only"
                desc="Notify only critical disasters"
                value={settings.criticalOnly}
                onChange={() => toggle("criticalOnly")}
            />

            <Toggle
                label="System Updates"
                desc="Maintenance & system updates"
                value={settings.systemUpdates}
                onChange={() => toggle("systemUpdates")}
            />

            <button
                style={saveBtn}
                onClick={saveSettings}
                disabled={saving}
            >
                {saving ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
};

export default AdminNotificationSettings;

/* ---------- Components ---------- */

const Toggle = ({ label, desc, value, onChange }) => (
    <div style={row}>
        <div>
            <div style={labelStyle}>{label}</div>
            <div style={descStyle}>{desc}</div>
        </div>
        <input
            type="checkbox"
            checked={value}
            onChange={onChange}
            style={checkbox}
        />
    </div>
);

/* ---------- Styles ---------- */

const box = {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    maxWidth: "600px"
};

const heading = {
    fontSize: "20px",
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

const labelStyle = {
    fontWeight: "600",
    color: "#0f172a"
};

const descStyle = {
    fontSize: "13px",
    color: "#64748b"
};

const checkbox = {
    width: "18px",
    height: "18px",
    cursor: "pointer"
};

const saveBtn = {
    marginTop: "24px",
    padding: "10px 18px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer"
};
