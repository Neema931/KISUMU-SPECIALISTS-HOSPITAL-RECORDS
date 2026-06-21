import { useState } from "react";
import ReportForms from "./ReportForms";

function MedSurgForms() {
  const [formData, setFormData] = useState({
    reportDate: "",
    shift: "Day",
    totalPatients: "",
    male: "",
    female: "",
    paeds: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const cumulative =
    (Number(formData.male) || 0) +
    (Number(formData.female) || 0) +
    (Number(formData.paeds) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const report = {
      ...formData,
      cumulative,
    };

    console.log(report);
    alert("MedSurg report submitted successfully!");
  };

  return (
    <ReportForms
      title="MedSurg Daily Report"
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

        {/* Total Patients */}
        <div className="form-group">
          <label>Total Patients</label>
          <input
            type="number"
            name="totalPatients"
            value={formData.totalPatients}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* Male */}
        <div className="form-group">
          <label>Male</label>
          <input
            type="number"
            name="male"
            value={formData.male}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* Female */}
        <div className="form-group">
          <label>Female</label>
          <input
            type="number"
            name="female"
            value={formData.female}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* Paeds */}
        <div className="form-group">
          <label>Paeds</label>
          <input
            type="number"
            name="paeds"
            value={formData.paeds}
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

export default MedSurgForms;