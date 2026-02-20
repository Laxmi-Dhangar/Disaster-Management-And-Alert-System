import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import api from '../services/api';

// City-to-coordinate mapping
const locationCoordinates = {
  Jaipur: [26.9124, 75.7873],
  Bengaluru: [12.9716, 77.5946],
  Bangalore: [12.9716, 77.5946],
  Mumbai: [19.076, 72.8777],
  Delhi: [28.6139, 77.209],
  Chennai: [13.0827, 80.2707],
  Hyderabad: [17.385, 78.4867],
  Pune: [18.5204, 73.8567],
};

// Severity icon
const severityIcon = (color) =>
  new L.Icon({
    iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

const AdminDisasterMap = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api
      .get('/admin/alerts')
      .then((res) => setAlerts(res.data || []))
      .catch((err) =>
        console.error('Failed to load alerts for map', err)
      );
  }, []);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {alerts.map((alert) => {
          const coords = locationCoordinates[alert.location];
          if (!coords) return null;

          return (
            <Marker
              key={alert.id}
              position={coords}
              icon={severityIcon(
                alert.severity === 'HIGH'
                  ? 'red'
                  : alert.severity === 'MEDIUM'
                  ? 'orange'
                  : 'green'
              )}
            >
              <Popup>
                <strong>{alert.type}</strong>
                <br />
                Location: {alert.location}
                <br />
                Severity: {alert.severity}
                <br />
                Status: {alert.status}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default AdminDisasterMap;
