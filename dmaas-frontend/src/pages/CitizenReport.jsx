import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

const CitizenReport = () => {
    const [form, setForm] = useState({
        disasterType: "",
        title: "",
        description: "",
        location: "",
        severity: "MEDIUM",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/citizen/reports", form);
            alert("✅ Disaster report submitted successfully");
            navigate("/citizen");
        } catch {
            alert("❌ Failed to submit report");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div style={page}>
                <div style={card}>
                    <h2 style={title}>🚨 Report a Disaster</h2>

                    <form onSubmit={handleSubmit}>
                        <input name="disasterType" placeholder="Disaster Type" onChange={handleChange} required style={input} />
                        <input name="title" placeholder="Disaster Title" onChange={handleChange} required style={input} />
                        <textarea name="description" placeholder="Description" onChange={handleChange} required style={{ ...input, height: 100 }} />
                        <input name="location" placeholder="Location" onChange={handleChange} required style={input} />

                        <select name="severity" onChange={handleChange} style={input}>
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>

                        <button type="submit" disabled={loading} style={button}>
                            {loading ? "Submitting..." : "Submit Report"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

const page = {
    background: "#f8fafc",
    minHeight: "100vh",
    padding: "40px"
};

const card = {
    maxWidth: "520px",
    margin: "auto",
    background: "#fff",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 14px 30px rgba(0,0,0,0.08)"
};

const title = {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "700",
    color: "#0f172a"
};

const input = {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    outline: "none"
};

const button = {
    width: "100%",
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(79,70,229,0.3)"
};

export default CitizenReport;
