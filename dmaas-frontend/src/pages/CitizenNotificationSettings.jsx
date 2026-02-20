// src/pages/citizen/CitizenNotificationSettings.jsx

import { useEffect, useState } from "react";
import api from "../services/api";

const CitizenNotificationSettings = () => {
    const [settings, setSettings] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get("/citizen/notification-settings");
            setSettings(res.data);
        } catch {
            alert("Failed to load notification settings");
        }
    };

    const toggle = (key) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    const saveSettings = async () => {
        try {
            setSaving(true);
            await api.put("/citizen/notification-settings", settings);
            alert("Notification settings updated");
        } catch {
            alert("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    if (!settings) return <p>Loading settings...</p>;

    return (
        <div style={box}>
            <h3 style={heading}>🔔 Notification Preferences</h3>

            <Toggle label="Email Alerts"
                desc="Receive disaster alerts via email"
                value={settings.emailAlerts}
                onChange={() => toggle("emailAlerts")}
            />

            <Toggle label="SMS Alerts"
                desc="Get SMS for urgent situations"
                value={settings.smsAlerts}
                onChange={() => toggle("smsAlerts")}
            />

            <Toggle label="Critical Alerts Only"
                desc="Notify only critical disasters"
                value={settings.criticalOnly}
                onChange={() => toggle("criticalOnly")}
            />

            <Toggle label="System Updates"
                desc="Maintenance & system updates"
                value={settings.systemUpdates}
                onChange={() => toggle("systemUpdates")}
            />

            <button style={saveBtn} onClick={saveSettings} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
};

export default CitizenNotificationSettings;

/* ---------- UI ---------- */

const Toggle = ({ label, desc, value, onChange }) => (
    <div style={row}>
        <div>
            <div style={labelStyle}>{label}</div>
            <div style={descStyle}>{desc}</div>
        </div>
        <input type="checkbox" checked={value} onChange={onChange} />
    </div>
);

const box = { background: "#fff", padding: "24px", borderRadius: "16px", maxWidth: "600px" };
const heading = { fontSize: "20px", fontWeight: "700", marginBottom: "20px" };
const row = { display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #e5e7eb" };
const labelStyle = { fontWeight: "600" };
const descStyle = { fontSize: "13px", color: "#64748b" };
const saveBtn = { marginTop: "24px", padding: "10px 18px", background: "#2563eb", color: "white", border: "none", borderRadius: "10px" };
