from app import create_app, db
from app.models import User
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():

    users = [
        User(
            name="OPD User",
            email="opd@hospital.com",
            password=generate_password_hash("1234"),
            role="staff",
            department="Outpatient"
        ),
        User(
            name="Lab User",
            email="lab@hospital.com",
            password=generate_password_hash("1234"),
            role="staff",
            department="Lab"
        ),

         User(
            name="Maternity User",
            email="mat@hospital.com",
            password=generate_password_hash("1234"),
            role="staff",
            department="Maternity"
        ),
         User(
            name="MedSurg User",
            email="med@hospital.com",
            password=generate_password_hash("1234"),
            role="staff",
            department="MedSurg"
        ),
         User(
            name="physio User",
            email="physio@hospital.com",
            password=generate_password_hash("1234"),
            role="staff",
            department="Physiotherapy"
        ),
         User(
            name="Rad User",
            email="rad@hospital.com",
            password=generate_password_hash("1234"),
            role="staff",
            department="Radiology"
        ),
         User(
            name="Theatre User",
            email="theatre@hospital.com",
            password=generate_password_hash("1234"),
            role="staff",
            department="Theatre"
        ),
        User(
            name="CEO",
            email="ceo@hospital.com",
            password=generate_password_hash("1234"),
            role="ceo",
            department="All"
        )
    ]

    db.session.add_all(users)
    db.session.commit()

    print(" Users created successfully")