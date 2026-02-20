import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import api from "../services/api";

const AdminReports = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/reports",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const approveReport = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/reports/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Report approved and alert created!");
      fetchReports();
    } catch (error) {
      console.error("Error approving report", error);
    }
  };

  return (
  <>
    <Navbar />

    <div style={styles.pageContainer}>
      <h2 style={styles.title}>Pending Disaster Reports</h2>

      {reports.length === 0 ? (
        <div style={styles.emptyCard}>
          No pending reports
        </div>
      ) : (
        reports.map((report) => (
          <div
            key={report.id}
            style={styles.card}
            className="report-card-hover"
          >
            <h4 style={styles.reportTitle}>{report.title}</h4>

            <p style={styles.description}>
              {report.description}
            </p>

            <p><strong>Location:</strong> {report.location}</p>
            <p><strong>Severity:</strong> {report.severity}</p>

            <button
              onClick={() => approveReport(report.id)}
              style={styles.button}
              className="approve-hover"
            >
              Approve & Publish Alert
            </button>
          </div>
        ))
      )}
    </div>
  </>
);

};

export default AdminReports;

const styles = {
  pageContainer: {
    padding: "40px",
    background: "#f4f7fb",
    minHeight: "100vh"
  },

  title: {
    fontSize: "28px",
    marginBottom: "30px",
    fontWeight: "700",
    color: "#1f2937"
  },

  card: {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "25px",
    marginBottom: "25px",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)"
  },

  reportTitle: {
    fontSize: "20px",
    marginBottom: "12px",
    color: "#111827",
    fontWeight: "600"
  },

  description: {
    color: "#374151",
    marginBottom: "12px",
    lineHeight: "1.6"
  },

  label: {
    fontWeight: "600",
    color: "#111827"
  },

  button: {
    marginTop: "18px",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #7c3aed, #2563eb)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },

  emptyCard: {
    padding: "25px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
  }
};

