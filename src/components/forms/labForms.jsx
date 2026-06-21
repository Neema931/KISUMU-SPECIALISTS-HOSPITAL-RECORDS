import { useState } from "react";
import ReportForms from "./ReportForms";

function labForms() {
  const [formData, setFormData] = useState({
    reportDate: "",
    shift: "Day",
    bloodAvailable: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const report = {
      ...formData,
      bloodAvailable: Number(formData.bloodAvailable) || 0,
    };

    console.log(report);
    alert("Laboratory report submitted successfully!");
  };

  return (
    <ReportForms
      title="Laboratory Daily Report"
      onSubmit={handleSubmit}
    >
      <div className="form-grid">

        {/* Date */}
        <div className="form-group">
          <label>Report Date</label>
          <input
            type="date"
            name="reportDate"
            value={formData.reportDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Shift */}
        <div className="form-group">
          <label>Shift</label>
          <select
            name="shift"
            value={formData.shift}
            onChange={handleChange}
          >
            <option value="Day">Day</option>
            <option value="Night">Night</option>
          </select>
        </div>

        {/* Blood Available */}
        <div className="form-group">
          <label>Blood Available (Units)</label>
          <input
            type="number"
            name="bloodAvailable"
            value={formData.bloodAvailable}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

      </div>
    </ReportForms>
  );
}

export default labForms;