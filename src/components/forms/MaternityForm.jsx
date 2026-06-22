import { useState } from "react";
import ReportForms from "./ReportForms";

function MaternityForm() {
  const [formData, setFormData] = useState({
    reportDate: "",
    shift: "Day",
    totalPatients: "",
    anc: "",
    pnc: "",
    sickBabies: "",
    wellBabies: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const cumulative =
    (Number(formData.totalPatients) || 0) +
    (Number(formData.anc) || 0) +
    (Number(formData.pnc) || 0) +
    (Number(formData.sickBabies) || 0) +
    (Number(formData.wellBabies) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const report = {
      ...formData,
      cumulative,
    };

    console.log(report);
    alert("Maternity report submitted successfully!");
  };

  const submitToApi = async (e) => {
    e.preventDefault();

    const report = {
      department: "Maternity",
      report_date: formData.reportDate,
      shift: formData.shift,
      data: {
        totalPatients: Number(formData.totalPatients) || 0,
        anc: Number(formData.anc) || 0,
        pnc: Number(formData.pnc) || 0,
        sickBabies: Number(formData.sickBabies) || 0,
        wellBabies: Number(formData.wellBabies) || 0,
        cumulative: cumulative,
      },
    };

    try {
      const res = await (await import("../../services/api")).default.post("/reports/department", report);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to submit maternity report");
    }
  };

  return (
    <ReportForms
      title="Maternity Daily Report"
      onSubmit={submitToApi}
      department={"Maternity"}
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

        {/* ANC */}
        <div className="form-group">
          <label>ANC</label>
          <input
            type="number"
            name="anc"
            value={formData.anc}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* PNC */}
        <div className="form-group">
          <label>PNC</label>
          <input
            type="number"
            name="pnc"
            value={formData.pnc}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* Sick Babies */}
        <div className="form-group">
          <label>Sick Babies</label>
          <input
            type="number"
            name="sickBabies"
            value={formData.sickBabies}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* Well Babies */}
        <div className="form-group">
          <label>Well Babies</label>
          <input
            type="number"
            name="wellBabies"
            value={formData.wellBabies}
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
    </ReportForms>
  );
}

export default MaternityForm;