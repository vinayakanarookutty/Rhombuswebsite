from fastapi import HTTPException
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

fake_user = {
    "username": "admin",
    "hashed_password": pwd_context.hash("admin123")
}

def authenticate_user(username: str, password: str):
    if username == fake_user["username"] and pwd_context.verify(password, fake_user["hashed_password"]):
        return True
    raise HTTPException(status_code=401, detail="Invalid username or password")
