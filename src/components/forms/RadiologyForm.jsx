import { useState } from "react";
import ReportForms from "./ReportForms";

function RadiologyForm() {
  const [formData, setFormData] = useState({
    reportDate: "",
    shift: "Day",
    xray: "",
    ctScan: "",
    ecg: "",
    doppler: "",
    ultrasound: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const cumulative =
    (Number(formData.xray) || 0) +
    (Number(formData.ctScan) || 0) +
    (Number(formData.ecg) || 0) +
    (Number(formData.doppler) || 0) +
    (Number(formData.ultrasound) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const report = {
      ...formData,
      cumulative,
    };

    console.log(report);
    alert("Radiology report submitted successfully!");
  };

  return (
    <ReportForms
      title="Radiology Daily Report"
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

        {/* X-Ray */}
        <div className="form-group">
          <label>X-Ray</label>
          <input
            type="number"
            name="xray"
            value={formData.xray}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* CT Scan */}
        <div className="form-group">
          <label>CT Scan</label>
          <input
            type="number"
            name="ctScan"
            value={formData.ctScan}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* ECG */}
        <div className="form-group">
          <label>ECG</label>
          <input
            type="number"
            name="ecg"
            value={formData.ecg}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* Doppler */}
        <div className="form-group">
          <label>Doppler</label>
          <input
            type="number"
            name="doppler"
            value={formData.doppler}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* Ultrasound */}
        <div className="form-group">
          <label>Ultrasound</label>
          <input
            type="number"
            name="ultrasound"
            value={formData.ultrasound}
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

export default RadiologyForm;