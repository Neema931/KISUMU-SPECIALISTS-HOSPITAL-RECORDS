from flask import Blueprint, request, jsonify
from app import db
from app.models import DepartmentReport, DailyHospitalReport
from datetime import datetime

report_bp = Blueprint("reports", __name__)


# =========================
# DEPARTMENT REPORT (DAY SHIFT)
# =========================
@report_bp.route("/department", methods=["POST"])
def create_department_report():

    data = request.get_json()

    report = DepartmentReport(
        department=data["department"],
        report_date=datetime.strptime(data["report_date"], "%Y-%m-%d").date(),
        data=data["data"],
        summary=data.get("summary"),
        submitted_by=data.get("submitted_by")
    )

    db.session.add(report)
    db.session.commit()

    return jsonify({
        "message": "Department report saved successfully"
    }), 201


# =========================
# HOSPITAL SHIFT REPORT (DAY / NIGHT)
# =========================
@report_bp.route("/hospital", methods=["POST"])
def create_hospital_report():

    data = request.get_json()

    report = DailyHospitalReport(
        report_date=datetime.strptime(data["report_date"], "%Y-%m-%d").date(),
        shift=data["shift"],
        submitted_by=data.get("submitted_by"),

        total_patients=data.get("total_patients"),
        admissions=data.get("admissions"),
        discharges=data.get("discharges"),
        day_cases=data.get("day_cases"),
        deaths=data.get("deaths"),
        transfers_out=data.get("transfers_out"),

        summary=data.get("summary")
    )

    db.session.add(report)
    db.session.commit()

    return jsonify({
        "message": "Hospital shift report saved successfully"
    }), 201