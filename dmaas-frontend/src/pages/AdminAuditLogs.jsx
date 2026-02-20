import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const AdminAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/audit-logs")
      .then((res) => setLogs(res.data || []))
      .catch((err) => console.error("Failed to fetch audit logs", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <div className="ui-page">
        <div className="ui-container">
          <h2 className="ui-title">🧾 Admin Audit Logs</h2>

          <div className="ui-card">
            {loading ? (
              <p className="ui-empty">Loading audit logs...</p>
            ) : logs.length === 0 ? (
              <div className="ui-empty">No audit logs found</div>
            ) : (
              <div className="ui-table">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#e0f2fe" }}>
                      <th style={th}>Action</th>
                      <th style={th}>Description</th>
                      <th style={th}>Performed By</th>
                      <th style={th}>Role</th>
                      <th style={th}>Timestamp</th>
                    </tr>
                  </thead>

                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id} style={row}>
                        <td style={td}>
                          <span className="ui-badge badge-medium">
                            {log.action}
                          </span>
                        </td>
                        <td style={td}>{log.description}</td>
                        <td style={td}>{log.performedBy}</td>
                        <td style={td}>{log.role}</td>
                        <td style={td}>
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAuditLogs;

/* ---------- inline-safe styles (no conflicts) ---------- */

const th = {
  padding: "14px",
  textAlign: "left",
  fontWeight: "600",
};

const td = {
  padding: "14px",
};

const row = {
  borderTop: "1px solid #e5e7eb",
  transition: "background 0.2s ease",
};
