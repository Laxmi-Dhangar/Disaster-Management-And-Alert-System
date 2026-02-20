import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const ResponderDashboard = () => {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    try {
      const response = await api.get("/responder/alerts");
      setAlerts(response.data);
    } catch (error) {
      alert("Failed to load alerts");
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const acknowledge = async (id) => {
    try {
      await api.post(`/responder/alerts/${id}/acknowledge`);
      fetchAlerts();
    } catch {
      alert("Acknowledge failed");
    }
  };

  const resolve = async (id) => {
    try {
      await api.post(`/responder/alerts/${id}/status?status=RESOLVED`);
      fetchAlerts();
    } catch {
      alert("Resolve failed");
    }
  };

  return (
    <>
      <Navbar />
      <div style={page}>
        <h2 style={title}>Responder Dashboard</h2>

        {alerts.length === 0 && <p>No active alerts assigned</p>}

        <table style={table}>
          <thead style={thead}>
            <tr>
              <th style={th}>Title</th>
              <th style={th}>Location</th>
              <th style={th}>Severity</th>
              <th style={th}>Status</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map(a => (
              <tr key={a.id} style={row}>
                <td style={td}>{a.title}</td>
                <td style={td}>{a.location}</td>
                <td style={td}>{a.severity}</td>
                <td style={td}>{a.status}</td>
                <td style={td}>
                  {a.status === "IN_PROGRESS" && (
                    <>
                      <button style={btnBlue} onClick={() => acknowledge(a.id)}>
                        Ack
                      </button>
                      <button style={btnGreen} onClick={() => resolve(a.id)}>
                        Resolve
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ResponderDashboard;

const page = { padding: "30px", background: "#f8fafc", minHeight: "100vh" };
const title = { fontSize: "24px", fontWeight: "600", marginBottom: "20px" };
const table = { width: "100%", background: "white", borderRadius: "12px", borderCollapse: "collapse" };
const thead = { background: "#e0f2fe" };
const th = { padding: "12px" };
const row = { borderTop: "1px solid #e5e7eb" };
const td = { padding: "12px" };
const btnBlue = { background: "#3b82f6", color: "white", border: "none", padding: "6px 10px", borderRadius: "6px", marginRight: "6px" };
const btnGreen = { background: "#16a34a", color: "white", border: "none", padding: "6px 10px", borderRadius: "6px" };
