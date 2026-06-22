import { useState } from "react";
import ReportForms from "./ReportForms";
import API from "../../service/api";

function OPDForms() {
  const [formData, setFormData] = useState({
    reportDate: "",
    shift: "Day",
    consultants: "",
    emergencies: "",
    medicalOfficers: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const totalPatients =
    (Number(formData.consultants) || 0) +
    (Number(formData.emergencies) || 0) +
    (Number(formData.medicalOfficers) || 0);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const report = {
      department: "Outpatient",
      shift: formData.shift,
      report_date: formData.reportDate,
      data: {
        consultants: Number(formData.consultants) || 0,
        emergencies: Number(formData.emergencies) || 0,
        medical_officers: Number(formData.medicalOfficers) || 0,
        total: totalPatients,
      },
    };

    try {
      const res = await API.post("/reports/department", report);

      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to submit report");
    }
  };

  return (
    <ReportForms title="Outpatient Daily Report" onSubmit={handleSubmit}>
      <div className="form-grid">

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

        <div className="form-group">
          <label>Consultants</label>
          <input
            type="number"
            name="consultants"
            min="0"
            value={formData.consultants}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Emergencies</label>
          <input
            type="number"
            name="emergencies"
            min="0"
            value={formData.emergencies}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Medical Officers</label>
          <input
            type="number"
            name="medicalOfficers"
            min="0"
            value={formData.medicalOfficers}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Total Patients</label>
          <input
            type="number"
            value={totalPatients}
            className="readonly-field"
            readOnly
          />
        </div>

      </div>
    </ReportForms>
  );
}

export default OPDForms;