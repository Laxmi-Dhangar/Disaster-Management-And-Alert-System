import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import AdminAnalytics from "../pages/AdminAnalytics";
import AdminLiveAlerts from "../pages/AdminLiveAlerts";
import { connectSocket, disconnectSocket } from "../services/socket";
import AdminDisasterMap from "../pages/AdminDisasterMap";

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [liveAlerts, setLiveAlerts] = useState([]);
  const [pendingReports, setPendingReports] = useState([]); // ✅ NEW
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
    fetchPendingReports(); // ✅ load pending reports
  }, []);

  useEffect(() => {
    connectSocket((alertMessage) => {
      setLiveAlerts((prev) => [alertMessage, ...prev]);
      fetchDashboard();
    });

    return () => disconnectSocket();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setData(res.data);
    } catch {
      alert("Failed to load admin dashboard");
    }
  };

  const fetchPendingReports = async () => {
    try {
      const res = await api.get("/admin/reports");
      setPendingReports(res.data);
    } catch (err) {
      console.log("No pending reports");
    }
  };

  const approveReport = async (id) => {
    try {
      await api.put(`/admin/reports/${id}/approve`);
      alert("✅ Report approved and alert created");
      fetchPendingReports();
      fetchDashboard();
    } catch {
      alert("❌ Failed to approve report");
    }
  };

  if (!data) return null;

  return (
    <>
      <Navbar />

      <div style={page}>
        <h2 style={title}>Admin Dashboard</h2>

        {/* ================= STATS ================= */}
        <div style={cardGrid}>
          {[
            ["Total Alerts", data.totalAlerts, "#e0f2fe"],
            ["Pending", data.pendingAlerts, "#fff7ed"],
            ["In Progress", data.inProgressAlerts, "#ecfeff"],
            ["Resolved", data.resolvedAlerts, "#ecfdf5"],
          ].map(([labelText, valueText, bg]) => (
            <div
              key={labelText}
              style={{ ...statCard, background: bg }}
            >
              <p style={label}>{labelText}</p>
              <h3 style={value}>{valueText}</h3>
            </div>
          ))}
        </div>

        {/* ================= 🔥 NEW SECTION ================= */}
        {/* <h3 style={sectionTitle}>📝 Pending Disaster Reports</h3>

        {pendingReports.length === 0 && (
          <p style={{ color: "#64748b" }}>No pending reports</p>
        )}

        {pendingReports.map((report) => (
          <div key={report.id} style={reportCard}>
            <h4>{report.disasterType}</h4>
            <p>{report.description}</p>
            <p><strong>Location:</strong> {report.location}</p>
            <p><strong>Severity:</strong> {report.severity}</p>

            <button
              style={approveButton}
              onClick={() => approveReport(report.id)}
            >
              Approve & Publish Alert
            </button>
          </div>
        ))} */}

        {/* ================= QUICK ACTIONS ================= */}
        <h3 style={sectionTitle}>⚡ Quick Admin Actions</h3>

        <div style={quickGrid}>
          {[
            ["⚙ Settings", "/admin/settings", "#ede9fe"],
            ["📜 Audit Logs", "/admin/audit-logs", "#fef3c7"],
            ["👨‍🚒 Responders", "/admin/responders", "#ecfeff"],
            ["📢 Alerts", "/admin/alerts", "#ffe4e6"],
          ].map(([text, path, bg]) => (
            <div
              key={text}
              onClick={() => navigate(path)}
              style={{ ...quickCard, background: bg }}
            >
              <h4 style={{ fontSize: "18px", fontWeight: "600" }}>{text}</h4>
              <p style={{ color: "#475569", marginTop: "6px" }}>
                Open {text.replace(/^[^ ]+ /, "")}
              </p>
            </div>
          ))}
        </div>

        {/* ================= LIVE ALERTS ================= */}
        <h3 style={sectionTitle}>🚨 Live Alerts</h3>

        {liveAlerts.length === 0 && (
          <p style={{ color: "#64748b" }}>No live alerts yet</p>
        )}

        <ul>
          {liveAlerts.map((alert, index) => (
            <li key={index} style={liveAlertItem}>
              {typeof alert === "string"
                ? alert
                : `${alert.title} - ${alert.severity} (${alert.location})`}
            </li>
          ))}
        </ul>

        {/* ================= EXISTING SECTIONS ================= */}
        <h3 style={sectionTitle}>Alert Analytics</h3>
        <AdminAnalytics />
        <AdminLiveAlerts />
        <AdminDisasterMap />

        <h3 style={sectionTitle}>Responder Workload</h3>

        <div style={tableWrapper}>
          <table style={table}>
            <thead>
              <tr style={theadRow}>
                <th style={th}>Responder</th>
                <th style={th}>Assigned Alerts</th>
              </tr>
            </thead>
            <tbody>
              {data.responderStats.map((r) => (
                <tr key={r.id} style={tbodyRow}>
                  <td style={td}>{r.name}</td>
                  <td style={tdCenter}>{r.assignedAlerts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;

/* ================= STYLES ================= */

const reportCard = {
  background: "white",
  padding: "16px",
  borderRadius: "12px",
  marginBottom: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const approveButton = {
  marginTop: "10px",
  padding: "8px 14px",
  borderRadius: "8px",
  border: "none",
  background: "#22c55e",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

const liveAlertItem = {
  background: "#fee2e2",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "8px",
  fontWeight: "600",
};

const page = {
  padding: "32px",
  minHeight: "100vh",
  background: "#f8fafc",
};

const title = {
  fontSize: "26px",
  fontWeight: "700",
  marginBottom: "24px",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
  marginBottom: "40px",
};

const statCard = {
  padding: "22px",
  borderRadius: "14px",
};

const label = {
  fontSize: "14px",
  color: "#334155",
};

const value = {
  fontSize: "32px",
  fontWeight: "700",
};

const sectionTitle = {
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "14px",
};

const quickGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
  marginBottom: "40px",
};

const quickCard = {
  padding: "24px",
  borderRadius: "16px",
  cursor: "pointer",
};

const tableWrapper = {
  background: "white",
  borderRadius: "14px",
  overflow: "hidden",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const theadRow = {
  background: "#e0f2fe",
};

const th = {
  padding: "14px",
  fontWeight: "600",
};

const tbodyRow = {
  borderTop: "1px solid #e5e7eb",
};

const td = {
  padding: "14px",
};

const tdCenter = {
  ...td,
  textAlign: "center",
  fontWeight: "600",
};
