import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const getStatusBadge = (status) => {
    const base = {
        padding: "6px 12px",
        borderRadius: "999px",
        fontSize: "13px",
        fontWeight: "600",
    };
    if (status === "PENDING") return { ...base, background: "#fef3c7", color: "#92400e" };
    if (status === "IN_PROGRESS") return { ...base, background: "#e0f2fe", color: "#0369a1" };
    return { ...base, background: "#dcfce7", color: "#166534" };
};

function AdminAlerts() {
    const [alerts, setAlerts] = useState([]);
    const [responders, setResponders] = useState([]);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        api.get("/admin/alerts").then(r => setAlerts(r.data));
        api.get("/admin/responders").then(r => setResponders(r.data));
    }, []);

    const assignResponder = async (alertId) => {
        if (!selected[alertId]) return alert("Select responder");
        await api.post(`/admin/alerts/${alertId}/assign/${selected[alertId]}`);
        api.get("/admin/alerts").then(r => setAlerts(r.data));
    };

    return (
        <>
            <Navbar />
            <div style={page}>
                <h2 style={title}>Admin Alerts</h2>

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
                                <td style={td}><span style={getStatusBadge(a.status)}>{a.status}</span></td>
                                <td style={td}>
                                    {a.assignedResponder ? (
                                        <b>{a.assignedResponder.name}</b>
                                    ) : (
                                        <>
                                            <select
                                                style={select}
                                                onChange={e => setSelected({ ...selected, [a.id]: e.target.value })}
                                            >
                                                <option value="">Select</option>
                                                {responders.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                            </select>
                                            <button style={btn} onClick={() => assignResponder(a.id)}>Assign</button>
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
}

export default AdminAlerts;

/* styles */
const page = { padding: "30px", background: "#f8fafc", minHeight: "100vh" };
const title = { fontSize: "24px", fontWeight: "600", marginBottom: "20px" };
const table = { width: "100%", background: "white", borderCollapse: "collapse", borderRadius: "12px", overflow: "hidden" };
const thead = { background: "#e0f2fe" };
const th = { padding: "12px", fontWeight: "600" };
const row = { borderTop: "1px solid #e5e7eb" };
const td = { padding: "12px" };
const select = { padding: "6px", borderRadius: "6px", marginRight: "8px" };
const btn = { background: "#2563eb", color: "white", padding: "6px 12px", border: "none", borderRadius: "6px", cursor: "pointer" };
