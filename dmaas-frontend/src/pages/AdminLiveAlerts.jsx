import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../services/socket";

function AdminLiveAlerts() {
  const [alerts, setAlerts] = useState([]);

  return (
    <div style={box}>
      <h3 style={title}>🔔 Live Alerts</h3>

      {alerts.length === 0 && <p>No live alerts</p>}

      {alerts.map((a, i) => (
        <div key={i} style={alertCard}>
          <strong>{a.message}</strong>
          <p>📍 {a.location}</p>
          <span style={badge(a.severity)}>{a.severity}</span>
        </div>
      ))}
    </div>
  );
}

export default AdminLiveAlerts;


/* ---------- STYLES ---------- */

const box = {
  marginTop: "40px",
  background: "#fff",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
};

const title = { fontSize: "18px", fontWeight: "700", marginBottom: "12px" };

const alertCard = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
};

const badge = (severity) => ({
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: "10px",
  fontSize: "12px",
  background:
    severity === "HIGH"
      ? "#fee2e2"
      : severity === "MEDIUM"
        ? "#ffedd5"
        : "#dcfce7",
});
