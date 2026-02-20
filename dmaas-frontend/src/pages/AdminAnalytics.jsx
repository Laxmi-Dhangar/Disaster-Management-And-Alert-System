import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import api from "../services/api";

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444"];

function AdminAnalytics() {
  const [severityData, setSeverityData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/admin/analytics");

      const severity = Object.entries(res.data.alertsBySeverity).map(
        ([key, value]) => ({
          name: key,
          value,
        })
      );

      const status = Object.entries(res.data.alertsByStatus).map(
        ([key, value]) => ({
          name: key,
          value,
        })
      );

      setSeverityData(severity);
      setStatusData(status);
    } catch {
      console.error("Failed to load analytics");
    }
  };

  return (
    <div style={wrapper}>
      <h3 style={title}>📊 Alert Analytics</h3>

      <div style={chartGrid}>
        {/* Severity Bar Chart */}
        <div style={chartCard}>
          <h4 style={chartTitle}>Alerts by Severity</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={severityData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {severityData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Pie Chart */}
        <div style={chartCard}>
          <h4 style={chartTitle}>Alerts by Status</h4>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;

/* ---------- STYLES ---------- */

const wrapper = {
  marginTop: "40px",
};

const title = {
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "18px",
};

const chartGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
  gap: "24px",
};

const chartCard = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
};

const chartTitle = {
  fontSize: "15px",
  fontWeight: "600",
  marginBottom: "10px",
};
