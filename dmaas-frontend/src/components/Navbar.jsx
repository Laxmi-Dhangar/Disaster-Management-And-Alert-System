import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">DMAAS</div>

      <div className="nav-links">
        {role === "CITIZEN" && (
          <>
            <Link to="/citizen">Dashboard</Link>
            <Link to="/citizen/report">Report Disaster</Link>
            <Link to="/citizen/settings">⚙️Settings</Link>
            <Link to="/notifications">Alerts</Link>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/alerts">Alerts</Link>
            <Link to="/admin/responders">Responders</Link>
            <Link to="/admin/assign">Assign</Link>
            <Link to="/admin/settings">⚙️Settings</Link>
            <Link to="/notifications">System Alerts</Link>
            <Link to="/admin/reports">Reports</Link>


          </>
        )}

        {role === "RESPONDER" && (
          <>
            <Link to="/responder">Dashboard</Link>
            <Link to="/responder/alerts">Alerts</Link>
            <Link to="/responder/settings">⚙️Settings</Link>
            <Link to="/notifications">Assigned Alerts</Link>
          </>
        )}


        <button className="audit-btn-logs" onClick={() => navigate('/admin/audit-logs')}>
          ALogs
        </button>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
