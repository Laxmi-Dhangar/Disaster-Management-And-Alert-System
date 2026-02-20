import { Buffer } from 'buffer'
window.Buffer = Buffer


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './pages/ui-fix.css'
import "./pages/ui.css";
import "./services/ws-test.js";
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
