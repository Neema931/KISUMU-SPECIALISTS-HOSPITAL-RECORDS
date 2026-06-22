from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from app.models import User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

# Register route
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    hashed_password = generate_password_hash(data["password"])

    user = User(
        name=data["name"],
        email=data["email"],
        password=hashed_password,
        role=data["role"],
        department=data["department"]
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created"}), 201

# Login route
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"message": "Email and password required"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not check_password_hash(user.password, data["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    # Create JWT token
    token = create_access_token(
        identity={
            "id": user.id,
            "role": user.role,
            "name": user.name
        }
    )

    return jsonify({
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active
        }
    }), 200