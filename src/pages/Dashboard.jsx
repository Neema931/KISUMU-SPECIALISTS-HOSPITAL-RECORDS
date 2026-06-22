import { useEffect, useState } from "react";
import api from "../services/api";
import "./styles.css";

import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState({
    total_patients: 0,
    admissions: 0,
    discharges: 0,
    deaths: 0,
    transfers_out: 0,
    department_reports: 0,
    date: new Date().toISOString().split("T")[0],
  });

    
  

  const loadDashboard = async () => {
    try {
      const res = await api.get("/reports/dashboard/summary");
      setData(res.data);
    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <MainLayout>
      <div className="dashboard-page">

        {/* Welcome Banner */}
        <div className="welcome-banner">
        <div>
          <h1>Kisumu Specialists Hospital</h1>
          <p>Daily Records Management System</p>
        </div>

        <div>
          <h3>{data.date}</h3>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">

        <div className="stat-card">
          <h4>Total Patients</h4>
          <span>{data.total_patients}</span>
        </div>

        <div className="stat-card">
          <h4>Admissions</h4>
          <span>{data.admissions}</span>
        </div>

        <div className="stat-card">
          <h4>Discharges</h4>
          <span>{data.discharges}</span>
        </div>

        <div className="stat-card">
          <h4>Deaths</h4>
          <span>{data.deaths}</span>
        </div>

        <div className="stat-card">
          <h4>Transfers Out</h4>
          <span>{data.transfers_out}</span>
        </div>

        <div className="stat-card">
          <h4>Reports Submitted</h4>
          <span>{data.department_reports}</span>
        </div>

      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">

        {/* Weekly Assignment */}
        <div className="dashboard-card">
          <h2>Weekly Assignment</h2>

          <p>
            <strong>Weekly In-Charge:</strong>
            <br />
            Not Assigned
          </p>

          <p>
            <strong>Night Reporter:</strong>
            <br />
            Not Assigned
          </p>
        </div>
        
        {/* Critical Incidents */}
        <div className="dashboard-card">
          <h2>Critical Incidents</h2>

          <div className="empty-state">
            No critical incidents reported today.
          </div>
        </div>

      </div>
    </div>
    </MainLayout>
  );
}

export default Dashboard;