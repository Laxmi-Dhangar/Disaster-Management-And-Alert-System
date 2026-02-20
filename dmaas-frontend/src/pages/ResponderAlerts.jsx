import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const getStatusBadge = (status) => {
    const base = { padding: "6px 12px", borderRadius: "999px", fontWeight: "600" };
    if (status === "IN_PROGRESS") return { ...base, background: "#e0f2fe", color: "#0369a1" };
    return { ...base, background: "#dcfce7", color: "#166534" };
};

function ResponderAlerts() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        api.get("/responder/alerts").then(r => setAlerts(r.data));
    }, []);

    return (
        <>
            <Navbar />
            <div style={page}>
                <h2 style={title}>My Assigned Alerts</h2>

                <table style={table}>
                    <thead style={thead}>
                        <tr>
                            <th style={th}>Title</th>
                            <th style={th}>Location</th>
                            <th style={th}>Severity</th>
                            <th style={th}>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {alerts.map(a => (
                            <tr key={a.id} style={row}>
                                <td style={td}>{a.title}</td>
                                <td style={td}>{a.location}</td>
                                <td style={td}>{a.severity}</td>
                                <td style={td}><span style={getStatusBadge(a.status)}>{a.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ResponderAlerts;

const page = { padding: "30px", background: "#f8fafc", minHeight: "100vh" };
const title = { fontSize: "24px", fontWeight: "600" };
const table = { width: "100%", background: "white", borderRadius: "12px", borderCollapse: "collapse" };
const thead = { background: "#e0f2fe" };
const th = { padding: "12px" };
const row = { borderTop: "1px solid #e5e7eb" };
const td = { padding: "12px" };
