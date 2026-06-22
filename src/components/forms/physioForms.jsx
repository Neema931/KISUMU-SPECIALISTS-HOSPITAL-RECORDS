import { useState } from "react";
import ReportForms from "./ReportForms";

function PhysioForms() {
  const [formData, setFormData] = useState({
    reportDate: "",
    shift: "Day",
    outpatient: "",
    inpatient: "",
    sessionsCompleted: "",
    assessments: "",
    followUps: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const totalPatients =
    (Number(formData.outpatient) || 0) +
    (Number(formData.inpatient) || 0);

  const totalActivities =
    totalPatients +
    (Number(formData.sessionsCompleted) || 0) +
    (Number(formData.assessments) || 0) +
    (Number(formData.followUps) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const report = {
      ...formData,
      totalPatients,
      totalActivities,
    };

    console.log(report);
    alert("Physiotherapy report submitted successfully!");
  };

  return (
    <ReportForms
      title="Physiotherapy Daily Report"
      onSubmit={handleSubmit}
      department={"Physiotherapy"}
    >

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

        {/* Outpatient */}
        <div className="form-group">
          <label>Outpatient</label>
          <input
            type="number"
            name="outpatient"
            value={formData.outpatient}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* Inpatient */}
        <div className="form-group">
          <label>Inpatient</label>
          <input
            type="number"
            name="inpatient"
            value={formData.inpatient}
            onChange={handleChange}
            min="0"
          />
        </div>

     {/*cumulative */}
        <div className="form-group">
          <label>Cumulative</label>
          <input
            type="number"
            name="totalPatients"
            value={totalPatients}
            readOnly
            className="readonly-field"
          />
        </div>
    

      
    </ReportForms>
  );
}

export default PhysioForms;