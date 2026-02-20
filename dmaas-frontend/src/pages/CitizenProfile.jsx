import { useEffect, useState } from "react";
import api from "../services/api";

const CitizenProfile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        api.get("/citizen/profile")
            .then(res => setProfile(res.data))
            .catch(() => alert("Failed to load profile"));
    }, []);

    if (!profile) {
        return <p className="ui-muted">Loading profile...</p>;
    }

    return (
        <div style={page}>
            <div style={card}>

                {/* Header */}
                <div style={header}>
                    <div style={avatar}>
                        {profile.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 style={name}>{profile.name}</h2>
                        <span style={roleBadge}>Citizen</span>
                    </div>
                </div>

                {/* Info */}
                <div style={section}>
                    <ProfileRow label="Email" value={profile.email} />
                    <ProfileRow label="Phone" value={profile.phone} />
                    <ProfileRow
                        label="Location"
                        value={profile.location || "Not specified"}
                    />
                </div>

                {/* Note */}
                <div style={note}>
                    ℹ️ Profile details are read-only for safety and authenticity.
                </div>
            </div>
        </div>
    );
};

const ProfileRow = ({ label, value }) => (
    <div style={row}>
        <span style={rowLabel}>{label}</span>
        <span style={rowValue}>{value}</span>
    </div>
);

export default CitizenProfile;

/* styles */
const page = { display: "flex", justifyContent: "center" };
const card = {
    width: "100%",
    maxWidth: "720px",
    padding: "28px",
    borderRadius: "18px",
    background: "#fff",
    boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
};
const header = { display: "flex", gap: "18px", marginBottom: "26px" };
const avatar = {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #16a34a, #065f46)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    fontWeight: "800",
};
const name = { fontSize: "22px", fontWeight: "800" };
const roleBadge = {
    marginTop: "4px",
    padding: "4px 10px",
    fontSize: "12px",
    fontWeight: "700",
    borderRadius: "999px",
    background: "#dcfce7",
    color: "#166534",
};
const section = { display: "grid", gap: "14px" };
const row = {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 16px",
    background: "#f8fafc",
    borderRadius: "12px",
};
const rowLabel = { fontWeight: "600", color: "#475569" };
const rowValue = { fontWeight: "500", color: "#0f172a" };
const note = { marginTop: "24px", fontSize: "14px" };
