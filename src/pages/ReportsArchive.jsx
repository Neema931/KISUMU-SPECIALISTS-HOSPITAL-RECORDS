import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function ReportsArchive() {
  const [reports, setReports] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/reports");
        setReports(res.data || []);
      } catch (err) {
        console.error(err);
        setReports([]);
      }
    };
    load();
  }, []);

  return (
    <MainLayout>
      <div style={{ padding: 20 }}>
        <h1>Reports Archive</h1>
        {reports === null ? (
          <p>Loading reports...</p>
        ) : reports.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          <ul>
            {reports.map((r) => (
              <li key={r.id || r._id}>{r.department || r.title || "Report"} - {r.report_date || r.date || "-"}</li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  );
}

export default ReportsArchive;
