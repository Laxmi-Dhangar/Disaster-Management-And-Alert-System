import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.get("/notifications/my")
      .then(res => setNotifications(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="ui-page">
        <h2>🔔 Notifications</h2>

        {notifications.length === 0 && (
          <p>No notifications yet</p>
        )}

        {notifications.map(n => (
          <div key={n.id} className="ui-card">
            <h4>{n.title}</h4>
            <p>{n.message}</p>
            <span className={`badge ${n.severity.toLowerCase()}`}>
              {n.severity}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationsPage;
