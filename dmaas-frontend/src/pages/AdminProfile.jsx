// src/pages/AdminProfile.jsx

import { useEffect, useState } from "react";
import api from "../services/api";

const AdminProfile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        api.get("/admin/profile")
            .then(res => setProfile(res.data))
            .catch(() => console.error("Failed to load profile"));
    }, []);

    if (!profile) {
        return <p className="ui-muted ui-fade-in">Loading profile...</p>;
    }

    return (
        <div style={page} className="ui-fade-in">
            <div style={card} className="ui-card">

                {/* ===== Header ===== */}
                <div style={header}>
                    <div style={avatar} title="Admin Avatar">
                        {profile.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h2 style={name}>{profile.name}</h2>
                        <span style={roleBadge}>{profile.role}</span>
                    </div>
                </div>

                {/* ===== Info Section ===== */}
                <div style={section}>
                    <ProfileRow label="Email" value={profile.email} />
                    <ProfileRow label="Phone" value={profile.phone} />
                    <ProfileRow
                        label="Location"
                        value={profile.location || "Not specified"}
                    />
                </div>

                {/* ===== Footer Note ===== */}
                <div style={note} className="ui-info-box">
                    ℹ️ Profile details are system-managed for security reasons.
                </div>
            </div>
        </div>
    );
};

/* ===== Reusable Row ===== */

const ProfileRow = ({ label, value }) => (
    <div style={row} className="ui-row">
        <span style={rowLabel}>{label}</span>
        <span style={rowValue}>{value}</span>
    </div>
);

export default AdminProfile;

/* ================== STYLES ================== */

const page = {
    display: "flex",
    justifyContent: "center",
    padding: "32px",
};

const card = {
    width: "100%",
    maxWidth: "720px",
    padding: "28px",
    borderRadius: "18px",
    background: "#ffffff",
    boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
};

const header = {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "26px",
};

const avatar = {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #2563eb, #1e40af)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "800",
    cursor: "default",
    transition: "transform 0.3s ease",
};

avatar[":hover"] = {
    transform: "scale(1.05)",
};

const name = {
    fontSize: "22px",
    fontWeight: "800",
    marginBottom: "4px",
};

const roleBadge = {
    display: "inline-block",
    padding: "4px 10px",
    fontSize: "12px",
    fontWeight: "700",
    borderRadius: "999px",
    background: "#e0f2fe",
    color: "#0369a1",
    textTransform: "uppercase",
};

const section = {
    display: "grid",
    gap: "14px",
};

const row = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    background: "#f8fafc",
    borderRadius: "12px",
    transition: "background 0.2s ease",
};

const rowLabel = {
    fontWeight: "600",
    color: "#475569",
};

const rowValue = {
    fontWeight: "500",
    color: "#0f172a",
};

const note = {
    marginTop: "24px",
    fontSize: "14px",
};
