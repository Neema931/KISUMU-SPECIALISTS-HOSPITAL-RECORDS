import { useEffect, useState } from "react";
import api from "../../services/api";

function ReportForms({ title, children, onSubmit, department }) {
  const [allowed, setAllowed] = useState(true);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      if (!department) return setAllowed(true);
      setChecking(true);
      try {
        const res = await api.get(`/reports/department/authorize?department=${encodeURIComponent(department)}`);
        if (mounted) setAllowed(res.data.allowed === true);
      } catch (err) {
        if (mounted) setAllowed(false);
      } finally {
        if (mounted) setChecking(false);
      }
    };

    check();

    return () => (mounted = false);
  }, [department]);

  return (
    <div className="report-form-container">
      <div className="report-card">
        <h2 className="report-title">{title}</h2>

        <form onSubmit={onSubmit}>
          {children}

          <button type="submit" className="submit-btn" disabled={!allowed || checking}>
            {checking ? "Checking..." : allowed ? "Submit Report" : "Not authorized"}
          </button>
        </form>

        {!allowed && !checking && (
          <p style={{ color: "var(--error)", marginTop: 12 }}>Only the department incharge (HOD) assigned this week can submit reports.</p>
        )}
      </div>
    </div>
  );
}

export default ReportForms;