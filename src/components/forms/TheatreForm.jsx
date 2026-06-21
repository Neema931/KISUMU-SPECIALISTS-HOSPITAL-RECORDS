import { useState } from "react";
import ReportForms from "./ReportForms";

function TheatreForm() {
  const [formData, setFormData] = useState({
    reportDate: "",
    shift: "Day",
    casesDone: "",
    bookings: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const cumulative =
    (Number(formData.casesDone) || 0) +
    (Number(formData.bookings) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const report = {
      ...formData,
      cumulative,
    };

    console.log(report);
    alert("Theatre report submitted successfully!");
  };

  return (
    <ReportForms
      title="Theatre Daily Report"
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

        {/* Cases Done */}
        <div className="form-group">
          <label>Cases Done</label>
          <input
            type="number"
            name="casesDone"
            value={formData.casesDone}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* Bookings */}
        <div className="form-group">
          <label>Bookings</label>
          <input
            type="number"
            name="bookings"
            value={formData.bookings}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* Cumulative */}
        <div className="form-group">
          <label>Cumulative</label>
          <input
            type="number"
            value={cumulative}
            readOnly
            className="readonly-field"
          />
        </div>

      </div>
    </ReportForms>
  );
}

export default TheatreForm;