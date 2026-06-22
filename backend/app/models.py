from app import db
from datetime import datetime


# =========================
# USER TABLE
# =========================
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    role = db.Column(db.String(50), nullable=False)
    department = db.Column(db.String(100))
    is_active = db.Column(db.Boolean, default=True)


# =========================
# WEEKLY INCHARGE ASSIGNMENT
# =========================
class InchargeAssignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    active = db.Column(db.Boolean, default=True)


# =========================
# DEPARTMENT REPORTS (DAY SHIFT)
# =========================
class DepartmentReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    department = db.Column(db.String(100), nullable=False)
    report_date = db.Column(db.Date, nullable=False)

    data = db.Column(db.JSON, nullable=False)

    summary = db.Column(db.Text)

    submitted_by = db.Column(db.Integer, db.ForeignKey("user.id"))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# =========================
# HOSPITAL SHIFT REPORT (NIGHT + DAY SUMMARY)
# =========================
class DailyHospitalReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    report_date = db.Column(db.Date, nullable=False)
    shift = db.Column(db.String(20), nullable=False)  # DAY / NIGHT

    submitted_by = db.Column(db.Integer, db.ForeignKey("user.id"))

    total_patients = db.Column(db.Integer)
    admissions = db.Column(db.Integer)
    discharges = db.Column(db.Integer)
    day_cases = db.Column(db.Integer)
    deaths = db.Column(db.Integer)
    transfers_out = db.Column(db.Integer)

    summary = db.Column(db.Text)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# =========================
# ATTACHMENTS
# =========================
class Attachment(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    report_id = db.Column(db.Integer, db.ForeignKey("daily_hospital_report.id"))

    filename = db.Column(db.String(255))
    filepath = db.Column(db.String(500))

    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)