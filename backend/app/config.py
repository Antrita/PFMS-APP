from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseModel):
    # Using your MongoDB Atlas connection
    mongodb_url: str = os.getenv("MONGODB_URI", "mongodb+srv://anu26:_123456_@cluster0.fkbpn.mongodb.net/NewMongo?retryWrites=true&w=majority")
    database_name: str = os.getenv("DATABASE_NAME", "NewMongo")
    secret_key: str = os.getenv("JWT_SECRET", "your-secret-key-here")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    admin_username: str = os.getenv("ADMIN_USERNAME", "admin")
    admin_password: str = os.getenv("ADMIN_PASSWORD", "432156")

settings = Settings()