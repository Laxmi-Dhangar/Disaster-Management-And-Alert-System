import { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const AdminResponders = () => {
    const [responders, setResponders] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [selectedResponder, setSelectedResponder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get("/admin/dashboard"),
            api.get("/admin/alerts"),
        ])
            .then(([dashboardRes, alertsRes]) => {
                setResponders(dashboardRes.data.responderStats || []);
                setAlerts(alertsRes.data || []);
            })
            .catch(() => alert("Failed to load responder data"))
            .finally(() => setLoading(false));
    }, []);

    /* ---------------- ACTIVE ALERT COUNT ---------------- */

    const getActiveAlertCount = (responderId) => {
        return alerts.filter(
            (a) =>
                a.assignedResponder?.id === responderId &&
                a.status !== "RESOLVED" &&
                a.status !== "CLOSED"
        ).length;
    };

    /* ---------------- STATUS LOGIC ---------------- */

    const getStatusBadge = (count) => {
        if (count === 0) return "badge-low";
        if (count <= 2) return "badge-medium";
        return "badge-high";
    };

    const getStatusText = (count) => {
        if (count === 0) return "Available";
        if (count <= 2) return "Busy";
        return "Overloaded";
    };

    /* ---------------- SORT BY WORKLOAD (Optional Enhancement) ---------------- */

    const sortedResponders = useMemo(() => {
        return [...responders].sort((a, b) => {
            const countA = getActiveAlertCount(a.id);
            const countB = getActiveAlertCount(b.id);
            return countB - countA; // highest workload first
        });
    }, [responders, alerts]);

    /* ---------------- MODAL ASSIGNED ALERTS ---------------- */

    const assignedAlerts = selectedResponder
        ? alerts.filter(
              (a) => a.assignedResponder?.id === selectedResponder.id
          )
        : [];

    /* ---------------- WORKLOAD BAR ---------------- */

    const renderWorkloadBar = (count) => {
        const maxCapacity = 5; // assumed max safe load
        const percentage = Math.min((count / maxCapacity) * 100, 100);

        let color = "#22c55e"; // green
        if (count > 2) color = "#ef4444"; // red
        else if (count > 0) color = "#facc15"; // yellow

        return (
            <div style={{ marginTop: "6px" }}>
                <div
                    style={{
                        height: "6px",
                        background: "#e5e7eb",
                        borderRadius: "6px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            width: `${percentage}%`,
                            height: "100%",
                            background: color,
                            transition: "width 0.3s ease",
                        }}
                    />
                </div>
            </div>
        );
    };

    return (
        <>
            <Navbar />

            <div className="ui-page">
                <div className="ui-container">
                    <h2 className="ui-title">🧑‍🚒 Responders Management</h2>

                    <div className="ui-card">
                        {loading ? (
                            <p className="ui-empty">Loading responders...</p>
                        ) : (
                            <div className="ui-table">
                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <thead>
                                        <tr style={{ background: "#e0f2fe" }}>
                                            <th style={th}>Responder</th>
                                            <th style={th}>Active Alerts</th>
                                            <th style={th}>Status</th>
                                            <th style={th}>Workload</th>
                                            <th style={th}>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {sortedResponders.map((r) => {
                                            const activeCount = getActiveAlertCount(r.id);

                                            return (
                                                <tr key={r.id} style={row}>
                                                    <td style={td}>{r.name}</td>

                                                    <td
                                                        style={{
                                                            ...td,
                                                            textAlign: "center",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {activeCount}
                                                    </td>

                                                    <td style={td}>
                                                        <span
                                                            className={`ui-badge ${getStatusBadge(
                                                                activeCount
                                                            )}`}
                                                        >
                                                            {getStatusText(activeCount)}
                                                        </span>
                                                    </td>

                                                    <td style={td}>
                                                        {renderWorkloadBar(activeCount)}
                                                    </td>

                                                    <td style={td}>
                                                        <button
                                                            className="ui-btn ui-btn-primary"
                                                            onClick={() =>
                                                                setSelectedResponder(r)
                                                            }
                                                        >
                                                            View Alerts
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* ===== MODAL ===== */}
                    {selectedResponder && (
                        <div style={overlay}>
                            <div style={modal}>
                                <h3>
                                    Alerts assigned to{" "}
                                    <b>{selectedResponder.name}</b>
                                </h3>

                                {assignedAlerts.length === 0 ? (
                                    <p className="ui-empty">
                                        No alerts assigned
                                    </p>
                                ) : (
                                    <ul style={{ marginTop: "12px" }}>
                                        {assignedAlerts.map((a) => (
                                            <li key={a.id} style={alertItem}>
                                                <b>{a.title}</b> — {a.location}
                                                <br />
                                                <small>
                                                    Severity: {a.severity} |
                                                    Status: {a.status}
                                                </small>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div
                                    style={{
                                        textAlign: "right",
                                        marginTop: "16px",
                                    }}
                                >
                                    <button
                                        className="ui-btn"
                                        onClick={() =>
                                            setSelectedResponder(null)
                                        }
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Legend */}
                    <div
                        style={{
                            marginTop: "16px",
                            fontSize: "14px",
                            color: "#475569",
                        }}
                    >
                        <p><strong>Status Guide:</strong></p>
                        <p>🟢 Available (0 active alerts)</p>
                        <p>🟡 Busy (1–2 active alerts)</p>
                        <p>🔴 Overloaded (3+ active alerts)</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminResponders;

/* ---------- styles (local & safe) ---------- */

const th = { padding: "14px", textAlign: "left", fontWeight: "600" };
const td = { padding: "14px" };
const row = { borderTop: "1px solid #e5e7eb" };

const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 200,
};

const modal = {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    width: "420px",
    maxHeight: "80vh",
    overflowY: "auto",
};

const alertItem = {
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
};
