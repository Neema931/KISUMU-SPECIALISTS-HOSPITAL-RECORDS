from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Initialize extensions FIRST
db = SQLAlchemy()
jwt = JWTManager()


def create_app():
    load_dotenv()

    app = Flask(__name__)

    # =====================
    # CONFIGURATION
    # =====================
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "secret")
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///hospital.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "jwt-secret")

    # =====================
    # INIT EXTENSIONS
    # =====================
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    # =====================
    # IMPORT AND REGISTER ROUTES
    # =====================

    from app.routes import auth_bp
    from app.report_routes import report_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(report_bp, url_prefix="/api/reports")

    # =====================
    # CREATE DATABASE TABLES
    # =====================
    with app.app_context():
        db.create_all()

    return app