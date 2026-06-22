from flask import Blueprint, request, jsonify
from app.models import User
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid password"}), 401

    token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": user.role,
            "department": user.department
        }
    )

    return jsonify({
        "token": token,
        "user": {
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "department": user.department
        }
    })