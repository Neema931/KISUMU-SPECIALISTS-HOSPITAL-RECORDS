function ReportForms({ title, children, onSubmit }) {
  return (
    <div className="report-form-container">
      <div className="report-card">
        <h2 className="report-title">{title}</h2>

        <form onSubmit={onSubmit}>
          {children}

          <button
            type="submit"
            className="submit-btn"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportForms;