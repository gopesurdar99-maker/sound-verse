from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.user import User


def run():
    db = SessionLocal()
    try:
        email = "admin@soundverse.com"

        existing = db.query(User).filter(User.email == email).first()
        if existing:
            print("Admin already exists.")
            return

        admin = User(
            name="SoundVerse Admin",
            email=email,
            password_hash=hash_password("admin123"),
            role="admin",
            is_approved=True,
        )
        db.add(admin)
        db.commit()
        print("Admin created successfully.")
    finally:
        db.close()


if __name__ == "__main__":
    run()
