import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

const CitizenDashboard = () => {
const [alerts, setAlerts] = useState([]);
const navigate = useNavigate();

useEffect(() => {
api
.get("/alerts/public")
.then((res) => setAlerts(res.data))
.catch(() => alert("Failed to load alerts"));
}, []);

const getSeverityClass = (severity) => {
if (severity === "HIGH") return "badge-high";
if (severity === "MEDIUM") return "badge-medium";
return "badge-low";
};

const getBorderColor = (severity) => {
if (severity === "HIGH") return "#ef4444";
if (severity === "MEDIUM") return "#f59e0b";
return "#10b981";
};

useEffect(() => {
  fetchAlerts();
  const interval = setInterval(fetchAlerts, 5000);
  return () => clearInterval(interval);
}, []);

const fetchAlerts = () => {
  api.get("/alerts/public")
     .then(res => setAlerts(res.data))
     .catch(() => alert("Failed to load alerts"));
};


return (
<>
<Navbar />

<div className="ui-page">
<div className="ui-container">

{/* ===== Citizen Header (Unique Identity) ===== */}
<div className="citizen-hero">
<div>
<h2 className="citizen-title">Citizen Dashboard</h2>
<h2 className="citizen-title">Community Alerts</h2>
<p className="citizen-subtitle">
Live disaster updates reported across your region
</p>
</div>

<button
className="ui-btn ui-btn-danger"
onClick={() => navigate("/citizen/report")}
>
+ Report Disaster
</button>

<button
className="ui-btn ui-btn-secondary"
onClick={() => navigate("/citizen/settings")}
>
⚙ Settings
</button>

</div>

{/* ===== Empty State ===== */}
{alerts.length === 0 && (
<div className="ui-empty">
No active alerts at the moment
</div>
)}

{/* ===== Alerts Feed ===== */}
{alerts.map((alert) => (
<div
key={alert.id}
className="ui-card citizen-alert"
style={{
borderLeft: `6px solid ${getBorderColor(alert.severity)}`
}}
>
<div className="citizen-alert-header">
<h3 className="citizen-alert-title">{alert.title}</h3>

<span className={`severity-pill ${getSeverityClass(alert.severity)}`}>
{alert.severity}
</span>
</div>

<p className="citizen-alert-text">{alert.message}</p>

<div className="citizen-meta">
📍 {alert.location}
</div>
</div>
))}

</div>
</div>
</>
);
};

/* ================= STYLES ================= */

const page = {
padding: "32px",
minHeight: "100vh",
background: "#f8fafc"
};

const headerRow = {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: "30px"
};

const title = {
fontSize: "26px",
fontWeight: "700",
color: "#0f172a"
};

const reportBtn = {
background: "#dc2626",
color: "#fff",
padding: "10px 18px",
border: "none",
borderRadius: "10px",
fontSize: "15px",
cursor: "pointer",
boxShadow: "0 8px 18px rgba(220,38,38,0.25)",
transition: "transform 0.2s ease, box-shadow 0.2s ease"
};

const alertCard = {
background: "#ffffff",
padding: "18px",
borderRadius: "14px",
marginBottom: "18px",
boxShadow: "0 10px 22px rgba(0,0,0,0.06)",
transition: "transform 0.2s ease"
};

const cardHeader = {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: "8px"
};

const alertTitle = {
fontSize: "18px",
fontWeight: "600",
color: "#0f172a"
};

const text = {
color: "#334155",
marginBottom: "6px"
};

const meta = {
color: "#475569",
fontSize: "14px"
};

const emptyText = {
color: "#64748b"
};

const severityBadge = {
padding: "4px 10px",
borderRadius: "999px",
fontSize: "12px",
fontWeight: "600"
};

const severityHigh = {
background: "#fee2e2",
color: "#991b1b",
border: "#ef4444"
};

const severityMedium = {
background: "#fff7ed",
color: "#9a3412",
border: "#f59e0b"
};

const severityLow = {
background: "#ecfdf5",
color: "#065f46",
border: "#10b981"
};



export default CitizenDashboard;