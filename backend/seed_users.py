from app import create_app, db
from app.models import User, InchargeAssignment
from datetime import date, timedelta
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    # Clear existing users
    User.query.delete()
    db.session.commit()

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

    # Create example HOD users and weekly assignments for the current week
    # HODs
    hods = [
        User(name="Maternity HOD", email="hod_mat@hospital.com", password=generate_password_hash("1234"), role="hod", department="Maternity"),
        User(name="MedSurg HOD", email="hod_med@hospital.com", password=generate_password_hash("1234"), role="hod", department="MedSurg"),
    ]

    db.session.add_all(hods)
    db.session.commit()

    # assign current week incharge to Maternity HOD as an example
    start = date.today()
    # align start to Monday
    start = start - timedelta(days=start.weekday())
    end = start + timedelta(days=6)

    mat_hod = User.query.filter_by(email="hod_mat@hospital.com").first()
    if mat_hod:
        assign = InchargeAssignment(user_id=mat_hod.id, start_date=start, end_date=end, active=True)
        db.session.add(assign)
        db.session.commit()

    print(" Users created successfully")