import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Maternity from "./pages/departments/Maternity";
import Laboratory from "./pages/departments/Laboratory";
import Physiotherapy from "./pages/departments/Physiotherapy";
import Radiology from "./pages/departments/Radiology";
import Theatre from "./pages/departments/Theatre";
import Outpatient from "./pages/departments/Outpatient";
import MedSurg from "./pages/departments/MedSurg";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maternity"
          element={
            <ProtectedRoute>
              <Maternity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/laboratory"
          element={
            <ProtectedRoute>
              <Laboratory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/physiotherapy"
          element={
            <ProtectedRoute>
              <Physiotherapy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/radiology"
          element={
            <ProtectedRoute>
              <Radiology />
            </ProtectedRoute>
          }
        />
        <Route
          path="/theatre"
          element={
            <ProtectedRoute>
              <Theatre />
            </ProtectedRoute>
          }
        />
        <Route
          path="/outpatient"
          element={
            <ProtectedRoute>
              <Outpatient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medsurg"
          element={
            <ProtectedRoute>
              <MedSurg />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
