import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AdminAssignResponder() {
    const [alerts, setAlerts] = useState([]);
    const [responders, setResponders] = useState([]);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const alertsRes = await api.get("/admin/alerts");
            const respondersRes = await api.get("/admin/responders");
            setAlerts(alertsRes.data);
            setResponders(respondersRes.data);
        } catch {
            alert("Failed to load admin data");
        }
    };

    const assignResponder = async (alertId) => {
        const responderId = selected[alertId];
        if (!responderId) {
            alert("Please select a responder");
            return;
        }

        try {
            await api.post(`/admin/alerts/${alertId}/assign/${responderId}`);
            alert("Responder assigned successfully");
            loadData();
        } catch (err) {
            alert(err.response?.data || "Assignment failed");
        }
    };

    return (
        <>
            <Navbar />

            <div style={page}>
                <h2 style={title}>Assign Responder</h2>

                <div style={grid}>
                    {alerts.map((alert) => (
                        <div key={alert.id} style={card}>
                            <div style={cardHeader}>
                                <h3 style={alertTitle}>{alert.type}</h3>
                                <span style={statusBadge(alert.status)}>
                                    {alert.status}
                                </span>
                            </div>

                            <p style={meta}>
                                {alert.location} | <b>{alert.severity}</b>
                            </p>

                            <p style={meta}>
                                Assigned:
                                <b> {alert.assignedResponder?.name || "None"}</b>
                            </p>

                            <select
                                style={select}
                                disabled={alert.status === "RESOLVED"}
                                onChange={(e) =>
                                    setSelected({
                                        ...selected,
                                        [alert.id]: e.target.value,
                                    })
                                }
                            >
                                <option value="">Select Responder</option>
                                {responders.map((r) => (
                                    <option key={r.id} value={r.id}>
                                        {r.name}
                                    </option>
                                ))}
                            </select>

                            <button
                                style={{
                                    ...button,
                                    ...(alert.status === "RESOLVED" && disabledBtn),
                                }}
                                disabled={alert.status === "RESOLVED"}
                                onClick={() => assignResponder(alert.id)}
                            >
                                Assign
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AdminAssignResponder;

/* ================= STYLES ================= */

const page = {
    padding: "32px",
    minHeight: "100vh",
    background: "#f8fafc",
};

const title = {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "24px",
    color: "#0f172a",
};

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
};

const card = {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const cardHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
};

const alertTitle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#020617",
};

const meta = {
    fontSize: "14px",
    color: "#475569",
    marginBottom: "8px",
};

const select = {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    marginBottom: "12px",
};

const button = {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "#6366f1",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s ease",
};

const disabledBtn = {
    background: "#cbd5e1",
    cursor: "not-allowed",
};

const statusBadge = (status) => ({
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    background:
        status === "PENDING"
            ? "#fff7ed"
            : status === "IN_PROGRESS"
                ? "#ecfeff"
                : "#ecfdf5",
    color:
        status === "PENDING"
            ? "#9a3412"
            : status === "IN_PROGRESS"
                ? "#0369a1"
                : "#166534",
});
