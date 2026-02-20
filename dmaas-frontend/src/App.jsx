import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import CitizenDashboard from "./pages/CitizenDashboard";
import ResponderDashboard from "./pages/ResponderDashboard";
import CitizenReport from "./pages/CitizenReport";

import AdminAlerts from "./pages/AdminAlerts";
import AdminResponders from "./pages/AdminResponders";
import AdminAssignResponder from "./pages/AdminAssignResponder";
import ResponderAlerts from "./pages/ResponderAlerts";
import AdminAuditLogs from "./pages/AdminAuditLogs";
import AdminSettings from "./pages/AdminSettings";
import CitizenSettings from "./pages/CitizenSettings";
import ResponderSettings from "./pages/ResponderSettings";
import NotificationsPage from "./pages/NotificationsPage";
import AdminReports from "./pages/AdminReports";

import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/notifications" element={<NotificationsPage />} />


        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/alerts"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminAlerts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/responders"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminResponders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/assign"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminAssignResponder />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />

        <Route path="/admin/settings" element={<AdminSettings />} />

         <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminReports />
            </ProtectedRoute>
          }
        />




        {/* Citizen */}
        <Route
          path="/citizen"
          element={
            <ProtectedRoute allowedRoles={["CITIZEN"]}>
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />

        {/* Citizen Report */}
        <Route
          path="/citizen/report"
          element={
            <ProtectedRoute allowedRoles={["CITIZEN"]}>
              <CitizenReport />
            </ProtectedRoute>
          }
        />

        <Route path="/citizen/settings" element={<CitizenSettings />} />



        {/* Responder */}
        <Route
          path="/responder"
          element={
            <ProtectedRoute allowedRoles={["RESPONDER"]}>
              <ResponderDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/responder/alerts"
          element={
            <ProtectedRoute allowedRoles={["RESPONDER"]}>
              <ResponderAlerts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/responder/settings"
          element={
            <ProtectedRoute allowedRoles={["RESPONDER"]}>
              <ResponderSettings />
            </ProtectedRoute>
          }
        />




        {/* Fallback */}
        <Route path="*" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
