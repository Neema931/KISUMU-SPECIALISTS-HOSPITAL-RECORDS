import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function HospitalSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/reports/dashboard/summary");
        setSummary(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <MainLayout>
      <div style={{ padding: 20 }}>
        <h1>Hospital Summary</h1>
        {summary ? (
          <div>
            <p><strong>Date:</strong> {summary.date}</p>
            <p><strong>Total Patients:</strong> {summary.total_patients}</p>
            <p><strong>Admissions:</strong> {summary.admissions}</p>
            <p><strong>Discharges:</strong> {summary.discharges}</p>
            <p><strong>Deaths:</strong> {summary.deaths}</p>
            <p><strong>Transfers Out:</strong> {summary.transfers_out}</p>
            <p><strong>Reports Submitted:</strong> {summary.department_reports}</p>
          </div>
        ) : (
          <p>Loading summary...</p>
        )}
      </div>
    </MainLayout>
  );
}

export default HospitalSummary;
