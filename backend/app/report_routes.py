from flask import Blueprint, request, jsonify
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app.models import User, InchargeAssignment
from app.models import DepartmentReport, DailyHospitalReport
from datetime import datetime, date


report_bp = Blueprint("reports", __name__)


# =========================
# DEPARTMENT REPORT (DAY SHIFT)
# =========================
@report_bp.route("/department", methods=["POST"])
@jwt_required()
def create_department_report():

    data = request.get_json()

    # identify user from token
    user_id = get_jwt_identity()
    claims = get_jwt()

    user = User.query.get(int(user_id)) if user_id else None

    department_submitted = data.get("department")

    today = date.today()

    # CEO can submit for any department
    if user and user.role == "ceo":
        allowed = True
    else:
        # check if user has an active incharge assignment covering today
        assignment = InchargeAssignment.query.filter_by(user_id=user.id, active=True).filter(InchargeAssignment.start_date <= today, InchargeAssignment.end_date >= today).first() if user else None

        allowed = bool(assignment and user.department and user.department == department_submitted)

    if not allowed:
        return jsonify({"message": "You are not authorized to submit this department's report this week"}), 403

    report = DepartmentReport(
        department=department_submitted,
        report_date=datetime.strptime(data["report_date"], "%Y-%m-%d").date(),
        data=data["data"],
        summary=data.get("summary"),
        submitted_by=int(user_id) if user_id else None
    )

    db.session.add(report)
    db.session.commit()

    return jsonify({
        "message": "Department report saved successfully"
    }), 201



@report_bp.route("/department/authorize", methods=["GET"])
@jwt_required()
def authorize_department_submission():
    # Query param: ?department=Name
    dept = request.args.get("department")

    user_id = get_jwt_identity()
    user = User.query.get(int(user_id)) if user_id else None

    today = date.today()

    if not user:
        return jsonify({"allowed": False, "reason": "Unauthenticated"}), 401

    if user.role == "ceo":
        return jsonify({"allowed": True})

    assignment = InchargeAssignment.query.filter_by(user_id=user.id, active=True).filter(InchargeAssignment.start_date <= today, InchargeAssignment.end_date >= today).first()

    if assignment and user.department == dept:
        return jsonify({"allowed": True})

    return jsonify({"allowed": False, "reason": "Not assigned this week"}), 200


@report_bp.route("/incharge", methods=["GET"])
@jwt_required()
def list_incharge_assignments():
    # only CEO can list/manage assignments
    claims = get_jwt()
    if claims.get("role") != "ceo":
        return jsonify({"message": "Forbidden"}), 403

    assignments = InchargeAssignment.query.order_by(InchargeAssignment.start_date.desc()).all()
    out = []
    for a in assignments:
        user = User.query.get(a.user_id)
        out.append({
            "id": a.id,
            "user_id": a.user_id,
            "user_name": user.name if user else None,
            "department": user.department if user else None,
            "start_date": str(a.start_date),
            "end_date": str(a.end_date),
            "active": a.active,
        })

    return jsonify(out)


@report_bp.route("/incharge/active", methods=["GET"])
@jwt_required()
def active_incharge_assignments():
    today = date.today()
    assignments = InchargeAssignment.query.filter(
        InchargeAssignment.active == True,
        InchargeAssignment.start_date <= today,
        InchargeAssignment.end_date >= today,
    ).order_by(InchargeAssignment.start_date.desc()).all()

    out = []
    for a in assignments:
        user = User.query.get(a.user_id)
        out.append({
            "id": a.id,
            "user_id": a.user_id,
            "user_name": user.name if user else None,
            "department": user.department if user else None,
            "start_date": str(a.start_date),
            "end_date": str(a.end_date),
        })

    return jsonify(out)


@report_bp.route("/incharge", methods=["POST"])
@jwt_required()
def create_incharge_assignment():
    claims = get_jwt()
    if claims.get("role") != "ceo":
        return jsonify({"message": "Forbidden"}), 403

    data = request.get_json()
    user_id = data.get("user_id")
    start = datetime.strptime(data.get("start_date"), "%Y-%m-%d").date()
    end = datetime.strptime(data.get("end_date"), "%Y-%m-%d").date()

    # optionally deactivate overlapping assignments for same user/period
    assign = InchargeAssignment(user_id=user_id, start_date=start, end_date=end, active=True)
    db.session.add(assign)
    db.session.commit()

    return jsonify({"message": "Assignment created", "id": assign.id}), 201


@report_bp.route("/incharge/<int:assign_id>", methods=["DELETE"])
@jwt_required()
def delete_incharge_assignment(assign_id):
    claims = get_jwt()
    if claims.get("role") != "ceo":
        return jsonify({"message": "Forbidden"}), 403

    assign = InchargeAssignment.query.get(assign_id)
    if not assign:
        return jsonify({"message": "Not found"}), 404

    db.session.delete(assign)
    db.session.commit()

    return jsonify({"message": "Deleted"}), 200


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

#dashboard summary
@report_bp.route("/dashboard/summary", methods=["GET"])
@jwt_required()
def dashboard_summary():

    today = date.today()

    # Get today's hospital reports
    reports = DailyHospitalReport.query.filter_by(report_date=today).all()

    total_patients = sum(r.total_patients or 0 for r in reports)
    admissions = sum(r.admissions or 0 for r in reports)
    discharges = sum(r.discharges or 0 for r in reports)
    deaths = sum(r.deaths or 0 for r in reports)
    transfers = sum(r.transfers_out or 0 for r in reports)

    # Department reports today
    dept_reports = DepartmentReport.query.filter_by(report_date=today).count()

    return jsonify({
        "date": str(today),
        "total_patients": total_patients,
        "admissions": admissions,
        "discharges": discharges,
        "deaths": deaths,
        "transfers_out": transfers,
        "department_reports": dept_reports
    })