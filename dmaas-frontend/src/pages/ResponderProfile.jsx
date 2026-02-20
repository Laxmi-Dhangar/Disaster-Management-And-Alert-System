import { useEffect, useState } from "react";
import api from "../services/api";

const ResponderProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/responder/profile")
      .then(res => setProfile(res.data))
      .catch(() => alert("Failed to load profile"));
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div style={page}>
      <div style={card}>
        <div style={header}>
          <div style={avatar}>{profile.name.charAt(0)}</div>
          <div>
            <h2 style={name}>{profile.name}</h2>
            <span style={badge}>Responder</span>
          </div>
        </div>

        <div style={section}>
          <Row label="Email" value={profile.email} />
          <Row label="Phone" value={profile.phone} />
          <Row label="Location" value={profile.location || "Not specified"} />
        </div>

        <div style={note}>
          ℹ️ Profile details are read-only for operational integrity.
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value }) => (
  <div style={row}>
    <span style={labelStyle}>{label}</span>
    <span>{value}</span>
  </div>
);

export default ResponderProfile;

/* styles */
const page = { display: "flex", justifyContent: "center" };
const card = { maxWidth: "720px", width: "100%", padding: "28px", borderRadius: "18px", background: "#fff" };
const header = { display: "flex", gap: "18px", marginBottom: "26px" };
const avatar = { width: "70px", height: "70px", borderRadius: "50%", background: "#fb923c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800" };
const name = { fontSize: "22px", fontWeight: "800" };
const badge = { marginTop: "4px", padding: "4px 10px", borderRadius: "999px", background: "#ffedd5", color: "#9a3412", fontSize: "12px" };
const section = { display: "grid", gap: "14px" };
const row = { display: "flex", justifyContent: "space-between", padding: "14px", background: "#f8fafc", borderRadius: "12px" };
const labelStyle = { fontWeight: "600" };
const note = { marginTop: "24px", fontSize: "14px" };
